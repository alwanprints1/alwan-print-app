import React, { useState, useEffect } from "react";
import { kvGet, kvSet } from "./supabaseStorage";

const LOGO_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAcFBQYFBAcGBgYIBwcICxILCwoKCxYPEA0SGhYbGhkWGRgcICgiHB4mHhgZIzAkJiorLS4tGyIyNTEsNSgsLSz/2wBDAQcICAsJCxULCxUsHRkdLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCwsLCz/wAARCAFoAWgDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIBQYBAwQCCf/EAFYQAAEDAwEEBgYFBwgGBgsAAAEAAgMEBREGBxIhMRNBUWFxgQgUIpGhsSMyQlLBFRZzgpKy0SQlM1NicnSiJzVDlMLwJjRUhOHiFxgoNjdGVWODs/H/xAAcAQEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xAA7EQACAQMCAwQJAwIFBQEAAAAAAQIDBBEFIRIxQQYTUXEiMmGBkaGx0fAUweEjQhUkM4LxJUNSYnKy/9oADAMBAAIRAxEAPwCMERF38p4REQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAERSFsl2fN1jeX1lwYfyTROHSN5dM/mGZ7Os+XatW7uqdnRlXqvZGSnTlUkoxMTpHZtqHWQE1DTNgo84NVUEtjPh1u8lJNL6OtP0A9b1DKZcceipwGj3lSxW3CjsdLFAyIZ3d2GniABwOwcgB2rDS6hvectoqeIcw1xLj78hc5r9oNQupcVFqEenL6v9jfn+ktfRqvL/PAiq9ej5daWB0toukNeWjPQys6Jx8Dkj34UU3C3VlqrpaKvppKWpiOHxyNwQrZWrVzKmtZQ18PqlS/gw5yx57O4rGbTtA0+stPvkhja27UrC6m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";

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

const ARCHIVE_KEY = "alwan-pricing-invoice-archive-v1";
const USERS_KEY = "alwan-system-users-v1";
const AUDIT_KEY = "alwan-system-audit-v1";
const BACKUPS_KEY = "alwan-system-backups-v1";
const PRODUCTION_KEY = "alwan-system-production-v1";

const DEFAULT_USERS = [
  { id: "admin-1", name: "مدير النظام", username: "admin", password: "admin123", role: "admin", active: true },
  { id: "accountant-1", name: "المحاسب", username: "accountant", password: "123456", role: "accountant", active: true },
  { id: "employee-1", name: "موظف المبيعات", username: "employee", password: "123456", role: "employee", active: true },
];

async function loadKey(key, fallback) { try { return (await kvGet(key)) || fallback; } catch (e) { return fallback; } }
async function saveKey(key, value) { await kvSet(key, value); }

function roleLabel(role) { return role === "admin" ? "مدير" : role === "accountant" ? "محاسب" : "موظف"; }
function invoiceTotal(inv) { return (inv.items || []).reduce((sum, item) => sum + (Number(item.price) || 0), 0); }

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

function SettingsScreen({ settings, setSettings, onSave, saveState }) {
  function update(path, value) {
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

function LoginScreen({ users, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    const user = users.find((u) => u.active !== false && u.username === username.trim() && u.password === password);
    if (!user) { setError("اسم المستخدم أو كلمة المرور غير صحيحة"); return; }
    onLogin(user);
  }
  return (
    <div dir="rtl" className="min-h-screen bg-slate-950 flex items-center justify-center p-4" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="bg-gradient-to-br from-cyan-500 via-cyan-600 to-slate-900 p-7 text-white">
          <div className="flex items-center gap-2 mb-5"><CMYKDots /><span className="text-xs tracking-widest">ALWAN ERP</span></div>
          <h1 className="text-2xl font-bold">أهلاً بك في نظام ألوان</h1>
          <p className="text-cyan-50/80 text-sm mt-1">إدارة التسعير والإنتاج والحسابات</p>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <Field label="اسم المستخدم"><TextInput value={username} onChange={(e) => setUsername(e.target.value)} autoFocus /></Field>
          <Field label="كلمة المرور"><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-stone-300 px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-500" /></Field>
          {error && <div className="rounded-xl bg-red-50 text-red-600 px-3 py-2 text-xs">{error}</div>}
          <button className="w-full rounded-xl bg-slate-900 text-white py-3 font-bold hover:bg-cyan-700 transition">تسجيل الدخول</button>
          <p className="text-[10px] text-stone-400 text-center">غيّر كلمات المرور الافتراضية من تبويب الموظفين بعد أول دخول.</p>
        </form>
      </div>
    </div>
  );
}

function StatCard({ label, value, hint, color = "cyan" }) {
  const colors = { cyan: "from-cyan-500 to-cyan-700", amber: "from-amber-400 to-orange-500", pink: "from-pink-500 to-fuchsia-700", slate: "from-slate-700 to-slate-950" };
  return <div className={`rounded-2xl bg-gradient-to-br ${colors[color]} p-4 text-white shadow-lg`}><div className="text-xs opacity-75">{label}</div><div className="text-2xl font-bold mt-2 tabular-nums">{value}</div>{hint && <div className="text-[10px] opacity-70 mt-1">{hint}</div>}</div>;
}

function DashboardScreen({ archivedInvoices, orders, production, canViewFinance, user }) {
  const todayInvoices = archivedInvoices.filter((a) => new Date(a.createdAt).toDateString() === new Date().toDateString());
  const todaySales = todayInvoices.reduce((s, a) => s + invoiceTotal(a), 0);
  const totalSales = archivedInvoices.reduce((s, a) => s + invoiceTotal(a), 0);
  const productMap = {};
  archivedInvoices.forEach((a) => (a.items || []).forEach((it) => { productMap[it.description] = (productMap[it.description] || 0) + (Number(it.qty) || 1); }));
  const top = Object.entries(productMap).sort((a,b) => b[1] - a[1]).slice(0, 4);
  const pending = production.filter((p) => p.status !== "done").length;
  return <div className="space-y-5">
    <div className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm"><div className="text-xs text-cyan-600 font-semibold">صباح الشغل والإنجاز 👋</div><h2 className="text-xl font-bold text-slate-900 mt-1">أهلاً، {user.name}</h2><p className="text-xs text-slate-400 mt-1">نظرة سريعة على حركة مطبعة ألوان اليوم</p></div>
    <div className="grid grid-cols-2 gap-3">
      {canViewFinance && <StatCard label="مبيعات اليوم" value={`${egp(todaySales)} ج.م`} hint={`${todayInvoices.length} فاتورة`} color="cyan" />}
      {canViewFinance && <StatCard label="إجمالي المبيعات" value={`${egp(totalSales)} ج.م`} hint="كل الفترات" color="slate" />}
      <StatCard label="أوامر الإنتاج" value={orders.length} hint={`${pending} قيد التنفيذ`} color="amber" />
      <StatCard label="الفواتير المحفوظة" value={archivedInvoices.length} color="pink" />
    </div>
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-4"><SectionHeader title="الأكثر طلباً" accent="bg-amber-400" />{top.length ? top.map(([name, qty], i) => <div key={name} className="flex justify-between py-2 border-b last:border-0 border-slate-100 text-sm"><span><b className="text-cyan-600 ml-2">#{i+1}</b>{name}</span><span className="text-slate-400">{qty} قطعة</span></div>) : <p className="text-xs text-slate-400">هتظهر البيانات بعد حفظ أول فاتورة.</p>}</div>
      <div className="bg-white rounded-2xl border border-slate-200 p-4"><SectionHeader title="حالة الإنتاج" accent="bg-pink-500" />{production.length ? production.slice(0,5).map((p) => <div key={p.id} className="flex justify-between py-2 text-sm border-b last:border-0 border-slate-100"><span>{p.title}</span><span className="text-xs text-cyan-700">{p.status === "done" ? "تم" : p.status === "working" ? "جاري التنفيذ" : "جديد"}</span></div>) : <p className="text-xs text-slate-400">لا توجد مهام إنتاج حالياً.</p>}</div>
    </div>
  </div>;
}

function ProductionScreen({ production, setProduction, user, addAudit }) {
  const [title, setTitle] = useState("");
  function add() { if (!title.trim()) return; const next = [{ id: uid("prod"), title: title.trim(), status: "new", createdAt: new Date().toISOString(), by: user.name }, ...production]; setProduction(next); saveKey(PRODUCTION_KEY, next); addAudit("إضافة أمر إنتاج", title.trim()); setTitle(""); }
  function status(id, value) { const next = production.map((p) => p.id === id ? { ...p, status: value, updatedAt: new Date().toISOString() } : p); setProduction(next); saveKey(PRODUCTION_KEY, next); addAudit("تحديث حالة إنتاج", value); }
  return <div className="space-y-4"><div className="bg-white rounded-2xl border border-slate-200 p-4"><SectionHeader title="إضافة مهمة إنتاج" accent="bg-cyan-500" /><div className="flex gap-2"><TextInput value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="مثال: طباعة 500 كارت للأستاذ أحمد" /><button onClick={add} className="shrink-0 bg-slate-900 text-white rounded-xl px-4">إضافة</button></div></div><div className="grid gap-3">{production.map((p)=><div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-4"><div className="font-semibold text-slate-800">{p.title}</div><div className="text-[11px] text-slate-400 mt-1">بواسطة {p.by} — {new Date(p.createdAt).toLocaleString("ar-EG")}</div><div className="flex gap-2 mt-3">{[["new","جديد"],["working","جاري"],["done","تم"]].map(([id,label])=><button key={id} onClick={()=>status(p.id,id)} className={`rounded-lg px-3 py-1.5 text-xs ${p.status===id?"bg-cyan-600 text-white":"bg-slate-100 text-slate-500"}`}>{label}</button>)}</div></div>)}{!production.length&&<div className="text-center text-slate-400 bg-white rounded-2xl p-8">لا توجد مهام إنتاج.</div>}</div></div>;
}

function EmployeesScreen({ users, setUsers, addAudit }) {
  const [form, setForm] = useState({ name:"", username:"", password:"", role:"employee" });
  function add(){ if(!form.name||!form.username||!form.password)return; if(users.some(u=>u.username===form.username)) return alert("اسم المستخدم موجود بالفعل"); const next=[...users,{...form,id:uid("user"),active:true}]; setUsers(next); saveKey(USERS_KEY,next); addAudit("إضافة مستخدم",`${form.name} (${roleLabel(form.role)})`); setForm({name:"",username:"",password:"",role:"employee"}); }
  function toggle(id){const next=users.map(u=>u.id===id?{...u,active:!u.active}:u);setUsers(next);saveKey(USERS_KEY,next);addAudit("تغيير حالة مستخدم",id);}
  return <div className="space-y-4"><div className="bg-white rounded-2xl border border-slate-200 p-4"><SectionHeader title="إضافة موظف" accent="bg-cyan-500" /><div className="grid grid-cols-2 gap-3"><Field label="الاسم"><TextInput value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></Field><Field label="اسم المستخدم"><TextInput dir="ltr" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/></Field><Field label="كلمة المرور"><TextInput dir="ltr" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></Field><Field label="الصلاحية"><Select value={form.role} onChange={role=>setForm({...form,role})} options={[{value:"employee",label:"موظف"},{value:"accountant",label:"محاسب"},{value:"admin",label:"مدير"}]}/></Field></div><button onClick={add} className="w-full bg-slate-900 text-white rounded-xl py-2.5 font-semibold">إضافة المستخدم</button></div>{users.map(u=><div key={u.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between"><div><div className="font-semibold">{u.name}</div><div className="text-xs text-slate-400" dir="ltr">@{u.username} · {roleLabel(u.role)}</div></div><button onClick={()=>toggle(u.id)} className={`rounded-full px-3 py-1 text-xs ${u.active?"bg-emerald-50 text-emerald-700":"bg-red-50 text-red-600"}`}>{u.active?"نشط":"موقوف"}</button></div>)}</div>;
}

function AuditScreen({ audit }) { return <div className="space-y-2">{audit.length ? audit.map(a=><div key={a.id} className="bg-white rounded-2xl border border-slate-200 p-4"><div className="flex justify-between gap-3"><div className="font-semibold text-sm text-slate-800">{a.action}</div><div className="text-[10px] text-slate-400">{new Date(a.at).toLocaleString("ar-EG")}</div></div><div className="text-xs text-slate-500 mt-1">{a.user} · {a.details || "—"}</div></div>) : <div className="bg-white rounded-2xl p-8 text-center text-slate-400">لا يوجد نشاط مسجل بعد.</div>}</div>; }

export default function App() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [saveState, setSaveState] = useState("idle");
  const [invoices, setInvoices] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [archivedInvoices, setArchivedInvoices] = useState([]);
  const [archiveStatus, setArchiveStatus] = useState("idle");
  const [users, setUsers] = useState(DEFAULT_USERS);
  const [currentUser, setCurrentUser] = useState(null);
  const [audit, setAudit] = useState([]);
  const [production, setProduction] = useState([]);

  useEffect(() => {
    (async () => {
      const s = await loadSettings();
      setSettings(s);
      const o = await loadOrders();
      setOrders(o);
      const arch = await loadArchive();
      setArchivedInvoices(arch);
      setUsers(await loadKey(USERS_KEY, DEFAULT_USERS));
      setAudit(await loadKey(AUDIT_KEY, []));
      setProduction(await loadKey(PRODUCTION_KEY, []));
      setLoaded(true);
    })();
  }, []);

  function addAudit(action, details = "") {
    if (!currentUser) return;
    setAudit((prev) => {
      const next = [{ id: uid("audit"), action, details, user: currentUser.name, userId: currentUser.id, at: new Date().toISOString() }, ...prev].slice(0, 500);
      saveKey(AUDIT_KEY, next);
      return next;
    });
  }

  function makeBackup(reason) {
    setTimeout(async () => {
      const backups = await loadKey(BACKUPS_KEY, []);
      await saveKey(BACKUPS_KEY, [{ id: uid("backup"), at: new Date().toISOString(), reason, settings, orders, archivedInvoices, production }, ...backups].slice(0, 10));
    }, 0);
  }

  async function handleSave() {
    setSaveState("saving");
    try {
      await saveSettings(settings);
      addAudit("تعديل إعدادات وأسعار", "تم حفظ إعدادات التسعير");
      makeBackup("settings");
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
      addAudit("إضافة طلب إنتاج", order.productType);
      makeBackup("order");
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
      addAudit(exists ? "تعديل فاتورة" : "حفظ فاتورة", `#${record.invoiceNo}`);
      makeBackup("invoice");
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
    setTab("invoice");
  }

  if (!loaded) return <div dir="rtl" className="min-h-screen bg-slate-950 text-white flex items-center justify-center">بيتم تحميل النظام...</div>;
  if (!currentUser) return <LoginScreen users={users} onLogin={(user) => { setCurrentUser(user); setTab("dashboard"); }} />;

  const isAdmin = currentUser.role === "admin";
  const canViewFinance = currentUser.role === "admin" || currentUser.role === "accountant";

  const tabs = [
    { id: "dashboard", label: "لوحة التحكم", group: "الرئيسية" },
    { id: "book", label: "تسعير الكتب", group: "التسعير" },
    { id: "plain", label: "طباعة عادية", group: "التسعير" },
    { id: "digital", label: "ديجيتال بالقطعة", group: "التسعير" },
    { id: "fixed", label: "منتجات ثابتة", group: "التسعير" },
    { id: "invoice", label: `عروض وفواتير${invoices.length ? ` (${invoices.length})` : ""}`, group: "التسعير" },
    { id: "production", label: "ترتيب الإنتاجية", group: "الإنتاج" },
    { id: "orders", label: `طلبات الإنتاج${orders.length ? ` (${orders.length})` : ""}`, group: "الإنتاج" },
    ...(canViewFinance ? [{ id: "archive", label: `الفواتير والعملاء (${archivedInvoices.length})`, group: "الحسابات" }, { id: "reports", label: "التقارير والأرباح", group: "الحسابات" }] : []),
    ...(isAdmin ? [{ id: "settings", label: "أسعار الخامات", group: "الإدارة" }, { id: "employees", label: "الموظفون والصلاحيات", group: "الإدارة" }, { id: "audit", label: "سجل التعديلات", group: "الإدارة" }] : []),
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-slate-100" style={{ fontFamily: "'IBM Plex Sans Arabic', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        @media print {
          @page { size: A5 landscape; margin: 8mm; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; top: 0; right: 0; left: 0; width: 100%; border: none !important; box-shadow: none !important; font-size: 13px; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="bg-slate-950 no-print sticky top-0 z-20 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div><div className="flex items-center gap-2 text-stone-400 mb-1"><CMYKDots /><span className="text-[11px] tracking-widest">ALWAN ERP</span></div><h1 className="text-stone-50 text-xl font-bold">نظام إدارة مطبعة ألوان</h1></div>
        <div className="text-left"><div className="text-white text-sm font-semibold">{currentUser.name}</div><div className="text-cyan-400 text-[11px]">{roleLabel(currentUser.role)}</div><button onClick={()=>{addAudit("تسجيل خروج");setCurrentUser(null);}} className="text-stone-400 text-[10px] hover:text-white">تسجيل الخروج</button></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 no-print">
        <div className="flex gap-2 overflow-x-auto pb-3">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} title={t.group} className={"shrink-0 rounded-xl px-4 py-2 text-sm font-medium transition whitespace-nowrap " + (tab === t.id ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-900/30" : "bg-slate-800 text-stone-300 hover:bg-slate-700")}>{t.label}</button>
          ))}
        </div>
      </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 pb-10">
          <>
            {tab === "dashboard" && <DashboardScreen archivedInvoices={archivedInvoices} orders={orders} production={production} canViewFinance={canViewFinance} user={currentUser} />}
            {tab === "book" && <BookCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
            {tab === "plain" && <PlainCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
            {tab === "digital" && <DigitalPieceCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
            {tab === "fixed" && <FixedItemsCalculator settings={settings} invoices={invoices} activeId={activeId} onAddInvoice={addInvoiceItem} onSaveOrder={handleSaveOrder} />}
            {tab === "invoice" && <InvoiceScreen invoices={invoices} setInvoices={setInvoices} activeId={activeId} setActiveId={setActiveId} settings={settings} onArchive={handleArchiveInvoice} archiveStatus={archiveStatus} />}
            {tab === "archive" && <ArchiveScreen archivedInvoices={archivedInvoices} onOpen={handleOpenArchived} />}
            {tab === "reports" && <ReportsScreen archivedInvoices={archivedInvoices} />}
            {tab === "orders" && <OrdersScreen orders={orders} />}
            {tab === "production" && <ProductionScreen production={production} setProduction={setProduction} user={currentUser} addAudit={addAudit} />}
            {tab === "settings" && isAdmin && <SettingsScreen settings={settings} setSettings={setSettings} onSave={handleSave} saveState={saveState} />}
            {tab === "employees" && isAdmin && <EmployeesScreen users={users} setUsers={setUsers} addAudit={addAudit} />}
            {tab === "audit" && isAdmin && <AuditScreen audit={audit} />}
          </>
      </div>
    </div>
  );
}
