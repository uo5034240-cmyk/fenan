import { createFileRoute, Link } from '@tanstack/react-router';
import { PageShell } from '@/components/PageShell';

function ContactPage() {
  return (
    <PageShell
      title="Contact Fenan Dental Clinic"
      description="Whether you want to book a routine visit or ask a general dental question, our team is here to make the next step easy."
      eyebrow="Contact"
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-border bg-white/90 p-7 shadow-sm shadow-slate-900/5">
          <h2 className="text-xl font-semibold text-ink">Reach us</h2>
          <div className="mt-5 space-y-4 text-sm text-muted-foreground">
            <p><span className="font-semibold text-ink">Phone:</span> +251 11 123 4567</p>
            <p><span className="font-semibold text-ink">Email:</span> info@fenandentalclinic.com</p>
            <p><span className="font-semibold text-ink">Address:</span> Bole Road, Addis Ababa, Ethiopia</p>
            <p><span className="font-semibold text-ink">Hours:</span> Mon–Sat · 8:00 AM to 6:00 PM</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border bg-slate-50 p-7 shadow-sm">
          <h2 className="text-xl font-semibold text-ink">Plan your visit</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Share your preferred time and the service you are interested in, and our team will get back to you with the next available appointment.
          </p>
          <div className="mt-6 space-y-3">
            <Link to="/services" className="block rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-teal/70 hover:bg-teal/5">
              <h3 className="font-semibold text-ink">View services</h3>
              <p className="mt-1 text-sm text-muted-foreground">Explore the treatments and care options available.</p>
            </Link>
            <Link to="/about" className="block rounded-2xl border border-border bg-white px-4 py-3 transition hover:border-teal/70 hover:bg-teal/5">
              <h3 className="font-semibold text-ink">Meet our clinic</h3>
              <p className="mt-1 text-sm text-muted-foreground">Learn more about our values and the care we provide.</p>
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

export const Route = createFileRoute('/contact')({
  component: ContactPage,
});
