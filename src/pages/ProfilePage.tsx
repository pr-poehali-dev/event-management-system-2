import { useState } from "react";
import { PageProps, ROLE_LABELS, UserRole } from "@/App";
import Icon from "@/components/ui/icon";

const roleColors: Record<UserRole, string> = {
  guest: "bg-slate-100 text-slate-600",
  participant: "bg-blue-100 text-blue-800",
  volunteer: "bg-emerald-100 text-emerald-800",
  organizer: "bg-amber-100 text-amber-800",
  admin: "bg-red-100 text-red-800",
};

const users = [
  { id: 1, name: "Адаменко Кирилл", email: "k.adamenko@corp.ru", role: "admin" as UserRole, status: "active", lastLogin: "30.05.2025" },
  { id: 2, name: "Мария Смирнова", email: "m.smirnova@corp.ru", role: "admin" as UserRole, status: "active", lastLogin: "29.05.2025" },
  { id: 3, name: "Дмитрий Козлов", email: "d.kozlov@corp.ru", role: "participant" as UserRole, status: "active", lastLogin: "28.05.2025" },
  { id: 4, name: "Елена Новикова", email: "e.novikova@corp.ru", role: "volunteer" as UserRole, status: "active", lastLogin: "27.05.2025" },
  { id: 5, name: "Андрей Морозов", email: "a.morozov@corp.ru", role: "participant" as UserRole, status: "blocked", lastLogin: "10.04.2025" },
  { id: 6, name: "Ольга Петрова", email: "o.petrova@corp.ru", role: "organizer" as UserRole, status: "active", lastLogin: "30.05.2025" },
];

const myEventHistory = [
  { name: "Городской форум предпринимателей", date: "15 июня 2025", status: "approved" },
  { name: "Конференция по цифровой экономике", date: "28 июня 2025", status: "pending" },
  { name: "Семинар по управлению проектами", date: "10 апреля 2025", status: "approved" },
];

const statusCfg = {
  approved: { label: "Участвую", color: "bg-emerald-100 text-emerald-800" },
  pending: { label: "На рассмотрении", color: "bg-amber-100 text-amber-800" },
  rejected: { label: "Отклонено", color: "bg-red-100 text-red-800" },
};

const systemLogs = [
  { time: "30.05.2025 14:22", action: "Создано мероприятие «Городской форум»", user: "Адаменко К.М." },
  { time: "30.05.2025 12:05", action: "Одобрена заявка участника #87", user: "Адаменко К.М." },
  { time: "29.05.2025 18:40", action: "Добавлен волонтёр Захаров К.А.", user: "Мария С." },
  { time: "29.05.2025 11:15", action: "Изменён статус мероприятия на «Модерация»", user: "Адаменко К.М." },
  { time: "28.05.2025 16:00", action: "Выгружен отчёт за май 2025", user: "Ольга П." },
];

export default function ProfilePage({ role, navigate }: PageProps) {
  const [tab, setTab] = useState<"profile" | "users" | "logs" | "security">("profile");

  const tabs = [
    { id: "profile" as const, label: "Профиль", icon: "User" },
    ...(role === "admin" ? [
      { id: "users" as const, label: "Пользователи", icon: "Users" },
      { id: "logs" as const, label: "Журнал действий", icon: "ScrollText" },
    ] : []),
    { id: "security" as const, label: "Безопасность", icon: "ShieldCheck" },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="corporate-divider" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            {role === "admin" ? "Административная панель" : "Личный кабинет"}
          </span>
        </div>
        <h1 className="section-title text-2xl">
          {role === "admin" ? "Панель управления профилем" : "Профиль"}
        </h1>
      </div>

      <div className="flex gap-6">
        {/* Sidebar tabs */}
        <div className="shrink-0 w-48">
          <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-medium transition-all duration-150 text-left border-b border-border last:border-0"
                style={{
                  background: tab === t.id ? "hsl(var(--primary))" : "transparent",
                  color: tab === t.id ? "#fff" : "hsl(var(--foreground))",
                }}
                onMouseEnter={(e) => {
                  if (tab !== t.id) e.currentTarget.style.background = "hsl(var(--muted))";
                }}
                onMouseLeave={(e) => {
                  if (tab !== t.id) e.currentTarget.style.background = "transparent";
                }}
              >
                <Icon name={t.icon} size={15} className="shrink-0" />
                {t.label}
              </button>
            ))}
          </div>

          {/* Role badge */}
          <div className="mt-3 p-3 bg-white rounded-lg border border-border text-center" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-700 text-white mx-auto mb-2" style={{ background: "hsl(var(--primary))" }}>
              АКМ
            </div>
            <div className="text-xs font-700 text-foreground">Адаменко Кирилл Максимович</div>
            <div className="mt-1.5">
              <span className={`badge-status ${roleColors[role]}`}>{ROLE_LABELS[role]}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* ── Profile tab ── */}
          {tab === "profile" && (
            <div className="space-y-4">
              {/* Info card */}
              <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-700 text-sm text-foreground">Личные данные</h2>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-border text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">
                    <Icon name="Pencil" size={13} />
                    Редактировать
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                  {[
                    { label: "Фамилия Имя Отчество", value: "Адаменко Кирилл Максимович" },
                    { label: "Email", value: "k.adamenko@corp.ru" },
                    { label: "Телефон", value: "+7 912 345-67-89" },
                    { label: "Организация", value: "Администрация ЗО" },
                    { label: "Должность", value: "Администратор платформы" },
                    { label: "Дата регистрации", value: "14 января 2025" },
                  ].map((f) => (
                    <div key={f.label}>
                      <div className="text-xs text-muted-foreground mb-0.5">{f.label}</div>
                      <div className="font-medium text-foreground">{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: role === "organizer" ? "Создано мероприятий" : "Мероприятий", value: role === "organizer" ? "12" : "4", icon: "Calendar", color: "hsl(var(--accent))" },
                  { label: role === "organizer" ? "Заявок получено" : "Заявок подано", value: role === "organizer" ? "234" : "6", icon: "ClipboardList", color: "#f59e0b" },
                  { label: "Верификация", value: "✓", icon: "ShieldCheck", color: "#10b981" },
                ].map((s) => (
                  <div key={s.label} className="stat-card flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ background: s.color + "18" }}>
                      <Icon name={s.icon} size={17} style={{ color: s.color }} />
                    </div>
                    <div>
                      <div className="text-lg font-800 text-foreground leading-none">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* My events */}
              <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
                  <h2 className="font-700 text-sm text-foreground">
                    {role === "organizer" ? "Мои мероприятия" : "История заявок"}
                  </h2>
                  <button onClick={() => navigate(role === "organizer" ? "events" : "applications")} className="text-xs font-medium" style={{ color: "hsl(var(--accent))" }}>
                    Открыть раздел →
                  </button>
                </div>
                <div className="divide-y divide-border">
                  {myEventHistory.map((ev) => (
                    <div key={ev.name} className="px-5 py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-foreground">{ev.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Icon name="Calendar" size={11} />{ev.date}
                        </div>
                      </div>
                      <span className={`badge-status ${statusCfg[ev.status as keyof typeof statusCfg].color}`}>
                        {statusCfg[ev.status as keyof typeof statusCfg].label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Users tab (admin only) ── */}
          {tab === "users" && role === "admin" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">Всего: <span className="font-medium text-foreground">{users.length}</span></div>
                <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
                  <Icon name="UserPlus" size={15} />
                  Добавить пользователя
                </button>
              </div>
              <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/30">
                      <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Пользователь</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Роль</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Статус</th>
                      <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Вход</th>
                      <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 text-white shrink-0" style={{ background: "hsl(var(--primary))" }}>
                              {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm">{u.name}</div>
                              <div className="text-xs text-muted-foreground">{u.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`badge-status ${roleColors[u.role]}`}>{ROLE_LABELS[u.role]}</span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className={`badge-status ${u.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                            {u.status === "active" ? "Активен" : "Заблокирован"}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-muted-foreground">{u.lastLogin}</td>
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                              <Icon name="Pencil" size={13} />
                            </button>
                            <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-red-600">
                              <Icon name="Ban" size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Logs tab (admin only) ── */}
          {tab === "logs" && role === "admin" && (
            <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="px-5 py-4 border-b border-border flex items-center justify-between">
                <h2 className="font-700 text-sm text-foreground">Журнал системных действий</h2>
                <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors">
                  <Icon name="Download" size={13} />
                  Экспорт
                </button>
              </div>
              <div className="divide-y divide-border">
                {systemLogs.map((log, i) => (
                  <div key={i} className="px-5 py-3.5 flex items-start gap-4 hover:bg-muted/20 transition-colors">
                    <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5" style={{ background: "hsl(var(--muted))" }}>
                      <Icon name="Activity" size={13} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground">{log.action}</div>
                      <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Icon name="User" size={11} />{log.user}</span>
                        <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{log.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Security tab ── */}
          {tab === "security" && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <h2 className="font-700 text-sm text-foreground mb-4">Безопасность аккаунта</h2>
                <div className="space-y-3">
                  {[
                    { icon: "KeyRound", label: "Изменить пароль", desc: "Последнее изменение: 3 месяца назад", action: "Изменить", variant: "primary" },
                    { icon: "Smartphone", label: "Двухфакторная аутентификация", desc: "Статус: не подключена", action: "Подключить", variant: "outline" },
                    { icon: "Bell", label: "Уведомления о входе", desc: "Получать email при новых входах", action: "Настроить", variant: "outline" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                      <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0" style={{ background: "hsl(var(--muted))" }}>
                        <Icon name={item.icon} size={17} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-700 text-foreground">{item.label}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                      </div>
                      <button
                        className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                        style={item.variant === "primary" ? {
                          background: "hsl(var(--primary))",
                          color: "#fff",
                        } : {
                          border: "1px solid hsl(var(--border))",
                          color: "hsl(var(--foreground))",
                        }}
                      >
                        {item.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sessions */}
              <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <h2 className="font-700 text-sm text-foreground mb-4">Активные сессии</h2>
                <div className="space-y-2">
                  {[
                    { device: "Chrome / Windows 10", ip: "192.168.1.15", time: "Сейчас", current: true },
                    { device: "Safari / iPhone 14", ip: "10.0.0.24", time: "2 часа назад", current: false },
                  ].map((s) => (
                    <div key={s.device} className="flex items-center justify-between p-3 rounded-md bg-muted/40">
                      <div className="flex items-center gap-3">
                        <Icon name="Monitor" size={16} className="text-muted-foreground" />
                        <div>
                          <div className="text-sm font-medium text-foreground flex items-center gap-2">
                            {s.device}
                            {s.current && <span className="badge-status bg-emerald-100 text-emerald-800 text-xs">Текущая</span>}
                          </div>
                          <div className="text-xs text-muted-foreground">{s.ip} · {s.time}</div>
                        </div>
                      </div>
                      {!s.current && (
                        <button className="text-xs text-red-600 hover:underline">Завершить</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors">
                <Icon name="LogOut" size={15} />
                Выйти из системы
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}