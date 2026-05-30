import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

// Приглушённая палитра флага РФ
const C = {
  blue: "#2251a3",       // синий — чуть темнее и матовее
  blueDark: "#162447",   // тёмно-синий фон
  blueDeep: "#0d1f3c",   // очень тёмный фон CTA
  red: "#a8192a",        // красный — сдержанный
  blueAlpha: (a: number) => `rgba(34,81,163,${a})`,
  redAlpha: (a: number) => `rgba(168,25,42,${a})`,
};

const features = [
  { icon: "Calendar", title: "Управление мероприятиями", desc: "Создавайте события любого формата — от открытых конференций до закрытых совещаний с ограниченным доступом.", color: C.blue },
  { icon: "ClipboardList", title: "Модерация заявок", desc: "Предварительная проверка участников перед допуском. Контроль полномочий и верификация организаций.", color: C.red },
  { icon: "Users", title: "Команда волонтёров", desc: "Распределяйте задачи, назначайте ответственных и отслеживайте исполнение в режиме реального времени.", color: C.blue },
  { icon: "Shield", title: "Разграничение доступа", desc: "Пять уровней прав: гость, участник, волонтёр, организатор, администратор. Каждый видит только своё.", color: C.red },
  { icon: "BarChart3", title: "Аналитика и отчёты", desc: "Сводная статистика, выгрузка данных в XLSX и PDF. Полная картина по каждому мероприятию.", color: C.blue },
  { icon: "MapPin", title: "Конфиденциальность мест", desc: "Для закрытых событий адрес проведения скрывается до подтверждения заявки участника.", color: C.red },
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
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col w-6 h-4 rounded-sm overflow-hidden shrink-0 border border-slate-200">
              <div className="flex-1 bg-white" />
              <div className="flex-1" style={{ background: C.blue }} />
              <div className="flex-1" style={{ background: C.red }} />
            </div>
            <span className="text-sm font-800 text-foreground tracking-tight leading-tight">Цифровая платформа организации<br className="hidden sm:block" /> мероприятий Запорожской области</span>
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
              style={{ background: C.blue }}
            >
              Регистрация
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Фоновое изображение */}
        <img
          src="https://cdn.poehali.dev/projects/c5e2d73a-eff7-45ad-90d8-72fd817b5865/files/3952e5f9-55d3-41b1-9817-5d4232ef7644.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Тёмный overlay для читаемости текста */}
        <div className="absolute inset-0" style={{ background: "rgba(10,20,50,0.55)" }} />
        {/* Тонкая полоска триколора сверху */}
        <div className="absolute top-0 left-0 right-0 flex h-0.5 opacity-70 z-10">
          <div className="flex-1 bg-white" />
          <div className="flex-1" style={{ background: C.blue }} />
          <div className="flex-1" style={{ background: C.red }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-800 text-white leading-tight tracking-tight mb-5" style={{ letterSpacing: "-0.03em", textShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
            Единая система<br />
            <span style={{ color: "#7eb3ff" }}>управления</span>{" "}мероприятиями
          </h1>

          <p className="text-base max-w-2xl mx-auto mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
            Организуйте мероприятия любого масштаба — от публичных форумов до закрытых совещаний с предварительной модерацией, разграничением доступа и контролем безопасности.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={onRegister}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: C.blue, boxShadow: `0 3px 14px rgba(0,0,0,0.35)` }}
            >
              <Icon name="UserPlus" size={15} />
              Начать бесплатно
            </button>
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium rounded-md transition-all hover:bg-white/15"
              style={{ border: "1px solid rgba(255,255,255,0.35)", color: "#fff" }}
            >
              <Icon name="LogIn" size={15} />
              Войти в систему
            </button>
          </div>

          {/* Hero preview */}
          <div
            className="mt-12 max-w-3xl mx-auto rounded-xl border overflow-hidden text-left animate-slide-up"
            style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.10)", borderColor: "#dde1ea" }}
          >
            <div className="flex items-center" style={{ background: C.blueDark, height: 46 }}>
              <div className="flex items-center gap-3 px-5">
                <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: C.blue }}>
                  <Icon name="Zap" size={12} className="text-white" />
                </div>
                <span className="text-white text-sm font-700">Платформа мероприятий ЗО</span>
              </div>
              <div className="flex items-center gap-0.5 ml-4">
                {["Мероприятия", "Заявки", "Волонтёры", "Отчёты"].map((t) => (
                  <span key={t} className="px-3 py-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="p-5 grid grid-cols-4 gap-3" style={{ background: "#f0f2f7" }}>
              {[
                { label: "Мероприятий", val: "24", color: C.blue },
                { label: "На модерации", val: "18", color: C.red },
                { label: "Волонтёров", val: "142", color: "#2d7a4f" },
                { label: "Участников", val: "1 248", color: "#5b47a8" },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-lg p-3 border border-slate-200">
                  <div className="text-xl font-800" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="bg-white px-5 py-4 grid grid-cols-3 gap-3">
              {[
                { name: "Городской форум", date: "15 июн", status: "Активно", sc: "#2d7a4f" },
                { name: "Совещание штаба", date: "20 июн", status: "Модерация", sc: "#9a6a1a" },
                { name: "Конференция ЦЭ", date: "28 июн", status: "Черновик", sc: "#64748b" },
              ].map((e) => (
                <div key={e.name} className="p-3 rounded-md border border-slate-100">
                  <div className="text-xs font-medium text-slate-700 truncate">{e.name}</div>
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

      {/* Разделитель */}
      <div className="h-px bg-slate-100" />

      {/* ── STATS ── */}
      <section id="stats" style={{ background: C.blueDark }} className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-800 text-white mb-1">{s.value}</div>
                <div className="text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Разделитель */}
      <div className="h-px" style={{ background: C.blueAlpha(0.15) }} />

      {/* ── FEATURES ── */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-7" style={{ background: C.red }} />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Функциональность</span>
              <div className="h-px w-7" style={{ background: C.red }} />
            </div>
            <h2 className="text-2xl font-800 text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Всё необходимое в одной системе
            </h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto text-sm leading-relaxed">
              Централизованное хранение данных, персонализированный доступ и полный контроль над каждым этапом организации
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-slate-100 hover:-translate-y-0.5 transition-all duration-200 group bg-white"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: f.color + "12" }}
                >
                  <Icon name={f.icon} size={20} style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-700 text-foreground mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                <div className="mt-4 h-0.5 w-7 rounded-full transition-all duration-300 group-hover:w-14" style={{ background: f.color + "80" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Разделитель */}
      <div className="h-px bg-slate-100" />

      {/* ── ROLES ── */}
      <section id="roles" className="py-20" style={{ background: "#f5f7fc" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-7" style={{ background: C.blue }} />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Участники</span>
              <div className="h-px w-7" style={{ background: C.blue }} />
            </div>
            <h2 className="text-2xl font-800 text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Пять ролей — один инструмент
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {roles.map((r, i) => (
              <div
                key={r.title}
                className="bg-white rounded-xl p-6 border border-slate-100 text-center hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)")}
              >
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{ background: i % 2 === 0 ? C.blueAlpha(0.07) : C.redAlpha(0.07) }}
                >
                  <Icon name={r.icon} size={20} style={{ color: i % 2 === 0 ? C.blue : C.red }} />
                </div>
                <div className="text-sm font-700 text-foreground mb-1.5">{r.title}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Разделитель */}
      <div className="h-px bg-slate-100" />

      {/* ── SECURITY ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-xl overflow-hidden grid md:grid-cols-2 border border-slate-200" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <div className="p-10 flex flex-col justify-center" style={{ background: C.blueDark }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-5" style={{ background: C.red }} />
                <span className="text-xs font-medium uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>Безопасность</span>
              </div>
              <h2 className="text-xl font-800 text-white leading-tight tracking-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
                Повышенная организационная чувствительность
              </h2>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.58)" }}>
                Для мероприятий с ограниченным доступом система обеспечивает предварительную верификацию участников, скрытие адресов и адресное информирование.
              </p>
              <button
                onClick={onRegister}
                className="self-start flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md text-white transition-all hover:opacity-90"
                style={{ background: C.red }}
              >
                <Icon name="ShieldCheck" size={14} />
                Подключить платформу
              </button>
            </div>
            <div className="p-10 bg-slate-50 flex flex-col justify-center gap-4">
              {[
                { icon: "Eye", title: "Модерация заявок", desc: "Проверка перед допуском к мероприятию" },
                { icon: "MapPin", title: "Скрытие адресов", desc: "Место проведения — только подтверждённым" },
                { icon: "UserCheck", title: "Верификация организаторов", desc: "Подтверждение полномочий и должности" },
                { icon: "MessageSquare", title: "Адресные уведомления", desc: "Рассылка только допущенным участникам" },
              ].map((f) => (
                <div key={f.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center shrink-0" style={{ background: C.blueAlpha(0.08) }}>
                    <Icon name={f.icon} size={15} style={{ color: C.blue }} />
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

      {/* Разделитель */}
      <div className="h-px bg-slate-100" />

      {/* ── FAQ ── */}
      <section id="faq" className="py-20" style={{ background: "#f5f7fc" }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-7" style={{ background: C.red }} />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Вопросы</span>
              <div className="h-px w-7" style={{ background: C.red }} />
            </div>
            <h2 className="text-2xl font-800 text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>Часто задаваемые вопросы</h2>
          </div>

          <div className="space-y-2">
            {faq.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-100 overflow-hidden"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-700 text-foreground pr-4">{item.q}</span>
                  <Icon
                    name="ChevronDown"
                    size={15}
                    className="shrink-0 text-muted-foreground transition-transform duration-200"
                    style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed animate-fade-in border-t border-slate-100 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Разделитель */}
      <div className="h-px" style={{ background: C.blueAlpha(0.12) }} />

      {/* ── CTA ── */}
      <section className="py-16" style={{ background: C.blueDeep }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-px mb-7">
            <div className="h-0.5 w-10 rounded-l-full bg-white opacity-40" />
            <div className="h-0.5 w-10 opacity-70" style={{ background: C.blue }} />
            <div className="h-0.5 w-10 rounded-r-full opacity-70" style={{ background: C.red }} />
          </div>

          <h2 className="text-2xl font-800 text-white tracking-tight mb-3" style={{ letterSpacing: "-0.02em" }}>
            Начните использовать EventCore уже сегодня
          </h2>
          <p className="mb-7 max-w-xl mx-auto text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
            Создайте аккаунт и получите доступ ко всем инструментам управления мероприятиями — бесплатно.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={onRegister}
              className="flex items-center gap-2 px-7 py-2.5 text-sm font-medium rounded-md text-white transition-all hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: C.red, boxShadow: `0 3px 12px ${C.redAlpha(0.35)}` }}
            >
              <Icon name="UserPlus" size={14} />
              Зарегистрироваться
            </button>
            <button
              onClick={onLogin}
              className="flex items-center gap-2 px-7 py-2.5 text-sm font-medium rounded-md transition-all hover:bg-white/8"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.8)" }}
            >
              <Icon name="LogIn" size={14} />
              Уже есть аккаунт
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-100 py-7">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col w-5 h-3.5 rounded-sm overflow-hidden shrink-0 border border-slate-200">
              <div className="flex-1 bg-white" />
              <div className="flex-1" style={{ background: C.blue }} />
              <div className="flex-1" style={{ background: C.red }} />
            </div>
            <span className="text-xs font-700 text-foreground leading-tight">Цифровая платформа организации<br />мероприятий Запорожской области</span>
            <span className="text-xs text-muted-foreground">© 2025</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Возможности</a>
            <a href="#roles" className="hover:text-foreground transition-colors">О платформе</a>
            <button onClick={onLogin} className="hover:text-foreground transition-colors">Войти</button>
            <button onClick={onRegister} className="font-medium transition-colors hover:opacity-80" style={{ color: C.blue }}>Регистрация</button>
          </div>
        </div>
      </footer>
    </div>
  );
}