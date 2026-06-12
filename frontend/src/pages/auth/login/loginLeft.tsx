export default function loginLeft() {
    return(
        <div className="relative overflow-hidden bg-linear-to-br from-indigo-700 via-blue-700 to-violet-700 text-white">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_28%)]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex h-full items-center justify-center px-6 py-10 sm:px-12">
            <div className="max-w-lg">
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                Modern team finance
              </span>
              <h2 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Simplified petty cash management for modern teams.
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/80 sm:text-base">
                Streamline your office expenses with real-time tracking,
                automated approvals, and bank-grade security. Join 5,000+
                businesses scaling with PettyCash Pro.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-4xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                    Uptime reliability
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    99.9%
                  </p>
                </div>
                <div className="rounded-4xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                    AES encryption
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    256-bit
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}