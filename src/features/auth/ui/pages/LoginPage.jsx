import { useAuth } from "../../hooks/useAuth";

export default function LoginInPage() {

  const { navigate , showPassword , setShowPassword , register , handleSubmit , errors , isSubmitting , onLogin} = useAuth()

  return (
    <main className="min-h-screen bg-[#141218] text-white flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,91,190,0.035),transparent_50%)]" />

        <div className="absolute left-[-180px] top-[120px] h-[500px] w-[500px] rounded-full bg-[#6f4db2]/[0.025] blur-[120px]" />

        <div className="absolute right-[-100px] bottom-[-100px] h-[500px] w-[500px] rounded-full bg-[#6f4db2]/[0.025] blur-[120px]" />
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex w-full max-w-[1080px] items-center justify-center gap-[156px] px-6 py-12">
        {/* =========================
            SIGN IN CARD
        ========================== */}
        <section className="w-full max-w-[488px] rounded-[13px] border border-white/[0.08] bg-[#1d1b20] px-9 pb-8 pt-9 shadow-[0_20px_70px_rgba(0,0,0,0.22)]">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="flex h-[54px] w-[54px] items-center justify-center rounded-[9px] bg-[#7052b5] shadow-[0_5px_20px_rgba(112,82,181,0.18)]">
              <NetworkIcon />
            </div>
          </div>

          {/* Heading */}
          <div className="mt-5 text-center">
            <h1 className="text-[28px] font-semibold leading-tight tracking-[-0.7px] text-[#e7e3e9]">
              Team-Sync
            </h1>

            <p className="mt-1.5 text-[16px] text-[#bbb7c0]">
              Sign in to your workspace
            </p>
          </div>

          {/* OAuth */}
          <div className="mt-9 grid grid-cols-2 gap-4">
            <button
              type="button"
              className="group flex h-[47px] items-center justify-center gap-3 rounded-[8px] border border-white/[0.08] bg-[#2b292e] text-[14px] font-semibold tracking-[0.2px] text-[#ddd9e0] transition-all duration-200 hover:border-white/[0.14] hover:bg-[#312f34] active:scale-[0.99]"
            >
              <GoogleIcon />
              GOOGLE
            </button>

            <button
              type="button"
              className="group flex h-[47px] items-center justify-center gap-3 rounded-[8px] border border-white/[0.08] bg-[#2b292e] text-[14px] font-semibold tracking-[0.2px] text-[#ddd9e0] transition-all duration-200 hover:border-white/[0.14] hover:bg-[#312f34] active:scale-[0.99]"
            >
              <GithubIcon />
              GITHUB
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center gap-5">
            <div className="h-px flex-1 bg-white/[0.07]" />

            <span className="whitespace-nowrap text-[14px] text-[#aaa5af]">
              or continue with email
            </span>

            <div className="h-px flex-1 bg-white/[0.07]" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onLogin)} noValidate>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-[13px] font-semibold tracking-[0.35px] text-[#bdb8c3]"
              >
                EMAIL ADDRESS
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                className={`h-[47px] w-full rounded-[8px] border bg-[#0f0d12] px-[18px] text-[16px] text-[#e7e3e9] outline-none transition-all placeholder:text-[#706b75] ${
                  errors.email
                    ? "border-red-500/70 focus:border-red-500"
                    : "border-white/[0.09] focus:border-[#7556bc] focus:ring-2 focus:ring-[#7556bc]/10"
                }`}
                {...register("email", {
                  required: "Email address is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />

              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mt-7">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[13px] font-semibold tracking-[0.35px] text-[#bdb8c3]"
                >
                  PASSWORD
                </label>

                <button
                  type="button"
                  className="text-[14px] font-medium text-[#c0a9ec] transition-colors hover:text-[#d3c2f4]"
                  onClick={() => {
                    console.log("Forgot password clicked");
                  }}
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className={`h-[47px] w-full rounded-[8px] border bg-[#0f0d12] px-[18px] pr-12 text-[16px] text-[#e7e3e9] outline-none transition-all placeholder:text-[#706b75] ${
                    errors.password
                      ? "border-red-500/70 focus:border-red-500"
                      : "border-white/[0.09] focus:border-[#7556bc] focus:ring-2 focus:ring-[#7556bc]/10"
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must contain at least 6 characters",
                    },
                  })}
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77727d] transition-colors hover:text-[#aaa5af]"
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="mt-7 flex items-center">
              <label className="group flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  {...register("remember")}
                />

                <span className="relative flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border border-white/[0.14] bg-[#0f0d12] transition-all peer-checked:border-[#7052b5] peer-checked:bg-[#7052b5]">
                  <svg
                    viewBox="0 0 12 12"
                    className="hidden h-3 w-3 text-white peer-checked:block"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2.5 6L5 8.5L9.5 3.5" />
                  </svg>
                </span>

                <span className="text-[14px] text-[#aaa5af] transition-colors group-hover:text-[#c5c0c9]">
                  Stay signed in
                </span>
              </label>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex h-[58px] w-full items-center justify-center gap-3 rounded-[8px] bg-[#7052b5] text-[16px] font-medium text-[#eeeaf4] shadow-[0_8px_25px_rgba(112,82,181,0.12)] transition-all duration-200 hover:bg-[#7a5bc0] hover:shadow-[0_10px_30px_rgba(112,82,181,0.2)] active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <SpinnerIcon />
                  LoginInPageg In...
                </>
              ) : (
                <>
                  Sign In
                  <LoginIcon />
                </>
              )}
            </button>
          </form>

          {/* Bottom Divider */}
          <div className="mt-8 h-px w-full bg-white/[0.07]" />

          {/* Sign Up */}
          <div className="mt-7 text-center text-[14px] text-[#aaa5af]">
            Don't have an account?
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="ml-2 font-semibold text-[#c0a9ec] transition-colors hover:text-[#d5c5f5]"
            >
              Sign Up
            </button>
          </div>
        </section>

        {/* =========================
            DECORATIVE VISUAL
        ========================== */}
        <div className="hidden h-[285px] w-[285px] shrink-0 items-center justify-center rounded-[12px] border border-white/[0.025] bg-[#121016] md:flex">
          <div className="relative h-[210px] w-[210px]">
            {/* Glow */}
            <div className="absolute inset-[35px] rounded-full bg-[#7754b7]/[0.06] blur-[35px]" />

            {/* Abstract Synthetix mark */}
            <svg
              viewBox="0 0 240 240"
              className="relative h-full w-full opacity-[0.22]"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="purpleGradient"
                  x1="30"
                  y1="20"
                  x2="210"
                  y2="220"
                >
                  <stop offset="0%" stopColor="#8f68d1" />
                  <stop offset="50%" stopColor="#6d4aa9" />
                  <stop offset="100%" stopColor="#3f315c" />
                </linearGradient>

                <filter id="softGlow">
                  <feGaussianBlur stdDeviation="2.5" />
                </filter>
              </defs>

              {/* Outer flowing lines */}
              <path
                d="M47 90C67 48 126 35 169 55C202 71 211 108 193 140C177 169 139 192 103 188C69 184 43 158 41 130C39 115 42 101 47 90Z"
                stroke="url(#purpleGradient)"
                strokeWidth="2"
              />

              <path
                d="M63 78C95 45 149 46 181 75C207 99 201 135 177 159C153 183 111 185 79 166C50 148 43 115 63 78Z"
                stroke="url(#purpleGradient)"
                strokeWidth="2"
              />

              <path
                d="M82 66C112 50 153 58 174 83C193 106 185 134 162 151C138 168 104 163 83 145C60 126 61 88 82 66Z"
                stroke="url(#purpleGradient)"
                strokeWidth="2"
              />

              <path
                d="M102 65C128 59 154 70 164 91C175 113 163 135 143 146C123 157 98 149 87 130C75 109 82 77 102 65Z"
                stroke="url(#purpleGradient)"
                strokeWidth="2"
              />

              {/* Network nodes */}
              <g fill="#9270cc" filter="url(#softGlow)">
                <circle cx="72" cy="91" r="4" />
                <circle cx="105" cy="62" r="4" />
                <circle cx="151" cy="72" r="4" />
                <circle cx="178" cy="103" r="4" />
                <circle cx="160" cy="143" r="4" />
                <circle cx="119" cy="161" r="4" />
                <circle cx="81" cy="139" r="4" />
              </g>

              <g stroke="#8061bb" strokeWidth="1.5" opacity="0.65">
                <path d="M72 91L105 62" />
                <path d="M105 62L151 72" />
                <path d="M151 72L178 103" />
                <path d="M178 103L160 143" />
                <path d="M160 143L119 161" />
                <path d="M119 161L81 139" />
                <path d="M81 139L72 91" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =================================
   ICONS
================================= */

function NetworkIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 text-[#ddd0f5]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="16" cy="16" r="3" />
      <circle cx="7" cy="8" r="2.3" />
      <circle cx="25" cy="8" r="2.3" />
      <circle cx="7" cy="24" r="2.3" />
      <circle cx="25" cy="24" r="2.3" />

      <path d="M13.8 13.8L8.8 10.2" />
      <path d="M18.2 13.8L23.2 10.2" />
      <path d="M13.8 18.2L8.8 21.8" />
      <path d="M18.2 18.2L23.2 21.8" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none">
      <path
        d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.93-4.2 2.93-7.39Z"
        fill="#bcb8c2"
      />
      <path
        d="M12 21.67c2.63 0 4.84-.87 6.45-2.35l-3.14-2.43c-.87.58-1.98.93-3.31.93-2.54 0-4.7-1.72-5.47-4.03H3.28v2.51A9.74 9.74 0 0 0 12 21.67Z"
        fill="#a9a5af"
      />
      <path
        d="M6.53 13.79a5.86 5.86 0 0 1 0-3.57V7.71H3.28a9.75 9.75 0 0 0 0 8.59l3.25-2.51Z"
        fill="#c7c3cc"
      />
      <path
        d="M12 6.19c1.43 0 2.72.49 3.74 1.46l2.8-2.8C16.83 3.29 14.63 2.33 12 2.33a9.74 9.74 0 0 0-8.72 5.38l3.25 2.51C7.3 7.91 9.46 6.19 12 6.19Z"
        fill="#d2ced6"
      />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px] text-[#c4c0c8]"
      fill="currentColor"
    >
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 19.5v-15Zm3.2 1.4v5.4h4.1v2.2H7.2v5.2h2.3v-3h2.3v-2.2h2.4c2.1 0 3.6-1.4 3.6-3.8 0-2.4-1.5-3.8-3.6-3.8H7.2Zm2.3 2.2h3.1c.7 0 1.1.4 1.1 1.2s-.4 1.2-1.1 1.2H9.5V8.1Z" />
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 5h6v14h-6" />
      <path d="M3 12h10" />
      <path d="m9 8 4 4-4 4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[19px] w-[19px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 3 18 18" />
      <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
      <path d="M9.9 5.3A10.7 10.7 0 0 1 12 5c6 0 9.5 7 9.5 7a17.8 17.8 0 0 1-3 3.8" />
      <path d="M6.3 6.4C3.8 8.2 2.5 12 2.5 12s3.5 6 9.5 6c1.3 0 2.5-.3 3.6-.8" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />

      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
