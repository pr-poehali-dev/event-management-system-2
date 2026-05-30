import { useState } from "react";
import { UserRole } from "@/App";
import Icon from "@/components/ui/icon";

interface Props { role: UserRole }

const applications = [
  { id: 1, applicant: "Иванов Сергей Петрович", event: "Городской форум предпринимателей", date: "02.06.2025", status: "pending", org: "ООО «Горизонт»", phone: "+7 912 345-67-89", comment: "" },
  { id: 2, applicant: "Смирнова Анна Владимировна", event: "Закрытое совещание регионального штаба", date: "03.06.2025", status: "review", org: "Администрация района", phone: "+7 913 456-78-90", comment: "Требует проверки полномочий" },
  { id: 3, applicant: "Козлов Дмитрий Александрович", event: "Городской форум предпринимателей", date: "04.06.2025", status: "approved", org: "ИП Козлов Д.А.", phone: "+7 914 567-89-01", comment: "" },
  { id: 4, applicant: "Новикова Елена Игоревна", event: "Выездной семинар руководителей", date: "05.06.2025", status: "review", org: "Департамент экономики", phone: "+7 915 678-90-12", comment: "Необходима верификация должности" },
  { id: 5, applicant: "Морозов Алексей Николаевич", event: "Городской форум предпринимателей", date: "06.06.2025", status: "rejected", org: "ЗАО «Промтех»", phone: "+7 916 789-01-23", comment: "Не прошёл предварительную проверку" },
  { id: 6, applicant: "Петрова Ольга Сергеевна", event: "Конференция по цифровой экономике", date: "07.06.2025", status: "pending", org: "ФГБОУ ВО «ГУ»", phone: "+7 917 890-12-34", comment: "" },
  { id: 7, applicant: "Соколов Иван Васильевич", event: "Закрытое совещание регионального штаба", date: "08.06.2025", status: "approved", org: "Правительство области", phone: "+7 918 901-23-45", comment: "Статус подтверждён" },
  { id: 8, applicant: "Федорова Мария Дмитриевна", event: "Выездной семинар руководителей", date: "09.06.2025", status: "pending", org: "Министерство образования", phone: "+7 919 012-34-56", comment: "" },
];

const statusConfig = {
  pending: { label: "Новая", color: "bg-blue-100 text-blue-800", icon: "Clock" },
  review: { label: "На модерации", color: "bg-amber-100 text-amber-800", icon: "Eye" },
  approved: { label: "Одобрена", color: "bg-emerald-100 text-emerald-800", icon: "CheckCircle" },
  rejected: { label: "Отклонена", color: "bg-red-100 text-red-800", icon: "XCircle" },
};

export default function ApplicationsPage({ role }: Props) {
  const [statusFilter, setStatusFilter] = useState<"all" | keyof typeof statusConfig>("all");
  const [selected, setSelected] = useState<(typeof applications)[0] | null>(null);

  const canModerate = role === "organizer" || role === "admin";

  const myApps = role === "participant"
    ? applications.filter((_, i) => i < 3)
    : applications;

  const filtered = myApps.filter((a) => statusFilter === "all" || a.status === statusFilter);

  const counts = {
    all: myApps.length,
    pending: myApps.filter((a) => a.status === "pending").length,
    review: myApps.filter((a) => a.status === "review").length,
    approved: myApps.filter((a) => a.status === "approved").length,
    rejected: myApps.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="p-6 max-w-6xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="corporate-divider" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {role === "participant" ? "Мои заявки" : "Управление заявками"}
            </span>
          </div>
          <h1 className="section-title text-2xl">Заявки</h1>
        </div>
        {role === "participant" && (
          <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
            <Icon name="Plus" size={15} />
            Подать заявку
          </button>
        )}
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {(["pending", "review", "approved", "rejected"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s === statusFilter ? "all" : s)}
            className="stat-card text-left transition-all duration-150"
            style={statusFilter === s ? { outline: "2px solid hsl(var(--accent))", outlineOffset: "1px" } : {}}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name={statusConfig[s].icon} size={15} className={statusConfig[s].color.split(" ")[1]} />
              <span className={`badge-status ${statusConfig[s].color}`}>{statusConfig[s].label}</span>
            </div>
            <div className="text-2xl font-800 text-foreground">{counts[s]}</div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <h2 className="font-700 text-sm">
            {statusFilter === "all" ? "Все заявки" : statusConfig[statusFilter].label}
            <span className="text-muted-foreground font-normal ml-1.5">({filtered.length})</span>
          </h2>
          {statusFilter !== "all" && (
            <button onClick={() => setStatusFilter("all")} className="text-xs text-muted-foreground hover:text-foreground">
              Сбросить фильтр ×
            </button>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Заявитель</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Мероприятие</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Дата</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Статус</th>
                {canModerate && <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Действия</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((app) => (
                <tr
                  key={app.id}
                  className="hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setSelected(app)}
                >
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-foreground">{app.applicant}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{app.org}</div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="text-foreground max-w-48 truncate">{app.event}</div>
                  </td>
                  <td className="px-4 py-3.5 text-muted-foreground whitespace-nowrap">{app.date}</td>
                  <td className="px-4 py-3.5">
                    <span className={`badge-status ${statusConfig[app.status as keyof typeof statusConfig].color}`}>
                      <Icon name={statusConfig[app.status as keyof typeof statusConfig].icon} size={10} />
                      {statusConfig[app.status as keyof typeof statusConfig].label}
                    </span>
                    {app.comment && (
                      <div className="text-xs text-muted-foreground mt-0.5 max-w-40 truncate">{app.comment}</div>
                    )}
                  </td>
                  {canModerate && (
                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      {(app.status === "pending" || app.status === "review") && (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            className="px-2.5 py-1 text-xs font-medium rounded text-white transition-opacity hover:opacity-80"
                            style={{ background: "#10b981" }}
                          >
                            Одобрить
                          </button>
                          <button className="px-2.5 py-1 text-xs font-medium rounded bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
                            Отклонить
                          </button>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.4)" }} onClick={() => setSelected(null)}>
          <div className="bg-white rounded-xl border border-border w-full max-w-md p-6 animate-slide-up" style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-lg font-800 text-foreground">Заявка №{selected.id}</h2>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-3 text-sm mb-5">
              <div className="flex gap-3"><span className="text-muted-foreground w-32 shrink-0">Заявитель</span><span className="font-medium">{selected.applicant}</span></div>
              <div className="flex gap-3"><span className="text-muted-foreground w-32 shrink-0">Организация</span><span>{selected.org}</span></div>
              <div className="flex gap-3"><span className="text-muted-foreground w-32 shrink-0">Телефон</span><span>{selected.phone}</span></div>
              <div className="flex gap-3"><span className="text-muted-foreground w-32 shrink-0">Мероприятие</span><span>{selected.event}</span></div>
              <div className="flex gap-3"><span className="text-muted-foreground w-32 shrink-0">Статус</span>
                <span className={`badge-status ${statusConfig[selected.status as keyof typeof statusConfig].color}`}>{statusConfig[selected.status as keyof typeof statusConfig].label}</span>
              </div>
              {selected.comment && <div className="flex gap-3"><span className="text-muted-foreground w-32 shrink-0">Комментарий</span><span>{selected.comment}</span></div>}
            </div>
            {canModerate && (selected.status === "pending" || selected.status === "review") && (
              <div className="flex gap-2">
                <button className="flex-1 py-2 text-sm font-medium rounded-md text-white transition-opacity hover:opacity-90" style={{ background: "#10b981" }}>Одобрить</button>
                <button className="flex-1 py-2 text-sm font-medium rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors">Отклонить</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
