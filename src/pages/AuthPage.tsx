import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  mode: "login" | "register";
  onLogin: () => void;
  onBack: () => void;
  onSwitchMode: (mode: "login" | "register") => void;
}

type UserRole = "participant" | "volunteer" | "organizer";

const roleOptions: { value: UserRole; label: string; desc: string; icon: string }[] = [
  { value: "participant", label: "Участник", desc: "Подаю заявки и участвую в мероприятиях", icon: "UserCheck" },
  { value: "volunteer", label: "Волонтёр", desc: "Помогаю в организации и сопровождении", icon: "UserCog" },
  { value: "organizer", label: "Организатор", desc: "Создаю и провожу мероприятия", icon: "Briefcase" },
];

export default function AuthPage({ mode, onLogin, onBack, onSwitchMode }: Props) {
  const [selectedRole, setSelectedRole] = useState<UserRole>("participant");
  const [step, setStep] = useState<1 | 2>(1);
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && step === 1) {
      setStep(2);
      return;
    }
    onLogin();
  };

  return (
    <div className="font-golos min-h-screen flex" style={{ background: "#f8f9fc" }}>

      {/* ── Левая панель — декоративная ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 p-10 relative overflow-hidden"
        style={{ background: "#0f2a5e" }}
      >
        {/* Триколор полосы снизу */}
        <div className="absolute bottom-0 left-0 right-0 flex h-1.5">
          <div className="flex-1 bg-white" />
          <div className="flex-1" style={{ background: "#003DA5" }} />
          <div className="flex-1" style={{ background: "#CC0000" }} />
        </div>

        {/* Геометрический фон */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 28px)",
          }}
        />
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full opacity-5" style={{ background: "#003DA5" }} />
        <div className="absolute -left-8 bottom-32 w-40 h-40 rounded-full opacity-5" style={{ background: "#CC0000" }} />

        {/* Logo */}
        <div className="relative">
          <button onClick={onBack} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#003DA5" }}>
              <Icon name="Zap" size={17} className="text-white" />
            </div>
            <div>
              <div className="text-white font-800 text-sm tracking-tight">EventCore</div>
              <div className="text-white/40 text-xs">Управление событиями</div>
            </div>
          </button>
        </div>

        {/* Центральный контент */}
        <div className="relative space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-6" style={{ background: "#CC0000" }} />
              <span className="text-xs font-medium uppercase tracking-widest text-white/40">Платформа</span>
            </div>
            <h2 className="text-2xl font-800 text-white leading-tight tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              Централизованное управление мероприятиями любого уровня
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { icon: "Shield", text: "Предварительная модерация заявок" },
              { icon: "Eye", text: "Разграничение прав по ролям" },
              { icon: "MapPin", text: "Скрытие адресов закрытых событий" },
              { icon: "BarChart3", text: "Отчётность и аналитика" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0" style={{ background: "rgba(0,61,165,0.3)" }}>
                  <Icon name={f.icon} size={14} className="text-white" />
                </div>
                <span className="text-sm text-white/70">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat */}
        <div className="relative flex gap-6">
          {[
            { val: "500+", label: "Мероприятий" },
            { val: "12K+", label: "Участников" },
            { val: "98%", label: "Удовлетворённость" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xl font-800 text-white">{s.val}</div>
              <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Правая панель — форма ── */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 overflow-y-auto">

        {/* Мобильный логотип */}
        <div className="lg:hidden mb-8 flex items-center gap-2">
          <button onClick={onBack} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#003DA5" }}>
              <Icon name="Zap" size={15} className="text-white" />
            </div>
            <span className="font-800 text-foreground">EventCore</span>
          </button>
        </div>

        <div className="w-full max-w-md animate-slide-up">

          {/* Кнопка назад */}
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <Icon name="ChevronLeft" size={14} />
            На главную
          </button>

          {/* Заголовок */}
          <div className="mb-7">
            {/* Шаги регистрации */}
            {!isLogin && (
              <div className="flex items-center gap-2 mb-4">
                {[1, 2].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-700 transition-all"
                      style={{
                        background: step >= s ? "#003DA5" : "#e2e8f0",
                        color: step >= s ? "#fff" : "#94a3b8",
                      }}
                    >
                      {step > s ? <Icon name="Check" size={12} /> : s}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {s === 1 ? "Данные" : "Роль"}
                    </span>
                    {s < 2 && <div className="w-8 h-px bg-slate-200 mx-1" />}
                  </div>
                ))}
              </div>
            )}

            <h1 className="text-2xl font-800 text-foreground tracking-tight" style={{ letterSpacing: "-0.02em" }}>
              {isLogin ? "Вход в систему" : step === 1 ? "Создать аккаунт" : "Выберите роль"}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isLogin
                ? "Введите данные для входа в EventCore"
                : step === 1
                ? "Заполните основную информацию"
                : "Выберите тип участия на платформе"}
            </p>
          </div>

          {/* Форма */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Шаг 1 регистрации или логин */}
            {(isLogin || step === 1) && (
              <>
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-3">
                    {["Фамилия", "Имя"].map((label) => (
                      <div key={label}>
                        <label className="block text-xs font-medium text-foreground mb-1.5">{label}</label>
                        <input
                          type="text"
                          placeholder={label}
                          required
                          className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all"
                          style={{ "--tw-ring-color": "#003DA5" } as React.CSSProperties}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {!isLogin && (
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Отчество</label>
                    <input
                      type="text"
                      placeholder="Отчество (необязательно)"
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="example@mail.ru"
                    required
                    className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 transition-all"
                  />
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Организация</label>
                    <input
                      type="text"
                      placeholder="Название организации"
                      required
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-foreground mb-1.5">Пароль</label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder={isLogin ? "Введите пароль" : "Не менее 8 символов"}
                      required
                      className="w-full px-3 py-2.5 pr-10 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 transition-all"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPass(!showPass)}
                    >
                      <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-xs font-medium text-foreground mb-1.5">Повтор пароля</label>
                    <input
                      type={showPass ? "text" : "password"}
                      placeholder="Повторите пароль"
                      required
                      className="w-full px-3 py-2.5 text-sm border border-border rounded-md bg-white focus:outline-none focus:ring-2 transition-all"
                    />
                  </div>
                )}

                {isLogin && (
                  <div className="flex justify-end">
                    <button type="button" className="text-xs transition-colors" style={{ color: "#003DA5" }}>
                      Забыли пароль?
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Шаг 2 — выбор роли */}
            {!isLogin && step === 2 && (
              <div className="space-y-2.5">
                {roleOptions.map((r) => (
                  <label
                    key={r.value}
                    className="flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150"
                    style={{
                      borderColor: selectedRole === r.value ? "#003DA5" : "#e2e8f0",
                      background: selectedRole === r.value ? "rgba(0,61,165,0.04)" : "#fff",
                    }}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r.value}
                      checked={selectedRole === r.value}
                      onChange={() => setSelectedRole(r.value)}
                      className="sr-only"
                    />
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: selectedRole === r.value ? "rgba(0,61,165,0.1)" : "#f1f5f9" }}
                    >
                      <Icon name={r.icon} size={20} style={{ color: selectedRole === r.value ? "#003DA5" : "#94a3b8" }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-700 text-foreground">{r.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{r.desc}</div>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                      style={{ borderColor: selectedRole === r.value ? "#003DA5" : "#cbd5e1" }}
                    >
                      {selectedRole === r.value && (
                        <div className="w-2 h-2 rounded-full" style={{ background: "#003DA5" }} />
                      )}
                    </div>
                  </label>
                ))}

                <div
                  className="p-3 rounded-lg text-xs text-slate-600 flex items-start gap-2 mt-2"
                  style={{ background: "rgba(0,61,165,0.05)", border: "1px solid rgba(0,61,165,0.12)" }}
                >
                  <Icon name="Info" size={13} className="shrink-0 mt-0.5" style={{ color: "#003DA5" }} />
                  Роль «Организатор» требует дополнительной верификации администратором платформы.
                </div>

                {/* Согласие */}
                <label className="flex items-start gap-2.5 cursor-pointer mt-3">
                  <div
                    className="w-4 h-4 rounded border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all"
                    style={{ borderColor: agreed ? "#003DA5" : "#cbd5e1", background: agreed ? "#003DA5" : "#fff" }}
                    onClick={() => setAgreed(!agreed)}
                  >
                    {agreed && <Icon name="Check" size={10} className="text-white" />}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    Я соглашаюсь с{" "}
                    <span className="underline cursor-pointer" style={{ color: "#003DA5" }}>условиями использования</span>{" "}
                    и{" "}
                    <span className="underline cursor-pointer" style={{ color: "#003DA5" }}>политикой конфиденциальности</span>
                  </span>
                </label>
              </div>
            )}

            {/* Кнопки действий */}
            <div className="pt-1 space-y-3">
              <button
                type="submit"
                disabled={!isLogin && step === 2 && !agreed}
                className="w-full py-2.5 text-sm font-medium rounded-md text-white transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "#003DA5" }}
              >
                {isLogin
                  ? "Войти в систему"
                  : step === 1
                  ? "Продолжить →"
                  : "Создать аккаунт"}
              </button>

              {!isLogin && step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-2.5 text-sm font-medium rounded-md border border-slate-200 text-foreground hover:bg-slate-50 transition-colors"
                >
                  ← Назад
                </button>
              )}
            </div>
          </form>

          {/* Разделитель */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">или</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Переключение режима */}
          <p className="text-center text-sm text-muted-foreground">
            {isLogin ? "Ещё нет аккаунта?" : "Уже зарегистрированы?"}
            {" "}
            <button
              type="button"
              onClick={() => {
                onSwitchMode(isLogin ? "register" : "login");
                setStep(1);
              }}
              className="font-medium transition-colors hover:opacity-80"
              style={{ color: "#003DA5" }}
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </p>

          {/* Триколор декор */}
          <div className="flex justify-center gap-0.5 mt-8">
            <div className="h-0.5 w-8 rounded-l-full bg-slate-200" />
            <div className="h-0.5 w-8" style={{ background: "#003DA5" }} />
            <div className="h-0.5 w-8 rounded-r-full" style={{ background: "#CC0000" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
