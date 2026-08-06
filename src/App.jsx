import React, { useState, useEffect } from "react";
import { kvGet, kvSet } from "./supabaseStorage";

const LOGO_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAFoAWgDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIBQYBAwQCCf/EAFYQAAEDAwEEBgYFBwgGBgsAAAEAAgMEBREGBxIhMRNBUWFxgQgUIpGhsSMyQlLBFRZzgpKy0SQlM1NicnSiJzVDlMLwJjRUhOHiFxgoNjdGVWODs/H/xAAcAQEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xAA7EQACAQMCAwQJAwIFBQEAAAAAAQIDBBEFIRIxQQYTUXEiMmGBkaGx0fAUweEjQhUkM4LxJUNSYnKy/9oADAMBAAIRAxEAPwCMERF38p4REQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAERSFsl2fN1jeX1lwYfyTROHSN5dM/mGZ7Os+XatW7uqdnRlXqvZGSnTlUkoxMTpHZtqHWQE1DTNgo84NVUEtjPh1u8lJNL6OtP0A9b1DKZcceipwGj3lSxW3CjsdLFAyIZ3d2GniABwOwcgB2rDS6hvectoqeIcw1xLj78hc5r9oNQupcVFqEurL6v9jfn+ktfRqvL/PAiq9ej5daWB0toukNeWjPQys6Jx8Dkj34UU3C3VlqrpaKvppKWpiOHxyNwQrZWrVzKmtZQ18PqlS/gw5yx57O4rGbTtA0+stPv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";

const SIZE_ORDER = ["A4", "B5", "A5", "B6", "A6"];
const TIERS = [
  { id: "walkin", label: "زبون طياري", sub: "عادي / مرة واحدة" },
  { id: "loyal", label: "عميل دائم", sub: "متعامل تقريباً كل شهر" },
  { id: "wholesale", label: "جملة", sub: "كميات كبيرة" },
];

function uid(prefix) {
  return prefix + "_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function defaultTier(base) {
  return [
    { upTo: 1, price: base * 3.3 },
    { upTo: 10, price: base * 2.3 },
    { upTo: 50, price: base * 1.6 },
    { upTo: 100, price: base },
  ].map((t) => ({ upTo: t.upTo, price: Math.round(t.price * 100) / 100 }));
}

function defaultTierBySize(base) {
  const out = {};
  SIZE_ORDER.forEach((s, i) => {
    out[s] = defaultTier(base * (1 - i * 0.12));
  });
  return out;
}

function flatTier(price) {
  return [{ upTo: 999999, price }];
}

function flatTierBySize(pricesBySize) {
  const out = {};
  SIZE_ORDER.forEach((s) => {
    out[s] = flatTier(pricesBySize[s] ?? 0);
  });
  return out;
}

const DEFAULT_SETTINGS = {
  a4Price: { single: 1.5, double: 3 },
  digitalSheetPrice: { single: 15, double: 25 },
  digitalSheet: { w: 32, h: 47 },
  interiorDivisor: { A4: 2, B5: 3, A5: 4, B6: 6, A6: 8 },
  coverTypes: [
    {
      id: "koshia",
      label: "كوشيه",
      hasDigitalOption: true,
      tiersBySize: flatTierBySize({ A4: 8, B5: 6, A5: 4, B6: 3, A6: 2 }),
      tiersDigital: flatTier(25),
    },
    { id: "plastic", label: "بلاستيك", hasDigitalOption: false, tiersBySize: defaultTierBySize(6) },
    { id: "hardcover", label: "هارد كفر", hasDigitalOption: false, tiersBySize: defaultTierBySize(20) },
  ],
  finishingServices: [
    { id: "binding", label: "بشر", hasSides: false, tiers: defaultTier(3) },
    { id: "lamination", label: "سلوفان", hasSides: true, tiers: defaultTier(1.5), tiersDouble: defaultTier(2) },
    { id: "cutting", label: "قص", hasSides: false, tiers: defaultTier(15) },
    { id: "casing", label: "تكعيب", hasSides: false, tiers: defaultTier(5) },
    { id: "wire", label: "سلك", hasSides: false, tiers: defaultTier(4) },
    { id: "glue", label: "غراء", hasSides: false, tiers: defaultTier(3) },
  ],
  margins: { walkin: 100, loyal: 50, wholesale: 22.5 },
  fixedItems: [
    { id: "mug", name: "مج", walkin: 0, loyal: 0, wholesale: 0 },
    { id: "arm", name: "دراع", walkin: 0, loyal: 0, wholesale: 0 },
    { id: "ruler", name: "مسطرة", walkin: 0, loyal: 0, wholesale: 0 },
    { id: "pen", name: "قلم", walkin: 0, loyal: 0, wholesale: 0 },
  ],
  shop: {
    name: "مطبعة ألوان لخدمات الطباعة",
    phone: "01157101143",
    address: "طريق القناطر الخيرية مدخل الخرقانية بجوار صيدلية د. مصطفى طلبة",
  },
  customers: [],
};

function tierPrice(qty, tiers) {
  if (!tiers || !tiers.length) return 0;
  const sorted = [...tiers].sort((a, b) => a.upTo - b.upTo);
  for (const t of sorted) {
    if (qty <= t.upTo) return t.price;
  }
  return sorted[sorted.length - 1].price;
}

function egp(n) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 0 });
}

function randomInvoiceNumber() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function newInvoice() {
  return { id: Date.now() + Math.random(), invoiceNo: randomInvoiceNumber(), customer: "", customerPhone: "", archiveId: null, items: [] };
}

const SETTINGS_KEY = "alwan-pricing-settings-v5";
const ORDERS_KEY = "alwan-pricing-orders-v1";
const ARCHIVE_KEY = "alwan-pricing-invoice-archive-v1";

function deepMerge(defaults, saved) {
  if (typeof defaults !== "object" || defaults === null || Array.isArray(defaults)) {
    return saved !== undefined ? saved : defaults;
  }
  const out = { ...defaults };
  if (saved && typeof saved === "object") {
    for (const k of Object.keys(defaults)) {
      out[k] = deepMerge(defaults[k], saved[k]);
    }
  }
  return out;
}

async function loadSettings() {
  try {
    const parsed = await kvGet(SETTINGS_KEY);
    if (parsed) {
      const merged = deepMerge(DEFAULT_SETTINGS, parsed);
      merged.fixedItems = parsed.fixedItems && parsed.fixedItems.length ? parsed.fixedItems : DEFAULT_SETTINGS.fixedItems;
      merged.coverTypes = parsed.coverTypes && parsed.coverTypes.length ? parsed.coverTypes : DEFAULT_SETTINGS.coverTypes;
      merged.finishingServices = parsed.finishingServices && parsed.finishingServices.length ? parsed.finishingServices : DEFAULT_SETTINGS.finishingServices;
      return merged;
    }
  } catch (e) {}
  return DEFAULT_SETTINGS;
}

async function saveSettings(settings) {
  await kvSet(SETTINGS_KEY, settings);
}

async function loadOrders() {
  try {
    const val = await kvGet(ORDERS_KEY);
    if (val) return val;
  } catch (e) {}
  return [];
}

async function persistOrders(orders) {
  await kvSet(ORDERS_KEY, orders);
}

async function loadArchive() {
  try {
    const val = await kvGet(ARCHIVE_KEY);
    if (val) return val;
  } catch (e) {}
  return [];
}

async function persistArchive(list) {
  await kvSet(ARCHIVE_KEY, list);
}

function RegMark({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" className={className} fill="none">
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.4" />
      <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="1.4" />
      <line x1="1" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CMYKDots({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <span className="w-2 h-2 rounded-full bg-cyan-400" />
      <span className="w-2 h-2 rounded-full bg-pink-500" />
      <span className="w-2 h-2 rounded-full bg-amber-400" />
      <span className="w-2 h-2 rounded-full bg-slate-900" />
    </span>
  );
}

function SectionHeader({ title, accent }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span className={`flex items-center justify-center w-6 h-6 rounded-full text-white ${accent}`}>
        <RegMark />
      </span>
      <h3 className="text-stone-800 font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <label className="block mb-3">
      <span className="block text-xs text-stone-500 mb-1">{label}</span>
      {children}
      {hint ? <span className="block text-[11px] text-stone-400 mt-1">{hint}</span> : null}
    </label>
  );
}

function NumInput({ value, onChange, className = "", ...rest }) {
  const ref = React.useRef(null);
  const [text, setText] = useState(value === null || value === undefined ? "" : String(value));

  useEffect(() => {
    if (document.activeElement !== ref.current) {
      setText(value === null || value === undefined ? "" : String(value));
    }
  }, [value]);

  return (
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      dir="ltr"
      value={text}
      onChange={(e) => {
        const v = e.target.value;
        if (v === "" || /^-?\d*\.?\d*$/.test(v)) {
          setText(v);
          onChange({ target: { value: v } });
        }
      }}
      {...rest}
      className={"w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-cyan-500 " + className}
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    />
  );
}

function TextInput(props) {
  return (
    <input
      type="text"
      {...props}
      className={"w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 " + (props.className || "")}
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-cyan-500"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function TierPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {TIERS.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={"rounded-lg border px-2 py-2 text-center transition " + (value === t.id ? "border-cyan-500 bg-cyan-50 text-cyan-900" : "border-stone-300 bg-white text-stone-600 hover:border-stone-400")}
        >
          <div className="text-sm font-semibold">{t.label}</div>
          <div className="text-[10px] text-stone-400">{t.sub}</div>
        </button>
      ))}
    </div>
  );
}

function SidesPicker({ value, onChange }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <button type="button" onClick={() => onChange("single")} className={"rounded-lg border px-3 py-2 text-sm font-medium transition " + (value === "single" ? "border-pink-500 bg-pink-50 text-pink-900" : "border-stone-300 bg-white text-stone-600")}>وجه واحد</button>
      <button type="button" onClick={() => onChange("double")} className={"rounded-lg border px-3 py-2 text-sm font-medium transition " + (value === "double" ? "border-pink-500 bg-pink-50 text-pink-900" : "border-stone-300 bg-white text-stone-600")}>وجهين</button>
    </div>
  );
}

function ReceiptLine({ label, value, strong }) {
  return (
    <div className={"flex items-center justify-between py-1.5 " + (strong ? "" : "border-b border-dashed border-stone-300")}>
      <span className={strong ? "font-bold text-stone-900" : "text-stone-600 text-sm"}>{label}</span>
      <span className={strong ? "font-bold text-stone-900 tabular-nums" : "text-stone-800 text-sm tabular-nums"} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{value}</span>
    </div>
  );
}

function CostWarningBanner({ cost, price }) {
  if (!(price < cost)) return null;
  const loss = cost - price;
  return (
    <div className="bg-red-50 border-2 border-red-400 rounded-2xl p-4 flex items-start gap-2">
      <span className="text-red-500 text-lg leading-none">⚠️</span>
      <div className="text-sm text-red-700">
        <div className="font-bold">السعر النهائي أقل من التكلفة!</div>
        <div>التكلفة {egp(cost)} ج.م، والسعر اللي كاتبه {egp(price)} ج.م — يعني هتخسر {egp(loss)} ج.م في الصفقة دي.</div>
      </div>
    </div>
  );
}

function FinishingServicesPicker({ services, qty, enabled, setEnabled, overrides, setOverrides, lamSidesMap, setLamSidesMap }) {
  function suggestedFor(svc) {
    if (svc.hasSides) {
      const side = lamSidesMap[svc.id] || "double";
      const table = side === "single" ? svc.tiers : svc.tiersDouble || svc.tiers;
      return tierPrice(qty, table);
    }
    return tierPrice(qty, svc.tiers);
  }
  function valueFor(svc) {
    const o = overrides[svc.id];
    return o !== undefined && o !== null ? o : suggestedFor(svc);
  }
  return (
    <div className="space-y-3">
      {services.map((svc) => (
        <div key={svc.id} className="border border-stone-200 rounded-xl p-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700">
              <input type="checkbox" checked={!!enabled[svc.id]} onChange={(e) => setEnabled((p) => ({ ...p, [svc.id]: e.target.checked }))} />
              {svc.label}
            </label>
            {enabled[svc.id] && svc.hasSides && (
              <SidesPicker value={lamSidesMap[svc.id] || "double"} onChange={(v) => setLamSidesMap((p) => ({ ...p, [svc.id]: v }))} />
            )}
          </div>
          {enabled[svc.id] && (
            <div className="mt-2">
              <NumInput value={valueFor(svc)} onChange={(e) => setOverrides((p) => ({ ...p, [svc.id]: Number(e.target.value) || 0 }))} step="0.5" />
              <div className="text-[11px] text-stone-400 mt-1">مقترح {egp(suggestedFor(svc))}</div>
            </div>
          )}
        </div>
      ))}
      {services.length === 0 && <div className="text-xs text-stone-400">مفيش خدمات تشطيب مضافة — أضفها من شاشة الإعدادات</div>}
    </div>
  );
}

function AddToInvoiceButton({ invoices, activeId, onAdd }) {
  const [target, setTarget] = useState("active");
  const [done, setDone] = useState(false);
  return (
    <div className="mt-3 space-y-2">
      {invoices.length > 0 && (
        <Select
          value={target}
          onChange={setTarget}
          options={[
            ...(activeId ? [{ value: "active", label: `أضف لنفس الفاتورة الحالية (#${invoices.find((i) => i.id === activeId)?.invoiceNo || ""})` }] : []),
            ...invoices.filter((i) => i.id !== activeId).map((i) => ({ value: String(i.id), label: `فاتورة #${i.invoiceNo}${i.customer ? " — " + i.customer : ""}` })),
            { value: "new", label: "+ فاتورة جديدة" },
          ]}
        />
      )}
      <button
        onClick={() => {
          const invoiceId = target === "new" ? "new" : target === "active" ? activeId : Number(target);
          onAdd(invoiceId);
          setDone(true);
          setTimeout(() => setDone(false), 1200);
        }}
        className="w-full rounded-xl border-2 border-dashed border-cyan-400 text-cyan-700 bg-cyan-50 py-2.5 font-semibold hover:bg-cyan-100 transition"
      >
        {done ? "✓ اتضاف للفاتورة" : "+ أضف للفاتورة"}
      </button>
    </div>
  );
}

function OrderActions({ settings, description, price, buildOrder, onSaveOrder }) {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSave() {
    const order = { id: Date.now() + Math.random(), createdAt: new Date().toISOString(), notes, ...buildOrder() };
    onSaveOrder(order);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-stone-200 p-4 no-print">
        <SectionHeader title="ملاحظات وحفظ الطلب" accent="bg-cyan-500" />
        <Field label="ملاحظات (اختياري)">
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="أي تفاصيل إضافية عن الطلب..." />
        </Field>
        <button onClick={handleSave} className="w-full rounded-xl bg-cyan-600 text-white py-2.5 font-semibold hover:bg-cyan-700 transition">
          {saved ? "✓ اتحفظ الطلب" : "حفظ الطلب / تحويل لإنتاج"}
        </button>
      </div>

      <div className="print-area bg-white rounded-2xl border border-stone-200 p-5">
        <div className="flex items-center gap-3 border-b border-stone-200 pb-3 mb-3">
          <img src={LOGO_DATA_URL} className="w-12 h-12 object-contain" alt="logo" />
          <div>
            <div className="font-bold text-stone-900 text-sm">{settings.shop.name}</div>
            <div className="text-[11px] text-stone-500">{settings.shop.phone}</div>
            <div className="text-[11px] text-stone-500">{settings.shop.address}</div>
          </div>
        </div>
        <div className="text-stone-700 text-sm mb-2">{description}</div>
        <div className="flex items-center justify-between pt-3 border-t-2 border-stone-900">
          <span className="font-bold text-stone-900">السعر</span>
          <span className="text-xl font-bold text-stone-900 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(price)} ج.م</span>
        </div>
      </div>
      <button onClick={() => window.print()} className="no-print w-full bg-stone-900 text-white rounded-xl py-3 font-semibold hover:bg-stone-800 transition">
        تصدير عرض سعر (طباعة/PDF)
      </button>
    </div>
  );
}

function BookCalculator({ settings, invoices, activeId, onAddInvoice, onSaveOrder }) {
  const [pages, setPages] = useState(100);
  const [size, setSize] = useState("A4");
  const [qty, setQty] = useState(1);
  const [sides, setSides] = useState("double");
  const [coverTypeId, setCoverTypeId] = useState(settings.coverTypes[0]?.id);
  const [coverMode, setCoverMode] = useState("auto");
  const [tier, setTier] = useState("walkin");
  const [marginOverride, setMarginOverride] = useState("");
  const [designFee, setDesignFee] = useState("");
  const [finalOverride, setFinalOverride] = useState("");

  const [enabled, setEnabled] = useState({});
  const [overrides, setOverrides] = useState({});
  const [lamSidesMap, setLamSidesMap] = useState({});

  const coverType = settings.coverTypes.find((c) => c.id === coverTypeId) || settings.coverTypes[0];

  const baseDivisor = settings.interiorDivisor[size] || 2;
  const divisor = sides === "single" ? baseDivisor / 2 : baseDivisor;
  const sheetsPerBook = Math.max(1, Math.ceil(pages / divisor));
  const sheetPrice = settings.a4Price[sides];
  const interiorCost = sheetsPerBook * sheetPrice;

  let coverCost = 0;
  let coverLabel = "—";
  if (coverType) {
    if (coverMode === "digital" && coverType.hasDigitalOption) {
      coverCost = tierPrice(qty, coverType.tiersDigital || []);
      coverLabel = `${coverType.label} (ديجيتال)`;
    } else {
      coverCost = tierPrice(qty, coverType.tiersBySize[size] || []);
      coverLabel = `${coverType.label} (${size})`;
    }
  }

  function finishingCost(svc) {
    if (!enabled[svc.id]) return 0;
    if (overrides[svc.id] !== undefined && overrides[svc.id] !== null) return overrides[svc.id];
    if (svc.hasSides) {
      const side = lamSidesMap[svc.id] || "double";
      const table = side === "single" ? svc.tiers : svc.tiersDouble || svc.tiers;
      return tierPrice(qty, table);
    }
    return tierPrice(qty, svc.tiers);
  }

  const activeServices = settings.finishingServices.filter((s) => enabled[s.id]);
  const finishingTotal = settings.finishingServices.reduce((s, svc) => s + finishingCost(svc), 0);
  const baseCostPerBook = interiorCost + coverCost + finishingTotal;
  const marginPct = marginOverride !== "" ? Number(marginOverride) : settings.margins[tier];
  const pricePerBook = baseCostPerBook * (1 + marginPct / 100);
  const design = designFee !== "" ? Number(designFee) : 0;
  const computedTotal = pricePerBook * qty + design;
  const finalTotal = finalOverride !== "" ? Number(finalOverride) : computedTotal;

  const activeFinishLabels = activeServices.map((f) => f.label).join(" + ");
  const description = `كتاب ${pages} ورقة (${size}${sides === "single" ? "، وجه واحد" : ""}) — غلاف ${coverLabel}${activeFinishLabels ? " + " + activeFinishLabels : ""}`;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="مواصفات الكتاب" accent="bg-cyan-500" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="عدد الصفحات"><NumInput value={pages} onChange={(e) => setPages(Number(e.target.value) || 0)} min={1} /></Field>
          <Field label="مقاس الكتاب"><Select value={size} onChange={setSize} options={SIZE_ORDER.map((s) => ({ value: s, label: s }))} /></Field>
          <Field label="عدد النسخ"><NumInput value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} min={1} /></Field>
          <Field label="نوع الغلاف">
            <Select value={coverTypeId} onChange={setCoverTypeId} options={settings.coverTypes.map((c) => ({ value: c.id, label: c.label }))} />
          </Field>
        </div>
        {coverType && coverType.hasDigitalOption && (
          <Field label="مقاس الغلاف">
            <Select value={coverMode} onChange={setCoverMode} options={[
              { value: "auto", label: "تلقائي حسب مقاس الكتاب" },
              { value: "digital", label: "ديجيتال (كعب سميك)" },
            ]} />
          </Field>
        )}
        <Field label="طباعة الداخلي"><SidesPicker value={sides} onChange={setSides} /></Field>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="خدمات التشطيب" accent="bg-pink-500" />
        <FinishingServicesPicker services={settings.finishingServices} qty={qty} enabled={enabled} setEnabled={setEnabled} overrides={overrides} setOverrides={setOverrides} lamSidesMap={lamSidesMap} setLamSidesMap={setLamSidesMap} />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="الشريحة والهامش" accent="bg-amber-400" />
        <TierPicker value={tier} onChange={setTier} />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Field label="هامش مخصص %" hint={`افتراضي ${settings.margins[tier]}%`}><NumInput value={marginOverride} onChange={(e) => setMarginOverride(e.target.value)} placeholder={String(settings.margins[tier])} /></Field>
          <Field label="أتعاب تصميم (اختياري)"><NumInput value={designFee} onChange={(e) => setDesignFee(e.target.value)} placeholder="0" /></Field>
        </div>
      </div>

      <div className="bg-stone-900 text-stone-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3 text-stone-300"><CMYKDots /><span className="text-xs tracking-widest">كشف التسعير</span></div>
        <div className="space-y-0.5">
          <ReceiptLine label={`ورق داخلي (${sheetsPerBook} فرخ A4 × ${egp(sheetPrice)})`} value={egp(interiorCost)} />
          <ReceiptLine label={`غلاف ${coverLabel}`} value={egp(coverCost)} />
          {activeServices.map((f) => (<ReceiptLine key={f.id} label={f.label} value={egp(finishingCost(f))} />))}
          <ReceiptLine label="تكلفة خام / كتاب" value={egp(baseCostPerBook)} strong />
          <div className="h-2" />
          <ReceiptLine label={`هامش ${marginPct}%`} value={`${egp(pricePerBook - baseCostPerBook)} / كتاب`} />
          <ReceiptLine label="سعر الكتاب الواحد" value={egp(pricePerBook)} strong />
          <ReceiptLine label={`× ${qty} نسخة`} value={egp(pricePerBook * qty)} />
          {design > 0 && <ReceiptLine label="تصميم" value={egp(design)} />}
        </div>
        <div className="mt-3 pt-3 border-t border-stone-700 flex items-center justify-between">
          <span className="text-stone-300 text-sm">الإجمالي النهائي</span>
          <NumInput value={finalOverride !== "" ? finalOverride : Math.round(computedTotal * 100) / 100} onChange={(e) => setFinalOverride(e.target.value)} className="w-32 text-left bg-stone-800 text-amber-300 border-stone-700 text-xl font-bold" />
        </div>
        <div className="text-[11px] text-stone-500 mt-1">تقدر تعدل الرقم النهائي يدوي في أي وقت</div>
      </div>

      <CostWarningBanner cost={baseCostPerBook * qty + design} price={finalTotal} />

      <OrderActions
        settings={settings}
        description={description}
        price={finalTotal}
        buildOrder={() => ({
          productType: "book",
          specs: { pages, size, quantity: qty, sides, coverType: coverType ? coverType.label : "", coverLabel, finishing: activeServices.map((f) => ({ id: f.id, label: f.label, price: finishingCost(f) })) },
          costBreakdown: { interiorCost, coverCost, finishingTotal, baseCostPerBook, designFee: design },
          tier, marginPct, unitPrice: pricePerBook, finalPrice: finalTotal,
        })}
        onSaveOrder={onSaveOrder}
      />

      <AddToInvoiceButton invoices={invoices} activeId={activeId} onAdd={(invId) => onAddInvoice(invId, { description, qty, price: finalTotal, productType: "book" })} />
    </div>
  );
}

function PlainCalculator({ settings, invoices, activeId, onAddInvoice, onSaveOrder }) {
  const [pages, setPages] = useState(1);
  const [size, setSize] = useState("A4");
  const [qty, setQty] = useState(1);
  const [sides, setSides] = useState("double");
  const [tier, setTier] = useState("walkin");
  const [marginOverride, setMarginOverride] = useState("");
  const [designFee, setDesignFee] = useState("");

  const baseDivisor = settings.interiorDivisor[size] || 2;
  const divisor = sides === "single" ? baseDivisor / 2 : baseDivisor;
  const sheets = Math.max(1, Math.ceil(pages / divisor));
  const sheetPrice = settings.a4Price[sides];
  const baseCost = sheets * sheetPrice;
  const marginPct = marginOverride !== "" ? Number(marginOverride) : settings.margins[tier];
  const unitPrice = baseCost * (1 + marginPct / 100);
  const design = designFee !== "" ? Number(designFee) : 0;
  const total = unitPrice * qty + design;
  const description = `ملزمة ${pages} ورقة (${size}${sides === "single" ? "، وجه واحد" : ""})`;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="طباعة عادية / ملزمة" accent="bg-cyan-500" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="عدد الصفحات"><NumInput value={pages} onChange={(e) => setPages(Number(e.target.value) || 0)} min={1} /></Field>
          <Field label="المقاس"><Select value={size} onChange={setSize} options={SIZE_ORDER.map((s) => ({ value: s, label: s }))} /></Field>
          <Field label="عدد النسخ"><NumInput value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} min={1} /></Field>
          <Field label="هامش مخصص %" hint={`افتراضي ${settings.margins[tier]}%`}><NumInput value={marginOverride} onChange={(e) => setMarginOverride(e.target.value)} placeholder={String(settings.margins[tier])} /></Field>
        </div>
        <Field label="عدد الأوجه"><SidesPicker value={sides} onChange={setSides} /></Field>
        <Field label="أتعاب تصميم (اختياري)"><NumInput value={designFee} onChange={(e) => setDesignFee(e.target.value)} placeholder="0" /></Field>
        <div className="mt-2"><TierPicker value={tier} onChange={setTier} /></div>
      </div>

      <div className="bg-stone-900 text-stone-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3 text-stone-300"><CMYKDots /><span className="text-xs tracking-widest">كشف التسعير</span></div>
        <ReceiptLine label={`${sheets} فرخ A4 × ${egp(sheetPrice)}`} value={egp(baseCost)} />
        <ReceiptLine label={`سعر النسخة (هامش ${marginPct}%)`} value={egp(unitPrice)} strong />
        <ReceiptLine label={`× ${qty} نسخة`} value={egp(unitPrice * qty)} />
        {design > 0 && <ReceiptLine label="تصميم" value={egp(design)} />}
        <div className="mt-3 pt-3 border-t border-stone-700 flex items-center justify-between">
          <span className="text-stone-300 text-sm">الإجمالي</span>
          <span className="text-xl font-bold text-amber-300 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(total)}</span>
        </div>
      </div>

      <CostWarningBanner cost={baseCost * qty + design} price={total} />

      <OrderActions
        settings={settings}
        description={description}
        price={total}
        buildOrder={() => ({ productType: "plain", specs: { pages, size, quantity: qty, sides }, costBreakdown: { baseCost, designFee: design }, tier, marginPct, unitPrice, finalPrice: total })}
        onSaveOrder={onSaveOrder}
      />

      <AddToInvoiceButton invoices={invoices} activeId={activeId} onAdd={(invId) => onAddInvoice(invId, { description, qty, price: total, productType: "plain" })} />
    </div>
  );
}

function DigitalPieceCalculator({ settings, invoices, activeId, onAddInvoice, onSaveOrder }) {
  const [name, setName] = useState("كروت شخصية");
  const [w, setW] = useState(9);
  const [h, setH] = useState(5);
  const [qty, setQty] = useState(100);
  const [sides, setSides] = useState("single");
  const [tier, setTier] = useState("walkin");
  const [marginOverride, setMarginOverride] = useState("");
  const [designFee, setDesignFee] = useState("");

  const [enabled, setEnabled] = useState({});
  const [overrides, setOverrides] = useState({});
  const [lamSidesMap, setLamSidesMap] = useState({});

  const sheetW = settings.digitalSheet.w;
  const sheetH = settings.digitalSheet.h;
  const normal = Math.floor(sheetW / w) * Math.floor(sheetH / h);
  const rotated = Math.floor(sheetW / h) * Math.floor(sheetH / w);
  const perSheet = Math.max(1, normal, rotated);
  const bestOrientation = rotated > normal ? "مقلوب" : "عادي";
  const sheetsNeeded = Math.ceil(qty / perSheet);
  const sheetPrice = settings.digitalSheetPrice[sides];
  const printCost = sheetsNeeded * sheetPrice;

  function finishingCost(svc) {
    if (!enabled[svc.id]) return 0;
    if (overrides[svc.id] !== undefined && overrides[svc.id] !== null) return overrides[svc.id];
    if (svc.hasSides) {
      const side = lamSidesMap[svc.id] || "double";
      const table = side === "single" ? svc.tiers : svc.tiersDouble || svc.tiers;
      return tierPrice(qty, table);
    }
    return tierPrice(qty, svc.tiers);
  }
  const activeServices = settings.finishingServices.filter((s) => enabled[s.id]);
  const finishingTotal = settings.finishingServices.reduce((s, svc) => s + finishingCost(svc), 0);

  const baseCost = printCost + finishingTotal;
  const marginPct = marginOverride !== "" ? Number(marginOverride) : settings.margins[tier];
  const design = designFee !== "" ? Number(designFee) : 0;
  const totalPrice = baseCost * (1 + marginPct / 100) + design;
  const perPiece = totalPrice / qty;
  const activeFinishLabels = activeServices.map((f) => f.label).join(" + ");
  const description = `${name} ${w}×${h} سم${sides === "double" ? " وجهين" : ""}${activeFinishLabels ? " + " + activeFinishLabels : ""}`;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="منتج ديجيتال بالقطعة" accent="bg-cyan-500" />
        <Field label="اسم المنتج"><TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="كروت، شهادات، روشتات..." /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="عرض القطعة (سم)"><NumInput value={w} onChange={(e) => setW(Number(e.target.value) || 0)} step="0.5" min={0.5} /></Field>
          <Field label="ارتفاع القطعة (سم)"><NumInput value={h} onChange={(e) => setH(Number(e.target.value) || 0)} step="0.5" min={0.5} /></Field>
          <Field label="العدد المطلوب"><NumInput value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} min={1} /></Field>
          <Field label="هامش مخصص %" hint={`افتراضي ${settings.margins[tier]}%`}><NumInput value={marginOverride} onChange={(e) => setMarginOverride(e.target.value)} placeholder={String(settings.margins[tier])} /></Field>
        </div>
        <Field label="عدد الأوجه"><SidesPicker value={sides} onChange={setSides} /></Field>
        <Field label="أتعاب تصميم (اختياري)"><NumInput value={designFee} onChange={(e) => setDesignFee(e.target.value)} placeholder="0" /></Field>
        <div className="mt-2"><TierPicker value={tier} onChange={setTier} /></div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="تشطيب اختياري" accent="bg-pink-500" />
        <FinishingServicesPicker services={settings.finishingServices} qty={qty} enabled={enabled} setEnabled={setEnabled} overrides={overrides} setOverrides={setOverrides} lamSidesMap={lamSidesMap} setLamSidesMap={setLamSidesMap} />
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="حسبة الفرخ" accent="bg-amber-400" />
        <ReceiptLine label={`فرخ الديجيتال ${sheetW}×${sheetH} سم`} value="" />
        <ReceiptLine label={`قطعة/فرخ (${bestOrientation})`} value={perSheet} />
        <ReceiptLine label="عدد الأفرخ المطلوبة" value={sheetsNeeded} />
      </div>

      <div className="bg-stone-900 text-stone-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3 text-stone-300"><CMYKDots /><span className="text-xs tracking-widest">كشف التسعير</span></div>
        <ReceiptLine label={`${sheetsNeeded} فرخ × ${egp(sheetPrice)}`} value={egp(printCost)} />
        {activeServices.map((f) => (<ReceiptLine key={f.id} label={f.label} value={egp(finishingCost(f))} />))}
        <ReceiptLine label={`هامش ${marginPct}%`} value={egp(baseCost * (marginPct / 100))} />
        {design > 0 && <ReceiptLine label="تصميم" value={egp(design)} />}
        <ReceiptLine label="سعر القطعة الواحدة" value={egp(perPiece)} strong />
        <div className="mt-3 pt-3 border-t border-stone-700 flex items-center justify-between">
          <span className="text-stone-300 text-sm">الإجمالي</span>
          <span className="text-xl font-bold text-amber-300 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(totalPrice)}</span>
        </div>
      </div>

      <CostWarningBanner cost={baseCost + design} price={totalPrice} />

      <OrderActions
        settings={settings}
        description={description}
        price={totalPrice}
        buildOrder={() => ({
          productType: "digital-piece",
          specs: { name, width: w, height: h, quantity: qty, sides, perSheet, sheetsNeeded, finishing: activeServices.map((f) => ({ id: f.id, label: f.label, price: finishingCost(f) })) },
          costBreakdown: { printCost, finishingTotal, baseCost, designFee: design },
          tier, marginPct, unitPrice: perPiece, finalPrice: totalPrice,
        })}
        onSaveOrder={onSaveOrder}
      />

      <AddToInvoiceButton invoices={invoices} activeId={activeId} onAdd={(invId) => onAddInvoice(invId, { description, qty, price: totalPrice, productType: "digital-piece" })} />
    </div>
  );
}

function FixedItemsCalculator({ settings, invoices, activeId, onAddInvoice, onSaveOrder }) {
  const [itemId, setItemId] = useState(settings.fixedItems[0]?.id);
  const [qty, setQty] = useState(1);
  const [tier, setTier] = useState("walkin");
  const [designFee, setDesignFee] = useState("");

  const item = settings.fixedItems.find((i) => i.id === itemId) || settings.fixedItems[0];
  const unit = item ? item[tier] : 0;
  const design = designFee !== "" ? Number(designFee) : 0;
  const total = unit * qty + design;
  const description = `${item ? item.name : ""}`;

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="منتج سعر ثابت" accent="bg-cyan-500" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="المنتج"><Select value={itemId} onChange={setItemId} options={settings.fixedItems.map((i) => ({ value: i.id, label: i.name }))} /></Field>
          <Field label="الكمية"><NumInput value={qty} onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))} min={1} /></Field>
        </div>
        <Field label="أتعاب تصميم (اختياري)"><NumInput value={designFee} onChange={(e) => setDesignFee(e.target.value)} placeholder="0" /></Field>
        <div className="mt-2"><TierPicker value={tier} onChange={setTier} /></div>
      </div>

      <div className="bg-stone-900 text-stone-50 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3 text-stone-300"><CMYKDots /><span className="text-xs tracking-widest">كشف التسعير</span></div>
        <ReceiptLine label={`سعر القطعة (${TIERS.find((t) => t.id === tier).label})`} value={egp(unit)} />
        <ReceiptLine label={`× ${qty}`} value={egp(unit * qty)} />
        {design > 0 && <ReceiptLine label="تصميم" value={egp(design)} />}
        <div className="mt-3 pt-3 border-t border-stone-700 flex items-center justify-between">
          <span className="text-stone-300 text-sm">الإجمالي</span>
          <span className="text-xl font-bold text-amber-300 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(total)}</span>
        </div>
      </div>

      <OrderActions
        settings={settings}
        description={description}
        price={total}
        buildOrder={() => ({ productType: "fixed", specs: { itemName: item ? item.name : "", quantity: qty }, costBreakdown: { unit, designFee: design }, tier, finalPrice: total })}
        onSaveOrder={onSaveOrder}
      />

      <AddToInvoiceButton invoices={invoices} activeId={activeId} onAdd={(invId) => onAddInvoice(invId, { description, qty, price: total, productType: "fixed" })} />
    </div>
  );
}

function InvoiceScreen({ invoices, setInvoices, activeId, setActiveId, settings, onArchive, archiveStatus }) {
  const active = invoices.find((i) => i.id === activeId);

  function updateActive(patch) {
    setInvoices((prev) => prev.map((i) => (i.id === activeId ? { ...i, ...patch } : i)));
  }
  function handleCustomerChange(name) {
    const match = (settings.customers || []).find((c) => c.name === name);
    updateActive(match ? { customer: name, customerPhone: match.phone } : { customer: name });
  }
  function removeItem(itemId) {
    updateActive({ items: active.items.filter((it) => it.id !== itemId) });
  }
  function addBlankInvoice() {
    const inv = newInvoice();
    setInvoices((prev) => [...prev, inv]);
    setActiveId(inv.id);
  }
  function closeInvoice(id) {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    if (activeId === id) {
      const remaining = invoices.filter((i) => i.id !== id);
      setActiveId(remaining.length ? remaining[0].id : null);
    }
  }

  if (!invoices.length) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
        <div className="text-stone-400 text-sm mb-3">
          مفيش فواتير مفتوحة دلوقتي — روح لأي حاسبة تسعير وضغط "أضف للفاتورة" عشان تبدأ، أو افتح فاتورة قديمة من تاب "الأرشيف".
          <br />الفاتورة اختيارية، مش كل عملية بيع محتاجة فاتورة.
        </div>
        <button onClick={addBlankInvoice} className="rounded-xl bg-stone-900 text-white px-4 py-2 text-sm font-semibold">+ فاتورة جديدة</button>
      </div>
    );
  }

  if (!active) return null;
  const total = active.items.reduce((s, i) => s + i.price, 0);
  const today = new Date().toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1 no-print">
        {invoices.map((inv) => (
          <button key={inv.id} onClick={() => setActiveId(inv.id)} className={"shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border " + (inv.id === activeId ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-300")}>
            #{inv.invoiceNo}{inv.customer ? " — " + inv.customer : ""} ({inv.items.length})
          </button>
        ))}
        <button onClick={addBlankInvoice} className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border border-dashed border-stone-400 text-stone-500">+ جديدة</button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4 no-print">
        <SectionHeader title="بيانات الفاتورة" accent="bg-cyan-500" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="اسم العميل (اختياري)">
            <TextInput list="customers-datalist" value={active.customer} onChange={(e) => handleCustomerChange(e.target.value)} placeholder="—" />
            <datalist id="customers-datalist">
              {(settings.customers || []).map((c) => (<option key={c.id} value={c.name} />))}
            </datalist>
          </Field>
          <Field label="تليفون العميل (اختياري)">
            <TextInput dir="ltr" value={active.customerPhone || ""} onChange={(e) => updateActive({ customerPhone: e.target.value })} placeholder="—" />
          </Field>
        </div>
        <Field label="رقم الفاتورة">
          <div className="flex gap-2">
            <NumInput value={active.invoiceNo} onChange={(e) => updateActive({ invoiceNo: e.target.value })} className="flex-1" />
            <button onClick={() => updateActive({ invoiceNo: randomInvoiceNumber() })} className="px-3 rounded-lg border border-stone-300 text-stone-500 text-sm">جديد</button>
          </div>
        </Field>
        {active.archiveId && <div className="text-[11px] text-cyan-600">✓ الفاتورة دي متحفظة في الأرشيف — أي تعديل تحفظه هيحدّثها هناك</div>}
        {invoices.length > 1 && (<button onClick={() => closeInvoice(active.id)} className="text-xs text-red-500 mt-1">إغلاق الفاتورة دي (من الشاشة بس، مش من الأرشيف)</button>)}
      </div>

      <div className="print-area bg-white rounded-2xl border border-stone-200 p-5">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <img src={LOGO_DATA_URL} alt="مطبعة ألوان" className="w-14 h-14 object-contain" />
            <div>
              <div className="font-bold text-stone-900">{settings.shop.name}</div>
              <div className="text-xs text-stone-500">{settings.shop.phone}</div>
              <div className="text-xs text-stone-500">{settings.shop.address}</div>
            </div>
          </div>
          <div className="text-left">
            <div className="text-xs text-stone-400">فاتورة رقم</div>
            <div className="font-bold text-stone-900 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#{active.invoiceNo}</div>
            <div className="text-xs text-stone-400 mt-1">{today}</div>
          </div>
        </div>
        {(active.customer || active.customerPhone) && (
          <div className="mb-3 text-sm text-stone-600">
            {active.customer && (<>العميل: <span className="font-semibold text-stone-900">{active.customer}</span></>)}
            {active.customerPhone && (<span className="text-stone-400 text-xs"> — {active.customerPhone}</span>)}
          </div>
        )}
        {active.items.length === 0 ? (
          <div className="text-stone-400 text-sm text-center py-6">الفاتورة دي لسه فاضية</div>
        ) : (
          <div>
            <div className="grid grid-cols-12 gap-1 text-[11px] text-stone-400 border-b border-stone-300 pb-1 mb-1">
              <span className="col-span-6">البيان</span>
              <span className="col-span-2 text-center">العدد</span>
              <span className="col-span-2 text-center">سعر الوحدة</span>
              <span className="col-span-2 text-left">الإجمالي</span>
            </div>
            {active.items.map((it) => {
              const qty = it.qty && it.qty > 0 ? it.qty : 1;
              const unit = it.price / qty;
              return (
                <div key={it.id} className="grid grid-cols-12 gap-1 items-center py-2 border-b border-dashed border-stone-200">
                  <span className="col-span-6 text-stone-700 text-sm">{it.description}</span>
                  <span className="col-span-2 text-center text-stone-700 text-sm tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{qty}</span>
                  <span className="col-span-2 text-center text-stone-700 text-sm tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(unit)}</span>
                  <span className="col-span-2 flex items-center justify-end gap-2">
                    <span className="tabular-nums text-stone-900 font-medium text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(it.price)}</span>
                    <button onClick={() => removeItem(it.id)} className="no-print text-stone-300 hover:text-red-500 text-xs">✕</button>
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-stone-900">
          <span className="font-bold text-stone-900">الإجمالي الكلي</span>
          <span className="text-2xl font-bold text-stone-900 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(total)} ج.م</span>
        </div>
      </div>

      <div className="no-print grid grid-cols-2 gap-2">
        <button onClick={() => onArchive(active.id)} className="rounded-xl bg-cyan-600 text-white py-3 font-semibold hover:bg-cyan-700 transition">
          {archiveStatus === "saved" ? "✓ اتحفظت" : "حفظ في الأرشيف"}
        </button>
        <button onClick={() => window.print()} className="bg-stone-900 text-white rounded-xl py-3 font-semibold hover:bg-stone-800 transition">طباعة / حفظ PDF</button>
      </div>
    </div>
  );
}

const PRODUCT_TYPE_LABELS = { book: "كتاب", plain: "طباعة عادية", "digital-piece": "ديجيتال بالقطعة", fixed: "سعر ثابت" };

function ArchiveScreen({ archivedInvoices, onOpen }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const filtered = !q
    ? archivedInvoices
    : archivedInvoices.filter((a) => String(a.invoiceNo).toLowerCase().includes(q) || (a.customer || "").toLowerCase().includes(q) || (a.customerPhone || "").includes(q));
  const sorted = [...filtered].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="بحث في الفواتير" accent="bg-cyan-500" />
        <TextInput value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث برقم الفاتورة أو اسم العميل أو التليفون..." />
      </div>

      {sorted.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-400 text-sm">
          {archivedInvoices.length === 0 ? "مفيش فواتير متحفظة في الأرشيف لسه — من تاب الفاتورة، دوس \"حفظ في الأرشيف\"." : "مفيش نتائج مطابقة للبحث"}
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((a) => {
            const total = a.items.reduce((s, i) => s + i.price, 0);
            return (
              <div key={a.id} className="bg-white rounded-2xl border border-stone-200 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-stone-800 text-sm">#{a.invoiceNo}{a.customer ? " — " + a.customer : ""}</div>
                    <div className="text-[11px] text-stone-400">
                      أُنشئت {new Date(a.createdAt).toLocaleDateString("ar-EG")}
                      {a.updatedAt !== a.createdAt ? ` — آخر تعديل ${new Date(a.updatedAt).toLocaleDateString("ar-EG")}` : ""}
                    </div>
                  </div>
                  <div className="font-bold text-stone-900 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(total)} ج.م</div>
                </div>
                <button onClick={() => onOpen(a)} className="mt-2 text-xs text-cyan-600 font-semibold">فتح للعرض / التعديل</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const REPORT_RANGES = [
  { id: "all", label: "الكل" },
  { id: "today", label: "اليوم" },
  { id: "week", label: "آخر ٧ أيام" },
  { id: "month", label: "آخر ٣٠ يوم" },
];

function inRange(dateStr, rangeId) {
  if (rangeId === "all") return true;
  const d = new Date(dateStr);
  const now = new Date();
  const diffDays = (now - d) / (1000 * 60 * 60 * 24);
  if (rangeId === "today") return d.toDateString() === now.toDateString();
  if (rangeId === "week") return diffDays <= 7;
  if (rangeId === "month") return diffDays <= 30;
  return true;
}

function ReportsScreen({ archivedInvoices }) {
  const [range, setRange] = useState("all");
  const filtered = archivedInvoices.filter((a) => inRange(a.createdAt, range));

  const totalRevenue = filtered.reduce((s, a) => s + a.items.reduce((s2, it) => s2 + it.price, 0), 0);
  const invoiceCount = filtered.length;

  const byType = {};
  const byProduct = {};
  filtered.forEach((a) => {
    a.items.forEach((it) => {
      const type = it.productType || "غير محدد";
      byType[type] = (byType[type] || 0) + it.price;
      const key = it.description;
      if (!byProduct[key]) byProduct[key] = { qty: 0, revenue: 0 };
      byProduct[key].qty += it.qty && it.qty > 0 ? it.qty : 1;
      byProduct[key].revenue += it.price;
    });
  });
  const typeRows = Object.entries(byType).sort((a, b) => b[1] - a[1]);
  const topProducts = Object.entries(byProduct).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 5);

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {REPORT_RANGES.map((r) => (
          <button key={r.id} onClick={() => setRange(r.id)} className={"shrink-0 rounded-full px-4 py-2 text-sm font-medium border " + (range === r.id ? "bg-stone-900 text-white border-stone-900" : "bg-white text-stone-600 border-stone-300")}>{r.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-stone-200 p-4 text-center">
          <div className="text-[11px] text-stone-400">إجمالي المبيعات</div>
          <div className="text-xl font-bold text-stone-900 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(totalRevenue)}</div>
        </div>
        <div className="bg-white rounded-2xl border border-stone-200 p-4 text-center">
          <div className="text-[11px] text-stone-400">عدد الفواتير</div>
          <div className="text-xl font-bold text-stone-900 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{invoiceCount}</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="المبيعات حسب نوع المنتج" accent="bg-pink-500" />
        {typeRows.length === 0 ? (
          <div className="text-xs text-stone-400">مفيش بيانات في الفترة دي</div>
        ) : (
          <div className="space-y-3">
            {typeRows.map(([type, rev]) => {
              const pct = totalRevenue > 0 ? Math.round((rev / totalRevenue) * 100) : 0;
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-stone-700">{PRODUCT_TYPE_LABELS[type] || type}</span>
                    <span className="text-stone-500 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(rev)} ({pct}%)</span>
                  </div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="الأكثر مبيعاً" accent="bg-amber-400" />
        {topProducts.length === 0 ? (
          <div className="text-xs text-stone-400">مفيش بيانات في الفترة دي</div>
        ) : (
          <div className="space-y-1">
            {topProducts.map(([desc, d], i) => (
              <div key={desc} className="flex items-center justify-between py-2 border-b border-dashed border-stone-200 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 text-xs w-4">{i + 1}.</span>
                  <span className="text-stone-700 text-sm">{desc}</span>
                </div>
                <div className="text-left text-xs text-stone-500 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {d.qty} قطعة — {egp(d.revenue)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OrdersScreen({ orders }) {
  const [openId, setOpenId] = useState(null);
  if (!orders.length) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
        <div className="text-stone-400 text-sm">مفيش طلبات متحفظة لسه — من أي حاسبة تسعير، دوس "حفظ الطلب / تحويل لإنتاج" عشان يتسجل هنا كـ JSON جاهز.</div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {[...orders].reverse().map((o) => (
        <div key={o.id} className="bg-white rounded-2xl border border-stone-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-stone-800">{PRODUCT_TYPE_LABELS[o.productType] || o.productType}</div>
              <div className="text-[11px] text-stone-400">{new Date(o.createdAt).toLocaleString("ar-EG")}</div>
            </div>
            <div className="text-left">
              <div className="font-bold text-stone-900 tabular-nums" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{egp(o.finalPrice)} ج.م</div>
            </div>
          </div>
          {o.notes && <div className="text-xs text-stone-500 mt-2">ملاحظات: {o.notes}</div>}
          <button onClick={() => setOpenId(openId === o.id ? null : o.id)} className="text-xs text-cyan-600 font-medium mt-2">
            {openId === o.id ? "إخفاء تفاصيل JSON" : "عرض تفاصيل JSON"}
          </button>
          {openId === o.id && (
            <pre className="mt-2 bg-stone-50 border border-stone-200 rounded-lg p-3 text-[10px] overflow-x-auto" dir="ltr">{JSON.stringify(o, null, 2)}</pre>
          )}
        </div>
      ))}
    </div>
  );
}

function TierTableEditor({ label, tiers, onChange }) {
  function updateRow(i, key, val) {
    onChange(tiers.map((t, idx) => (idx === i ? { ...t, [key]: val } : t)));
  }
  function addRow() {
    const last = tiers[tiers.length - 1];
    onChange([...tiers, { upTo: (last ? last.upTo : 0) + 50, price: last ? last.price : 0 }]);
  }
  function removeRow(i) {
    onChange(tiers.filter((_, idx) => idx !== i));
  }
  const sorted = [...tiers].sort((a, b) => a.upTo - b.upTo);
  return (
    <div className="border border-stone-200 rounded-xl p-3">
      {label && <div className="text-sm font-semibold text-stone-700 mb-2">{label}</div>}
      <div className="space-y-2">
        {sorted.map((t, i) => {
          const origIndex = tiers.indexOf(t);
          return (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-stone-400 w-16 shrink-0">{i === 0 ? "من 1" : `من ${sorted[i - 1].upTo + 1}`}</span>
              <span className="text-xs text-stone-400">لـ</span>
              <NumInput value={t.upTo} onChange={(e) => updateRow(origIndex, "upTo", Number(e.target.value) || 0)} className="!w-20" />
              <span className="text-xs text-stone-400">بسعر</span>
              <NumInput value={t.price} onChange={(e) => updateRow(origIndex, "price", Number(e.target.value) || 0)} className="!w-20" step="0.5" />
              <button onClick={() => removeRow(origIndex)} className="text-stone-300 hover:text-red-500 text-sm">✕</button>
            </div>
          );
        })}
      </div>
      <button onClick={addRow} className="mt-2 text-xs text-cyan-600 font-medium">+ إضافة شريحة</button>
    </div>
  );
}

function CoverTypeEditor({ coverType, onChange, onDelete }) {
  function update(patch) {
    onChange({ ...coverType, ...patch });
  }
  return (
    <div className="border border-stone-300 rounded-xl p-3 space-y-3">
      <div className="flex items-center gap-2">
        <TextInput value={coverType.label} onChange={(e) => update({ label: e.target.value })} className="flex-1" />
        <button onClick={onDelete} className="text-red-500 text-xs shrink-0">حذف النوع</button>
      </div>
      <label className="flex items-center gap-2 text-xs text-stone-600">
        <input type="checkbox" checked={!!coverType.hasDigitalOption} onChange={(e) => update({ hasDigitalOption: e.target.checked, tiersDigital: coverType.tiersDigital || [{ upTo: 999999, price: 25 }] })} />
        عنده خيار "ديجيتال" إضافي (للكعب السميك)
      </label>
      {coverType.hasDigitalOption && (
        <TierTableEditor label="سعر الديجيتال (كل المقاسات)" tiers={coverType.tiersDigital || []} onChange={(v) => update({ tiersDigital: v })} />
      )}
      <div className="space-y-2">
        {SIZE_ORDER.map((s) => (
          <TierTableEditor key={s} label={`مقاس ${s}`} tiers={coverType.tiersBySize[s] || []} onChange={(v) => update({ tiersBySize: { ...coverType.tiersBySize, [s]: v } })} />
        ))}
      </div>
    </div>
  );
}

function FinishingServiceEditor({ service, onChange, onDelete }) {
  function update(patch) {
    onChange({ ...service, ...patch });
  }
  return (
    <div className="border border-stone-300 rounded-xl p-3 space-y-3">
      <div className="flex items-center gap-2">
        <TextInput value={service.label} onChange={(e) => update({ label: e.target.value })} className="flex-1" />
        <button onClick={onDelete} className="text-red-500 text-xs shrink-0">حذف الخدمة</button>
      </div>
      <label className="flex items-center gap-2 text-xs text-stone-600">
        <input type="checkbox" checked={!!service.hasSides} onChange={(e) => update({ hasSides: e.target.checked, tiersDouble: service.tiersDouble || defaultTier(2) })} />
        سعرها مختلف حسب وجه/وجهين
      </label>
      <TierTableEditor label={service.hasSides ? "شرائح وجه واحد" : "شرائح السعر"} tiers={service.tiers} onChange={(v) => update({ tiers: v })} />
      {service.hasSides && (
        <TierTableEditor label="شرائح وجهين" tiers={service.tiersDouble || []} onChange={(v) => update({ tiersDouble: v })} />
      )}
    </div>
  );
}

function SettingsBackup({ settings, setSettings }) {
  const [importText, setImportText] = useState("");
  const [importStatus, setImportStatus] = useState("");
  const [copyStatus, setCopyStatus] = useState("idle");
  const json = JSON.stringify(settings, null, 2);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(json);
      setCopyStatus("copied");
    } catch (e) {
      setCopyStatus("failed");
    }
    setTimeout(() => setCopyStatus("idle"), 2000);
  }

  function handleImport() {
    try {
      const parsed = JSON.parse(importText);
      setSettings(deepMerge(DEFAULT_SETTINGS, parsed));
      setImportStatus("✓ اتستورد بنجاح");
    } catch (e) {
      setImportStatus("النص مش JSON صحيح — راجع إنك نسخت كل النص من غير نقص");
    }
    setTimeout(() => setImportStatus(""), 3000);
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-4">
      <SectionHeader title="نسخة احتياطية من الإعدادات" accent="bg-cyan-500" />
      <p className="text-xs text-stone-400 mb-2">انسخ النص ده واحفظه في مكان آمن (مذكرة، إيميل...). لو حصل أي مشكلة تقدر ترجّع كل أسعارك بلصقه في خانة الاستيراد تحت</p>
      <textarea readOnly value={json} rows={4} dir="ltr" onFocus={(e) => e.target.select()} className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-[10px]" style={{ fontFamily: "monospace" }} />
      <button onClick={handleCopy} className="mt-2 w-full rounded-xl border border-stone-300 text-stone-600 py-2 text-sm font-semibold">
        {copyStatus === "copied" ? "✓ اتنسخ" : copyStatus === "failed" ? "مقدرش أنسخ تلقائي — انسخ يدوي من الصندوق فوق" : "نسخ الإعدادات"}
      </button>
      <div className="mt-4 pt-4 border-t border-stone-200">
        <Field label="استيراد إعدادات (الصق النص هنا)">
          <textarea value={importText} onChange={(e) => setImportText(e.target.value)} rows={4} dir="ltr" className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-[10px]" style={{ fontFamily: "monospace" }} />
        </Field>
        <button onClick={handleImport} className="w-full rounded-xl bg-stone-700 text-white py-2 text-sm font-semibold">استيراد الإعدادات</button>
        {importStatus && <div className="text-xs text-center mt-2 text-cyan-700">{importStatus}</div>}
      </div>
    </div>
  );
}

function SettingsScreen({ settings, setSettings, onSave, saveState, userRole }) {
  function update(path, value) {
    if (userRole !== 'admin') {
      alert('عفواً، هذه الصلاحية خاصة بالمدير فقط!');
      return;
    }
    setSettings((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < path.length - 1; i++) obj = obj[path[i]];
      obj[path[path.length - 1]] = value;
      return next;
    });
  }
  function updateFixedItem(id, key, value) {
    setSettings((prev) => ({ ...prev, fixedItems: prev.fixedItems.map((i) => (i.id === id ? { ...i, [key]: value } : i)) }));
  }
  function addFixedItem() {
    setSettings((prev) => ({ ...prev, fixedItems: [...prev.fixedItems, { id: uid("item"), name: "منتج جديد", walkin: 0, loyal: 0, wholesale: 0 }] }));
  }
  function removeFixedItem(id) {
    setSettings((prev) => ({ ...prev, fixedItems: prev.fixedItems.filter((i) => i.id !== id) }));
  }
  function updateCoverType(id, next) {
    setSettings((prev) => ({ ...prev, coverTypes: prev.coverTypes.map((c) => (c.id === id ? next : c)) }));
  }
  function addCoverType() {
    setSettings((prev) => ({ ...prev, coverTypes: [...prev.coverTypes, { id: uid("cover"), label: "غلاف جديد", hasDigitalOption: false, tiersBySize: defaultTierBySize(10) }] }));
  }
  function removeCoverType(id) {
    setSettings((prev) => ({ ...prev, coverTypes: prev.coverTypes.filter((c) => c.id !== id) }));
  }
  function updateFinishingService(id, next) {
    setSettings((prev) => ({ ...prev, finishingServices: prev.finishingServices.map((s) => (s.id === id ? next : s)) }));
  }
  function addFinishingService() {
    setSettings((prev) => ({ ...prev, finishingServices: [...prev.finishingServices, { id: uid("svc"), label: "خدمة جديدة", hasSides: false, tiers: defaultTier(5) }] }));
  }
  function removeFinishingService(id) {
    setSettings((prev) => ({ ...prev, finishingServices: prev.finishingServices.filter((s) => s.id !== id) }));
  }

  return (
    <div className="space-y-5 pb-24">
      {userRole !== 'admin' && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-xl text-xs">
          🔒 أنت تستعرض الإعدادات بصلاحية (موظف) - التعديل محمي ومتاح للمدير فقط.
        </div>
      )}

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="بيانات المطبعة (للفاتورة)" accent="bg-cyan-500" />
        <Field label="اسم المطبعة"><TextInput value={settings.shop.name} onChange={(e) => update(["shop", "name"], e.target.value)} /></Field>
        <Field label="التليفون"><TextInput dir="ltr" value={settings.shop.phone} onChange={(e) => update(["shop", "phone"], e.target.value)} /></Field>
        <Field label="العنوان"><TextInput value={settings.shop.address} onChange={(e) => update(["shop", "address"], e.target.value)} /></Field>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="أسعار الورق الأساسية" accent="bg-cyan-500" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="فرخ A4 - وجه واحد"><NumInput value={settings.a4Price.single} onChange={(e) => update(["a4Price", "single"], Number(e.target.value) || 0)} step="0.1" /></Field>
          <Field label="فرخ A4 - وجهين"><NumInput value={settings.a4Price.double} onChange={(e) => update(["a4Price", "double"], Number(e.target.value) || 0)} step="0.1" /></Field>
          <Field label="فرخ الديجيتال - وجه واحد"><NumInput value={settings.digitalSheetPrice.single} onChange={(e) => update(["digitalSheetPrice", "single"], Number(e.target.value) || 0)} step="0.5" /></Field>
          <Field label="فرخ الديجيتال - وجهين"><NumInput value={settings.digitalSheetPrice.double} onChange={(e) => update(["digitalSheetPrice", "double"], Number(e.target.value) || 0)} step="0.5" /></Field>
          <Field label="عرض فرخ الديجيتال (سم)"><NumInput value={settings.digitalSheet.w} onChange={(e) => update(["digitalSheet", "w"], Number(e.target.value) || 0)} /></Field>
          <Field label="ارتفاع فرخ الديجيتال (سم)"><NumInput value={settings.digitalSheet.h} onChange={(e) => update(["digitalSheet", "h"], Number(e.target.value) || 0)} /></Field>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="أفرخ الداخلي لكل مقاس (وجهين)" accent="bg-pink-500" />
        <p className="text-xs text-stone-400 mb-2">عدد صفحات الكتاب بيتقسم على الرقم ده يطلع عدد أفرخ الA4 (وجه واحد بيتقسم على نصه تلقائي)</p>
        <div className="grid grid-cols-3 gap-3">
          {SIZE_ORDER.map((s) => (<Field key={s} label={s}><NumInput value={settings.interiorDivisor[s]} onChange={(e) => update(["interiorDivisor", s], Number(e.target.value) || 0)} /></Field>))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <div className="flex items-center justify-between mb-1">
          <SectionHeader title="أنواع الأغلفة" accent="bg-amber-400" />
        </div>
        <p className="text-xs text-stone-400 mb-3">كل نوع غلاف له جدول شرائح مستقل لكل مقاس كتاب — أضف/احذف أنواع براحتك</p>
        <div className="space-y-3">
          {settings.coverTypes.map((c) => (
            <CoverTypeEditor key={c.id} coverType={c} onChange={(next) => updateCoverType(c.id, next)} onDelete={() => removeCoverType(c.id)} />
          ))}
        </div>
        <button onClick={addCoverType} className="mt-3 w-full rounded-xl border-2 border-dashed border-cyan-400 text-cyan-700 py-2 text-sm font-semibold">+ إضافة نوع غلاف جديد</button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="خدمات التشطيب" accent="bg-pink-500" />
        <p className="text-xs text-stone-400 mb-3">أضف/احذف خدمات تشطيب براحتك — كل خدمة لها جدول شرائح خاص بيها</p>
        <div className="space-y-3">
          {settings.finishingServices.map((s) => (
            <FinishingServiceEditor key={s.id} service={s} onChange={(next) => updateFinishingService(s.id, next)} onDelete={() => removeFinishingService(s.id)} />
          ))}
        </div>
        <button onClick={addFinishingService} className="mt-3 w-full rounded-xl border-2 border-dashed border-cyan-400 text-cyan-700 py-2 text-sm font-semibold">+ إضافة خدمة تشطيب جديدة</button>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="هوامش الشرائح" accent="bg-amber-400" />
        <div className="grid grid-cols-3 gap-3">
          {TIERS.map((t) => (<Field key={t.id} label={`${t.label} %`}><NumInput value={settings.margins[t.id]} onChange={(e) => update(["margins", t.id], Number(e.target.value) || 0)} step="0.5" /></Field>))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-4">
        <SectionHeader title="المنتجات الثابتة" accent="bg-pink-500" />
        <p className="text-xs text-stone-400 mb-3">أضف/احذف منتجات براحتك — كل منتج بسعر منفصل لكل شريحة</p>
        <div className="space-y-3">
          {settings.fixedItems.map((item) => (
            <div key={item.id} className="border border-stone-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <TextInput value={item.name} onChange={(e) => updateFixedItem(item.id, "name", e.target.value)} className="flex-1" />
                <button onClick={() => removeFixedItem(item.id)} className="text-red-500 text-xs shrink-0">حذف</button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {TIERS.map((t) => (<Field key={t.id} label={t.label}><NumInput value={item[t.id]} onChange={(e) => updateFixedItem(item.id, t.id, Number(e.target.value) || 0)} step="0.5" /></Field>))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={addFixedItem} className="mt-3 w-full rounded-xl border-2 border-dashed border-cyan-400 text-cyan-700 py-2 text-sm font-semibold">+ إضافة منتج جديد</button>
      </div>

      <SettingsBackup settings={settings} setSettings={setSettings} />

      <div className="fixed bottom-0 inset-x-0 bg-white border-t border-stone-200 p-3 no-print">
        <button onClick={onSave} className="w-full bg-stone-900 text-white rounded-xl py-3 font-semibold hover:bg-stone-800 transition">
          {saveState === "saving" ? "بيتم الحفظ..." : saveState === "saved" ? "✓ اتحفظ" : "حفظ الإعدادات"}
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// الشاشات والأقسام الإضافية الاحترافية (Dashboard, Production, Audit)
// -------------------------------------------------------------

function DashboardOverview({ archivedInvoices, orders }) {
  const totalRevenue = archivedInvoices.reduce((s, a) => s + a.items.reduce((s2, it) => s2 + it.price, 0), 0);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">لوحة الإحصائيات المباشرة</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <p className="text-slate-400 text-sm">مبيعات الأرشيف</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{egp(totalRevenue)} ج.م</p>
          <span className="text-xs text-emerald-500">من الفواتير الحقيقية</span>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <p className="text-slate-400 text-sm">إجمالي الفواتير</p>
          <p className="text-2xl font-bold text-indigo-400 mt-1">{archivedInvoices.length} فاتورة</p>
          <span className="text-xs text-slate-400">مخزنة بالأرشيف</span>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <p className="text-slate-400 text-sm">طلبات الإنتاج</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{orders.length} طلب</p>
          <span className="text-xs text-amber-500">في انتظار التشغيل</span>
        </div>
        <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
          <p className="text-slate-400 text-sm">الحالة البرمجية</p>
          <p className="text-xl font-bold text-pink-400 mt-1">Supabase Live</p>
          <span className="text-xs text-slate-400">تزامن تلقائي</span>
        </div>
      </div>
    </div>
  );
}

function ProductionWorkflow({ orders }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">ترتيب الإنتاجية وصالة التشغيل</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
          <h3 className="font-bold text-indigo-400 flex items-center justify-between">
            <span>🖨️ قيد الطباعة</span>
            <span className="text-xs bg-indigo-500/20 px-2 py-0.5 rounded-full">{orders.length}</span>
          </h3>
          {orders.map((o) => (
            <div key={o.id} className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
              <span className="text-xs text-indigo-400 font-mono">#ORD-{Math.floor(o.id % 1000)}</span>
              <h4 className="font-bold text-white">{PRODUCT_TYPE_LABELS[o.productType] || o.productType}</h4>
              <p className="text-xs text-slate-400">{o.notes || 'لا يوجد ملاحظات إضافية'}</p>
            </div>
          ))}
          {orders.length === 0 && <p className="text-xs text-slate-500">مفيش طلبات حالية</p>}
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
          <h3 className="font-bold text-amber-400 flex items-center justify-between">
            <span>✂️ التشطيب والسلوفان</span>
            <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded-full">0</span>
          </h3>
          <p className="text-xs text-slate-500">جاهز لاستقبال الطلبات</p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
          <h3 className="font-bold text-emerald-400 flex items-center justify-between">
            <span>📦 جاهز للتسليم</span>
            <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded-full">0</span>
          </h3>
          <p className="text-xs text-slate-500">لا يوجد طلبات جاهزة حالياً</p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// المكون الرئيسي للتطبيق الكامل (App)
// -------------------------------------------------------------

export default function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  
  // التحكم في التصفح والأدوار
  const [activeMainTab, setActiveMainTab] = useState("pricing"); // dashboard, pricing, production, accounting, employees, logs
  const [pricingSubTab, setPricingSubTab] = useState("book");
  const [userRole, setUserRole] = useState("admin"); // admin, employee, accountant
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [saveState, setSaveState] = useState("idle");
  const [invoices, setInvoices] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [archivedInvoices, setArchivedInvoices] = useState([]);
  const [archiveStatus, setArchiveStatus] = useState("idle");

  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'أحمد محمود', action: 'تعديل سعر كوشيه 150ج', time: 'منذ 10 دقائق' },
    { id: 2, user: 'محمد مصطفى', action: 'حفظ فاتورة جديدة في الأرشيف', time: 'منذ ساعة' }
  ]);

  useEffect(() => {
    (async () => {
      const s = await loadSettings();
      setSettings(s);
      const o = await loadOrders();
      setOrders(o);
      const arch = await loadArchive();
      setArchivedInvoices(arch);
      setLoaded(true);
    })();
  }, []);

  async function handleSave() {
    setSaveState("saving");
    try {
      await saveSettings(settings);
      setSaveState("saved");
      setTimeout(() => setSaveState("idle"), 1500);
    } catch (e) {
      setSaveState("idle");
    }
  }

  function handleSaveOrder(order) {
    setOrders((prev) => {
      const next = [...prev, order];
      persistOrders(next);
      return next;
    });
  }

  function addInvoiceItem(targetId, item) {
    const withId = { ...item, id: Date.now() + Math.random() };
    if (targetId === "new" || !targetId) {
      const inv = newInvoice();
      inv.items = [withId];
      setInvoices((prev) => [...prev, inv]);
      setActiveId(inv.id);
    } else {
      setInvoices((prev) => prev.map((i) => (i.id === targetId ? { ...i, items: [...i.items, withId] } : i)));
      setActiveId(targetId);
    }
  }

  function handleArchiveInvoice(invoiceId) {
    const inv = invoices.find((i) => i.id === invoiceId);
    if (!inv) return;
    const nowIso = new Date().toISOString();
    const archiveId = inv.archiveId || uid("arch");
    const createdAt = inv.createdAt || nowIso;
    const record = { ...inv, id: archiveId, archiveId, createdAt, updatedAt: nowIso };

    setArchivedInvoices((prev) => {
      const exists = prev.some((a) => a.id === archiveId);
      const next = exists ? prev.map((a) => (a.id === archiveId ? record : a)) : [...prev, record];
      persistArchive(next);
      return next;
    });
    setInvoices((prev) => prev.map((i) => (i.id === invoiceId ? { ...i, archiveId, createdAt } : i)));

    if (inv.customer && inv.customerPhone) {
      setSettings((prev) => {
        const already = (prev.customers || []).some((c) => c.name === inv.customer && c.phone === inv.customerPhone);
        if (already) return prev;
        const next = { ...prev, customers: [...(prev.customers || []), { id: uid("cust"), name: inv.customer, phone: inv.customerPhone }] };
        saveSettings(next);
        return next;
      });
    }
    setArchiveStatus("saved");
    setTimeout(() => setArchiveStatus("idle"), 1500);
  }

  function handleOpenArchived(record) {
    const alreadyOpen = invoices.find((i) => i.archiveId === record.id);
    if (alreadyOpen) {
      setActiveId(alreadyOpen.id);
    } else {
      const draft = { id: Date.now() + Math.random(), invoiceNo: record.invoiceNo, customer: record.customer, customerPhone: record.customerPhone, archiveId: record.id, createdAt: record.createdAt, items: record.items };
      setInvoices((prev) => [...prev, draft]);
      setActiveId(draft.id);
    }
    setActiveMainTab("pricing");
    setPricingSubTab("invoice");
  }

  const mainTabs = [
    { id: "dashboard", label: "📊 لوحة التحكم" },
    { id: "pricing", label: "💰 التسعير الشامل" },
    { id: "production", label: "🏭 ترتيب الإنتاجية" },
    { id: "accounting", label: "🧾 الحسابات" },
    { id: "employees", label: "👥 الموظفين" },
    { id: "logs", label: "📜 السجلات" },
  ];

  const pricingSubTabs = [
    { id: "book", label: "كتاب" },
    { id: "plain", label: "طباعة عادية" },
    { id: "digital", label: "ديجيتال بالقطعة" },
    { id: "fixed", label: "سعر ثابت" },
    { id: "invoice", label: `فاتورة${invoices.length ? ` (${invoices.length})` : ""}` },
    { id: "archive", label: `الأرشيف${archivedInvoices.length ? ` (${archivedInvoices.length})` : ""}` },
    { id: "reports", label: "التقارير" },
    { id: "orders", label: `الطلبات${orders.length ? ` (${orders.length})` : ""}` },
    { id: "settings", label: "الإعدادات" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @media print {
          @page { size: A5 landscape; margin: 8mm; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; top: 0; right: 0; left: 0; width: 100%; border: none !important; box-shadow: none !important; font-size: 13px; color: black !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* Sidebar الجانبي الاحترافي */}
      <aside className={`fixed md:static inset-y-0 right-0 z-50 w-64 bg-slate-800 border-l border-slate-700 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col justify-between no-print`}>
        <div>
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-lg text-white shadow-lg">أ</div>
              <div>
                <h1 className="font-bold text-lg leading-none">مطبعة ألوان</h1>
                <span className="text-xs text-indigo-400">نظام التسعير والإدارة</span>
              </div>
            </div>
            <button className="md:hidden text-slate-400" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>

          <nav className="p-4 space-y-2">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveMainTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full text-right px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between ${
                  activeMainTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-700 bg-slate-800/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">تبديل الدور:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-xs rounded-lg p-1.5 text-indigo-400 font-bold"
            >
              <option value="admin">المدير (Admin)</option>
              <option value="employee">موظف (Employee)</option>
              <option value="accountant">محاسب (Accountant)</option>
            </select>
          </div>
        </div>
      </aside>

      {/* منطقة المحتوى الرئيسية */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-16 bg-slate-800/80 backdrop-blur border-b border-slate-700 px-4 md:px-8 flex items-center justify-between no-print">
          <button className="md:hidden p-2 text-slate-300 bg-slate-700 rounded-lg" onClick={() => setIsSidebarOpen(true)}>
            ☰ القائمة
          </button>
          <div className="flex items-center gap-2">
            <CMYKDots />
            <span className="text-sm font-bold text-slate-200">مطبعة ألوان - النظام الداخلي</span>
          </div>
        </header>

        <div className="p-4 md:p-8">
          {!loaded ? (
            <div className="text-slate-400 text-center py-20 text-sm no-print">بيحمّل الإعدادات...</div>
          ) : (
            <>
              {/* 1. لوحة التحكم */}
              {activeMainTab === "dashboard" && (
                <DashboardOverview archivedInvoices={archivedInvoices} orders={orders} />
              )}

              {/* 2. التسعير الشامل (يحوي كل آلات الحاسبة القديمة كاملة) */}
              {activeMainTab === "pricing" && (
                <div className="space-y-6">
                  {/* شريط تبويبات الحاسبة الأصلي */}
                  <div className="no-print overflow-x-auto pb-2">
                    <div className="flex gap-1 border-b border-slate-700 pb-2">
                      {pricingSubTabs.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setPricingSubTab(t.id)}
                          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
                            pricingSubTab === t.id ? "bg-cyan-400 text-slate-900 font-bold" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* تشغيل الحاسبات بحساباتها الدقيقة */}
                  <div className="max-w-xl">
                    {pricingSubTab === "book" && <BookCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
                    {pricingSubTab === "plain" && <PlainCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
                    {pricingSubTab === "digital" && <DigitalPieceCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
                    {pricingSubTab === "fixed" && <FixedItemsCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
                    {pricingSubTab === "invoice" && <InvoiceScreen invoices={invoices} setInvoices={setInvoices} activeId={activeId} setActiveId={setActiveId} settings={settings} onArchive={handleArchiveInvoice} archiveStatus={archiveStatus} />}
                    {pricingSubTab === "archive" && <ArchiveScreen archivedInvoices={archivedInvoices} onOpen={handleOpenArchived} />}
                    {pricingSubTab === "reports" && <ReportsScreen archivedInvoices={archivedInvoices} />}
                    {pricingSubTab === "orders" && <OrdersScreen orders={orders} />}
                    {pricingSubTab === "settings" && <SettingsScreen settings={settings} setSettings={setSettings} onSave={handleSave} saveState={saveState} userRole={userRole} />}
                  </div>
                </div>
              )}

              {/* 3. ترتيب الإنتاجية */}
              {activeMainTab === "production" && (
                <ProductionWorkflow orders={orders} />
              )}

              {/* 4. الحسابات */}
              {activeMainTab === "accounting" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white">إدارة الحسابات والمقبوضات</h2>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                    <ReportsScreen archivedInvoices={archivedInvoices} />
                  </div>
                </div>
              )}

              {/* 5. الموظفين والصلاحيات */}
              {activeMainTab === "employees" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white">إدارة الموظفين والصلاحيات</h2>
                  <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl">
                    <p className="text-sm text-slate-300 mb-4">الدور الحالي المتصل: <strong className="text-indigo-400 capitalize">{userRole}</strong></p>
                    <p className="text-xs text-slate-400">ملاحظة: الموظف لا يمكنه حفظ تعديلات أسعار الخامات أو مسح السجلات، هذه الصلاحية للمدير فقط.</p>
                  </div>
                </div>
              )}

              {/* 6. سجل التعديلات */}
              {activeMainTab === "logs" && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white">سجل تعديلات النظام (Audit Log)</h2>
                  <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-3">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-xl text-sm border border-slate-700/50">
                        <div>
                          <span className="font-bold text-indigo-400 ml-2">{log.user}:</span>
                          <span className="text-slate-300">{log.action}</span>
                        </div>
                        <span className="text-xs text-slate-500">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
