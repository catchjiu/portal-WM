import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-6 sm:px-6">
      <header className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-800 bg-slate-900/50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-4xl uppercase tracking-[0.18em] text-white">
            Admin Dashboard
          </p>
          <p className="text-sm text-slate-400">
            Attendance, finances, and member operations.
          </p>
        </div>
        <div className="flex gap-3 text-sm">
          <Link className="rounded-2xl border border-slate-800 px-4 py-2 text-slate-200" href="/dashboard">
            Member view
          </Link>
          <Link className="rounded-2xl border border-slate-800 px-4 py-2 text-slate-200" href="/admin/members">
            Members
          </Link>
          <Link className="rounded-2xl border border-slate-800 px-4 py-2 text-slate-200" href="/admin/inventory">
            Inventory
          </Link>
          <Link className="rounded-2xl border border-slate-800 px-4 py-2 text-slate-200" href="/admin/payments">
            Payment review
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
