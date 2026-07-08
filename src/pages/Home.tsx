import { Link } from '@tanstack/react-router';

export default function HomePage() {
  return (
    <section className="space-y-6 rounded-3xl border border-border bg-white/90 p-8 shadow-sm shadow-slate-900/5">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.25em] text-teal">Welcome</p>
        <h1 className="text-4xl font-bold tracking-tight text-ink">Fenan Dental Clinic</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Modern dental care in Addis Ababa with a patient-first approach. Explore our services and learn how we keep your smile healthy.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/about"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">About Us</h2>
          <p className="mt-1 text-sm text-muted-foreground">Learn about our clinic, values, and patient care.</p>
        </Link>
        <Link
          to="/services"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Services</h2>
          <p className="mt-1 text-sm text-muted-foreground">Discover the dental treatments we offer for every smile.</p>
        </Link>
        <Link
          to="/contact"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Contact</h2>
          <p className="mt-1 text-sm text-muted-foreground">Book an appointment or get in touch with our team.</p>
        </Link>
        <Link
          to="/"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Home again</h2>
          <p className="mt-1 text-sm text-muted-foreground">Go back to the homepage anytime.</p>
        </Link>
      </div>
    </section>
  );
}
