import { UserRole } from "@/App";
import Icon from "@/components/ui/icon";

interface Props { role: UserRole }

const reports = [
  { name: "Отчёт по мероприятиям за май 2025", type: "Мероприятия", date: "01.06.2025", size: "284 КБ", format: "XLSX" },
  { name: "Сводный реестр участников — июнь", type: "Участники", date: "01.06.2025", size: "1.2 МБ", format: "XLSX" },
  { name: "Статистика заявок по категориям", type: "Заявки", date: "28.05.2025", size: "148 КБ", format: "PDF" },
  { name: "Отчёт по волонтёрской активности", type: "Волонтёры", date: "25.05.2025", size: "96 КБ", format: "PDF" },
  { name: "Реестр закрытых мероприятий Q2", type: "Безопасность", date: "20.05.2025", size: "320 КБ", format: "PDF" },
];

const monthlyData = [
  { month: "Янв", events: 2, apps: 48 },
  { month: "Фев", events: 3, apps: 72 },
  { month: "Мар", events: 5, apps: 145 },
  { month: "Апр", events: 4, apps: 118 },
  { month: "Май", events: 6, apps: 203 },
  { month: "Июн", events: 4, apps: 87 },
];

const maxApps = Math.max(...monthlyData.map((d) => d.apps));

export default function ReportsPage({ role }: Props) {
  if (role === "guest" || role === "participant" || role === "volunteer") {
    return (
      <div className="p-6 max-w-6xl mx-auto animate-slide-up flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "hsl(var(--muted))" }}>
            <Icon name="Lock" size={24} className="text-muted-foreground" />
          </div>
          <h2 className="font-800 text-lg text-foreground mb-2">Доступ ограничен</h2>
          <p className="text-sm text-muted-foreground">Отчёты доступны только организаторам и администраторам</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto animate-slide-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="corporate-divider" />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Аналитика</span>
          </div>
          <h1 className="section-title text-2xl">Отчёты</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-white transition-opacity hover:opacity-90" style={{ background: "hsl(var(--primary))" }}>
          <Icon name="FilePlus" size={15} />
          Сформировать отчёт
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-border p-5" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-700 text-sm text-foreground">Активность по месяцам</h2>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block" style={{ background: "hsl(var(--accent))" }} />Заявки</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm inline-block bg-slate-200" />Мероприятия</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-40">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${(d.apps / maxApps) * 120}px`,
                        background: "hsl(var(--accent))",
                        opacity: 0.85,
                      }}
                      title={`${d.apps} заявок`}
                    />
                    <div
                      className="w-3/4 rounded-sm"
                      style={{
                        height: `${d.events * 8}px`,
                        background: "#cbd5e1",
                      }}
                      title={`${d.events} мероприятий`}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 mt-4">
            {[
              { label: "Всего мероприятий", value: "24", icon: "Calendar", delta: "+4 vs прошлый период" },
              { label: "Всего заявок", value: "673", icon: "ClipboardList", delta: "+18% vs прошлый период" },
              { label: "Конверсия", value: "78%", icon: "TrendingUp", delta: "Одобрено/подано" },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <Icon name={s.icon} size={16} className="text-muted-foreground mb-2" />
                <div className="text-xl font-800 text-foreground">{s.value}</div>
                <div className="text-xs font-medium text-foreground/80 mt-0.5">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.delta}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports list */}
        <div>
          <div className="bg-white rounded-lg border border-border overflow-hidden" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <div className="px-4 py-3.5 border-b border-border">
              <h2 className="font-700 text-sm text-foreground">Готовые отчёты</h2>
            </div>
            <div className="divide-y divide-border">
              {reports.map((r) => (
                <div key={r.name} className="px-4 py-3.5 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground leading-snug">{r.name}</span>
                    <span
                      className="badge-status shrink-0 text-xs font-mono"
                      style={{ background: r.format === "PDF" ? "#fee2e2" : "#dcfce7", color: r.format === "PDF" ? "#991b1b" : "#166534" }}
                    >
                      {r.format}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span>{r.type}</span>
                    <span>•</span>
                    <span>{r.date}</span>
                    <span>•</span>
                    <span>{r.size}</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-xs font-medium mt-2 transition-colors" style={{ color: "hsl(var(--accent))" }}>
                    <Icon name="Download" size={12} />
                    Скачать
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
