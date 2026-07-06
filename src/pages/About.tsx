import { Link } from '@tanstack/react-router';

export default function AboutPage() {
  return (
    <section className="space-y-6 rounded-3xl border border-border bg-white/90 p-8 shadow-sm shadow-slate-900/5">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink">About Fenan Dental Clinic</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          At Fenan Dental Clinic, we combine advanced technology with compassionate care so every patient leaves with a healthier smile.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/services"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Our Services</h2>
          <p className="mt-1 text-sm text-muted-foreground">See the treatments available for your smile.</p>
        </Link>
        <Link
          to="/contact"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Contact Us</h2>
          <p className="mt-1 text-sm text-muted-foreground">Book an appointment or ask a question.</p>
        </Link>
      </div>
    </section>
  );
}
