// Admin user management — list, create, invite, approve, update, deactivate
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type AppRole =
  | "processor" | "maintenance_tech" | "tooling_specialist"
  | "supervisor" | "manager" | "admin" | "super_admin";

type Action =
  | "list" | "create" | "invite" | "approve"
  | "update" | "deactivate" | "reactivate" | "delete" | "reset_password";

interface Body {
  action: Action;
  // create / invite
  screenName?: string;
  email?: string;          // for invite (real email)
  password?: string;       // for direct create
  displayName?: string;
  role?: AppRole;
  shift?: string;
  facilityId?: string | null;
  tenantId?: string;       // super_admin can target any tenant
  // ops on existing users
  userId?: string;
}

function generatePassword() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
}


const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

function admin() {
  return createClient(SUPABASE_URL, SERVICE_ROLE, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function screenNameToEmail(name: string) {
  return `${name.toLowerCase().trim().replace(/\s+/g, "_")}@proprocessor.app`;
}

async function requireCaller(authHeader: string | null) {
  if (!authHeader) throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
  const userClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: { user }, error } = await userClient.auth.getUser();
  if (error || !user) throw new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });

  const a = admin();
  const { data: roleRows } = await a.from("user_roles").select("role").eq("user_id", user.id);
  const roles = (roleRows ?? []).map(r => r.role as AppRole);
  const isSuper = roles.includes("super_admin");
  const isAdmin = roles.includes("admin");
  if (!isSuper && !isAdmin) {
    throw new Response(JSON.stringify({ error: "Forbidden" }), { status: 403, headers: corsHeaders });
  }
  const { data: profile } = await a.from("profiles").select("tenant_id").eq("user_id", user.id).maybeSingle();
  return { user, isSuper, isAdmin, callerTenantId: profile?.tenant_id ?? null };
}

function jsonOk(data: unknown) {
  return new Response(JSON.stringify(data), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}
function jsonErr(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const caller = await requireCaller(req.headers.get("Authorization"));
    const body = (await req.json().catch(() => ({}))) as Body;
    const a = admin();

    // Resolve target tenant: super_admin may pass tenantId; admin always uses their own
    const targetTenantId = caller.isSuper && body.tenantId ? body.tenantId : caller.callerTenantId;

    switch (body.action) {
      case "list": {
        // Super admin sees all; admin sees their tenant
        let q = a.from("profiles").select("user_id, display_name, screen_name, tenant_id, facility_id, shift, status, created_at");
        if (!caller.isSuper) q = q.eq("tenant_id", targetTenantId);
        const { data: profiles, error } = await q.order("created_at", { ascending: false });
        if (error) return jsonErr(error.message, 500);

        const userIds = (profiles ?? []).map(p => p.user_id);
        const { data: rolesData } = userIds.length
          ? await a.from("user_roles").select("user_id, role").in("user_id", userIds)
          : { data: [] as { user_id: string; role: AppRole }[] };
        const rolesByUser = new Map<string, AppRole[]>();
        (rolesData ?? []).forEach(r => {
          const arr = rolesByUser.get(r.user_id) ?? [];
          arr.push(r.role as AppRole);
          rolesByUser.set(r.user_id, arr);
        });

        // emails via auth.admin
        const emails = new Map<string, string>();
        for (const uid of userIds) {
          const { data } = await a.auth.admin.getUserById(uid);
          if (data?.user?.email) emails.set(uid, data.user.email);
        }

        return jsonOk({
          users: (profiles ?? []).map(p => ({
            user_id: p.user_id,
            display_name: p.display_name,
            screen_name: p.screen_name,
            email: emails.get(p.user_id) ?? null,
            tenant_id: p.tenant_id,
            facility_id: p.facility_id,
            shift: p.shift,
            status: p.status,
            roles: rolesByUser.get(p.user_id) ?? [],
            created_at: p.created_at,
          })),
        });
      }

      case "create": {
        if (!body.screenName || !body.password || !body.role) return jsonErr("screenName, password, and role are required");
        if (!targetTenantId) return jsonErr("No tenant assigned");
        if (body.role === "super_admin" && !caller.isSuper) return jsonErr("Forbidden", 403);
        if (body.role === "admin" && !caller.isSuper) return jsonErr("Only super admins can create admins", 403);

        const email = screenNameToEmail(body.screenName);
        const { data: created, error: cErr } = await a.auth.admin.createUser({
          email,
          password: body.password,
          email_confirm: true,
          user_metadata: { display_name: body.displayName ?? body.screenName },
        });
        if (cErr || !created.user) return jsonErr(cErr?.message ?? "Could not create user", 400);

        // Profile is auto-created by handle_new_user trigger; update it
        await a.from("profiles").update({
          display_name: body.displayName ?? body.screenName,
          screen_name: body.screenName,
          tenant_id: targetTenantId,
          facility_id: body.facilityId ?? null,
          shift: body.shift ?? null,
          status: "active",
        }).eq("user_id", created.user.id);

        await a.from("user_roles").insert({ user_id: created.user.id, role: body.role });

        return jsonOk({ user_id: created.user.id, email });
      }

      case "invite": {
        if (!body.email || !body.role) return jsonErr("email and role are required");
        if (!targetTenantId) return jsonErr("No tenant assigned");
        if (body.role === "super_admin" && !caller.isSuper) return jsonErr("Forbidden", 403);
        if (body.role === "admin" && !caller.isSuper) return jsonErr("Only super admins can invite admins", 403);

        const { data: invited, error: iErr } = await a.auth.admin.inviteUserByEmail(body.email, {
          data: { display_name: body.displayName ?? body.email },
        });
        if (iErr || !invited.user) return jsonErr(iErr?.message ?? "Could not send invite", 400);

        await a.from("profiles").update({
          display_name: body.displayName ?? body.email,
          screen_name: body.screenName ?? null,
          tenant_id: targetTenantId,
          facility_id: body.facilityId ?? null,
          shift: body.shift ?? null,
          status: "pending",
        }).eq("user_id", invited.user.id);

        await a.from("user_roles").insert({ user_id: invited.user.id, role: body.role });
        return jsonOk({ user_id: invited.user.id });
      }

      case "approve":
      case "update": {
        if (!body.userId) return jsonErr("userId is required");
        // Verify target is in caller's tenant unless super
        const { data: target } = await a.from("profiles").select("tenant_id").eq("user_id", body.userId).maybeSingle();
        if (!target) return jsonErr("User not found", 404);
        if (!caller.isSuper && target.tenant_id && target.tenant_id !== caller.callerTenantId) return jsonErr("Forbidden", 403);

        const updates: Record<string, unknown> = {};
        if (body.displayName !== undefined) updates.display_name = body.displayName;
        if (body.shift !== undefined) updates.shift = body.shift;
        if (body.facilityId !== undefined) updates.facility_id = body.facilityId;
        if (caller.isSuper && body.tenantId !== undefined) updates.tenant_id = body.tenantId;
        else if (body.action === "approve" && targetTenantId) updates.tenant_id = targetTenantId;
        if (body.action === "approve") updates.status = "active";

        if (Object.keys(updates).length) {
          const { error: uErr } = await a.from("profiles").update(updates).eq("user_id", body.userId);
          if (uErr) return jsonErr(uErr.message, 500);
        }

        if (body.role) {
          if (body.role === "super_admin" && !caller.isSuper) return jsonErr("Forbidden", 403);
          if (body.role === "admin" && !caller.isSuper) return jsonErr("Only super admins can assign admin", 403);
          // Replace roles
          await a.from("user_roles").delete().eq("user_id", body.userId);
          await a.from("user_roles").insert({ user_id: body.userId, role: body.role });
        }

        return jsonOk({ ok: true });
      }

      case "deactivate":
      case "reactivate": {
        if (!body.userId) return jsonErr("userId is required");
        const { data: target } = await a.from("profiles").select("tenant_id").eq("user_id", body.userId).maybeSingle();
        if (!target) return jsonErr("User not found", 404);
        if (!caller.isSuper && target.tenant_id !== caller.callerTenantId) return jsonErr("Forbidden", 403);
        await a.from("profiles").update({ status: body.action === "deactivate" ? "inactive" : "active" }).eq("user_id", body.userId);
        return jsonOk({ ok: true });
      }

      case "reset_password": {
        if (!body.userId) return jsonErr("userId is required");
        const { data: target } = await a.from("profiles").select("tenant_id").eq("user_id", body.userId).maybeSingle();
        if (!target) return jsonErr("User not found", 404);
        if (!caller.isSuper && target.tenant_id !== caller.callerTenantId) return jsonErr("Forbidden", 403);

        // Admins may not reset a super_admin's password
        const { data: targetRoles } = await a.from("user_roles").select("role").eq("user_id", body.userId);
        const isTargetSuper = (targetRoles ?? []).some(r => r.role === "super_admin");
        if (isTargetSuper && !caller.isSuper) return jsonErr("Forbidden", 403);

        const newPassword = body.password && body.password.length >= 6 ? body.password : generatePassword();
        const { error } = await a.auth.admin.updateUserById(body.userId, { password: newPassword });
        if (error) return jsonErr(error.message, 400);
        return jsonOk({ ok: true, password: newPassword, generated: !body.password });
      }



      case "delete": {
        if (!body.userId) return jsonErr("userId is required");
        const { data: target } = await a.from("profiles").select("tenant_id").eq("user_id", body.userId).maybeSingle();
        if (target && !caller.isSuper && target.tenant_id !== caller.callerTenantId) return jsonErr("Forbidden", 403);
        const { error } = await a.auth.admin.deleteUser(body.userId);
        if (error) return jsonErr(error.message, 500);
        return jsonOk({ ok: true });
      }

      default:
        return jsonErr("Unknown action");
    }
  } catch (e) {
    if (e instanceof Response) return e;
    const msg = e instanceof Error ? e.message : "Server error";
    return jsonErr(msg, 500);
  }
});
