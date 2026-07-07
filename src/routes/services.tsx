import { createFileRoute, Link } from '@tanstack/react-router';
import { PageShell } from '@/components/PageShell';

const SERVICES = [
  { title: 'General Dentistry', description: 'Preventive checkups, cleanings, and treatment plans built around long-term oral health.' },
  { title: 'Cosmetic Dentistry', description: 'Whitening, veneers, and smile design for a more confident appearance.' },
  { title: 'Orthodontics', description: 'Clear aligners and braces to create straight, comfortable smiles.' },
  { title: 'Implants & Restorations', description: 'Natural-looking crowns, bridges, and implant-supported replacements.' },
];

function ServicesPage() {
  return (
    <PageShell
      title="Our Services"
      description="From everyday preventive care to advanced restorative treatments, our clinic supports every smile with precision and comfort."
      eyebrow="Services"
    >
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-4">
          {SERVICES.map((service) => (
            <div key={service.title} className="rounded-[1.5rem] border border-border bg-white/90 p-6 shadow-sm shadow-slate-900/5">
              <h2 className="text-lg font-semibold text-ink">{service.title}</h2>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="rounded-[1.5rem] border border-border bg-slate-50 p-7 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Ready to get started?</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Contact our team to schedule a consultation and discover the right treatment plan for your smile.
          </p>
          <div className="mt-6 space-y-3">
            <Link to="/contact" className="block rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-teal/70 hover:bg-teal/5">
              <h3 className="font-semibold text-ink">Book a consultation</h3>
              <p className="mt-1 text-sm text-muted-foreground">We will help you choose the best next step.</p>
            </Link>
            <Link to="/about" className="block rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-teal/70 hover:bg-teal/5">
              <h3 className="font-semibold text-ink">Learn about our approach</h3>
              <p className="mt-1 text-sm text-muted-foreground">See how compassionate care guides every treatment.</p>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute('/services')({
  component: ServicesPage,
});
