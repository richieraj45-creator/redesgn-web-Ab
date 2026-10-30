import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Send } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "../components/Reveal";
import { CONTACT, CONTACT_LOCATION_IMG } from "../data/siteData";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const INFO_CARDS = [
  {
    icon: MapPin,
    eyebrow: "Location",
    title: "Visit Our Mall",
    lines: ["Askaran Binjraj Shopping Mall", CONTACT.addressLine1, CONTACT.addressLine2],
    testId: "contact-card-location",
  },
  {
    icon: Phone,
    eyebrow: "Direct Support",
    title: "Call & Email",
    lines: [`Phone: ${CONTACT.phoneLandline}`, `Mobile: ${CONTACT.phoneMobile}`, `Email: ${CONTACT.email}`],
    testId: "contact-card-support",
  },
  {
    icon: Clock,
    eyebrow: "Shopping Hours",
    title: "Opening Times",
    lines: [CONTACT.hoursWeek, CONTACT.hoursSun, "Open 7 days a week for in-store shopping."],
    testId: "contact-card-hours",
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Thank you! Our team will reach out during shopping hours.");
      setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      toast.error("Could not send your enquiry. Please call us directly.");
    } finally {
      setSending(false);
    }
  };

  const field = "w-full border border-brand-borderMid bg-brand-paper px-4 py-3 text-sm text-brand-ink outline-none transition-colors duration-300 placeholder:text-brand-muted focus:border-brand-red";

  return (
    <main data-testid="contact-page">
      <section className="border-b border-brand-border">
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-14 sm:px-6 md:pt-24 lg:px-12">
          <Reveal>
            <p className="eyebrow" data-testid="contact-eyebrow">Askaran Binjraj · Get In Touch</p>
            <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              We'd Love to <span className="italic text-brand-red">Hear From You</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-brand-mid">
              Have a question about our collections, store locations, or order status? Contact our team or visit us at our flagship shopping center in Dhekiajuli.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-12">
        <Stagger className="grid gap-px border border-brand-border bg-brand-border md:grid-cols-3">
          {INFO_CARDS.map((c) => {
            const Icon = c.icon;
            return (
              <StaggerItem key={c.title} className="bg-brand-paper">
                <div className="h-full p-7 md:p-8" data-testid={c.testId}>
                  <Icon className="h-6 w-6 text-brand-red" />
                  <p className="mt-5 text-[10px] uppercase tracking-[0.28em] text-brand-muted">{c.eyebrow}</p>
                  <h3 className="mt-2 font-serif text-2xl font-medium text-brand-ink">{c.title}</h3>
                  <div className="mt-4 space-y-1.5">
                    {c.lines.map((l, i) => (
                      <p key={i} className={i === 0 ? "text-sm font-medium text-brand-ink" : "text-sm text-brand-mid"}>{l}</p>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">Assistance</p>
            <h2 className="mt-4 font-serif text-3xl font-medium tracking-tight sm:text-4xl">
              Need Immediate Customer Service?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-mid">
              Our store representatives are available during shopping hours to assist with stock inquiries, customized bridal orders, or department directions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={CONTACT.phoneMobileHref} data-testid="contact-call-button" className="inline-flex items-center gap-2 bg-brand-ink px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-300 hover:bg-brand-red">
                <Phone className="h-4 w-4" /> Call {CONTACT.phoneMobile}
              </a>
              <a href={`mailto:${CONTACT.email}`} data-testid="contact-email-button" className="inline-flex items-center gap-2 border border-brand-ink px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-brand-ink transition-colors duration-300 hover:bg-brand-ink hover:text-white">
                <Mail className="h-4 w-4" /> Send an Email
              </a>
            </div>

            <form onSubmit={submit} className="mt-12 border border-brand-border bg-brand-alt p-6 md:p-8" data-testid="contact-form">
              <p className="eyebrow">Write to Us</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={field} data-testid="contact-form-name" />
                <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone number" className={field} data-testid="contact-form-phone" />
              </div>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" className={`${field} mt-4`} data-testid="contact-form-email" />
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className={`${field} mt-4 resize-none`} data-testid="contact-form-message" />
              <button
                type="submit"
                disabled={sending}
                data-testid="contact-form-submit"
                className="group mt-6 inline-flex items-center gap-2 bg-brand-red px-7 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition-colors duration-300 hover:bg-brand-redDark disabled:opacity-60"
              >
                {sending ? "Sending…" : "Send Enquiry"}
                <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-6">
            <p className="eyebrow">Our Location</p>
            <div className="img-frame mt-4 h-[320px] overflow-hidden md:h-[400px]">
              <img src={CONTACT_LOCATION_IMG} alt="Exterior view of Askaran Binjraj in Dhekiajuli" loading="lazy" className="h-full w-full object-cover" data-testid="contact-location-image" />
            </div>
            <div className="mt-6 overflow-hidden border border-brand-border" data-testid="contact-map">
              <iframe
                title="Askaran Binjraj Shopping Mall on Google Maps"
                src={CONTACT.mapsEmbed}
                className="h-[300px] w-full grayscale-[35%] contrast-[1.05]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <div className="mt-6 border border-brand-border bg-brand-paper p-6 md:p-7">
              <h3 className="font-serif text-2xl font-medium text-brand-ink">Find Us:</h3>
              <p className="mt-2 text-sm text-brand-mid">Want to visit our Offline Stores?</p>
              <p className="mt-3 flex items-start gap-3 text-sm text-brand-ink">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-red" />
                <span><span className="font-medium">Address:</span> {CONTACT.addressShort}</span>
              </p>
              <a
                href={CONTACT.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-directions-link"
                className="group mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-brand-red"
              >
                Get Directions on Google Maps
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
