import { useState } from "react";
import { ArrowUpRight, Monitor, Store, Users, Calculator, Warehouse, ShoppingCart, Mail, Send } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { CONTACT } from "../data/siteData";
import { Breadcrumbs } from "../components/Breadcrumbs";

const DEPARTMENTS = [
  {
    icon: Store,
    name: "Store Operations & Retail",
    intro: "Create a welcoming, thoughtful experience for every person who visits us.",
    roles: ["Store Manager", "Assistant Store Manager", "Floor Manager", "Team Lead- Sales", "Senior Sales Executive", "Sales Executive"],
  },
  {
    icon: Monitor,
    name: "Digital & E-Commerce",
    intro: "Build the next chapter of our digital storefront and customer experience.",
    roles: ["Manager - E Commerce", "Executive - E- Commerce", "Freelancer - Digital Marketing"],
  },
  {
    icon: Users,
    name: "Human Resources",
    intro: "Help build a supportive workplace and a strong employee experience.",
    roles: ["Manager - HR & Admin", "Senior Executive - HR & Admin", "Executive - HR & Admin", "HR Intern"],
  },
  {
    icon: Calculator,
    name: "Accounts & Finance",
    intro: "Support accurate financial operations across the business.",
    roles: ["Senior Manager - Accounts", "Manager - Accounts", "Executive - Accounts", "Assistant Accountant"],
  },
  {
    icon: Warehouse,
    name: "Warehouse & Inventory",
    intro: "Keep stock organized and moving accurately across the store.",
    roles: ["Inventory Head", "Inventory Coordinator", "Assistant Coordinator - Inventory", "Executive - Inventory"],
  },
  {
    icon: ShoppingCart,
    name: "Procurement",
    intro: "Select and source apparel and footwear for our customers.",
    roles: ["Procurement Manager - Apparel & Footwear", "Buying Merchandiser"],
  },
];

export default function Careers() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "", message: "", cv: null });
  const [cvError, setCvError] = useState("");

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const selectCv = (event) => {
    const file = event.target.files?.[0] || null;
    if (file && file.size > 10 * 1024 * 1024) {
      setForm((current) => ({ ...current, cv: null }));
      setCvError("Please choose a CV smaller than 10 MB.");
      event.target.value = "";
      return;
    }
    if (file && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setForm((current) => ({ ...current, cv: null }));
      setCvError("Please choose a PDF, DOC, or DOCX file.");
      event.target.value = "";
      return;
    }
    setCvError("");
    setForm((current) => ({ ...current, cv: file }));
  };

  const submitApplication = async (event) => {
    event.preventDefault();
    if (!form.cv) {
      setCvError("Please attach your CV to continue.");
      return;
    }
    const body = [
      `To: ${CONTACT.careersEmail}`,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Role: ${form.role}`,
      `CV file: ${form.cv.name}`,
      "",
      "Introduction:",
      form.message || "(Not provided)",
    ].join("\n");
    const subject = form.role ? `Career Application: ${form.role}` : "Career Application";

    if (navigator.canShare?.({ files: [form.cv] }) && navigator.share) {
      try {
        await navigator.share({ title: subject, text: body, files: [form.cv] });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    window.location.href = `mailto:${CONTACT.careersEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const fieldClass = "mt-2 w-full min-h-12 border border-brand-borderMid bg-brand-paper px-4 py-3 text-base text-brand-ink outline-none transition-colors placeholder:text-brand-muted focus:border-brand-red";

  return (
    <main className="min-h-screen bg-brand-paper" data-testid="careers-page">
      <section className="group relative isolate overflow-hidden bg-brand-ink text-brand-paper">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000"
          alt="Customers exploring a retail store"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-35"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/45" />
        <div className="mx-auto flex min-h-[440px] max-w-7xl items-center px-5 py-20 sm:px-8 md:min-h-[520px] lg:px-12">
          <Reveal className="max-w-3xl">
            <Breadcrumbs items={[{ label: "Careers" }]} tone="light" className="mb-8" />
            <p className="eyebrow-light">Careers · Six generations of heritage</p>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl">
              Make what comes next <span className="italic text-brand-gold">matter.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              Bring your perspective to a family retail business shaped by care, craft and generations of experience.
            </p>
            <a href="#career-departments" className="mt-8 inline-flex items-center gap-2 bg-brand-red px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-redDark">
              Explore opportunities <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </section>

      <section id="career-departments" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow">Find your place</p>
          <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-brand-ink sm:text-4xl">Bring your strengths. Find your next step.</h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-mid sm:text-base">Explore the teams and choose a role to begin your application.</p>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {DEPARTMENTS.map(({ icon: Icon, name, intro, roles }, index) => (
            <StaggerItem key={name}>
              <article className="flex h-full flex-col border border-white/70 bg-white/60 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8" data-testid={`career-department-${index}`}>
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-brand-red" aria-hidden="true" />
                  <span className="text-[10px] font-semibold tracking-[0.22em] text-brand-muted">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl font-medium text-brand-ink">{name}</h3>
                <p className="mt-3 min-h-12 text-sm leading-relaxed text-brand-mid">{intro}</p>
                <div className="mt-6 border-t border-brand-border pt-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-muted">Role areas</p>
                  <ul className="space-y-1">
                    {roles.map((role) => (
                      <li key={role}>
                        <a href="#career-application" onClick={() => setForm((current) => ({ ...current, role }))} className="group flex min-h-11 items-center justify-between gap-2 py-2 text-sm text-brand-ink transition-colors hover:text-brand-red" data-testid={`career-role-${role.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                          <span>{role}</span><ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section id="career-application" className="border-t border-brand-border bg-brand-alt" data-testid="careers-apply">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-12 lg:gap-16 lg:px-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Your next step</p>
            <h2 className="mt-3 font-serif text-3xl font-medium text-brand-ink sm:text-4xl">Ready to grow with us?</h2>
              <p className="mt-4 text-sm leading-relaxed text-brand-mid">Tell us a little about yourself and we’ll prepare an email for your application.</p>
            <p className="mt-5 flex items-center gap-2 text-sm font-medium text-brand-ink"><Mail className="h-4 w-4 text-brand-red" /> {CONTACT.careersEmail}</p>
          </div>
          <form onSubmit={submitApplication} className="glass-panel grid gap-5 border p-5 sm:p-8 md:grid-cols-2 lg:col-span-8" data-testid="careers-application-form">
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink">
              Full name <span className="text-brand-red">*</span>
              <input className={fieldClass} name="name" autoComplete="name" value={form.name} onChange={updateField} required />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink">
              Email address <span className="text-brand-red">*</span>
              <input className={fieldClass} type="email" name="email" autoComplete="email" value={form.email} onChange={updateField} required />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink">
              Phone number <span className="text-brand-red">*</span>
              <input className={fieldClass} type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={updateField} required />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink">
              Interested role <span className="text-brand-red">*</span>
              <select className={fieldClass} name="role" value={form.role} onChange={updateField} required>
                <option value="">Choose a role</option>
                {DEPARTMENTS.flatMap(({ roles }) => roles).map((role) => <option key={role} value={role}>{role}</option>)}
                <option value="Other opportunity">Other opportunity</option>
              </select>
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink md:col-span-2">
              A short introduction
              <textarea className={`${fieldClass} min-h-28 resize-y`} name="message" rows="4" maxLength={1000} value={form.message} onChange={updateField} placeholder="Tell us a little about your experience and what you’d bring to the team." />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-ink md:col-span-2">
              Attach your CV <span className="text-brand-red">*</span>
              <input
                className={`${fieldClass} cursor-pointer file:mr-3 file:border-0 file:bg-brand-ink file:px-3 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.1em] file:text-white`}
                type="file"
                name="cv"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={selectCv}
                aria-describedby="cv-help"
                required
              />
              <span id="cv-help" className="mt-2 block text-xs font-normal normal-case tracking-normal text-brand-muted">PDF, DOC, or DOCX · up to 10 MB{form.cv ? ` · Selected: ${form.cv.name}` : ""}</span>
              {cvError && <span role="alert" className="mt-1 block text-xs font-medium normal-case tracking-normal text-brand-red">{cvError}</span>}
            </label>
            <div className="md:col-span-2">
              <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand-red px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-redDark sm:w-auto" data-testid="careers-email-cta">
                <Send className="h-4 w-4" /> Continue to email <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs leading-relaxed text-brand-muted">On devices that support file sharing, your CV will be included in the share sheet. Otherwise, an email draft opens with your details; attach the selected CV in your email app before sending.</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
