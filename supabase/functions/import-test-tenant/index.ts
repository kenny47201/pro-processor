// Admin-only utility to import the AcuPath technical test tenant fixture.
// Creates/updates tenant, facility, technical users, fix records, issues, and
// shift task lists. Operators and Q.C. roles are intentionally excluded.
import { createClient } from "npm:@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const DEFAULT_PASSWORD = "AcuPath!Test2026";

type Fixture = {
  tenant: any;
  technicalUsers: Array<{
    employeeId: string;
    fullName: string;
    sourceRole: string;
    shift: string;
    appRole: string;
    screenName: string;
  }>;
  sampleFixRecords: any[];
  sampleRecurringTechnicalIssues: any[];
  sampleDepartmentPriorities: any[];
};

function screenNameToEmail(name: string) {
  return `${name.toLowerCase().trim().replace(/\s+/g, "_")}@proprocessor.app`;
}

function jsonOk(data: unknown) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
function jsonErr(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

const PROCESSING_ROLES = new Set(["processor"]);
const TOOLING_ROLES = new Set(["tooling_specialist"]);
const MAINTENANCE_ROLES = new Set(["maintenance_tech"]);
function departmentForRole(role: string): "Processing" | "Tooling" | "Maintenance" | null {
  if (PROCESSING_ROLES.has(role)) return "Processing";
  if (TOOLING_ROLES.has(role)) return "Tooling";
  if (MAINTENANCE_ROLES.has(role)) return "Maintenance";
  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return jsonErr("Unauthorized", 401);

    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: { user }, error: uErr } = await userClient.auth.getUser();
    if (uErr || !user) return jsonErr("Unauthorized", 401);

    const a = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: roleRows } = await a.from("user_roles").select("role").eq("user_id", user.id);
    const roles = (roleRows ?? []).map((r: any) => r.role as string);
    const isSuper = roles.includes("super_admin");
    const isAdmin = roles.includes("admin");
    if (!isSuper && !isAdmin) return jsonErr("Forbidden — admin or super_admin only", 403);

    const body = await req.json().catch(() => ({}));
    const fixture = body?.fixture as Fixture | undefined;
    if (!fixture?.tenant || !Array.isArray(fixture.technicalUsers)) {
      return jsonErr("Missing or invalid fixture payload");
    }

    const summary = {
      tenant: "" as "created" | "updated" | "",
      tenantId: "",
      facility: "" as "created" | "updated" | "",
      facilityId: "",
      usersCreated: 0,
      usersUpdated: 0,
      fixRecordsCreated: 0,
      issuesCreated: 0,
      departmentPrioritiesCreated: 0,
      operatorsExcluded: 0,
      qcExcluded: 0,
      defaultPassword: DEFAULT_PASSWORD,
      userCredentials: [] as Array<{ screenName: string; email: string; role: string; created: boolean }>,
    };

    // --- 1. Tenant ---
    const t = fixture.tenant;
    const tenantPayload = {
      name: t.name,
      slug: t.slug,
      address_line1: t.addressLine1 ?? null,
      city: t.city ?? null,
      state: t.state ?? null,
      postal_code: t.postalCode ?? null,
      county: t.county ?? null,
      country: t.country ?? null,
      region: t.region ?? null,
      time_zone: t.timeZone ?? null,
      primary_industry: t.primaryIndustry ?? null,
      operating_model: t.operatingModel ?? null,
      shifts: t.shifts ?? ["Day", "1st", "2nd", "3rd"],
    };

    const { data: existingTenant } = await a.from("tenants").select("id").eq("slug", t.slug).maybeSingle();
    let tenantId: string;
    if (existingTenant) {
      tenantId = existingTenant.id;
      await a.from("tenants").update(tenantPayload).eq("id", tenantId);
      summary.tenant = "updated";
    } else {
      const { data: created, error } = await a.from("tenants").insert(tenantPayload).select("id").single();
      if (error || !created) return jsonErr(`Tenant insert failed: ${error?.message}`, 500);
      tenantId = created.id;
      summary.tenant = "created";
    }
    summary.tenantId = tenantId;

    // Admins may only import into their own tenant
    if (!isSuper) {
      const { data: callerProfile } = await a.from("profiles").select("tenant_id").eq("user_id", user.id).maybeSingle();
      if (callerProfile?.tenant_id && callerProfile.tenant_id !== tenantId) {
        return jsonErr("Admins can only import into their own tenant", 403);
      }
    }

    // --- 2. Facility ---
    const facilityName = t.facilityName ?? "AcuPath Warsaw Medical Molding Plant";
    const { data: existingFac } = await a.from("facilities")
      .select("id").eq("tenant_id", tenantId).eq("name", facilityName).maybeSingle();
    let facilityId: string;
    if (existingFac) {
      facilityId = existingFac.id;
      summary.facility = "updated";
    } else {
      const { data: created, error } = await a.from("facilities")
        .insert({ tenant_id: tenantId, name: facilityName })
        .select("id").single();
      if (error || !created) return jsonErr(`Facility insert failed: ${error?.message}`, 500);
      facilityId = created.id;
      summary.facility = "created";
    }
    summary.facilityId = facilityId;

    // --- 3. Technical users ---
    const screenNameToUserId = new Map<string, string>();
    for (const u of fixture.technicalUsers) {
      const email = screenNameToEmail(u.screenName);
      // find existing by email
      const { data: existingProfile } = await a.from("profiles")
        .select("user_id").eq("screen_name", u.screenName).maybeSingle();

      let userId: string;
      let created = false;
      if (existingProfile?.user_id) {
        userId = existingProfile.user_id;
      } else {
        // Try lookup by email in auth to avoid duplicate-create errors
        const { data: list } = await a.auth.admin.listUsers({ page: 1, perPage: 200 });
        const found = list?.users?.find((x: any) => x.email === email);
        if (found) {
          userId = found.id;
        } else {
          const { data: newUser, error: cErr } = await a.auth.admin.createUser({
            email,
            password: DEFAULT_PASSWORD,
            email_confirm: true,
            user_metadata: { display_name: u.fullName },
          });
          if (cErr || !newUser.user) {
            return jsonErr(`Create user ${u.screenName} failed: ${cErr?.message}`, 500);
          }
          userId = newUser.user.id;
          created = true;
        }
      }
      screenNameToUserId.set(u.screenName, userId);

      await a.from("profiles").update({
        display_name: u.fullName,
        screen_name: u.screenName,
        tenant_id: tenantId,
        facility_id: facilityId,
        shift: u.shift,
        status: "active",
      }).eq("user_id", userId);

      // Replace roles with the one in fixture
      await a.from("user_roles").delete().eq("user_id", userId);
      await a.from("user_roles").insert({ user_id: userId, role: u.appRole });

      if (created) summary.usersCreated++; else summary.usersUpdated++;
      summary.userCredentials.push({ screenName: u.screenName, email, role: u.appRole, created });
    }

    // Track exclusions (informational)
    summary.operatorsExcluded = 1; // boundary acknowledged
    summary.qcExcluded = 1;

    // --- 4. Sample fix records ---
    for (const f of fixture.sampleFixRecords ?? []) {
      const createdBy = screenNameToUserId.get(f.createdBy) ?? user.id;
      const reviewer = screenNameToUserId.get(f.commitReviewer) ?? null;
      const ctx = f.context ?? {};
      const params = (f.parameterChanges ?? []).map((p: any) => ({
        parameter: p.parameter, before: p.before, after: p.after, units: p.units,
      }));
      const { error } = await a.from("knowledge_fixes").insert({
        tenant_id: tenantId,
        facility_id: facilityId,
        created_by: createdBy,
        title: f.title,
        status: "committed",
        defect: ctx.defect ?? null,
        tool: ctx.tool ?? null,
        press: ctx.press ?? null,
        material: ctx.material ?? null,
        problem: f.problem ?? "",
        root_cause: f.rootCause ?? "",
        solution: f.solution ?? "",
        parameter_changes: params,
        tags: ["acupath", "test-data"],
        committed_by: reviewer,
        committed_at: new Date().toISOString(),
      });
      if (!error) summary.fixRecordsCreated++;
    }

    // --- 5. Sample recurring technical issues ---
    for (const i of fixture.sampleRecurringTechnicalIssues ?? []) {
      const createdBy = screenNameToUserId.get(i.createdBy) ?? user.id;
      const owner = i.owner ? screenNameToUserId.get(i.owner) ?? null : null;
      const descBits = [
        i.description,
        i.press ? `Press: ${i.press}` : null,
        i.tool ? `Tool: ${i.tool}` : null,
      ].filter(Boolean).join("\n\n");
      const { error } = await a.from("issues").insert({
        tenant_id: tenantId,
        facility_id: facilityId,
        created_by: createdBy,
        owner_id: owner,
        title: i.title,
        description: descBits,
        category: i.category ?? "process",
        priority: i.priority ?? "medium",
        status: "open",
      });
      if (!error) summary.issuesCreated++;
    }

    // --- 6. Department priorities → shift task lists ---
    for (const dp of fixture.sampleDepartmentPriorities ?? []) {
      const createdBy = screenNameToUserId.get(dp.createdBy) ?? user.id;
      const dept = ["Processing", "Tooling", "Maintenance"].includes(dp.department)
        ? dp.department : null;
      const { data: list, error: listErr } = await a.from("shift_task_lists").insert({
        tenant_id: tenantId,
        facility_id: facilityId,
        created_by: createdBy,
        title: dp.title,
        shift: dp.shift ?? "Day",
        department: dept,
        notes: dp.notes ?? null,
        status: "active",
      }).select("id").single();
      if (listErr || !list) continue;

      const items = (dp.items ?? []).map((it: any, idx: number) => ({
        task_list_id: list.id,
        text: it.text,
        priority: it.priority ?? "normal",
        sort_order: idx,
        assigned_to_type: "user",
        assigned_to_id: it.assignee ? screenNameToUserId.get(it.assignee) ?? null : null,
        status: "pending",
      }));
      if (items.length) {
        await a.from("shift_task_items").insert(items);
      }
      summary.departmentPrioritiesCreated++;
    }

    return jsonOk({ ok: true, summary });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Server error";
    return jsonErr(msg, 500);
  }
});
