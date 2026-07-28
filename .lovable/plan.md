
## Goal
Replace free-text press/tool fields with a proper tenant-scoped registry of machines (presses) and molds so per-machine history becomes queryable. Wire dropdowns into Issues, Fix Records, and Fix Trials, and give tenant admins CRUD.

## 1. Database

Create two new tenant-scoped tables:

**`machines`** (presses / equipment)
- `tenant_id`, `facility_id` (nullable)
- `name` (e.g. "Press 4"), `asset_tag` (nullable), `manufacturer`, `model`
- `tonnage` (numeric, nullable), `shot_size_oz` (numeric, nullable)
- `status` enum: `active | idle | down | retired`
- `notes`
- timestamps

**`molds`** (tooling)
- `tenant_id`, `facility_id` (nullable)
- `name` (e.g. "Mold-001"), `tool_number` (nullable)
- `cavities` (int, nullable), `part_name` (nullable)
- `status` enum: `active | in_repair | retired`
- `notes`
- timestamps

Follow the required 4-step pattern per table: CREATE → GRANT (authenticated + service_role) → ENABLE RLS → POLICIES. Policies scope to `get_user_tenant_id(auth.uid())`; admins/managers can insert/update/delete, everyone in the tenant can select. Add `update_updated_at_column` triggers.

**Schema wiring on existing tables:**
- `issues`: keep `asset_id`, `mold_id` — add FKs to `machines(id)` and `molds(id)`.
- `knowledge_fixes`: add `machine_id uuid` and `mold_id uuid` (FKs); keep old `press`/`tool` text columns for backfill/legacy display.
- `fix_trials`: add `machine_id uuid` and `mold_id uuid` (FKs); keep old `press`/`tool` text.

No destructive drops — legacy text stays readable, new writes use the FKs.

## 2. Admin CRUD

New page `src/pages/admin/MachinesMolds.tsx` (or add tabs into existing `TenantDetail.tsx` — preferred to keep tenant config in one place). Two tabs:
- **Machines**: list + Add/Edit/Delete dialogs.
- **Molds**: same pattern.

Gated to `admin`, `manager`, `super_admin` for write; read for all tenant members. Reached from Tenant Detail and Settings.

## 3. Dropdowns everywhere

Create a reusable hook `useMachines()` and `useMolds()` returning tenant-scoped active records. Create two small components:
- `<MachinePicker value onChange />`
- `<MoldPicker value onChange />`

Both use shadcn `Select` with a search input and an inline "Add new…" affordance for admins.

Wire into:
- `IssueNew.tsx` — replace Press text input with MachinePicker; add MoldPicker (writes `asset_id`, `mold_id`).
- `IssueDetail.tsx` — show machine/mold names (join), allow edit for owners/managers.
- `KnowledgeFixNew.tsx` — replace Press/Tool text inputs with pickers (writes `machine_id`, `mold_id`, still fills legacy text for display).
- `KnowledgeFixDetail.tsx` — trial log form: replace Press/Tool text with pickers.
- Fix trial logging path — same pickers.

## 4. Filtering / history payoff

- Fix Records list: add "Filter by machine" and "Filter by mold" chips.
- Issues list: same filters.
- Machine detail view (stretch, same page): show issues opened against this machine + fixes trialed on it. This is the "per-machine history" value prop.

## Technical details

- Enums: `machine_status`, `mold_status` (new pg enums).
- RLS pattern mirrors `facilities`: tenant-scoped select for authenticated, write gated to `has_role(auth.uid(), 'admin'|'manager'|'super_admin')`.
- Types regenerate after migration; picker components and hooks land after types refresh.
- Legacy `press`/`tool` text columns on `knowledge_fixes` and `fix_trials` remain — surfaces show FK name when present, fall back to legacy text.

## Out of scope
- Backfilling old free-text into FK rows (leave as legacy display).
- Machine detail dashboard beyond a simple linked list.
