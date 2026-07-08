import { createFileRoute } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState, type ReactNode } from "react";
import {
  ToothIcon,
  SparkleIcon,
  BracesIcon,
  ImplantIcon,
  ShieldIcon,
  SmileIcon,
  HeartIcon,
  DiamondIcon,
  LightbulbIcon,
} from "@/components/icons";
import { SITE } from "@/lib/site-config";
import clinicImg from "@/assets/clinic.jpg";
import smileImg from "@/assets/smile.jpg";
import toolsImg from "@/assets/tools.jpg";
import heroPatient from "@/assets/hero-patient.jpg";
import fenanMark from "@/assets/fenan-mark.png";

// ─── Spring magnetic wrapper ──────────────────────────────────────────────────
function MagnetWrap({
  children, strength = 0.34, radius = 115, className,
}: { children: ReactNode; strength?: number; radius?: number; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = !!useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 155, damping: 14, mass: 0.55 });
  const y = useSpring(rawY, { stiffness: 155, damping: 14, mass: 0.55 });
  useEffect(() => {
    if (reduced) return;
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        rawX.set(dx * pull); rawY.set(dy * pull);
      } else { rawX.set(0); rawY.set(0); }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY, strength, radius, reduced]);
  return <motion.div ref={wrapRef} style={{ x, y }} className={className}>{children}</motion.div>;
}

// ─── Route ────────────────────────────────────────────────────────────────────
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fenan Dental Clinic — Healthy Mouth, Healthy Body" },
      { name: "description", content: "Fenan Dental Clinic in Addis Ababa delivers exceptional dental care with compassion, advanced technology and a patient-first approach." },
      { property: "og:title", content: "Fenan Dental Clinic" },
      { property: "og:description", content: "Because your smile matters. Modern dentistry with a patient-first approach." },
    ],
  }),
  component: Index,
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#values", label: "Values" },
  { href: "#contact", label: "Contact" },
  { href: "#location", label: "Location" },
];

const SERVICES = [
  { title: "General Dentistry", desc: "Comprehensive cleanings, exams, and preventive care to keep smiles healthy long-term.", Icon: ToothIcon, img: clinicImg, imgAlt: "Clean, modern dental suite at Fenan Dental Clinic" },
  { title: "Cosmetic Dentistry", desc: "Veneers, whitening, and smile design crafted around your natural features.", Icon: SparkleIcon, img: smileImg, imgAlt: "Patient with a radiant smile after cosmetic treatment" },
  { title: "Orthodontics", desc: "Modern braces and clear aligners for confident, well-aligned smiles.", Icon: BracesIcon, img: heroPatient, imgAlt: "Patient during orthodontic consultation at Fenan" },
  { title: "Implants", desc: "Permanent, natural-looking tooth replacement using precision titanium implants.", Icon: ImplantIcon, img: toolsImg, imgAlt: "Precision dental instruments used in implant procedures" },
  { title: "Oral Surgery", desc: "Safe, precise surgical procedures performed by experienced specialists.", Icon: ShieldIcon, img: clinicImg, imgAlt: "Sterile, modern surgical environment at Fenan" },
  { title: "Pediatric Care", desc: "Gentle, playful dentistry built around children's comfort and growing teeth.", Icon: SmileIcon, img: smileImg, imgAlt: "Happy young patient after treatment at Fenan" },
];

const VALUES = [
  { label: "Compassion", desc: "Every patient is heard before they're treated.", Icon: HeartIcon },
  { label: "Excellence", desc: "Clinical standards that never cut corners.", Icon: SparkleIcon },
  { label: "Integrity", desc: "Honest advice, even when it's the simpler option.", Icon: DiamondIcon },
  { label: "Innovation", desc: "Modern tools and techniques, continuously updated.", Icon: LightbulbIcon },
  { label: "Satisfaction", desc: "Care measured by how you feel after, not just during.", Icon: SmileIcon },
];

// Different spring mass per card → different bounce amplitude = physics variety
const VALUE_SPRINGS = [
  { stiffness: 320, damping: 24, mass: 0.72 },
  { stiffness: 292, damping: 23, mass: 0.86 },
  { stiffness: 264, damping: 22, mass: 1.0 },
  { stiffness: 238, damping: 22, mass: 1.15 },
  { stiffness: 212, damping: 21, mass: 1.3 },
];

const PILLARS = [
  { key: "01", title: "Listen First", body: "Every plan starts with understanding your concerns, goals, and comfort." },
  { key: "02", title: "Clinical Precision", body: "Our specialists blend artistry with precision to design results that last." },
  { key: "03", title: "Advanced Technology", body: "Digital scanning, modern materials, and gentle techniques for predictable outcomes." },
];

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.5 });
  return (
    <motion.div
      style={{ scaleX }}
      className="pointer-events-none fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-gradient-to-r from-teal to-mint"
    />
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = !!useReducedMotion();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.9]);
  const bOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const bgColor = useMotionTemplate`oklch(0.982 0.004 230 / ${bgOpacity})`;
  const borderColor = useMotionTemplate`oklch(0.9 0.012 225 / ${bOpacity})`;
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 48));
    return () => unsub();
  }, [scrollY]);
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl">
        <motion.div style={{ backgroundColor: bgColor, borderBottomColor: borderColor }} className="border-b">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <a href="#top" className="flex items-center gap-2.5">
              <img src={fenanMark} alt="" className="h-9 w-9 object-contain" />
              <span className="flex flex-col leading-none">
                <span className={`font-display text-xl font-bold transition-colors duration-300 ${scrolled ? "text-ink" : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"}`}>Fenan</span>
                <span className="mt-0.5 text-[9.5px] font-medium tracking-[0.28em] text-teal">DENTAL CLINIC</span>
              </span>
            </a>
            <nav className={`hidden items-center gap-7 text-sm font-medium transition-colors duration-300 md:flex ${scrolled ? "text-muted-foreground" : "text-white/90"}`}>
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href}
                  className={`relative transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-teal after:transition-transform hover:after:scale-x-100 ${scrolled ? "hover:text-teal" : "hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"}`}>
                  {l.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <MagnetWrap className="hidden md:block">
                <a href="#contact" className="rounded-full bg-teal px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-teal/25 transition hover:opacity-90">
                  Book Visit
                </a>
              </MagnetWrap>
              {/* Animated hamburger — mobile only */}
              <button className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition hover:bg-muted md:hidden"
                onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
                <motion.span animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={reduced ? {} : { type: "spring", stiffness: 420, damping: 32 }} className={`block h-0.5 w-5 rounded-full transition-colors duration-300 ${scrolled || open ? "bg-ink" : "bg-white"}`} />
                <motion.span animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={reduced ? {} : { type: "spring", stiffness: 420, damping: 32 }} className={`block h-0.5 w-5 rounded-full transition-colors duration-300 ${scrolled || open ? "bg-ink" : "bg-white"}`} />
                <motion.span animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={reduced ? {} : { type: "spring", stiffness: 420, damping: 32 }} className={`block h-0.5 w-5 rounded-full transition-colors duration-300 ${scrolled || open ? "bg-ink" : "bg-white"}`} />
              </button>
            </div>
          </div>
        </motion.div>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div key="mob" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
            transition={reduced ? {} : { type: "spring", stiffness: 360, damping: 32 }}
            className="fixed inset-x-0 top-[73px] z-40 border-b border-border bg-background/95 px-6 pb-8 pt-6 backdrop-blur-xl md:hidden">
            <nav className="flex flex-col gap-5">
              {NAV_LINKS.map((l, i) => (
                <motion.a key={l.href} href={l.href} onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={reduced ? {} : { type: "spring", stiffness: 340, damping: 28, delay: i * 0.05 }}
                  className="font-display text-2xl font-bold text-ink transition-colors hover:text-teal">
                  {l.label}
                </motion.a>
              ))}
              <motion.a href="#contact" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={reduced ? {} : { delay: NAV_LINKS.length * 0.05 + 0.04 }}
                className="mt-3 rounded-full bg-teal px-8 py-3.5 text-center text-sm font-medium text-white">
                Book an Appointment
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero — spring cascade + cursor gravity field ─────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  // Two cursor springs at different stiffness = layered gravity orbs
  const curX = useMotionValue(50), curY = useMotionValue(50);
  const o1x = useSpring(curX, { stiffness: 36, damping: 13 });
  const o1y = useSpring(curY, { stiffness: 36, damping: 13 });
  const o2x = useSpring(curX, { stiffness: 17, damping: 10 });
  const o2y = useSpring(curY, { stiffness: 17, damping: 10 });
  const glow1 = useMotionTemplate`radial-gradient(560px circle at ${o1x}% ${o1y}%, oklch(0.58 0.112 196 / 0.28), transparent 58%)`;
  const glow2 = useMotionTemplate`radial-gradient(360px circle at ${o2x}% ${o2y}%, oklch(0.83 0.073 181 / 0.14), transparent 60%)`;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 130]), { stiffness: 90, damping: 28 });
  const cOp = useTransform(scrollYProgress, [0, 0.78], [1, 0]);
  const cY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 65]), { stiffness: 90, damping: 28 });
  useEffect(() => {
    if (reduced) return;
    const fn = (e: MouseEvent) => { curX.set((e.clientX / window.innerWidth) * 100); curY.set((e.clientY / window.innerHeight) * 100); };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, [curX, curY, reduced]);
  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-[1.12]">
        <img src={heroPatient} alt="Patient receiving gentle dental care at Fenan Dental Clinic" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/58 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/35" />
      <motion.div style={{ background: glow1 }} className="pointer-events-none absolute inset-0 mix-blend-screen" />
      <motion.div style={{ background: glow2 }} className="pointer-events-none absolute inset-0 mix-blend-screen opacity-70" />
      <motion.div style={{ opacity: cOp, y: cY }}
        className="relative flex min-h-screen max-w-xl flex-col justify-center pl-6 pr-6 pt-24 sm:pl-10 lg:pl-16">
        <div>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={reduced ? {} : { type: "spring", stiffness: 360, damping: 30, delay: 0.02 }}
            className="mb-5 text-xs font-medium tracking-[0.3em] text-teal">
            FENAN DENTAL CLINIC · ADDIS ABABA
          </motion.p>
          {/* Spring cascade — line 1 lighter mass, enters faster */}
          <div className="mb-1 overflow-hidden">
            <motion.span initial={{ y: "108%" }} animate={{ y: "0%" }}
              transition={reduced ? {} : { type: "spring", stiffness: 330, damping: 28, delay: 0.08 }}
              className="block font-display font-bold leading-[1] tracking-tight text-white"
              style={{ fontSize: "clamp(2.4rem,9vw,7rem)" }}>
              Your Smile,
            </motion.span>
          </div>
          {/* Line 2 — heavier mass → trails behind, more bounce */}
          <div className="mb-8 overflow-hidden">
            <motion.span initial={{ y: "108%" }} animate={{ y: "0%" }}
              transition={reduced ? {} : { type: "spring", stiffness: 268, damping: 26, mass: 1.12, delay: 0.2 }}
              className="block font-display font-bold italic leading-[1] tracking-tight text-gradient-brand"
              style={{ fontSize: "clamp(2.4rem,9vw,7rem)" }}>
              Our Priority.
            </motion.span>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={reduced ? {} : { duration: 0.85, delay: 0.52 }} className="mb-4 text-xl italic text-mint">
            Healthy Mouth, Healthy Body
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={reduced ? {} : { duration: 0.85, delay: 0.66 }} className="mb-10 max-w-md leading-relaxed text-white/62">
            Exceptional dental care with compassion, advanced technology, and a patient-first approach — right in the heart of Addis Ababa.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={reduced ? {} : { type: "spring", stiffness: 280, damping: 26, delay: 0.78 }}
            className="flex flex-wrap gap-4">
            <MagnetWrap>
              <a href="#contact" className="rounded-full bg-teal px-8 py-3.5 text-sm font-medium text-white shadow-2xl shadow-teal/30 transition hover:opacity-90">
                Book an Appointment
              </a>
            </MagnetWrap>
            <MagnetWrap>
              <a href={SITE.phone.tel} className="rounded-full border border-white/28 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">
                {SITE.phone.display}
              </a>
            </MagnetWrap>
          </motion.div>
        </div>
      </motion.div>
      <motion.div animate={reduced ? {} : { y: [0, 10, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-[10px] tracking-[0.38em] text-white/38">SCROLL ↓</p>
      </motion.div>
    </section>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKER = ["COMPASSION", "EXCELLENCE", "INTEGRITY", "INNOVATION", "SATISFACTION", "YOUR SMILE MATTERS", "ADDIS ABABA"];
function Ticker() {
  return (
    <div className="overflow-hidden border-y border-teal/20 bg-ink py-4 select-none" aria-hidden>
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="flex w-max gap-12 whitespace-nowrap">
        {[...TICKER, ...TICKER, ...TICKER].map((it, i) => (
          <span key={i} className="inline-flex items-center gap-12 text-[11px] font-medium tracking-[0.38em] text-white/50">
            {it}<span className="text-gold opacity-55">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────
function Services() {
  const reduced = !!useReducedMotion();
  const [active, setActive] = useState(0);
  const current = SERVICES[active];
  return (
    <section id="services" className="bg-background px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 280, damping: 26 }} className="mb-3 text-xs tracking-[0.3em] text-teal">WHAT WE OFFER</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: "106%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 270, damping: 26, delay: 0.06 }} className="font-display text-5xl font-bold leading-[1.05] text-ink md:text-6xl">
                Modern care for <span className="italic text-gradient-brand">every smile.</span>
              </motion.h2>
            </div>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { delay: 0.14 }} className="text-lg leading-relaxed text-muted-foreground">
              From routine cleanings to full smile transformations, our specialists combine craftsmanship with the latest technology for care you can feel confident in.
            </motion.p>
          </div>
        </div>
        <div className="grid gap-3 lg:grid-cols-12 lg:gap-6">
          <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:col-span-4 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
            {SERVICES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`flex shrink-0 items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors lg:w-full ${
                  i === active ? "border-teal bg-teal/8" : "border-border bg-card hover:border-teal/35"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${i === active ? "bg-teal text-white" : "bg-teal/8 text-teal"}`}>
                  <s.Icon className="h-5 w-5" />
                </span>
                <span className={`whitespace-nowrap font-display text-base font-bold transition-colors lg:whitespace-normal ${i === active ? "text-ink" : "text-muted-foreground"}`}>{s.title}</span>
              </button>
            ))}
          </div>
          <div className="relative min-h-[460px] overflow-hidden rounded-3xl lg:col-span-8">
            <span aria-hidden className="pointer-events-none absolute right-0 top-0 z-20 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={reduced ? { duration: 0.15 } : { duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Photo background */}
                <img
                  src={current.img}
                  alt={current.imgAlt}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Gradient: dark on left for readability, fades to photo on right */}
                <div className="absolute inset-0 bg-gradient-to-r from-ink/97 via-ink/80 to-ink/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                {/* Content — constrained to left 60% on desktop */}
                <motion.div
                  key={`content-${current.title}`}
                  initial={{ opacity: 0, y: reduced ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                  transition={reduced ? { duration: 0.15 } : { type: "spring", stiffness: 280, damping: 28, delay: 0.15 }}
                  className="relative z-10 flex h-full flex-col justify-end p-10 lg:w-[58%] lg:justify-center lg:p-14"
                >
                  <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-mint backdrop-blur-sm">
                    <current.Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mb-3 font-display text-3xl font-bold text-white md:text-4xl">{current.title}</h3>
                  <p className="mb-8 text-base leading-relaxed text-white/70">{current.desc}</p>
                  <a
                    href={SITE.phone.tel}
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-medium text-white shadow-lg shadow-teal/30 transition hover:opacity-90"
                  >
                    Book this service →
                  </a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const img1Y = useSpring(useTransform(scrollYProgress, [0, 1], [44, -44]), { stiffness: 80, damping: 24 });
  const img2Y = useSpring(useTransform(scrollYProgress, [0, 1], [72, -18]), { stiffness: 58, damping: 21 });
  const sp = (delay = 0) => reduced ? {} : { type: "spring" as const, stiffness: 260, damping: 26, delay };
  return (
    <section id="about" ref={ref} className="overflow-hidden bg-cloud px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={sp()} className="mb-3 text-xs tracking-[0.3em] text-teal">ABOUT FENAN</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: "106%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={sp(0.06)} className="font-display text-5xl font-bold leading-[1.05] text-ink md:text-6xl">
                A patient-first <br /><span className="italic text-gradient-brand">approach.</span>
              </motion.h2>
            </div>
          </div>
          <div className="flex items-end lg:col-span-5 lg:col-start-8">
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { delay: 0.14 }} className="text-lg leading-relaxed text-muted-foreground">
              Fenan Dental Clinic delivers exceptional care with compassion, advanced technology, and a deep commitment to every individual — right in the heart of Addis Ababa.
            </motion.p>
          </div>
        </div>
        <div className="mb-14 grid gap-5 lg:grid-cols-12">
          <motion.div style={{ y: reduced ? 0 : img1Y }} className="overflow-hidden rounded-3xl shadow-2xl lg:col-span-7">
            <img src={clinicImg} alt="Inside Fenan Dental Clinic" loading="lazy" className="h-[400px] w-full object-cover lg:h-[480px]" />
          </motion.div>
          <div className="flex flex-col gap-5 lg:col-span-4 lg:col-start-9">
            <motion.div style={{ y: reduced ? 0 : img2Y }} className="overflow-hidden rounded-3xl shadow-xl">
              <img src={smileImg} alt="Happy patient" loading="lazy" className="h-52 w-full object-cover" />
            </motion.div>
            <motion.blockquote initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={sp(0.1)} className="flex flex-1 flex-col justify-between rounded-3xl bg-ink p-7 text-white shadow-xl">
              <p className="font-display text-2xl italic leading-snug">"Healthy mouth, healthy body — because your smile matters."</p>
              <footer className="mt-6 text-[11px] tracking-[0.28em] text-white/45">— THE FENAN TEAM</footer>
            </motion.blockquote>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div key={p.key} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={reduced ? {} : { type: "spring", stiffness: 240, damping: 24, delay: i * 0.08 }} className="rounded-2xl border border-border bg-background p-7 transition hover:border-teal/40">
              <div className="mb-1 font-mono text-xs text-teal">{p.key}</div>
              <h3 className="mb-2 font-display text-xl font-bold text-ink">{p.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Values — spring bounce with varied mass ──────────────────────────────────
function Values() {
  const reduced = !!useReducedMotion();
  return (
    <section id="values" className="relative overflow-hidden bg-ink-gradient px-6 py-32 text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-18">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-teal blur-[150px]" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 280, damping: 26 }} className="mb-4 text-xs tracking-[0.3em] text-mint">OUR VALUES</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: "106%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 268, damping: 26, delay: 0.06 }} className="font-display text-5xl font-bold leading-[1.05] md:text-6xl">
              Because your <span className="italic text-gold">smile</span> matters.
            </motion.h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {VALUES.map((v, i) => (
            <motion.div key={v.label} initial={{ opacity: 0, scale: 0.7, y: 26 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }}
              transition={reduced ? {} : { type: "spring", ...VALUE_SPRINGS[i], delay: i * 0.07 }}
              className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center backdrop-blur-sm transition hover:bg-white/10">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/45 text-gold">
                <v.Icon className="h-6 w-6" />
              </div>
              <span className="mb-1 text-xs font-medium tracking-[0.2em]">{v.label.toUpperCase()}</span>
              <span className="text-[11px] leading-snug text-white/45">{v.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const reduced = !!useReducedMotion();
  const INFO: { label: string; value: string; href?: string }[] = [
    { label: "PHONE", value: SITE.phone.display, href: SITE.phone.tel },
    { label: "ADDRESS", value: SITE.address.short, href: "#location" },
    { label: "HOURS", value: SITE.hours },
  ];
  const sp = (delay = 0) => reduced ? {} : { type: "spring" as const, stiffness: 260, damping: 26, delay };
  return (
    <section id="contact" className="bg-ink-gradient px-6 py-32 text-white">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={sp()} className="mb-4 text-xs tracking-[0.3em] text-mint">REACH US</motion.p>
        <div className="mb-1 overflow-hidden">
          <motion.h2 initial={{ y: "108%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={sp(0.06)} className="font-display text-5xl font-bold leading-[1.05] md:text-6xl lg:text-7xl">Your smile,</motion.h2>
        </div>
        <div className="mb-10 overflow-hidden">
          <motion.h2 initial={{ y: "108%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 242, damping: 25, mass: 1.1, delay: 0.17 }} className="font-display text-5xl font-bold italic leading-[1.05] text-gradient-brand md:text-6xl lg:text-7xl">our priority.</motion.h2>
        </div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={reduced ? {} : { delay: 0.38 }} className="mx-auto mb-12 max-w-md text-white/60">
          Book a consultation or walk in during our opening hours. Our team is ready to welcome you.
        </motion.p>
        <div className="mx-auto mb-12 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
          {INFO.map((item, i) =>
            item.href ? (
              <motion.a key={item.label} href={item.href} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 260, damping: 24, delay: i * 0.08 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
                <div className="mb-2 text-[10px] tracking-[0.25em] text-mint">{item.label}</div>
                <div className="font-medium leading-snug">{item.value}</div>
              </motion.a>
            ) : (
              <motion.div key={item.label} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 260, damping: 24, delay: i * 0.08 }} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="mb-2 text-[10px] tracking-[0.25em] text-mint">{item.label}</div>
                <div className="font-medium leading-snug">{item.value}</div>
              </motion.div>
            )
          )}
        </div>
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={sp(0.28)} className="flex flex-wrap justify-center gap-4">
          <MagnetWrap><a href={SITE.phone.tel} className="rounded-full bg-teal px-9 py-4 text-sm font-medium text-white shadow-2xl shadow-teal/30 transition hover:opacity-90">Call Now →</a></MagnetWrap>
          <MagnetWrap><a href="#location" className="rounded-full border border-white/25 px-9 py-4 text-sm font-medium text-white transition hover:bg-white/10">View on Map</a></MagnetWrap>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Location ─────────────────────────────────────────────────────────────────
function LocationMap() {
  const reduced = !!useReducedMotion();
  const address = SITE.address.full;
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const mapsDir = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const embed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3530.2967177016144!2d38.8282537!3d8.9908798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85764bff4163%3A0x544e59352e3551ec!2sFenan%20Dental%20Clinic!5e1!3m2!1sen!2set!4v1783510663738!5m2!1sen!2set";
  return (
    <section id="location" className="bg-background px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 280, damping: 26 }} className="mb-3 text-xs tracking-[0.3em] text-teal">VISIT US</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: "106%", opacity: 0 }} whileInView={{ y: "0%", opacity: 1 }} viewport={{ once: true }} transition={reduced ? {} : { type: "spring", stiffness: 265, damping: 26, delay: 0.06 }} className="font-display text-5xl font-bold leading-[1.05] text-ink md:text-6xl">
                Find our <span className="italic text-gradient-brand">clinic.</span>
              </motion.h2>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-5 lg:col-span-5 lg:col-start-8">
            <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={reduced ? {} : { delay: 0.14 }} className="text-lg leading-relaxed text-muted-foreground">
              Located at Goro Square (Mediad) in Addis Ababa. Easy to reach, with parking nearby and warm staff ready to welcome you.
            </motion.p>
            <div className="flex flex-wrap gap-3">
              <a href={mapsSearch} target="_blank" rel="noopener noreferrer" className="rounded-full bg-teal px-6 py-3 text-sm font-medium text-white shadow-lg shadow-teal/20 transition hover:opacity-90">Open in Google Maps ↗</a>
              <a href={mapsDir} target="_blank" rel="noopener noreferrer" className="rounded-full border border-border px-6 py-3 text-sm font-medium text-ink transition hover:border-teal hover:text-teal">Get Directions</a>
            </div>
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={reduced ? {} : { type: "spring", stiffness: 180, damping: 26 }} className="relative h-[480px] overflow-hidden rounded-3xl border border-border shadow-2xl">
          <iframe title="Fenan Dental Clinic — Goro Square, Addis Ababa" src={embed} width="100%" height="100%" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          <div className="pointer-events-none absolute left-5 top-5 max-w-[220px] rounded-2xl border border-border bg-background/95 p-5 shadow-xl backdrop-blur-md">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
              <span className="text-[10px] font-medium tracking-[0.2em] text-teal">FENAN DENTAL</span>
            </div>
            <p className="font-display text-base font-bold leading-tight text-ink">Goro Square (Mediad)</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Addis Ababa, Ethiopia</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink px-6 py-10 text-white/50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 text-sm">
        <a href="#top" className="flex items-center gap-3">
          <img src={fenanMark} alt="Fenan Dental Clinic" loading="lazy" className="h-8 w-8 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-bold text-white">Fenan</span>
            <span className="mt-0.5 text-[9px] tracking-[0.28em] text-teal">DENTAL CLINIC</span>
          </span>
        </a>
        <p className="font-display italic text-mint/70">Because your smile matters.</p>
        <nav className="flex flex-wrap gap-5 text-xs">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/8 pt-6 text-center text-xs">
        © {new Date().getFullYear()} Fenan Dental Clinic · Goro Square, Addis Ababa
      </div>
    </footer>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
function Index() {
  return (
    <>
      <ScrollProgressBar />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <About />
        <Values />
        <Contact />
        <LocationMap />
      </main>
      <Footer />
    </>
  );
}
