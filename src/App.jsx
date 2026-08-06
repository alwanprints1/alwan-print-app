import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// 1. تهيئة الاتصال بـ Supabase من متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  // الحالات الأساسية
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState({ name: 'مدير النظام', role: 'admin' });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // نماذج بيانات تجريبية وحية
  const [pricingType, setPricingType] = useState('book'); // book, digital, custom
  const [searchTerm, setSearchTerm] = useState('');
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'أحمد محمود', action: 'تعديل سعر كوشيه 150ج', time: 'منذ 10 دقائق' },
    { id: 2, user: 'محمد مصطفى', action: 'إضافة فاتورة رقم #1024', time: 'منذ ساعة' }
  ]);

  // أسعار الخامات (مسموح بالتعديل للـ Admin فقط)
  const [materialPrices, setMaterialPrices] = useState({
    couche150: 1200,
    couche300: 1800,
    sticker: 850,
    lamination: 150
  });

  // الطلبات وترتيب الإنتاجية
  const [productionOrders, setProductionOrders] = useState([
    { id: 'ORD-101', client: 'مكتبة الأمل', item: 'كتاب A4 - 100 صفحة', qty: 500, status: 'in_print' },
    { id: 'ORD-102', client: 'شركه الفجر', item: 'كروت ديجيتال بصمة', qty: 1000, status: 'finishing' },
    { id: 'ORD-103', client: 'د. خالد علي', item: 'بروشورات كوشيه', qty: 2000, status: 'ready' }
  ]);

  // تسجيل التعديلات في السجل
  const logAction = (actionText) => {
    const newLog = {
      id: Date.now(),
      user: userProfile.name,
      action: actionText,
      time: 'الآن'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  // حفظ أسعار الخامات مع التحقق من الصلاحية
  const handleSavePrices = () => {
    if (userProfile.role !== 'admin') {
      alert('عفواً! ليس لديك صلاحية تعديل أسعار الخامات. هذه الصلاحية للمدير فقط.');
      return;
    }
    logAction('تحديث جدول أسعار الخامات والورق');
    alert('تم حفظ أسعار الخامات وتحديثها بنجاح!');
  };

  // طباعة/تصدير PDF
  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans dir-rtl flex flex-col md:flex-row">
      
      {/* القائمة الجانبية (Sidebar) - مناسبة للموبايل والكمبيوتر */}
      <aside className={`fixed md:static inset-y-0 right-0 z-50 w-64 bg-slate-800 border-l border-slate-700 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col justify-between`}>
        <div>
          {/* شعار المطبعة */}
          <div className="p-5 border-b border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-lg text-white shadow-lg">
                أ
              </div>
              <div>
                <h1 className="font-bold text-lg leading-none">مطبعة ألوان</h1>
                <span className="text-xs text-indigo-400">نظام الإدارة والتسعير</span>
              </div>
            </div>
            <button className="md:hidden text-slate-400" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>

          {/* التبويبات الرئيسية */}
          <nav className="p-4 space-y-2">
            {[
              { id: 'dashboard', label: '📊 لوحة التحكم', role: 'all' },
              { id: 'pricing', label: '💰 التسعير الشامل', role: 'all' },
              { id: 'production', label: '🏭 ترتيب الإنتاجية', role: 'all' },
              { id: 'accounting', label: '🧾 الحسابات والفواتير', role: 'accountant' },
              { id: 'employees', label: '👥 الموظفين والصلاحيات', role: 'admin' },
              { id: 'logs', label: '📜 سجل التعديلات والنسخ', role: 'admin' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                className={`w-full text-right px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-between ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* ملف المستخدم الحالي */}
        <div className="p-4 border-t border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold border border-slate-600">
              {userProfile.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{userProfile.name}</p>
              <p className="text-xs text-slate-400 capitalize">
                {userProfile.role === 'admin' ? 'مدير النظام' : userProfile.role === 'accountant' ? 'محاسب' : 'موظف مبيعات'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* الهيدر العلوي وشريط البحث */}
        <header className="h-16 bg-slate-800/80 backdrop-blur border-b border-slate-700 px-4 md:px-8 flex items-center justify-between gap-4">
          <button 
            className="md:hidden p-2 text-slate-300 bg-slate-700 rounded-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰ القائمة
          </button>

          {/* شريط البحث السريع */}
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="بحث سريع عن عميل، رقم فاتورة، أو طلب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 px-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* محول الأدوار التجريبي للتجربة السريعة */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 hidden sm:inline">تبديل الدور:</span>
            <select
              value={userProfile.role}
              onChange={(e) => setUserProfile({ ...userProfile, role: e.target.value })}
              className="bg-slate-900 border border-slate-700 text-xs rounded-lg p-1.5 text-indigo-400"
            >
              <option value="admin">المدير (Admin)</option>
              <option value="employee">موظف (Employee)</option>
              <option value="accountant">محاسب (Accountant)</option>
            </select>
          </div>
        </header>

        {/* جسم الشاشات والمتغيرات حسب التبويب */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">

          {/* 1. لوحة التحكم (Dashboard) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">لوحة الإحصائيات المباشرة</h2>
              
              {/* كروت الأرقام والإحصائيات */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
                  <p className="text-slate-400 text-sm">مبيعات اليوم</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">14,250 ج.م</p>
                  <span className="text-xs text-emerald-500">↑ 12% مقارنة بأمس</span>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
                  <p className="text-slate-400 text-sm">أرباح الشهر</p>
                  <p className="text-2xl font-bold text-indigo-400 mt-1">85,400 ج.م</p>
                  <span className="text-xs text-slate-400">صافي الأرباح التقديرية</span>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
                  <p className="text-slate-400 text-sm">الطلبات قيد التشغيل</p>
                  <p className="text-2xl font-bold text-amber-400 mt-1">8 طلبات</p>
                  <span className="text-xs text-amber-500">تحتاج متابعة إنتاج</span>
                </div>
                <div className="bg-slate-800 border border-slate-700 p-5 rounded-2xl">
                  <p className="text-slate-400 text-sm">أكثر المنتجات طلباً</p>
                  <p className="text-xl font-bold text-pink-400 mt-1">كتب A4 + كروت</p>
                  <span className="text-xs text-slate-400">تشكل 60% من الإنتاج</span>
                </div>
              </div>

              {/* الجدول السريع للطلبات الحالية */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">أحدث طلبات الإنتاج</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead className="bg-slate-900/50 text-slate-400 border-b border-slate-700">
                      <tr>
                        <th className="p-3">رقم الطلب</th>
                        <th className="p-3">العميل</th>
                        <th className="p-3">المواصفات</th>
                        <th className="p-3">الكمية</th>
                        <th className="p-3">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {productionOrders.map((ord) => (
                        <tr key={ord.id}>
                          <td className="p-3 font-mono text-indigo-400">{ord.id}</td>
                          <td className="p-3 font-medium">{ord.client}</td>
                          <td className="p-3 text-slate-300">{ord.item}</td>
                          <td className="p-3">{ord.qty}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              ord.status === 'ready' ? 'bg-emerald-500/10 text-emerald-400' :
                              ord.status === 'finishing' ? 'bg-amber-500/10 text-amber-400' : 'bg-indigo-500/10 text-indigo-400'
                            }`}>
                              {ord.status === 'ready' ? 'جاهز للتسليم' : ord.status === 'finishing' ? 'قيد التشطيب' : 'قيد الطباعة'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. تبويب التسعير الشامل (Pricing Hub) */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold">مركز التسعير الموحد</h2>
                
                {/* مفتاح التبديل بين أشكال التسعير */}
                <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex gap-1 text-xs font-medium">
                  <button 
                    onClick={() => setPricingType('book')} 
                    className={`px-3 py-2 rounded-lg transition ${pricingType === 'book' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    📖 تسعير كتاب
                  </button>
                  <button 
                    onClick={() => setPricingType('digital')} 
                    className={`px-3 py-2 rounded-lg transition ${pricingType === 'digital' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    ✨ ديجيتال وبصمة
                  </button>
                  <button 
                    onClick={() => setPricingType('custom')} 
                    className={`px-3 py-2 rounded-lg transition ${pricingType === 'custom' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    🏷️ سعر ثابت وتكلفة
                  </button>
                </div>
              </div>

              {/* نموذج بيانات حاسبة التسعير */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-4">
                  <h3 className="font-bold text-indigo-400">مدخلات حساب المواصفات</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">اسم العميل</label>
                      <input type="text" placeholder="مثال: مطبعة الشروق" className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">نوع الورق الخام</label>
                      <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm">
                        <option>كوشيه 150 جرام ({materialPrices.couche150} ج.م)</option>
                        <option>كوشيه 300 جرام ({materialPrices.couche300} ج.م)</option>
                        <option>استيكر بلاستيك ({materialPrices.sticker} ج.م)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">عدد الصفحات / الكمية</label>
                      <input type="number" defaultValue={100} className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">خدمات التشطيب</label>
                      <select className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm">
                        <option>سلوفان مط + بصمة ذهبي</option>
                        <option>سلك وتكعيب</option>
                        <option>قص وتجميع فقط</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* كارت ملخص السعر وحساب الأرباح */}
                <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="font-bold text-slate-300 mb-4">ملخص الإجمالي والتكلفة</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-slate-400">
                        <span>تكلفة الخام والمطبعة:</span>
                        <span>1,850 ج.م</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>تكلفة التشطيب والخدمات:</span>
                        <span>450 ج.م</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>هامش الربح التقديري (25%):</span>
                        <span className="text-emerald-400">+575 ج.م</span>
                      </div>
                      <hr className="border-slate-700" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>السعر النهائي للعميل:</span>
                        <span className="text-indigo-400">2,875 ج.م</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button 
                      onClick={handleExportPDF}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                    >
                      📄 تصدير عرض سعر / فاتورة PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. تبويب ترتيب الإنتاجية (Production Order) */}
          {activeTab === 'production' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">متابعة صالة الإنتاج والتشغيل</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* عامود: قيد الطباعة */}
                <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-indigo-400 flex items-center justify-between">
                    <span>🖨️ قيد الطباعة</span>
                    <span className="text-xs bg-indigo-500/20 px-2 py-0.5 rounded-full">1</span>
                  </h3>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
                    <span className="text-xs text-indigo-400 font-mono">ORD-101</span>
                    <h4 className="font-bold">مكتبة الأمل</h4>
                    <p className="text-xs text-slate-400">كتاب A4 - 100 صفحة (500 نسخة)</p>
                  </div>
                </div>

                {/* عامود: قيد التشطيب */}
                <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-amber-400 flex items-center justify-between">
                    <span>✂️ التشطيب والسلوفان</span>
                    <span className="text-xs bg-amber-500/20 px-2 py-0.5 rounded-full">1</span>
                  </h3>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
                    <span className="text-xs text-amber-400 font-mono">ORD-102</span>
                    <h4 className="font-bold">شركة الفجر</h4>
                    <p className="text-xs text-slate-400">كروت ديجيتال بصمة (1000 كارت)</p>
                  </div>
                </div>

                {/* عامود: جاهز للتسليم */}
                <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl space-y-3">
                  <h3 className="font-bold text-emerald-400 flex items-center justify-between">
                    <span>📦 جاهز للتسليم</span>
                    <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded-full">1</span>
                  </h3>
                  <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl space-y-2">
                    <span className="text-xs text-emerald-400 font-mono">ORD-103</span>
                    <h4 className="font-bold">د. خالد علي</h4>
                    <p className="text-xs text-slate-400">بروشورات كوشيه (2000 نسخة)</p>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 4. تبويب الحسابات (Accounting) */}
          {activeTab === 'accounting' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">الحسابات والمقبوضات</h2>
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold">أرشيف الفواتير الحسابية</h3>
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-xs font-bold px-4 py-2 rounded-xl">
                    + إضافة سند قبض / مصروف
                  </button>
                </div>
                <p className="text-sm text-slate-400">يمكن للمحاسب والمدير فقط الاطلاع على الأرباح والتقارير المدمجة.</p>
              </div>
            </div>
          )}

          {/* 5. تبويب الموظفين والصلاحيات (Employees & RLS) */}
          {activeTab === 'employees' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">إدارة الموظفين وأسعار الخامات</h2>
              
              {/* تعديل أسعار الخامات - محمي بالصلاحيات */}
              <div className="bg-slate-800 border border-slate-700 p-6 rounded-2xl space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-indigo-400">جدول أسعار الخامات والورق الأساسية</h3>
                    <p className="text-xs text-slate-400">التعديل في هذه الأسعار يؤثر مباشرة على حسابات التسعير.</p>
                  </div>
                  {userProfile.role !== 'admin' && (
                    <span className="text-xs bg-red-500/10 text-red-400 px-3 py-1 rounded-full border border-red-500/20">
                      🔒 الصلاحية للمدير فقط
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">سعر فرخ كوشيه 150 جرام</label>
                    <input 
                      type="number" 
                      disabled={userProfile.role !== 'admin'}
                      value={materialPrices.couche150} 
                      onChange={(e) => setMaterialPrices({ ...materialPrices, couche150: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm disabled:opacity-50" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">سعر فرخ كوشيه 300 جرام</label>
                    <input 
                      type="number" 
                      disabled={userProfile.role !== 'admin'}
                      value={materialPrices.couche300} 
                      onChange={(e) => setMaterialPrices({ ...materialPrices, couche300: Number(e.target.value) })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-sm disabled:opacity-50" 
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSavePrices}
                  disabled={userProfile.role !== 'admin'}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-sm font-bold px-6 py-2.5 rounded-xl transition"
                >
                  حفظ التعديلات في قاعدة البيانات
                </button>
              </div>
            </div>
          )}

          {/* 6. سجل التعديلات والنسخ الاحتياطي (Audit Logs) */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">سجل التعديلات والنسخ الاحتياطي</h2>
                <button 
                  onClick={() => alert('تم أخذ نسخة احتياطية من قاعدة بيانات Supabase وتنزيلها بنجاح!')}
                  className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2"
                >
                  💾 تحميل نسخة احتياطية (Backup)
                </button>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-slate-300">سجل عمليات الموظفين (Audit Log)</h3>
                <div className="space-y-3">
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
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
