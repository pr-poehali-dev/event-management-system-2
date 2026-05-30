import { UserRole } from "@/App";
import Icon from "@/components/ui/icon";

interface Props { role: UserRole }

const stats = [
  { label: "Мероприятий", value: "24", change: "+3 за месяц", icon: "Calendar", color: "hsl(var(--accent))" },
  { label: "Заявок на модерации", value: "18", change: "Требуют внимания", icon: "ClipboardList", color: "#f59e0b" },
  { label: "Активных волонтёров", value: "142", change: "+12 за неделю", icon: "Users", color: "#10b981" },
  { label: "Участников", value: "1 248", change: "За все время", icon: "UserCheck", color: "#8b5cf6" },
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

export default function HomePage({ role }: Props) {
  return (
    <div className="p-6 max-w-6xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="corporate-divider" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Панель управления</span>
        </div>
        <h1 className="section-title text-2xl">Обзор платформы</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {role === "admin" && "Полный доступ ко всем данным и функциям системы"}
          {role === "organizer" && "Управление вашими мероприятиями и заявками участников"}
          {role === "volunteer" && "Ваши задачи и назначения на мероприятия"}
          {role === "participant" && "Ваши заявки и предстоящие мероприятия"}
          {role === "guest" && "Добро пожаловать! Зарегистрируйтесь для подачи заявок"}
        </p>
      </div>

      {/* Stats grid */}
      {(role === "admin" || role === "organizer") && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: s.color + "18" }}>
                  <Icon name={s.icon} size={18} style={{ color: s.color }} />
                </div>
              </div>
              <div className="text-2xl font-800 text-foreground leading-none mb-1">{s.value}</div>
              <div className="text-sm font-medium text-foreground/80">{s.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.change}</div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent events */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <h2 className="font-700 text-sm text-foreground">Ближайшие мероприятия</h2>
              <button className="text-xs text-accent font-medium hover:underline">Все мероприятия →</button>
            </div>
            <div className="divide-y divide-border">
              {recentEvents.map((ev) => (
                <div key={ev.name} className="px-5 py-3.5 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground truncate">{ev.name}</span>
                      {ev.sensitive && (
                        <span className="badge-status bg-red-50 text-red-600 shrink-0">
                          <Icon name="Shield" size={10} />
                          ограниченный
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={11} />
                        {ev.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Users" size={11} />
                        {ev.apps}/{ev.capacity}
                      </span>
                    </div>
                  </div>
                  <span className={`badge-status shrink-0 ${statusConfig[ev.status as keyof typeof statusConfig].color}`}>
                    {statusConfig[ev.status as keyof typeof statusConfig].label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Quick actions */}
          {(role === "organizer" || role === "admin") && (
            <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h2 className="font-700 text-sm text-foreground mb-3">Быстрые действия</h2>
              <div className="space-y-2">
                {[
                  { icon: "Plus", label: "Создать мероприятие", accent: true },
                  { icon: "ClipboardCheck", label: "Проверить заявки" },
                  { icon: "UserPlus", label: "Назначить волонтёра" },
                  { icon: "FileDown", label: "Выгрузить отчёт" },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-sm font-medium transition-all duration-150"
                    style={a.accent ? {
                      background: "hsl(var(--primary))",
                      color: "hsl(var(--primary-foreground))",
                    } : {
                      background: "hsl(var(--muted))",
                      color: "hsl(var(--foreground))",
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
              className="rounded-lg border p-4"
              style={{ background: "#fffbeb", borderColor: "#fde68a" }}
            >
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: "#fef3c7" }}>
                  <Icon name="AlertTriangle" size={15} className="text-amber-600" />
                </div>
                <div>
                  <div className="text-sm font-700 text-amber-900">Требуется модерация</div>
                  <div className="text-xs text-amber-700 mt-0.5">18 заявок ожидают предварительной проверки перед допуском участников</div>
                  <button className="text-xs font-medium text-amber-800 mt-2 hover:underline">Перейти к заявкам →</button>
                </div>
              </div>
            </div>
          )}

          {/* Participant notice */}
          {role === "guest" && (
            <div className="bg-white rounded-lg border border-border p-5 text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: "hsl(var(--primary) / 0.08)" }}>
                <Icon name="LogIn" size={22} style={{ color: "hsl(var(--primary))" }} />
              </div>
              <div className="text-sm font-700 text-foreground mb-1">Войдите в систему</div>
              <div className="text-xs text-muted-foreground">Для подачи заявок и участия в мероприятиях необходима регистрация</div>
              <button
                className="mt-3 w-full py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
                style={{ background: "hsl(var(--primary))" }}
              >
                Зарегистрироваться
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
