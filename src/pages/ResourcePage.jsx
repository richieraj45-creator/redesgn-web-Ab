import { Link } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";

const FAQS = [
  ["Where is Askaran Binjraj located?", "Visit us at NH-15, Ward No. 7, Dhekiajuli, Sonitpur, Assam 784110."],
  ["What can I shop for?", "Explore clothing for the family, sarees and occasion wear, footwear, jewellery, cosmetics, travel gear, home furnishings, kitchen essentials, toys and school needs."],
  ["What are the mall’s opening hours?", "Opening hours may vary. Call +91 8811966701 to confirm before your visit."],
  ["Is there a place to eat inside the mall?", "Yes. Chatar Patar offers pure vegetarian dining inside the mall. Contact the team for current offerings."],
  ["How do I request an exchange?", "Bring the item and original purchase invoice to the store within 7 calendar days. Exchanges are handled after 1:00 PM on working days and depend on the eligibility conditions listed in our Exchange Policy."],
  ["Are items bought on sale eligible for exchange?", "Items purchased during special offers, discount sales, end of season sales, promotions or stock clearance are final sale and cannot be exchanged."],
];

const PolicySection = ({ title, children }) => <section><h3 className="font-serif text-2xl text-brand-ink">{title}</h3><div className="mt-3 space-y-3 leading-relaxed">{children}</div></section>;

export default function ResourcePage({ type }) {
  const isShipping = type === "shipping";
  const isExchange = type === "exchange";
  const title = isShipping ? "Shipping Policy" : isExchange ? "Exchange & Return Policy" : "Frequently Asked Questions";
  return (
    <main className="bg-brand-paper" data-testid={`resource-${type}`}>
      <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <Breadcrumbs items={[{ label: "Help", to: "/faq" }, { label: title }]} className="mb-7" />
        <div data-page-heading="true"><p className="eyebrow">Help & information</p><h2 className="mt-4 font-serif text-3xl font-medium sm:text-5xl">{title}</h2></div>
        {isShipping ? (
          <div className="mt-8 space-y-8 text-brand-mid">
            <p className="leading-relaxed">We aim to make delivery convenient and efficient. Please review these shipping terms before placing an order.</p>
            <PolicySection title="Shipping destinations"><p><strong>Within India:</strong> Shipping is available to major cities and towns across India.</p><p><strong>International:</strong> International shipping is not currently available.</p></PolicySection>
            <PolicySection title="Delivery methods and charges"><p><strong>Standard shipping:</strong> Estimated delivery is 5–7 business days, depending on destination.</p><p><strong>Express shipping:</strong> Estimated delivery is 2–3 business days.</p><p>Shipping charges are calculated at checkout based on package weight, selected shipping method and delivery location. Delivery estimates may vary by destination.</p></PolicySection>
            <PolicySection title="Delivery details"><p>Please provide a complete and accurate address to help avoid delays or misdelivery. Some shipments may require a signature on delivery.</p></PolicySection>
            <PolicySection title="Questions about shipping"><p>Call <a className="text-brand-red underline" href="tel:+918811966701">+91 8811966701</a> or email <a className="text-brand-red underline" href="mailto:customerservice@crpl.co.in">customerservice@crpl.co.in</a>.</p></PolicySection>
          </div>
        ) : isExchange ? (
          <div className="mt-8 space-y-8 text-brand-mid">
            <p className="border-l-4 border-brand-red bg-brand-alt p-4 font-semibold text-brand-ink">Exchange timings: 11:00 AM–8:00 PM. Exchange requests are accepted after 1:00 PM on working days.</p>
            <p className="leading-relaxed">Please review these conditions before requesting an exchange. The original purchase invoice (cash memo) is required.</p>
            <PolicySection title="How to request an exchange"><p>Contact the store team or visit the customer service desk with your item and invoice. Items are inspected on receipt; the team will confirm whether the request meets the policy. For assistance call <a className="text-brand-red underline" href="tel:+918811966701">+91 8811966701</a> or email <a className="text-brand-red underline" href="mailto:info.askaranbinjraj@gmail.com">info.askaranbinjraj@gmail.com</a>.</p></PolicySection>
            <PolicySection title="Eligibility"><ul className="list-disc space-y-2 pl-5"><li>Request an exchange within 7 calendar days of purchase.</li><li>Present the original purchase invoice.</li><li>The item must be unused, in saleable condition, and retain its original tags, barcode labels and brand logos.</li><li>Exchange requests are handled after 1:00 PM on working days.</li></ul></PolicySection>
            <PolicySection title="Refunds and credit notes"><ul className="list-disc space-y-2 pl-5"><li>Cash refunds are not available.</li><li>If an eligible item is not exchanged immediately, a credit note may be issued under store policy.</li><li>Credit notes are redeemable in-store within their validity period, are non-transferable and cannot be redeemed for cash.</li></ul></PolicySection>
            <PolicySection title="Items that cannot be exchanged"><p>For hygiene, safety and sale conditions, exchanges are not accepted for undergarments, blankets, travel gear (including bags and suitcases), jewellery, watches, cosmetics, toys, footwear, accessories, kitchen appliances, steel utensils, glassware, crockery, plasticware or white garments.</p></PolicySection>
            <PolicySection title="Sale items and altered products"><p>Items bought during special offers, discount sales, end-of-season sales, promotions or stock clearance are final sale. Altered, customized, resized, washed or damaged items cannot be exchanged. Please check fit, size and quality before leaving the store.</p></PolicySection>
            <PolicySection title="Product care and billing"><p>No guarantee is provided for colour fastness or shrinkage. Follow the garment or fabric care instructions. Before leaving the billing counter, check your invoice, billed amount, items and personal belongings; billing or missing-item concerns should be raised before leaving the store.</p></PolicySection>
            <PolicySection title="Manufacturer warranties and decisions"><p>Product warranty support is handled by the manufacturer as described in its warranty card or manual, unless the brand states otherwise. Store management inspects exchange requests and makes the final decision on eligibility and resale condition.</p></PolicySection>
          </div>
        ) : (
          <div className="mt-8 space-y-6">{FAQS.map(([question, answer]) => <section key={question} className="border-b border-brand-border pb-5"><h3 className="font-serif text-xl">{question}</h3><p className="mt-2 text-sm leading-relaxed text-brand-mid">{answer}</p></section>)}
            <div className="flex flex-wrap gap-3 pt-4"><Link className="bg-brand-red px-5 py-3 text-xs font-bold uppercase tracking-wider text-white" to="/contact">Contact the team</Link><Link className="border border-brand-ink px-5 py-3 text-xs font-bold uppercase tracking-wider" to="/collections">Browse collections</Link><Link className="border border-brand-ink px-5 py-3 text-xs font-bold uppercase tracking-wider" to="/shipping-policy">Shipping policy</Link><Link className="border border-brand-ink px-5 py-3 text-xs font-bold uppercase tracking-wider" to="/exchange-policy">Exchange policy</Link></div>
          </div>
        )}
      </section>
    </main>
  );
}