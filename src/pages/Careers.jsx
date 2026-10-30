import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Monitor, Store, Receipt, Warehouse, Mail, MapPin, Upload, FileCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { CAREER_DEPARTMENTS, CONTACT } from "../data/siteData";

const ICONS = { monitor: Monitor, store: Store, receipt: Receipt, warehouse: Warehouse };
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const field = "w-full border border-brand-borderMid bg-brand-paper px-4 py-3 text-sm text-brand-ink outline-none transition-colors duration-300 placeholder:text-brand-muted focus:border-brand-red";

const ApplicationForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", department: CAREER_DEPARTMENTS[0].name, note: "" });
  const [resume, setResume] = useState(null);
  const [sending, setSending] = useState(false);
  const fileRef = useRef(null);

  const pickFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!/\.(pdf|doc|docx)$/i.test(f.name)) {
      toast.error("Please attach a PDF, DOC or DOCX file.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      toast.error("Resume must be under 5 MB.");
      return;
    }
    setResume(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please attach your resume.");
      return;
    }
    setSending(true);
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("phone", form.phone);
      data.append("email", form.email);
      data.append("department", form.department);
      data.append("note", form.note);
      data.append("resume", resume);
      await axios.post(`${API}/applications`, data);
      toast.success("Application received — our HR team will reach out to you.");
      setForm({ name: "", phone: "", email: "", department: CAREER_DEPARTMENTS[0].name, note: "" });
      setResume(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not submit your application. Please email HR directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="border border-brand-border bg-brand-alt p-6 md:p-10" data-testid="career-application-form">
      <p className="eyebrow">Apply Now</p>
      <h3 className="mt-3 font-serif text-2xl font-medium tracking-tight sm:text-3xl">Send us your resume directly</h3>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-brand-mid">
        Fill in your details, choose a department, and attach your resume (PDF, DOC or DOCX, up to 5 MB). It goes straight to our HR desk at {CONTACT.careersEmail}.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className={field} data-testid="career-form-name" />
        <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className={field} data-testid="career-form-phone" />
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" className={field} data-testid="career-form-email" />
        <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className={field} data-testid="career-form-department">
          {CAREER_DEPARTMENTS.map((d) => (
            <option key={d.name} value={d.name}>{d.name}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>
      <textarea rows={3} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="A short note about yourself (optional)" className={`${field} mt-4 resize-none`} data-testid="career-form-note" />
      <div className="mt-4">
        <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={pickFile} className="hidden" data-testid="career-form-resume" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          data-testid="career-form-resume-button"
          className={`flex w-full items-center justify-center gap-3 border border-dashed px-4 py-6 text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 ${resume ? "border-brand-red bg-brand-paper text-brand-red" : "border-brand-borderMid text-brand-mid hover:border-brand-red hover:text-brand-red"}`}
        >
          {resume ? <FileCheck className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
          {resume ? `${resume.name} attached` : "Attach Resume (PDF / DOC / DOCX)"}
        </button>
      </div>
      <button
        type="submit"
        disabled={sending}
        data-testid="career-form-submit"
        className="mt-6 inline-flex items-center gap-2 bg-brand-red px-8 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-300 hover:bg-brand-redDark disabled:opacity-60"
      >
        {sending ? "Submitting…" : "Submit Application"}
        <ArrowUpRight className="h-4 w-4" />
      </button>
    </form>
  );
};

export default function Careers() {
  return (
    <main data-testid="careers-page">
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 md:pt-24 lg:px-12">
          <Reveal>
            <p className="eyebrow" data-testid="careers-eyebrow">Careers — Join the Askaran Binjraj Family</p>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Grow With Assam's <span className="italic text-brand-red">Premier Retail Destination</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-brand-mid">
              Chandan Retail Private Limited is expanding both our physical footprint in Dhekiajuli and our new digital storefront. We are looking for dedicated professionals to join our growing team.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-12">
        <Reveal className="mb-10">
          <p className="eyebrow">Current Openings</p>
          <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">Open Departments & Roles</h2>
        </Reveal>
        <Stagger className="grid gap-px border border-brand-border bg-brand-border md:grid-cols-2">
          {CAREER_DEPARTMENTS.map((d, i) => {
            const Icon = ICONS[d.icon];
            return (
              <StaggerItem key={i} className="bg-brand-paper">
                <div className="group h-full p-7 transition-colors duration-300 hover:bg-brand-alt md:p-9" data-testid={`career-department-${i}`}>
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-brand-red" />
                    <span className="text-[10px] uppercase tracking-[0.26em] text-brand-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl font-medium text-brand-ink">{d.name}</h3>
                  <ul className="mt-4 space-y-2">
                    {d.roles.map((r) => (
                      <li key={r} className="flex items-center gap-3 text-sm text-brand-mid">
                        <span className="h-1.5 w-1.5 rotate-45 bg-brand-red" />
                        {r}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${CONTACT.careersEmail}?subject=Application — ${encodeURIComponent(d.name)}`}
                    data-testid={`career-apply-button-${i}`}
                    className="group/link mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium text-brand-red"
                  >
                    Apply for this department
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-14">
          <ApplicationForm />
        </Reveal>
      </section>

      <section className="border-t border-brand-border bg-brand-ink text-brand-paper" data-testid="careers-cta">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-12">
          <Reveal className="max-w-3xl">
            <p className="eyebrow-light">Ready to build your career with us?</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Send your updated resume to HR
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/60">
              Ready to build your career with us? Send your updated resume to HR at{" "}
              <a href={`mailto:${CONTACT.careersEmail}`} className="text-brand-red underline underline-offset-4 hover:text-white" data-testid="careers-email-link">
                {CONTACT.careersEmail}
              </a>{" "}
              or drop it off at our main front desk in Dhekiajuli.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={`mailto:${CONTACT.careersEmail}`}
                data-testid="careers-cta-email"
                className="group inline-flex items-center gap-2 bg-brand-red px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-300 hover:bg-brand-redDark"
              >
                <Mail className="h-4 w-4" /> Email Your Resume
              </a>
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="careers-cta-visit"
                className="inline-flex items-center gap-2 border border-white/40 px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-brand-ink"
              >
                <MapPin className="h-4 w-4" /> Visit the Front Desk
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
