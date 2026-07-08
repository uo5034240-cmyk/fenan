import { Link } from '@tanstack/react-router';

export default function ContactPage() {
  return (
    <section className="space-y-6 rounded-3xl border border-border bg-white/90 p-8 shadow-sm shadow-slate-900/5">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-ink">Contact</h1>
        <p className="max-w-2xl text-base text-muted-foreground">
          Have a question or want to schedule a visit? Our team is ready to help you find the right care.
        </p>
      </div>
      <div className="space-y-3 text-sm text-muted-foreground">
        <p>
          <strong>Phone:</strong> +251 123 456 789
        </p>
        <p>
          <strong>Email:</strong> info@fenandentalclinic.com
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          to="/"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">Back to Home</h2>
          <p className="mt-1 text-sm text-muted-foreground">Return to the main landing page.</p>
        </Link>
        <Link
          to="/services"
          className="rounded-2xl border border-border bg-slate-50 px-5 py-4 text-left transition hover:border-teal/70 hover:bg-teal/5"
        >
          <h2 className="text-lg font-semibold text-ink">View Services</h2>
          <p className="mt-1 text-sm text-muted-foreground">Explore the care options we offer.</p>
        </Link>
      </div>
    </section>
  );
}
