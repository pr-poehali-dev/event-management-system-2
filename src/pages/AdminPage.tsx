import { useState } from "react";
import { PageProps } from "@/App";
import Icon from "@/components/ui/icon";

const users = [
  { id: 1, name: "Алексей Иванов", email: "a.ivanov@corp.ru", role: "organizer", status: "active", lastLogin: "30.05.2025" },
  { id: 2, name: "Мария Смирнова", email: "m.smirnova@corp.ru", role: "admin", status: "active", lastLogin: "29.05.2025" },
  { id: 3, name: "Дмитрий Козлов", email: "d.kozlov@corp.ru", role: "participant", status: "active", lastLogin: "28.05.2025" },
  { id: 4, name: "Елена Новикова", email: "e.novikova@corp.ru", role: "volunteer", status: "active", lastLogin: "27.05.2025" },
  { id: 5, name: "Андрей Морозов", email: "a.morozov@corp.ru", role: "participant", status: "blocked", lastLogin: "10.04.2025" },
  { id: 6, name: "Ольга Петрова", email: "o.petrova@corp.ru", role: "organizer", status: "active", lastLogin: "30.05.2025" },
];

const categories = [
  { id: 1, name: "Конференция", count: 8 },
  { id: 2, name: "Семинар", count: 5 },
  { id: 3, name: "Совещание", count: 4 },
  { id: 4, name: "Открытое мероприятие", count: 4 },
  { id: 5, name: "Коллегия", count: 3 },
];

const roleConfig = {
  admin: { label: "Администратор", color: "bg-red-100 text-red-800" },
  organizer: { label: "Организатор", color: "bg-amber-100 text-amber-800" },
  volunteer: { label: "Волонтёр", color: "bg-emerald-100 text-emerald-800" },
  participant: { label: "Участник", color: "bg-blue-100 text-blue-800" },
  guest: { label: "Гость", color: "bg-slate-100 text-slate-600" },
};

export default function AdminPage({ role, navigate }: PageProps) {
  const [tab, setTab] = useState<"users" | "categories" | "settings">("users");

  if (role !== "admin") {
    return (
      <div className="p-6 max-w-6xl mx-auto animate-slide-up flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "hsl(var(--muted))" }}>
            <Icon name="ShieldOff" size={24} className="text-muted-foreground" />
          </div>
          <h2 className="font-800 text-lg text-foreground mb-2">Доступ запрещён</h2>
          <p className="text-sm text-muted-foreground">Раздел доступен только администраторам системы</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="corporate-divider" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Система</span>
        </div>
        <h1 className="section-title text-2xl">Администрирование</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-muted rounded-md p-0.5 w-fit mb-5">
        {([["users", "Пользователи"], ["categories", "Категории"], ["settings", "Настройки"]] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-all duration-150 ${tab === id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "users" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">Всего пользователей: <span className="font-medium text-foreground">{users.length}</span></div>
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
                  <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Последний вход</th>
                  <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-700 text-white shrink-0" style={{ background: "hsl(var(--primary))" }}>
                          {u.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{u.name}</div>
                          <div className="text-xs text-muted-foreground">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`badge-status ${roleConfig[u.role as keyof typeof roleConfig].color}`}>
                        {roleConfig[u.role as keyof typeof roleConfig].label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`badge-status ${u.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`}>
                        {u.status === "active" ? "Активен" : "Заблокирован"}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground text-xs">{u.lastLogin}</td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                          <Icon name="Pencil" size={14} />
                        </button>
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-red-600">
                          <Icon name="Ban" size={14} />
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

      {tab === "categories" && (
        <div className="max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-muted-foreground">Категории мероприятий</div>
            <button className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
              <Icon name="Plus" size={15} />
              Добавить
            </button>
          </div>
          <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="divide-y divide-border">
              {categories.map((c) => (
                <div key={c.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <div className="text-sm font-medium text-foreground">{c.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Мероприятий: {c.count}</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground">
                      <Icon name="Pencil" size={14} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-red-600">
                      <Icon name="Trash2" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "settings" && (
        <div className="max-w-xl space-y-4">
          {[
            { label: "Предварительная модерация заявок", desc: "Все заявки проходят проверку перед допуском", enabled: true },
            { label: "Публичный каталог мероприятий", desc: "Гости могут просматривать открытые события", enabled: true },
            { label: "Скрывать адреса закрытых мероприятий", desc: "Адрес виден только после одобрения заявки", enabled: true },
            { label: "Уведомления по email", desc: "Автоматическая рассылка при изменении статуса", enabled: false },
            { label: "Двухэтапная верификация организаторов", desc: "Требовать подтверждение полномочий", enabled: true },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-lg border border-border p-4 flex items-center justify-between gap-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div>
                <div className="text-sm font-700 text-foreground">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.desc}</div>
              </div>
              <div
                className="w-10 h-5 rounded-full flex items-center transition-all duration-200 shrink-0 cursor-pointer px-0.5"
                style={{ background: s.enabled ? "hsl(var(--accent))" : "hsl(var(--muted))", justifyContent: s.enabled ? "flex-end" : "flex-start" }}
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}