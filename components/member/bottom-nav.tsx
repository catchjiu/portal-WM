"use client";

import { CalendarDays, CreditCard, LayoutGrid, ShoppingBag } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const items = [
  { key: "dashboard", href: "/dashboard", icon: LayoutGrid },
  { key: "schedule", href: "/schedule", icon: CalendarDays },
  { key: "shop", href: "/shop", icon: ShoppingBag },
  { key: "payments", href: "/payments", icon: CreditCard },
] as const;

export function BottomNav() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav className="sticky bottom-4 z-20 rounded-3xl border border-slate-800 bg-slate-900/90 p-2 backdrop-blur">
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => {
          const active =
            pathname === item.href || pathname === `/${locale}${item.href}`;
          const Icon = item.icon;

          return (
            <li key={item.key}>
              <Link
                className={cn(
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-medium transition-colors",
                  active
                    ? "bg-cyan-400 text-slate-950"
                    : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100",
                )}
                href={item.href}
              >
                <Icon className="size-4" />
                <span>{t(item.key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
