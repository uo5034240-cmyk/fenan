import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

type PageShellProps = {
  title: string;
  description: string;
  children: ReactNode;
  eyebrow?: string;
};

export function PageShell({ title, description, children, eyebrow = "Fenan Dental Clinic" }: PageShellProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.10),_transparent_45%),linear-gradient(135deg,_#f8fcfb_0%,_#ffffff_100%)]">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal text-sm font-semibold text-white">
              FD
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold text-ink">Fenan Dental</span>
              <span className="mt-0.5 text-[10px] font-medium tracking-[0.28em] text-teal">CLINIC</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition hover:text-teal ${pathname === item.to ? "text-teal" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10">
        <section className="rounded-[2rem] border border-border bg-white/90 p-8 shadow-sm shadow-slate-900/5">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-teal">{eyebrow}</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">{description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
              Book an appointment
            </Link>
            <Link to="/services" className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-ink transition hover:border-teal">
              Explore services
            </Link>
          </div>
        </section>

        {children}
      </main>

      <footer className="border-t border-border/80 bg-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>© 2026 Fenan Dental Clinic. Compassionate care in Addis Ababa.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/about" className="transition hover:text-teal">
              About
            </Link>
            <Link to="/services" className="transition hover:text-teal">
              Services
            </Link>
            <Link to="/contact" className="transition hover:text-teal">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
