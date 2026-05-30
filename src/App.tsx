import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Icon from "@/components/ui/icon";
import HomePage from "@/pages/HomePage";
import EventsPage from "@/pages/EventsPage";
import ApplicationsPage from "@/pages/ApplicationsPage";
import VolunteersPage from "@/pages/VolunteersPage";
import AdminPage from "@/pages/AdminPage";
import ProfilePage from "@/pages/ProfilePage";
import ReportsPage from "@/pages/ReportsPage";

type Page = "home" | "events" | "applications" | "volunteers" | "admin" | "profile" | "reports";
export type UserRole = "guest" | "participant" | "volunteer" | "organizer" | "admin";

export const ROLE_LABELS: Record<UserRole, string> = {
  guest: "Гость",
  participant: "Участник",
  volunteer: "Волонтёр",
  organizer: "Организатор",
  admin: "Администратор",
};

const ROLE_COLORS: Record<UserRole, string> = {
  guest: "bg-slate-100 text-slate-600",
  participant: "bg-blue-100 text-blue-800",
  volunteer: "bg-emerald-100 text-emerald-800",
  organizer: "bg-amber-100 text-amber-800",
  admin: "bg-red-100 text-red-800",
};

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "LayoutDashboard" },
  { id: "events", label: "Мероприятия", icon: "Calendar" },
  { id: "applications", label: "Заявки", icon: "ClipboardList" },
  { id: "volunteers", label: "Волонтёры", icon: "Users" },
  { id: "reports", label: "Отчёты", icon: "BarChart3" },
  { id: "admin", label: "Администрирование", icon: "Settings2" },
];

const PAGE_COMPONENTS: Record<Page, React.ComponentType<{ role: UserRole }>> = {
  home: HomePage,
  events: EventsPage,
  applications: ApplicationsPage,
  volunteers: VolunteersPage,
  admin: AdminPage,
  profile: ProfilePage,
  reports: ReportsPage,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentRole, setCurrentRole] = useState<UserRole>("organizer");
  const [collapsed, setCollapsed] = useState(false);

  const PageComponent = PAGE_COMPONENTS[currentPage];

  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex h-screen bg-background font-golos overflow-hidden">
        {/* ── Sidebar ── */}
        <aside
          className="flex flex-col shrink-0 transition-all duration-300"
          style={{
            width: collapsed ? 64 : 240,
            background: "hsl(var(--sidebar-background))",
            borderRight: "1px solid hsl(var(--sidebar-border))",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}>
            <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: "hsl(var(--sidebar-primary))" }}>
              <Icon name="Zap" size={15} className="text-white" />
            </div>
            {!collapsed && (
              <div className="overflow-hidden animate-fade-in">
                <div className="text-white font-800 text-sm leading-tight tracking-tight">EventCore</div>
                <div className="text-xs mt-0.5" style={{ color: "hsl(var(--sidebar-foreground) / 0.55)" }}>Управление событиями</div>
              </div>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  title={collapsed ? item.label : undefined}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150"
                  style={{
                    background: active ? "hsl(var(--sidebar-primary))" : "transparent",
                    color: active ? "#fff" : "hsl(var(--sidebar-foreground))",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "hsl(var(--sidebar-accent))";
                      e.currentTarget.style.color = "hsl(var(--sidebar-accent-foreground))";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "hsl(var(--sidebar-foreground))";
                    }
                  }}
                >
                  <Icon name={item.icon} size={18} className="shrink-0" />
                  {!collapsed && <span className="truncate animate-fade-in">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Profile */}
          <div className="p-2" style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}>
            <button
              onClick={() => setCurrentPage("profile")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all duration-150"
              style={{
                background: currentPage === "profile" ? "hsl(var(--sidebar-primary))" : "transparent",
                color: "hsl(var(--sidebar-foreground))",
              }}
              onMouseEnter={(e) => {
                if (currentPage !== "profile") {
                  e.currentTarget.style.background = "hsl(var(--sidebar-accent))";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== "profile") e.currentTarget.style.background = "transparent";
              }}
            >
              <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white text-xs font-700" style={{ background: "hsl(var(--sidebar-primary))" }}>
                АИ
              </div>
              {!collapsed && (
                <div className="animate-fade-in text-left overflow-hidden">
                  <div className="text-sm font-medium text-white truncate leading-tight">Алексей И.</div>
                  <div className="text-xs truncate" style={{ color: "hsl(var(--sidebar-foreground) / 0.55)" }}>{ROLE_LABELS[currentRole]}</div>
                </div>
              )}
            </button>
          </div>

          {/* Collapse toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center py-3 transition-colors"
            style={{
              borderTop: "1px solid hsl(var(--sidebar-border))",
              color: "hsl(var(--sidebar-foreground) / 0.4)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "hsl(var(--sidebar-foreground))")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "hsl(var(--sidebar-foreground) / 0.4)")}
          >
            <Icon name={collapsed ? "ChevronRight" : "ChevronLeft"} size={15} />
          </button>
        </aside>

        {/* ── Main ── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          <header
            className="flex items-center justify-between px-6 py-3 shrink-0"
            style={{
              background: "#fff",
              borderBottom: "1px solid hsl(var(--border))",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider mr-1">Просмотр как:</span>
              <div className="flex gap-1">
                {(["guest", "participant", "volunteer", "organizer", "admin"] as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => setCurrentRole(role)}
                    className={`badge-status text-xs cursor-pointer transition-all duration-150 ${
                      currentRole === role
                        ? ROLE_COLORS[role] + " ring-1 ring-inset ring-current font-600"
                        : "bg-muted text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {ROLE_LABELS[role]}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Icon name="Bell" size={17} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <Icon name="HelpCircle" size={17} />
              </button>
            </div>
          </header>

          {/* Page */}
          <main className="flex-1 overflow-y-auto">
            <PageComponent role={currentRole} />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
