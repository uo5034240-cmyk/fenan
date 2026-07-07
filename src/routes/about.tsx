import { createFileRoute, Link } from '@tanstack/react-router';
import { PageShell } from '@/components/PageShell';

function AboutPage() {
  return (
    <PageShell
      title="About Fenan Dental Clinic"
      description="We pair gentle care with modern dentistry so every patient feels informed, comfortable, and confident in their treatment plan."
      eyebrow="About us"
    >
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[1.5rem] border border-border bg-white/90 p-7 shadow-sm shadow-slate-900/5">
          <h2 className="text-xl font-semibold text-ink">Why patients choose us</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Our team focuses on preventive care, honest guidance, and thoughtful treatment plans that prioritize long-term health over quick fixes.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold text-ink">Patient-first approach</h3>
              <p className="mt-2 text-sm text-muted-foreground">We explain every step so you feel calm and confident from consultation to follow-up.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <h3 className="font-semibold text-ink">Modern technology</h3>
              <p className="mt-2 text-sm text-muted-foreground">We use digital tools and contemporary materials for accurate, comfortable care.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border bg-slate-50 p-7 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Helpful links</h2>
          <div className="mt-5 space-y-3">
            <Link to="/services" className="block rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-teal/70 hover:bg-teal/5">
              <h3 className="font-semibold text-ink">Explore services</h3>
              <p className="mt-1 text-sm text-muted-foreground">See the treatments we provide for every stage of oral health.</p>
            </Link>
            <Link to="/contact" className="block rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-teal/70 hover:bg-teal/5">
              <h3 className="font-semibold text-ink">Book a visit</h3>
              <p className="mt-1 text-sm text-muted-foreground">Schedule your appointment and speak with our team directly.</p>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute('/about')({
  component: AboutPage,
});
