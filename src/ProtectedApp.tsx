import { Routes, Route } from "react-router-dom";
import { TenantProvider } from "@/contexts/TenantContext";
import { AppLayout } from "@/components/layout/AppLayout";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

// Knowledge Pages
import Knowledge from "./pages/knowledge/Knowledge";
import KnowledgeDocs from "./pages/knowledge/KnowledgeDocs";
import KnowledgeDefects from "./pages/knowledge/KnowledgeDefects";
import KnowledgeFixes from "./pages/knowledge/KnowledgeFixes";
import KnowledgeFixNew from "./pages/knowledge/KnowledgeFixNew";
import KnowledgeFixDetail from "./pages/knowledge/KnowledgeFixDetail";
import KnowledgeFixVerify from "./pages/knowledge/KnowledgeFixVerify";
import KnowledgeFixCommit from "./pages/knowledge/KnowledgeFixCommit";
import NavReport from "./pages/admin/NavReport";
import VerificationAudit from "./pages/admin/VerificationAudit";

// Process Tools
import ProcessTools from "./pages/process/ProcessTools";

// Messaging Pages
import ShiftTasks from "./pages/messaging/ShiftTasks";
import ShiftTaskNew from "./pages/messaging/ShiftTaskNew";
import ShiftTaskDetail from "./pages/messaging/ShiftTaskDetail";
import Conversations from "./pages/messaging/Conversations";
import ConversationNew from "./pages/messaging/ConversationNew";
import ConversationDetail from "./pages/messaging/ConversationDetail";
import Issues from "./pages/messaging/Issues";
import IssueDetail from "./pages/messaging/IssueDetail";
import IssueNew from "./pages/messaging/IssueNew";

// Admin Pages
import Users from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";
import Tenants from "./pages/admin/Tenants";
import TenantDetail from "./pages/admin/TenantDetail";

export default function ProtectedApp() {
  return (
    <TenantProvider>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />

        {/* Home Dashboard */}
        <Route path="/" element={<AppLayout><Home /></AppLayout>} />

        {/* Knowledge Routes */}
        <Route path="/knowledge" element={<AppLayout><Knowledge /></AppLayout>} />
        <Route path="/knowledge/docs" element={<AppLayout><KnowledgeDocs /></AppLayout>} />
        <Route path="/knowledge/docs/:id" element={<AppLayout><KnowledgeDocs /></AppLayout>} />
        <Route path="/knowledge/defects" element={<AppLayout><KnowledgeDefects /></AppLayout>} />
        <Route path="/knowledge/defects/:id" element={<AppLayout><KnowledgeDefects /></AppLayout>} />
        <Route path="/knowledge/fixes" element={<AppLayout><KnowledgeFixes /></AppLayout>} />
        <Route path="/knowledge/fixes/new" element={<AppLayout><KnowledgeFixNew /></AppLayout>} />
        <Route path="/knowledge/fixes/:id" element={<AppLayout><KnowledgeFixDetail /></AppLayout>} />
        <Route path="/knowledge/fixes/:id/verify" element={<AppLayout><KnowledgeFixVerify /></AppLayout>} />
        <Route path="/knowledge/fixes/:id/commit" element={<AppLayout><KnowledgeFixCommit /></AppLayout>} />

        {/* Process Tools */}
        <Route path="/process-tools" element={<AppLayout><ProcessTools /></AppLayout>} />

        {/* Messaging Routes */}
        <Route path="/shift-tasks" element={<AppLayout><ShiftTasks /></AppLayout>} />
        <Route path="/shift-tasks/new" element={<AppLayout><ShiftTaskNew /></AppLayout>} />
        <Route path="/shift-tasks/:id" element={<AppLayout><ShiftTaskDetail /></AppLayout>} />
        <Route path="/conversations" element={<AppLayout><Conversations /></AppLayout>} />
        <Route path="/conversations/new" element={<AppLayout><ConversationNew /></AppLayout>} />
        <Route path="/conversations/:id" element={<AppLayout><ConversationDetail /></AppLayout>} />
        <Route path="/issues" element={<AppLayout><Issues /></AppLayout>} />
        <Route path="/issues/new" element={<AppLayout><IssueNew /></AppLayout>} />
        <Route path="/issues/:id" element={<AppLayout><IssueDetail /></AppLayout>} />

        {/* Admin Routes */}
        <Route path="/users" element={<AppLayout><RoleGuard allowedRoles={['admin','super_admin']}><Users /></RoleGuard></AppLayout>} />
        <Route path="/settings" element={<AppLayout><RoleGuard allowedRoles={['admin','super_admin']}><Settings /></RoleGuard></AppLayout>} />
        <Route path="/nav-report" element={<AppLayout><RoleGuard allowedRoles={['admin','super_admin']}><NavReport /></RoleGuard></AppLayout>} />
        <Route path="/verification-audit" element={<AppLayout><RoleGuard allowedRoles={['admin','super_admin']}><VerificationAudit /></RoleGuard></AppLayout>} />

        {/* Super Admin Routes */}
        <Route path="/tenants" element={<AppLayout><RoleGuard allowedRoles={['admin','super_admin']}><Tenants /></RoleGuard></AppLayout>} />
        <Route path="/tenants/:id" element={<AppLayout><RoleGuard allowedRoles={['admin','super_admin']}><TenantDetail /></RoleGuard></AppLayout>} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TenantProvider>
  );
}
