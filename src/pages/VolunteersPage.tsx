import { useState } from "react";
import { PageProps } from "@/App";
import Icon from "@/components/ui/icon";

const volunteers = [
  { id: 1, name: "Захаров Кирилл Андреевич", skills: ["Регистрация", "Навигация"], events: 8, status: "active", phone: "+7 912 111-22-33", rating: 4.9, assigned: "Городской форум предпринимателей" },
  { id: 2, name: "Павлова Дарья Сергеевна", skills: ["Пресс-служба", "Фото"], events: 14, status: "active", phone: "+7 913 222-33-44", rating: 5.0, assigned: "Конференция по цифровой экономике" },
  { id: 3, name: "Тихонов Артём Юрьевич", skills: ["Логистика", "Техническая поддержка"], events: 5, status: "available", phone: "+7 914 333-44-55", rating: 4.7, assigned: null },
  { id: 4, name: "Белова Екатерина Михайловна", skills: ["Регистрация", "Координация"], events: 11, status: "available", phone: "+7 915 444-55-66", rating: 4.8, assigned: null },
  { id: 5, name: "Фролов Николай Петрович", skills: ["Охрана порядка", "Логистика"], events: 3, status: "active", phone: "+7 916 555-66-77", rating: 4.5, assigned: "Закрытое совещание регионального штаба" },
  { id: 6, name: "Орлова Виктория Ивановна", skills: ["Переводчик", "Протокол"], events: 7, status: "available", phone: "+7 917 666-77-88", rating: 4.9, assigned: null },
];

const tasks = [
  { id: 1, volunteer: "Захаров К.А.", task: "Регистрация участников на входе", event: "Городской форум", status: "done", deadline: "15.06 09:00" },
  { id: 2, volunteer: "Павлова Д.С.", task: "Фотосъёмка пленарного заседания", event: "Конференция ЦЭ", status: "progress", deadline: "28.06 10:00" },
  { id: 3, volunteer: "Фролов Н.П.", task: "Контроль доступа в зону B", event: "Совещание штаба", status: "assigned", deadline: "20.06 08:30" },
  { id: 4, volunteer: "Белова Е.М.", task: "Координация участников в холле", event: "Городской форум", status: "assigned", deadline: "15.06 08:00" },
];

const taskStatus = {
  assigned: { label: "Назначена", color: "bg-blue-100 text-blue-800" },
  progress: { label: "Выполняется", color: "bg-amber-100 text-amber-800" },
  done: { label: "Выполнена", color: "bg-emerald-100 text-emerald-800" },
};

export default function VolunteersPage({ role, navigate }: PageProps) {
  const [tab, setTab] = useState<"list" | "tasks">("list");
  const canManage = role === "organizer" || role === "admin";

  return (
    <div className="p-6 max-w-6xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="corporate-divider" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Команда</span>
          </div>
          <h1 className="section-title text-2xl">Волонтёры</h1>
        </div>
        {canManage && (
          <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
            <Icon name="UserPlus" size={15} />
            Добавить волонтёра
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-md p-0.5 w-fit mb-5">
        {([["list", "Волонтёры"], ["tasks", "Задачи"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-all duration-150 ${tab === id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "list" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            {[
              { label: "Всего волонтёров", value: volunteers.length, icon: "Users", color: "hsl(var(--accent))" },
              { label: "Задействованы", value: volunteers.filter((v) => v.status === "active").length, icon: "UserCheck", color: "#10b981" },
              { label: "Свободны", value: volunteers.filter((v) => v.status === "available").length, icon: "UserMinus", color: "#8b5cf6" },
            ].map((s) => (
              <div key={s.label} className="stat-card flex items-center gap-4">
                <div className="w-10 h-10 rounded-md flex items-center justify-center shrink-0" style={{ background: s.color + "18" }}>
                  <Icon name={s.icon} size={20} style={{ color: s.color }} />
                </div>
                <div>
                  <div className="text-xl font-800 text-foreground leading-none">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Volunteer cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {volunteers.map((v) => (
              <div key={v.id} className="bg-white rounded-lg border border-border p-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-700 text-white shrink-0" style={{ background: "hsl(var(--primary))" }}>
                    {v.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-700 text-foreground truncate">{v.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`badge-status text-xs ${v.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"}`}>
                        {v.status === "active" ? "Задействован" : "Свободен"}
                      </span>
                      <span className="flex items-center gap-0.5 text-xs text-amber-600">
                        <Icon name="Star" size={11} />
                        {v.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {v.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{s}</span>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon name="Award" size={11} />
                    Мероприятий: {v.events}
                  </div>
                  {v.assigned && (
                    <div className="flex items-center gap-2">
                      <Icon name="Calendar" size={11} />
                      <span className="truncate">{v.assigned}</span>
                    </div>
                  )}
                </div>

                {canManage && (
                  <div className="mt-3 pt-3 border-t border-border flex gap-2">
                    <button className="flex-1 py-1.5 text-xs font-medium rounded-md bg-muted text-foreground hover:bg-secondary transition-colors">
                      Назначить
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-muted text-muted-foreground hover:bg-secondary transition-colors">
                      <Icon name="Phone" size={12} />
                    </button>
                  </div>
                )}

                {role === "volunteer" && v.id === 1 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground">Ваш профиль</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {tab === "tasks" && (
        <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-700 text-sm">Задачи волонтёров</h2>
            {canManage && (
              <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--accent))" }}>
                <Icon name="Plus" size={13} />
                Создать задачу
              </button>
            )}
          </div>
          <div className="divide-y divide-border">
            {tasks.map((t) => (
              <div key={t.id} className="px-5 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-foreground">{t.task}</div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Icon name="User" size={11} />{t.volunteer}</span>
                    <span className="flex items-center gap-1"><Icon name="Calendar" size={11} />{t.event}</span>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={11} />{t.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`badge-status ${taskStatus[t.status as keyof typeof taskStatus].color}`}>
                    {taskStatus[t.status as keyof typeof taskStatus].label}
                  </span>
                  {(role === "volunteer" || canManage) && t.status !== "done" && (
                    <button className="p-1.5 rounded-md bg-muted hover:bg-secondary transition-colors">
                      <Icon name="Check" size={13} className="text-emerald-600" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}