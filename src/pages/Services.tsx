import { Link } from '@tanstack/react-router';

export default function ServicesPage() {
  return (
    <section className="space-y-6 rounded-3xl border border-border bg-white/90 p-8 shadow-sm shadow-slate-900/5">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Our Services</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          We offer preventive care, restorative dentistry, cosmetic treatments, and emergency support with a warm, patient-first experience.
        </p>
      </div>
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li>• General dentistry & cleanings</li>
        <li>• Cosmetic smile design</li>
        <li>• Root canal therapy</li>
        <li>• Dental implants and crowns</li>
      </ul>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/contact"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Book an Appointment</h2>
          <p className="mt-1 text-sm text-muted-foreground">Reach out for availability and scheduling.</p>
        </Link>
        <Link
          to="/about"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Learn More</h2>
          <p className="mt-1 text-sm text-muted-foreground">Read more about our mission and team.</p>
        </Link>
      </div>
    </section>
  );
}
