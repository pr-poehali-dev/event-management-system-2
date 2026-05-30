import { UserRole, ROLE_LABELS } from "@/App";
import Icon from "@/components/ui/icon";

interface Props { role: UserRole }

const myEvents = [
  { name: "Городской форум предпринимателей", date: "15 июня 2025", status: "approved" },
  { name: "Конференция по цифровой экономике", date: "28 июня 2025", status: "pending" },
];

const statusCfg = {
  approved: { label: "Участвую", color: "bg-emerald-100 text-emerald-800" },
  pending: { label: "На рассмотрении", color: "bg-amber-100 text-amber-800" },
  rejected: { label: "Отклонено", color: "bg-red-100 text-red-800" },
};

const roleColors: Record<UserRole, string> = {
  guest: "bg-slate-100 text-slate-600",
  participant: "bg-blue-100 text-blue-800",
  volunteer: "bg-emerald-100 text-emerald-800",
  organizer: "bg-amber-100 text-amber-800",
  admin: "bg-red-100 text-red-800",
};

export default function ProfilePage({ role }: Props) {
  return (
    <div className="p-6 max-w-3xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="corporate-divider" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Личный кабинет</span>
        </div>
        <h1 className="section-title text-2xl">Профиль</h1>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-xl border border-border p-6 mb-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex items-start gap-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-800 text-white shrink-0"
            style={{ background: "hsl(var(--primary))" }}
          >
            АИ
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-1">
              <h2 className="text-lg font-800 text-foreground">Алексей Иванов</h2>
              <span className={`badge-status ${roleColors[role]}`}>{ROLE_LABELS[role]}</span>
            </div>
            <div className="text-sm text-muted-foreground mb-3">a.ivanov@corp.ru</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Организация:</span>
                <span className="ml-2 font-medium text-foreground">ООО «Горизонт»</span>
              </div>
              <div>
                <span className="text-muted-foreground">Телефон:</span>
                <span className="ml-2 font-medium text-foreground">+7 912 345-67-89</span>
              </div>
              <div>
                <span className="text-muted-foreground">Регистрация:</span>
                <span className="ml-2 font-medium text-foreground">14 января 2025</span>
              </div>
              <div>
                <span className="text-muted-foreground">Последний вход:</span>
                <span className="ml-2 font-medium text-foreground">30 мая 2025</span>
              </div>
            </div>
          </div>
          <button className="p-2 rounded-md border border-border text-muted-foreground hover:bg-muted transition-colors">
            <Icon name="Pencil" size={16} />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Мероприятий", value: role === "organizer" ? "12" : "4", icon: "Calendar" },
          { label: role === "organizer" ? "Заявок получено" : "Заявок подано", value: role === "organizer" ? "234" : "6", icon: "ClipboardList" },
          { label: "Статус верификации", value: "✓ Подтверждён", icon: "ShieldCheck" },
        ].map((s) => (
          <div key={s.label} className="stat-card flex items-center gap-3">
            <Icon name={s.icon} size={18} className="text-muted-foreground shrink-0" />
            <div>
              <div className="text-base font-800 text-foreground leading-none">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* My applications */}
      <div className="bg-white rounded-xl border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-700 text-sm text-foreground">
            {role === "organizer" ? "Мои мероприятия" : "Мои заявки"}
          </h2>
        </div>
        <div className="divide-y divide-border">
          {myEvents.map((ev) => (
            <div key={ev.name} className="px-5 py-3.5 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-foreground">{ev.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                  <Icon name="Calendar" size={11} />
                  {ev.date}
                </div>
              </div>
              <span className={`badge-status ${statusCfg[ev.status as keyof typeof statusCfg].color}`}>
                {statusCfg[ev.status as keyof typeof statusCfg].label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
          <Icon name="KeyRound" size={15} />
          Сменить пароль
        </button>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors">
          <Icon name="LogOut" size={15} />
          Выйти
        </button>
      </div>
    </div>
  );
}
