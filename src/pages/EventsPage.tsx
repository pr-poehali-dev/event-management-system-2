import { useState } from "react";
import { UserRole } from "@/App";
import Icon from "@/components/ui/icon";

interface Props { role: UserRole }

const events = [
  {
    id: 1, name: "Городской форум предпринимателей", category: "Конференция",
    date: "15 июня 2025", location: "Конгресс-центр «Горизонт»",
    status: "active", apps: 87, capacity: 150, sensitive: false,
    description: "Ежегодный деловой форум с участием представителей малого и среднего бизнеса региона.",
  },
  {
    id: 2, name: "Закрытое совещание регионального штаба", category: "Совещание",
    date: "20 июня 2025", location: "Адрес предоставляется участникам",
    status: "moderation", apps: 34, capacity: 50, sensitive: true,
    description: "Рабочее совещание с ограниченным кругом участников. Доступ по предварительной проверке.",
  },
  {
    id: 3, name: "Конференция по цифровой экономике", category: "Конференция",
    date: "28 июня 2025", location: "IT-парк, зал А",
    status: "draft", apps: 0, capacity: 200, sensitive: false,
    description: "Обсуждение цифровой трансформации предприятий и внедрения новых технологий.",
  },
  {
    id: 4, name: "Выездной семинар руководителей", category: "Семинар",
    date: "5 июля 2025", location: "Загородный пансионат «Берёзки»",
    status: "moderation", apps: 12, capacity: 30, sensitive: true,
    description: "Стратегическая сессия для руководящего состава. Участие — по персональному приглашению.",
  },
  {
    id: 5, name: "День открытых дверей", category: "Открытое мероприятие",
    date: "12 июля 2025", location: "Центральная площадь",
    status: "active", apps: 345, capacity: 1000, sensitive: false,
    description: "Публичное мероприятие для широкой аудитории. Регистрация открыта.",
  },
  {
    id: 6, name: "Итоговая коллегия ведомства", category: "Коллегия",
    date: "25 июля 2025", location: "Актовый зал администрации",
    status: "draft", apps: 0, capacity: 80, sensitive: true,
    description: "Подведение итогов полугодия. Список участников формируется организатором.",
  },
];

const statusConfig = {
  active: { label: "Активно", color: "bg-emerald-100 text-emerald-800" },
  moderation: { label: "Модерация", color: "bg-amber-100 text-amber-800" },
  draft: { label: "Черновик", color: "bg-slate-100 text-slate-600" },
  closed: { label: "Завершено", color: "bg-blue-100 text-blue-700" },
};

export default function EventsPage({ role }: Props) {
  const [filter, setFilter] = useState<"all" | "active" | "moderation" | "draft">("all");
  const [search, setSearch] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);

  const canCreate = role === "organizer" || role === "admin";
  const canSeeHidden = role === "organizer" || role === "admin";

  const filtered = events.filter((e) => {
    if (!canSeeHidden && e.sensitive && e.status === "draft") return false;
    if (filter !== "all" && e.status !== filter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="corporate-divider" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Реестр</span>
          </div>
          <h1 className="section-title text-2xl">Мероприятия</h1>
        </div>
        {canCreate && (
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{ background: "hsl(var(--primary))" }}
          >
            <Icon name="Plus" size={15} />
            Создать мероприятие
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-5 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск мероприятий..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex gap-1 bg-muted rounded-md p-0.5">
          {(["all", "active", "moderation", "draft"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all duration-150 ${
                filter === f ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "Все" : statusConfig[f].label}
            </button>
          ))}
        </div>
        <div className="text-xs text-muted-foreground ml-auto">
          Показано: {filtered.length}
        </div>
      </div>

      {/* Events grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-lg border border-border p-4 cursor-pointer transition-all duration-150 hover:-translate-y-0.5"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            onClick={() => setSelectedEvent(ev)}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded">{ev.category}</span>
              <div className="flex items-center gap-1.5 shrink-0">
                {ev.sensitive && (
                  <span className="badge-status bg-red-50 text-red-600">
                    <Icon name="Shield" size={10} />
                    закрытое
                  </span>
                )}
                <span className={`badge-status ${statusConfig[ev.status as keyof typeof statusConfig].color}`}>
                  {statusConfig[ev.status as keyof typeof statusConfig].label}
                </span>
              </div>
            </div>

            <h3 className="text-sm font-700 text-foreground leading-snug mb-3">{ev.name}</h3>

            <div className="space-y-1.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={12} className="shrink-0" />
                {ev.date}
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={12} className="shrink-0" />
                <span className="truncate">{ev.sensitive && role === "guest" ? "Адрес скрыт" : ev.location}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{ev.apps}</span> / {ev.capacity} участников
              </div>
              {/* Progress bar */}
              <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(100, (ev.apps / ev.capacity) * 100)}%`,
                    background: ev.apps / ev.capacity > 0.8 ? "#ef4444" : "hsl(var(--accent))",
                  }}
                />
              </div>
            </div>

            {(role === "participant" || role === "guest") && ev.status === "active" && !ev.sensitive && (
              <button
                className="mt-3 w-full py-1.5 text-xs font-medium rounded-md text-white transition-opacity hover:opacity-90"
                style={{ background: "hsl(var(--accent))" }}
                onClick={(e) => e.stopPropagation()}
              >
                Подать заявку
              </button>
            )}
            {(role === "participant") && ev.status === "moderation" && (
              <button
                className="mt-3 w-full py-1.5 text-xs font-medium rounded-md transition-colors"
                style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
                onClick={(e) => e.stopPropagation()}
              >
                Заявка на проверке
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Event detail panel */}
      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.4)" }}
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="bg-white rounded-xl border border-border w-full max-w-lg p-6 animate-slide-up"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge-status ${statusConfig[selectedEvent.status as keyof typeof statusConfig].color}`}>
                    {statusConfig[selectedEvent.status as keyof typeof statusConfig].label}
                  </span>
                  {selectedEvent.sensitive && (
                    <span className="badge-status bg-red-50 text-red-600">
                      <Icon name="Shield" size={10} /> Ограниченный доступ
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-800 text-foreground leading-tight">{selectedEvent.name}</h2>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="p-1.5 rounded-md text-muted-foreground hover:bg-muted transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{selectedEvent.description}</p>

            <div className="space-y-2 text-sm mb-5">
              <div className="flex items-center gap-3">
                <Icon name="Calendar" size={15} className="text-muted-foreground shrink-0" />
                <span>{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="MapPin" size={15} className="text-muted-foreground shrink-0" />
                <span>{selectedEvent.sensitive && (role === "guest" || role === "participant") ? "Адрес предоставляется после подтверждения заявки" : selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon name="Users" size={15} className="text-muted-foreground shrink-0" />
                <span>{selectedEvent.apps} из {selectedEvent.capacity} мест занято</span>
              </div>
            </div>

            <div className="flex gap-2">
              {(role === "participant" || role === "guest") && selectedEvent.status === "active" && (
                <button className="flex-1 py-2.5 text-sm font-medium text-white rounded-md transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
                  Подать заявку
                </button>
              )}
              {(role === "organizer" || role === "admin") && (
                <>
                  <button className="flex-1 py-2.5 text-sm font-medium text-white rounded-md transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
                    Редактировать
                  </button>
                  <button className="px-4 py-2.5 text-sm font-medium rounded-md border border-border hover:bg-muted transition-colors">
                    Заявки ({selectedEvent.apps})
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
