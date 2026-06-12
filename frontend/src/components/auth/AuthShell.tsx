import type { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
  rightPanel: ReactNode;
}

export default function AuthShell({ children, rightPanel }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-900">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex items-center bg-white px-6 py-10 sm:px-12 lg:px-16">
          <div className="mx-auto w-full max-w-xl">{children}</div>
        </div>
        {rightPanel}
      </div>
    </div>
  );
}
