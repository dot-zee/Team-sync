import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const {
    navigate,
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    watch,
    errors,
    isSubmitting,
    getPasswordStrength,
    onRegister,
  } = useAuth();

  const password = watch("password", "");

  const strength = getPasswordStrength(password);

  return (
    <main className="min-h-screen bg-[#141217] text-white">
      <div className="flex min-h-screen">
        {/* =====================================================
            LEFT BRAND / VISUAL PANEL
        ====================================================== */}

        <aside className="relative hidden w-[33%] min-w-[430px] overflow-hidden border-r border-[#292536] lg:flex">
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src="/images/RegisterPage-background.jpg"
              alt=""
              className="h-full w-full object-cover"
            />

            {/* Dark overlays */}
            <div className="absolute inset-0 bg-[#071329]/30" />

            <div className="absolute inset-0 bg-gradient-to-b from-[#071329]/10 via-[#071329]/10 to-[#0c0b12]" />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#11111b]/20" />
          </div>

          {/* Brand */}
          <div className="absolute left-7 top-6 z-10">
            <span className="text-[23px] font-semibold tracking-[-0.5px] text-[#ebe8ef]">
              Team-sync
            </span>
          </div>

          {/* Marketing content */}
          <div className="absolute bottom-[61px] left-[49px] right-[45px] z-10">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <SparkleIcon />

              <span className="text-[12px] font-semibold tracking-[3px] text-[#d4c1f5]">
                NEXT-GEN INTELLIGENCE
              </span>
            </div>

            <h2 className="max-w-[410px] text-[35px] font-semibold leading-[1.15] tracking-[-1px] text-[#f0edf3]">
              Accelerate your team's
              <br />
              intelligence.
            </h2>

            <p className="mt-6 max-w-[430px] text-[18px] leading-[1.5] text-[#d0ccd5]">
              Connect your enterprise data to our specialized AI models and
              unlock unparalleled strategic insights in seconds.
            </p>

            {/* Stats */}
            <div className="mt-14 flex items-start gap-10">
              <div>
                <div className="text-[22px] font-semibold tracking-[-0.5px] text-[#e9e5ed]">
                  99.9%
                </div>

                <div className="mt-1 text-[13px] text-[#96919e]">
                  Uptime SLA
                </div>
              </div>

              <div>
                <div className="text-[22px] font-semibold tracking-[-0.5px] text-[#e9e5ed]">
                  ISO
                </div>

                <div className="mt-1 text-[13px] text-[#96919e]">
                  27001 Certified
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* =====================================================
            RIGHT REGISTRATION PANEL
        ====================================================== */}

        <section className="flex min-h-screen flex-1 flex-col">
          {/* Main form area */}
          <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20">
            <div className="w-full max-w-[600px]">
              {/* Heading */}
              <div className="mb-10">
                <h1 className="text-[36px] font-semibold leading-tight tracking-[-1.3px] text-[#eeeaf1] sm:text-[38px]">
                  Create your account
                </h1>

                <p className="mt-2.5 text-[17px] text-[#c1bdc7]">
                  Experience the future of collaborative data intelligence.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onRegister)} noValidate>
                {/* =================================================
                    FULL NAME
                ================================================== */}

                <div className="mb-7">
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-[13px] font-semibold tracking-[0.15px] text-[#c8c3cd]"
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2">
                      <UserIcon />
                    </div>

                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className={`
                        h-[60px]
                        w-full
                        rounded-[8px]
                        border
                        bg-[#1d1b20]
                        pl-[65px]
                        pr-[18px]
                        text-[16px]
                        text-[#e5e1e8]
                        outline-none
                        transition-all
                        placeholder:text-[#625d68]
                        ${
                          errors.fullName
                            ? "border-red-500/70 focus:border-red-500"
                            : "border-[#4b4653] focus:border-[#8c6bd1] focus:ring-2 focus:ring-[#8c6bd1]/10"
                        }
                      `}
                      {...register("fullName", {
                        required: "Full name is required",
                        minLength: {
                          value: 2,
                          message: "Please enter your full name",
                        },
                      })}
                    />
                  </div>

                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    EMAIL
                ================================================== */}

                <div className="mb-7">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[13px] font-semibold tracking-[0.15px] text-[#c8c3cd]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2">
                      <MailIcon />
                    </div>

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@company.com"
                      className={`
                        h-[60px]
                        w-full
                        rounded-[8px]
                        border
                        bg-[#1d1b20]
                        pl-[65px]
                        pr-[18px]
                        text-[16px]
                        text-[#e5e1e8]
                        outline-none
                        transition-all
                        placeholder:text-[#625d68]
                        ${
                          errors.email
                            ? "border-red-500/70 focus:border-red-500"
                            : "border-[#4b4653] focus:border-[#8c6bd1] focus:ring-2 focus:ring-[#8c6bd1]/10"
                        }
                      `}
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    PASSWORD
                ================================================== */}

                <div className="mb-7">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[13px] font-semibold tracking-[0.15px] text-[#c8c3cd]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2">
                      <LockIcon />
                    </div>

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      className={`
                        h-[60px]
                        w-full
                        rounded-[8px]
                        border
                        bg-[#1d1b20]
                        pl-[65px]
                        pr-[55px]
                        text-[16px]
                        text-[#e5e1e8]
                        outline-none
                        transition-all
                        placeholder:text-[#625d68]
                        ${
                          errors.password
                            ? "border-red-500/70 focus:border-red-500"
                            : "border-[#4b4653] focus:border-[#8c6bd1] focus:ring-2 focus:ring-[#8c6bd1]/10"
                        }
                      `}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message:
                            "Password must contain at least 8 characters",
                        },
                      })}
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword((value) => !value)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6d6874] transition-colors hover:text-[#aaa4b0]"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </button>
                  </div>

                  {/* Password strength */}
                  {password && (
                    <div className="mt-2">
                      <div className="flex h-[5px] gap-[5px]">
                        {[0, 1, 2, 3].map((index) => (
                          <div
                            key={index}
                            className={`
                              h-full flex-1 rounded-full transition-all duration-300
                              ${
                                index < strength.score
                                  ? "bg-[#bca1ef]"
                                  : "bg-[#292630]"
                              }
                            `}
                          />
                        ))}
                      </div>

                      <p
                        className={`
                          mt-1.5 text-[13px]
                          ${
                            strength.score >= 3
                              ? "text-[#c8b0f1]"
                              : "text-[#96909c]"
                          }
                        `}
                      >
                        {strength.label}
                      </p>
                    </div>
                  )}

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    TERMS
                ================================================== */}

                <div className="mb-7">
                  <label className="group flex cursor-pointer items-start gap-4">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      {...register("terms", {
                        required:
                          "You must accept the Terms of Service and Privacy Policy",
                      })}
                    />

                    <span className="relative mt-[1px] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[5px] border border-[#514b58] bg-[#1c1a1f] transition-all peer-checked:border-[#8c6bd1] peer-checked:bg-[#7052b5]">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-[14px] w-[14px] text-white opacity-0 transition-opacity peer-checked:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 8l3 3 7-7" />
                      </svg>
                    </span>

                    <span className="text-[13px] leading-[22px] text-[#b9b4be]">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-[#c1a7ed] hover:text-[#d2bff4]"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-[#c1a7ed] hover:text-[#d2bff4]"
                      >
                        Privacy Policy
                      </button>
                      .
                    </span>
                  </label>

                  {errors.terms && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.terms.message}
                    </p>
                  )}
                </div>

                {/* =================================================
                    CREATE ACCOUNT
                ================================================== */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    flex
                    h-[59px]
                    w-full
                    items-center
                    justify-center
                    rounded-[8px]
                    bg-gradient-to-r
                    from-[#7656bd]
                    to-[#c1a6f1]
                    text-[17px]
                    font-semibold
                    tracking-[-0.1px]
                    text-[#160d29]
                    shadow-[0_8px_25px_rgba(118,86,189,0.12)]
                    transition-all
                    duration-200
                    hover:brightness-110
                    hover:shadow-[0_10px_35px_rgba(118,86,189,0.2)]
                    active:scale-[0.995]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <SpinnerIcon />
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div className="my-12 flex items-center gap-5">
                <div className="h-px flex-1 bg-[#292630]" />

                <span className="whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.5px] text-[#605b67]">
                  OR CONTINUE WITH
                </span>

                <div className="h-px flex-1 bg-[#292630]" />
              </div>

              {/* =================================================
                  SOCIAL AUTH
              ================================================== */}

              <div className="grid grid-cols-2 gap-5">
                <button
                  type="button"
                  className="
                    flex
                    h-[59px]
                    items-center
                    justify-center
                    gap-3
                    rounded-[8px]
                    border
                    border-[#4b4653]
                    bg-transparent
                    text-[16px]
                    text-[#d8d3dc]
                    transition-all
                    hover:border-[#696273]
                    hover:bg-[#1b1920]
                  "
                >
                  <GoogleColoredIcon />
                  Google
                </button>

                <button
                  type="button"
                  className="
                    flex
                    h-[59px]
                    items-center
                    justify-center
                    gap-3
                    rounded-[8px]
                    border
                    border-[#4b4653]
                    bg-transparent
                    text-[16px]
                    text-[#d8d3dc]
                    transition-all
                    hover:border-[#696273]
                    hover:bg-[#1b1920]
                  "
                >
                  <SsoIcon />
                  SSO
                </button>
              </div>

              {/* =================================================
                  LOGIN
              ================================================== */}

              <div className="mt-14 text-center text-[16px] text-[#c1bdc6]">
                Already have an account?
                <button
                  onClick={() => navigate("/")}
                  type="button"
                  className="ml-2 font-semibold text-[#c4a9ef] transition-colors hover:text-[#d7c5f5]"
                >
                  Log In
                </button>
              </div>
            </div>
          </div>

          {/* =====================================================
              FOOTER
          ====================================================== */}

          <footer className="border-t border-[#25222c] px-6 py-8 sm:px-10 lg:px-16 xl:px-20">
            <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
              <div className="text-[20px] font-semibold text-[#e4e0e7]">
                Team-sync
              </div>

              <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
                <button className="text-[13px] text-[#aaa5af] transition-colors hover:text-[#ddd8e0]">
                  Privacy Policy
                </button>

                <button className="text-[13px] text-[#aaa5af] transition-colors hover:text-[#ddd8e0]">
                  Terms of Service
                </button>

                <button className="text-[13px] text-[#aaa5af] transition-colors hover:text-[#ddd8e0]">
                  Security
                </button>

                <button className="text-[13px] text-[#aaa5af] transition-colors hover:text-[#ddd8e0]">
                  System Status
                </button>
              </nav>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}

/* =============================================================
   ICONS
============================================================= */

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19c.7-3.1 3-4.7 6.5-4.7s5.8 1.6 6.5 4.7" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="10" width="14" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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
      className="h-[20px] w-[20px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
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

function SparkleIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-[25px] w-[25px] text-[#d7c1f5]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M10 2v10M5 7h10M22 11v6M19 14h6M12 19v9M7.5 23.5h9"
        strokeWidth="1.5"
      />

      <path
        d="M20 5l1.3 3.7L25 10l-3.7 1.3L20 15l-1.3-3.7L15 10l3.7-1.3L20 5Z"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function GoogleColoredIcon() {
  return (
    <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#1c1918]">
      <span className="text-[13px] font-semibold text-[#c37d39]">G</span>
    </div>
  );
}

function SsoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-[21px] w-[21px] text-[#d4cedb]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="5" cy="7" r="2" />
      <circle cx="19" cy="7" r="2" />
      <circle cx="5" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />

      <path d="m10.2 10.7-3.5-2.6" />
      <path d="m13.8 10.7 3.5-2.6" />
      <path d="m10.2 13.3-3.5 2.6" />
      <path d="m13.8 13.3 3.5 2.6" />
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
