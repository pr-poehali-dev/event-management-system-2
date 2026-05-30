import { PageProps } from "@/App";
import Icon from "@/components/ui/icon";

const stats = [
  { label: "Мероприятий", value: "24", change: "+3 за месяц", icon: "Calendar", color: "hsl(var(--accent))" },
  { label: "Заявок на модерации", value: "18", change: "Требуют внимания", icon: "ClipboardList", color: "#f59e0b" },
  { label: "Активных волонтёров", value: "142", change: "+12 за неделю", icon: "Users", color: "#10b981" },
  { label: "Участников", value: "1 248", change: "За всё время", icon: "UserCheck", color: "#8b5cf6" },
];

const sections = [
  {
    id: "events" as const,
    icon: "Calendar",
    label: "Мероприятия",
    desc: "Реестр всех событий, управление статусами и доступом",
    color: "hsl(var(--accent))",
    bg: "hsl(var(--accent) / 0.07)",
    badge: "24 активных",
  },
  {
    id: "applications" as const,
    icon: "ClipboardList",
    label: "Заявки",
    desc: "Приём, модерация и обработка заявок участников",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.07)",
    badge: "18 на проверке",
  },
  {
    id: "volunteers" as const,
    icon: "Users",
    label: "Волонтёры",
    desc: "Команда, назначение задач и контроль выполнения",
    color: "#10b981",
    bg: "rgba(16,185,129,0.07)",
    badge: "142 участника",
  },
  {
    id: "reports" as const,
    icon: "BarChart3",
    label: "Отчёты",
    desc: "Аналитика, статистика и выгрузка данных",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.07)",
    badge: "5 отчётов",
  },
  {
    id: "admin" as const,
    icon: "Settings2",
    label: "Администрирование",
    desc: "Пользователи, роли, категории и параметры системы",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.07)",
    badge: "Системные настройки",
  },
  {
    id: "profile" as const,
    icon: "UserCog",
    label: "Личный кабинет",
    desc: "Профиль, верификация, история активности",
    color: "hsl(var(--primary))",
    bg: "hsl(var(--primary) / 0.07)",
    badge: "Алексей И.",
  },
];

const recentEvents = [
  { name: "Городской форум предпринимателей", date: "15 июня 2025", status: "active", apps: 87, capacity: 150, sensitive: false },
  { name: "Закрытое совещание регионального штаба", date: "20 июня 2025", status: "moderation", apps: 34, capacity: 50, sensitive: true },
  { name: "Конференция по цифровой экономике", date: "28 июня 2025", status: "draft", apps: 0, capacity: 200, sensitive: false },
  { name: "Выездной семинар руководителей", date: "5 июля 2025", status: "moderation", apps: 12, capacity: 30, sensitive: true },
];

const statusConfig = {
  active: { label: "Активно", color: "bg-emerald-100 text-emerald-800" },
  moderation: { label: "Модерация", color: "bg-amber-100 text-amber-800" },
  draft: { label: "Черновик", color: "bg-slate-100 text-slate-600" },
  closed: { label: "Завершено", color: "bg-blue-100 text-blue-700" },
};

const roleMessages: Record<string, { title: string; sub: string }> = {
  guest: { title: "Добро пожаловать в EventCore", sub: "Зарегистрируйтесь, чтобы подавать заявки и участвовать в мероприятиях" },
  participant: { title: "Личный кабинет участника", sub: "Следите за статусом своих заявок и предстоящими мероприятиями" },
  volunteer: { title: "Панель волонтёра", sub: "Просматривайте назначенные задачи и мероприятия вашей команды" },
  organizer: { title: "Панель организатора", sub: "Управляйте мероприятиями, заявками и командой волонтёров" },
  admin: { title: "Административная панель", sub: "Полный доступ ко всем данным и функциям платформы" },
};

export default function HomePage({ role, navigate }: PageProps) {
  const msg = roleMessages[role];
  const canSeeStats = role === "organizer" || role === "admin";

  return (
    <div className="animate-slide-up">
      {/* ── Hero banner ── */}
      <div
        className="px-8 py-10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(218 72% 28%) 60%, hsl(213 85% 38%) 100%)",
        }}
      >
        {/* geometric accent */}
        <div
          className="absolute right-0 top-0 w-64 h-full opacity-10"
          style={{
            background: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 20px)",
          }}
        />
        <div className="absolute bottom-0 right-16 w-32 h-32 rounded-full opacity-5" style={{ background: "#fff", transform: "translate(30%, 40%)" }} />

        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-5 rounded-full bg-white opacity-60" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/60">EventCore Platform</span>
          </div>
          <h1 className="text-2xl font-800 text-white tracking-tight mb-1">{msg.title}</h1>
          <p className="text-sm text-white/70 max-w-xl">{msg.sub}</p>

          {role === "guest" && (
            <div className="flex gap-3 mt-5">
              <button
                className="px-5 py-2.5 text-sm font-medium rounded-md text-white transition-all hover:opacity-90"
                style={{ background: "hsl(var(--sidebar-primary))" }}
              >
                Зарегистрироваться
              </button>
              <button
                className="px-5 py-2.5 text-sm font-medium rounded-md transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.3)", color: "#fff" }}
              >
                Войти в систему
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* ── Stats (for organizer/admin) ── */}
        {canSeeStats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((s) => (
              <div key={s.label} className="stat-card group cursor-default">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: s.color + "18" }}>
                    <Icon name={s.icon} size={18} style={{ color: s.color }} />
                  </div>
                  <Icon name="TrendingUp" size={13} className="text-muted-foreground/40" />
                </div>
                <div className="text-2xl font-800 text-foreground leading-none mb-1">{s.value}</div>
                <div className="text-sm font-medium text-foreground/80">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.change}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Section navigation cards ── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="corporate-divider" />
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Разделы платформы</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(s.id)}
                className="group text-left p-4 bg-white rounded-lg border border-border transition-all duration-150 hover:-translate-y-0.5"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.09)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                    <Icon name={s.icon} size={20} style={{ color: s.color }} />
                  </div>
                  <Icon name="ArrowRight" size={15} className="text-muted-foreground/40 group-hover:text-muted-foreground mt-1 transition-colors" />
                </div>
                <div className="text-sm font-700 text-foreground mb-1">{s.label}</div>
                <div className="text-xs text-muted-foreground leading-relaxed mb-3">{s.desc}</div>
                <div
                  className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ background: s.bg, color: s.color }}
                >
                  {s.badge}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Bottom: recent events + actions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent events */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <h2 className="font-700 text-sm text-foreground">Ближайшие мероприятия</h2>
                <button
                  onClick={() => navigate("events")}
                  className="text-xs font-medium transition-colors"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  Все мероприятия →
                </button>
              </div>
              <div className="divide-y divide-border">
                {recentEvents.map((ev) => (
                  <div
                    key={ev.name}
                    className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer"
                    onClick={() => navigate("events")}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-medium text-foreground truncate">{ev.name}</span>
                        {ev.sensitive && (
                          <span className="badge-status bg-red-50 text-red-600 shrink-0">
                            <Icon name="Shield" size={10} />
                            ограниченное
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Icon name="Calendar" size={11} />{ev.date}</span>
                        <span className="flex items-center gap-1"><Icon name="Users" size={11} />{ev.apps}/{ev.capacity}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${Math.min(100, (ev.apps / ev.capacity) * 100)}%`,
                            background: ev.apps / ev.capacity > 0.8 ? "#ef4444" : "hsl(var(--accent))",
                          }}
                        />
                      </div>
                      <span className={`badge-status ${statusConfig[ev.status as keyof typeof statusConfig].color}`}>
                        {statusConfig[ev.status as keyof typeof statusConfig].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Quick actions for organizer/admin */}
            {(role === "organizer" || role === "admin") && (
              <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <h2 className="font-700 text-sm text-foreground mb-3">Быстрые действия</h2>
                <div className="space-y-2">
                  {[
                    { icon: "Plus", label: "Создать мероприятие", page: "events" as const, accent: true },
                    { icon: "ClipboardCheck", label: "Проверить заявки", page: "applications" as const },
                    { icon: "UserPlus", label: "Назначить волонтёра", page: "volunteers" as const },
                    { icon: "FileDown", label: "Выгрузить отчёт", page: "reports" as const },
                  ].map((a) => (
                    <button
                      key={a.label}
                      onClick={() => navigate(a.page)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150"
                      style={a.accent ? {
                        background: "hsl(var(--primary))",
                        color: "hsl(var(--primary-foreground))",
                      } : {
                        background: "hsl(var(--muted))",
                        color: "hsl(var(--foreground))",
                      }}
                      onMouseEnter={(e) => {
                        if (!a.accent) e.currentTarget.style.background = "hsl(var(--secondary))";
                      }}
                      onMouseLeave={(e) => {
                        if (!a.accent) e.currentTarget.style.background = "hsl(var(--muted))";
                      }}
                    >
                      <Icon name={a.icon} size={15} />
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Moderation alert */}
            {(role === "organizer" || role === "admin") && (
              <div
                className="rounded-lg border p-4 cursor-pointer hover:shadow-sm transition-shadow"
                style={{ background: "#fffbeb", borderColor: "#fde68a" }}
                onClick={() => navigate("applications")}
              >
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: "#fef3c7" }}>
                    <Icon name="AlertTriangle" size={15} className="text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-700 text-amber-900">Требуется модерация</div>
                    <div className="text-xs text-amber-700 mt-0.5">18 заявок ожидают предварительной проверки</div>
                    <span className="text-xs font-medium text-amber-800 mt-2 block hover:underline">Перейти к заявкам →</span>
                  </div>
                </div>
              </div>
            )}

            {/* Volunteer tasks */}
            {role === "volunteer" && (
              <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <h2 className="font-700 text-sm text-foreground mb-3">Мои задачи</h2>
                <div className="space-y-2">
                  {[
                    { task: "Регистрация участников", event: "Городской форум", status: "progress" },
                    { task: "Контроль доступа в зону B", event: "Совещание штаба", status: "assigned" },
                  ].map((t) => (
                    <div key={t.task} className="p-2.5 rounded-md bg-muted/50 cursor-pointer hover:bg-muted transition-colors" onClick={() => navigate("volunteers")}>
                      <div className="text-xs font-medium text-foreground">{t.task}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{t.event}</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate("volunteers")} className="text-xs font-medium mt-3 transition-colors" style={{ color: "hsl(var(--accent))" }}>
                  Все задачи →
                </button>
              </div>
            )}

            {/* Participant apps */}
            {role === "participant" && (
              <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <h2 className="font-700 text-sm text-foreground mb-3">Мои заявки</h2>
                <div className="space-y-2">
                  {[
                    { name: "Городской форум", status: "approved", color: "bg-emerald-100 text-emerald-800" },
                    { name: "Конференция ЦЭ", status: "На рассмотрении", color: "bg-amber-100 text-amber-800" },
                  ].map((a) => (
                    <div key={a.name} className="flex items-center justify-between p-2.5 rounded-md bg-muted/50 cursor-pointer hover:bg-muted transition-colors" onClick={() => navigate("applications")}>
                      <span className="text-xs font-medium text-foreground truncate">{a.name}</span>
                      <span className={`badge-status ${a.color} ml-2 shrink-0`}>{a.status}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => navigate("applications")} className="text-xs font-medium mt-3 transition-colors" style={{ color: "hsl(var(--accent))" }}>
                  Все заявки →
                </button>
              </div>
            )}

            {/* Guest CTA */}
            {role === "guest" && (
              <div className="bg-white rounded-lg border border-border p-5 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "hsl(var(--primary) / 0.08)" }}>
                  <Icon name="LogIn" size={22} style={{ color: "hsl(var(--primary))" }} />
                </div>
                <div className="text-sm font-700 text-foreground mb-1">Войдите в систему</div>
                <div className="text-xs text-muted-foreground">Для подачи заявок необходима регистрация</div>
                <button className="mt-3 w-full py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
                  Зарегистрироваться
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
