import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

const features = [
  {
    icon: "Calendar",
    title: "Управление мероприятиями",
    desc: "Создавайте события любого формата — от открытых конференций до закрытых совещаний с ограниченным доступом.",
    color: "#1a3a8f",
  },
  {
    icon: "ClipboardList",
    title: "Модерация заявок",
    desc: "Предварительная проверка участников перед допуском. Контроль полномочий и верификация организаций.",
    color: "#d01f3c",
  },
  {
    icon: "Users",
    title: "Команда волонтёров",
    desc: "Распределяйте задачи, назначайте ответственных и отслеживайте исполнение в режиме реального времени.",
    color: "#1a3a8f",
  },
  {
    icon: "Shield",
    title: "Разграничение доступа",
    desc: "Пять уровней прав: гость, участник, волонтёр, организатор, администратор. Каждый видит только своё.",
    color: "#d01f3c",
  },
  {
    icon: "BarChart3",
    title: "Аналитика и отчёты",
    desc: "Сводная статистика, выгрузка данных в XLSX и PDF. Полная картина по каждому мероприятию.",
    color: "#1a3a8f",
  },
  {
    icon: "MapPin",
    title: "Конфиденциальность мест",
    desc: "Для закрытых событий адрес проведения скрывается до подтверждения заявки участника.",
    color: "#d01f3c",
  },
];

const stats = [
  { value: "500+", label: "Мероприятий проведено" },
  { value: "12 000+", label: "Участников зарегистрировано" },
  { value: "98%", label: "Заявок обработано вовремя" },
  { value: "5 уровней", label: "Разграничения прав доступа" },
];

const roles = [
  { icon: "Eye", title: "Гость", desc: "Просмотр открытых мероприятий и общей информации о платформе" },
  { icon: "UserCheck", title: "Участник", desc: "Подача заявок, отслеживание статуса участия, уведомления" },
  { icon: "UserCog", title: "Волонтёр", desc: "Получение задач, отметка выполнения, работа в команде" },
  { icon: "Briefcase", title: "Организатор", desc: "Создание событий, управление заявками, формирование отчётов" },
  { icon: "Settings2", title: "Администратор", desc: "Полное управление платформой, пользователями и настройками" },
];

const faq = [
  { q: "Как подать заявку на закрытое мероприятие?", a: "После регистрации вы можете подать заявку. Организатор проверит ваши полномочия и уведомит о решении. Адрес места проведения откроется после одобрения." },
  { q: "Кто может создавать мероприятия?", a: "Пользователи с ролью «Организатор» или «Администратор». Организатор проходит верификацию при регистрации." },
  { q: "Можно ли участвовать без регистрации?", a: "Гости могут просматривать открытые мероприятия. Для подачи заявок и участия требуется регистрация." },
  { q: "Как стать волонтёром?", a: "Выберите роль «Волонтёр» при регистрации. После верификации организаторы смогут назначать вам задачи." },
];

export default function LandingPage({ onLogin, onRegister }: Props) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="font-golos min-h-screen bg-white overflow-x-hidden">

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            {/* Флаг РФ миниатюра */}
            <div className="flex flex-col w-6 h-4 rounded-sm overflow-hidden shrink-0">
              <div className="flex-1 bg-white border-t border-x border-slate-200" />
              <div className="flex-1" style={{ background: "#003DA5" }} />
              <div className="flex-1" style={{ background: "#CC0000" }} />
            </div>
            <span className="text-base font-800 text-foreground tracking-tight">EventCore</span>
            <span className="text-xs text-muted-foreground hidden sm:block">— платформа управления мероприятиями</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#roles" className="hover:text-foreground transition-colors">Роли</a>
            <a href="#stats" className="hover:text-foreground transition-colors">Цифры</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={onLogin}
              className="px-4 py-2 text-sm font-medium rounded-md border border-slate-200 text-foreground hover:bg-slate-50 transition-colors"
            >
              Войти
            </button>
            <button
              onClick={onRegister}
              className="px-4 py-2 text-sm font-medium rounded-md text-white transition-opacity hover:opacity-90"
              style={{ background: "#003DA5" }}
            >
              Регистрация
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Триколор полосы */}
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          <div className="flex-1 bg-white" />
          <div className="flex-1" style={{ background: "#003DA5" }} />
          <div className="flex-1" style={{ background: "#CC0000" }} />
        </div>
        {/* Overlay для читаемости */}
        <div className="absolute inset-0 bg-white/80 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border"
            style={{ background: "rgba(0,61,165,0.06)", borderColor: "rgba(0,61,165,0.2)", color: "#003DA5" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Цифровая платформа для организации мероприятий
          </div>

          <h1 className="text-4xl sm:text-5xl font-800 text-foreground leading-tight tracking-tight mb-5" style={{ letterSpacing: "-0.03em" }}>
            Единая система<br />
            <span style={{ color: "#003DA5" }}>управления</span>{" "}
            мероприятиями
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Организуйте мероприятия любого масштаба — от публичных форумов до закрытых совещаний с предварительной модерацией, разграничением доступа и контролем безопасности.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={onRegister}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#003DA5", boxShadow: "0 4px 14px rgba(0,61,165,0.35)" }}
            >
              <Icon name="UserPlus" size={16} />
              Начать бесплатно
            </button>
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-md border transition-all hover:bg-slate-50"
              style={{ borderColor: "#003DA5", color: "#003DA5" }}
            >
              <Icon name="LogIn" size={16} />
              Войти в систему
            </button>
          </div>

          {/* Hero preview card */}
          <div
            className="mt-14 max-w-3xl mx-auto rounded-xl border overflow-hidden text-left animate-slide-up"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.12)", borderColor: "#e2e8f0" }}
          >
            {/* Имитация интерфейса */}
            <div className="flex" style={{ background: "#0f2a5e", height: 48 }}>
              <div className="flex items-center gap-3 px-5">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#003DA5" }}>
                  <Icon name="Zap" size={12} className="text-white" />
                </div>
                <span className="text-white text-sm font-700">EventCore</span>
              </div>
              <div className="flex items-center gap-1 ml-6">
                {["Мероприятия", "Заявки", "Волонтёры", "Отчёты"].map((t) => (
                  <span key={t} className="px-3 py-1 text-xs rounded-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 p-5 grid grid-cols-4 gap-3">
              {[
                { label: "Мероприятий", val: "24", color: "#003DA5" },
                { label: "На модерации", val: "18", color: "#CC0000" },
                { label: "Волонтёров", val: "142", color: "#006600" },
                { label: "Участников", val: "1 248", color: "#7c3aed" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-lg p-3 border border-slate-200">
                  <div className="text-xl font-800" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white px-5 py-3 grid grid-cols-3 gap-3">
              {[
                { name: "Городской форум", date: "15 июн", status: "Активно", sc: "#006600" },
                { name: "Совещание штаба", date: "20 июн", status: "Модерация", sc: "#b45309" },
                { name: "Конференция ЦЭ", date: "28 июн", status: "Черновик", sc: "#64748b" },
              ].map((e) => (
                <div key={e.name} className="p-3 rounded-md border border-slate-100">
                  <div className="text-xs font-600 text-slate-700 truncate">{e.name}</div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-slate-400">{e.date}</span>
                    <span className="text-xs font-medium" style={{ color: e.sc }}>{e.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" style={{ background: "#003DA5" }} className="py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-800 text-white mb-1">{s.value}</div>
                <div className="text-sm text-white/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: "#CC0000" }} />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Функциональность</span>
              <div className="h-px w-8" style={{ background: "#CC0000" }} />
            </div>
            <h2 className="text-3xl font-800 text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Всё необходимое<br />в одной системе
            </h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Централизованное хранение данных, персонализированный доступ и полный контроль над каждым этапом организации
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-slate-100 hover:-translate-y-1 transition-all duration-200 group"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.09)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)")}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: f.color + "12" }}
                >
                  <Icon name={f.icon} size={22} style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-700 text-foreground mb-2">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-16" style={{ background: f.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section id="roles" className="py-20" style={{ background: "#f8f9fc" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: "#003DA5" }} />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Участники</span>
              <div className="h-px w-8" style={{ background: "#003DA5" }} />
            </div>
            <h2 className="text-3xl font-800 text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Пять ролей —<br />один инструмент
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {roles.map((r, i) => (
              <div
                key={r.title}
                className="bg-white rounded-xl p-5 border border-slate-100 text-center hover:-translate-y-1 transition-all duration-200"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.09)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)")}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: i % 2 === 0 ? "rgba(0,61,165,0.08)" : "rgba(204,0,0,0.08)" }}
                >
                  <Icon name={r.icon} size={22} style={{ color: i % 2 === 0 ? "#003DA5" : "#CC0000" }} />
                </div>
                <div className="text-sm font-700 text-foreground mb-2">{r.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECURITY HIGHLIGHT ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl overflow-hidden grid md:grid-cols-2">
            {/* Левая панель — тёмно-синяя */}
            <div className="p-10 flex flex-col justify-center" style={{ background: "#0f2a5e" }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="h-px w-6 bg-red-400" />
                <span className="text-xs font-medium uppercase tracking-widest text-white/50">Безопасность</span>
              </div>
              <h2 className="text-2xl font-800 text-white leading-tight tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
                Повышенная организационная чувствительность
              </h2>
              <p className="text-white/65 text-sm leading-relaxed mb-6">
                Для мероприятий с ограниченным доступом система обеспечивает предварительную верификацию участников, скрытие адресов и адресное информирование.
              </p>
              <button
                onClick={onRegister}
                className="self-start flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-md text-white transition-all hover:opacity-90"
                style={{ background: "#CC0000" }}
              >
                <Icon name="ShieldCheck" size={15} />
                Подключить платформу
              </button>
            </div>
            {/* Правая панель — белая с фичами */}
            <div className="p-8 border border-l-0 border-slate-100 bg-slate-50 flex flex-col justify-center gap-4">
              {[
                { icon: "Eye", title: "Модерация заявок", desc: "Проверка перед допуском к мероприятию" },
                { icon: "MapPin", title: "Скрытие адресов", desc: "Место проведения — только подтверждённым" },
                { icon: "UserCheck", title: "Верификация организаторов", desc: "Подтверждение полномочий и должности" },
                { icon: "MessageSquare", title: "Адресные уведомления", desc: "Рассылка только допущенным участникам" },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(0,61,165,0.1)" }}>
                    <Icon name={f.icon} size={15} style={{ color: "#003DA5" }} />
                  </div>
                  <div>
                    <div className="text-sm font-700 text-foreground">{f.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20" style={{ background: "#f8f9fc" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8" style={{ background: "#CC0000" }} />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Вопросы</span>
              <div className="h-px w-8" style={{ background: "#CC0000" }} />
            </div>
            <h2 className="text-3xl font-800 text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>Часто задаваемые вопросы</h2>
          </div>

          <div className="space-y-2">
            {faq.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <button
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-700 text-foreground pr-4">{item.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className="shrink-0 text-muted-foreground transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed animate-fade-in border-t border-slate-100 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20" style={{ background: "#0f2a5e" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          {/* Триколор декор */}
          <div className="flex justify-center gap-0.5 mb-8">
            <div className="h-1 w-12 rounded-l-full bg-white" />
            <div className="h-1 w-12" style={{ background: "#003DA5" }} />
            <div className="h-1 w-12 rounded-r-full" style={{ background: "#CC0000" }} />
          </div>

          <h2 className="text-3xl font-800 text-white tracking-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
            Начните использовать EventCore<br />уже сегодня
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Создайте аккаунт и получите доступ ко всем инструментам управления мероприятиями — бесплатно.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={onRegister}
              className="flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-md text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: "#CC0000", boxShadow: "0 4px 16px rgba(204,0,0,0.4)" }}
            >
              <Icon name="UserPlus" size={15} />
              Зарегистрироваться
            </button>
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-8 py-3 text-sm font-medium rounded-md transition-all hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.25)", color: "#fff" }}
            >
              <Icon name="LogIn" size={15} />
              Уже есть аккаунт
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col w-5 h-3.5 rounded-sm overflow-hidden shrink-0">
              <div className="flex-1 bg-white border border-slate-200" />
              <div className="flex-1" style={{ background: "#003DA5" }} />
              <div className="flex-1" style={{ background: "#CC0000" }} />
            </div>
            <span className="text-sm font-700 text-foreground">EventCore</span>
            <span className="text-xs text-muted-foreground">© 2025</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#roles" className="hover:text-foreground transition-colors">О платформе</a>
            <button onClick={onLogin} className="hover:text-foreground transition-colors">Войти</button>
            <button onClick={onRegister} className="hover:text-foreground transition-colors font-medium" style={{ color: "#003DA5" }}>Регистрация</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
