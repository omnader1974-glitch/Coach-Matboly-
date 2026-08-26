import React, { useState } from 'react';
import {
  X,
  RotateCcw,
  Download,
  Upload,
  Film,
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  DollarSign,
  User,
  HeartPulse,
  Share2,
  FileText,
  Sparkles,
  Users,
  MessageCircle,
  Phone,
  Calendar,
  Search,
  ExternalLink,
  Eye,
  Check,
  Clock,
  UserCheck,
  AlertCircle,
  LogOut,
} from 'lucide-react';
import { SiteConfig, ReelVideoItem, MembershipPlan, HealthierChoiceFeature } from '../types/fitness';
import { DEFAULT_SITE_CONFIG } from '../data/initialData';
import { CustomerRegistration } from '../types/customer';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
  config: SiteConfig;
  updateHero: (updates: Partial<SiteConfig['hero']>) => void;
  updateAbout: (updates: Partial<SiteConfig['about']>) => void;
  updateSubscription: (updates: Partial<SiteConfig['subscription']>) => void;
  updatePlans: (updates: Partial<SiteConfig['plans']>) => void;
  updateChoices: (updates: Partial<SiteConfig['choices']>) => void;
  updateContact: (updates: Partial<SiteConfig['contact']>) => void;
  updateFooter: (updates: Partial<SiteConfig['footer']>) => void;
  resetToDefaults: () => void;
  exportConfigJSON: () => void;
  importConfigJSON: (jsonStr: string) => { success: boolean; error?: string };
  customers: CustomerRegistration[];
  updateCustomerStatus: (customerId: string, status: CustomerRegistration['status']) => Promise<{ success: boolean }>;
  deleteCustomer: (customerId: string) => Promise<{ success: boolean }>;
}

type TabType = 'customers' | 'hero' | 'about' | 'reels' | 'plans' | 'choices' | 'contact' | 'footer' | 'backup';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  onLogout,
  config,
  updateHero,
  updateAbout,
  updateSubscription,
  updatePlans,
  updateChoices,
  updateContact,
  updateFooter,
  resetToDefaults,
  exportConfigJSON,
  importConfigJSON,
  customers,
  updateCustomerStatus,
  deleteCustomer,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('customers');
  const [saveToast, setSaveToast] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Customer Management Search & Filter states
  const [customerSearch, setCustomerSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCustomerModal, setSelectedCustomerModal] = useState<CustomerRegistration | null>(null);

  if (!isOpen) return null;

  const triggerSaveNotification = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  // Helper for file upload conversion to Data URL
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          callback(loadEvt.target.result as string);
          triggerSaveNotification();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset Vertical Fitness Video Options
  const PRESET_FITNESS_VIDEOS = [
    { label: 'تمارين أثقال وبار', url: 'https://assets.mixkit.co/videos/1199/1199-720.mp4' },
    { label: 'تدريب دمبل وبناء عضلات', url: 'https://assets.mixkit.co/videos/43666/43666-720.mp4' },
    { label: 'متابعة وتصحيح الأداء مع الكوتش', url: 'https://assets.mixkit.co/videos/34563/34563-720.mp4' },
    { label: 'كارديو وتحمل وحبال قتالية', url: 'https://assets.mixkit.co/videos/34567/34567-720.mp4' },
    { label: 'لياقة وسرعات هوائية', url: 'https://assets.mixkit.co/videos/41604/41604-720.mp4' },
  ];

  // Filter Customers
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.fullInternationalPhone.includes(customerSearch) ||
      c.selectedPlanName.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.countryName.toLowerCase().includes(customerSearch.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const newCustomersCount = customers.filter((c) => c.status === 'new').length;

  // Function to generate and open WhatsApp conversation with Arabic confirmation message
  const handleOpenCustomerWhatsApp = (customer: CustomerRegistration) => {
    const cleanPhone = customer.fullInternationalPhone.replace(/[^0-9]/g, '');
    const arabicMessage = `مرحبًا ${customer.name} 👋
تم استلام طلب الاشتراك الخاص بك في باقة [${customer.selectedPlanName} - ${customer.selectedPlanDuration}].
سنتواصل معك لتأكيد الاشتراك وإتمام باقي الإجراءات.
شكرًا لاختيارك لنا 💪`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(arabicMessage)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const getStatusBadge = (status: CustomerRegistration['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FFE600] text-black animate-pulse">
            <Sparkles className="w-3 h-3" />
            عميل جديد
          </span>
        );
      case 'confirmed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <Check className="w-3 h-3" />
            تم التأكيد
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <UserCheck className="w-3 h-3" />
            مشترك نشط
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            <MessageCircle className="w-3 h-3" />
            تم التواصل
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-neutral-800 text-neutral-300">
            مكتمل
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-950 text-red-300 border border-red-800/40">
            ملغي
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 font-sans"
    >
      {/* Modal Container */}
      <div className="relative w-full max-w-6xl bg-[#121212] border border-neutral-800 rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-neutral-200 text-right">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0e0e0e]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#FFE600] flex items-center justify-center text-black font-extrabold text-lg shadow-[0_0_12px_rgba(255,230,0,0.3)]">
              <Sliders className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-xl sm:text-2xl text-white tracking-wide">
                  لوحة التحكم وإدارة الاشتراكات والعملاء
                </h2>
                {newCustomersCount > 0 && (
                  <span className="bg-[#FFE600] text-black text-xs font-black px-2.5 py-0.5 rounded-full shadow-md">
                    {newCustomersCount} طلب جديد
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400">
                إدارة طلبات المشتركين، الرسائل المباشرة عبر واتساب، وتعديل كامل أقسام الموقع
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {saveToast && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#FFE600] font-bold bg-neutral-900 border border-[#FFE600]/40 px-3 py-1.5 rounded-full animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-[#FFE600]" />
                تم التحديث والحفظ في قاعدة البيانات
              </span>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700 hover:border-red-500 hover:text-red-400 text-neutral-400 text-xs font-bold transition-colors cursor-pointer"
                title="تسجيل الخروج وقفل لوحة التحكم"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">تسجيل الخروج</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-md bg-neutral-900 border border-neutral-700 hover:border-neutral-500 hover:text-white text-neutral-400 transition-colors cursor-pointer"
              title="إغلاق لوحة التحكم"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Row */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#161616] border-b border-neutral-800 overflow-x-auto scrollbar-none">
          {[
            { id: 'customers', label: `العملاء والاشتراكات (${customers.length})`, icon: Users, isHighlight: true },
            { id: 'reels', label: 'فيديوهات الريلز (Reels)', icon: Film },
            { id: 'plans', label: 'باقات الاشتراك والأسعار', icon: DollarSign },
            { id: 'hero', label: 'الواجهة الرئيسية (Hero)', icon: Sparkles },
            { id: 'about', label: 'عن كوتش مدبولي (About)', icon: User },
            { id: 'choices', label: 'خيارات صحية أفضل', icon: HeartPulse },
            { id: 'contact', label: 'التواصل والسوشيال ميديا', icon: Share2 },
            { id: 'footer', label: 'الفوتر والسياسات', icon: FileText },
            { id: 'backup', label: 'النسخ والضبط', icon: RotateCcw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFE600] text-black shadow-md font-black'
                    : tab.isHighlight && newCustomersCount > 0
                    ? 'bg-neutral-800 text-[#FFE600] border border-[#FFE600]/40'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/80'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.id === 'customers' && newCustomersCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Contents Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB: CUSTOMERS MANAGEMENT (العملاء والاشتراكات) */}
          {activeTab === 'customers' && (
            <div className="space-y-6 max-w-6xl">
              {/* Top Banner & Stats */}
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-lg p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#FFE600] font-heading font-black text-xl">
                    <Users className="w-6 h-6" />
                    <span>إدارة العملاء وطلبات الاشتراكات المسجلة</span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1 max-w-2xl">
                    جميع بيانات العملاء المسجلين من الموقع محفوظة بشكل دائم في قاعدة البيانات (Firebase Firestore). يمكنك مراجعة الباقة المختارة، وتغيير حالة الاشتراك، والتواصل المباشر عبر واتساب بضغطة زر مع رسالة تأكيد جاهزة.
                  </p>
                </div>

                {/* Quick Status Stats */}
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="bg-black/60 border border-neutral-800 px-3 py-2 rounded text-center min-w-[80px]">
                    <span className="block text-xl font-heading font-black text-white">{customers.length}</span>
                    <span className="text-[10px] text-neutral-400 font-bold">إجمالي العملاء</span>
                  </div>
                  <div className="bg-[#FFE600]/10 border border-[#FFE600]/40 px-3 py-2 rounded text-center min-w-[80px]">
                    <span className="block text-xl font-heading font-black text-[#FFE600]">{newCustomersCount}</span>
                    <span className="text-[10px] text-[#FFE600] font-bold">طلبات جديدة</span>
                  </div>
                  <div className="bg-emerald-950/40 border border-emerald-800/40 px-3 py-2 rounded text-center min-w-[80px]">
                    <span className="block text-xl font-heading font-black text-emerald-400">
                      {customers.filter((c) => c.status === 'active' || c.status === 'confirmed').length}
                    </span>
                    <span className="text-[10px] text-emerald-300 font-bold">مشتركون مؤكدون</span>
                  </div>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-neutral-500 absolute top-1/2 -translate-y-1/2 right-3 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="بحث باسم العميل، رقم الهاتف، اسم الباقة، أو الدولة..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-sm pr-9 pl-4 py-2 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400 whitespace-nowrap">تصفية حسب الحالة:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-black border border-neutral-700 rounded-sm px-3 py-2 text-xs text-white focus:border-[#FFE600] focus:outline-none cursor-pointer"
                  >
                    <option value="all">جميع الحالات ({customers.length})</option>
                    <option value="new">طلبات جديدة ({customers.filter((c) => c.status === 'new').length})</option>
                    <option value="confirmed">تم التأكيد</option>
                    <option value="active">مشترك نشط</option>
                    <option value="contacted">تم التواصل</option>
                    <option value="completed">مكتمل</option>
                    <option value="cancelled">ملغي</option>
                  </select>
                </div>
              </div>

              {/* Customers Table / List */}
              {filteredCustomers.length === 0 ? (
                <div className="bg-neutral-900/40 border border-neutral-800 rounded-lg p-12 text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-neutral-500 mx-auto" />
                  <h4 className="font-heading font-black text-lg text-white">لا توجد طلبات اشتراك مطابقة</h4>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    {customers.length === 0
                      ? 'عندما يسجل أي عميل من الموقع باللغة الإنجليزية، ستظهر بياناته ورقم هاتفه والباقة المختارة هنا مباشرة.'
                      : 'جرب تعديل كلمة البحث أو فلتر الحالة لعرض المشتركين.'}
                  </p>
                </div>
              ) : (
                <div className="bg-black/60 border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-right text-xs text-neutral-300">
                      <thead className="bg-[#181818] text-neutral-400 font-bold border-b border-neutral-800">
                        <tr>
                          <th className="px-4 py-3.5">العميل</th>
                          <th className="px-4 py-3.5">الدولة ورقم الهاتف الدولي</th>
                          <th className="px-4 py-3.5">الباقة المختارة</th>
                          <th className="px-4 py-3.5">تاريخ التسجيل</th>
                          <th className="px-4 py-3.5">حالة الاشتراك</th>
                          <th className="px-4 py-3.5 text-center">إجراءات والتواصل</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/80">
                        {filteredCustomers.map((customer) => (
                          <tr
                            key={customer.id}
                            className={`hover:bg-neutral-900/60 transition-colors ${
                              customer.status === 'new' ? 'bg-[#FFE600]/5' : ''
                            }`}
                          >
                            {/* Name & Goal */}
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-white text-sm">{customer.name}</div>
                              {customer.fitnessGoal && (
                                <div className="text-[11px] text-[#FFE600] mt-0.5">{customer.fitnessGoal}</div>
                              )}
                              {customer.email && (
                                <div className="text-[10px] text-neutral-400">{customer.email}</div>
                              )}
                            </td>

                            {/* Phone & Country */}
                            <td className="px-4 py-3.5">
                              <div className="font-mono font-bold text-white text-xs ltr inline-block" dir="ltr">
                                {customer.fullInternationalPhone}
                              </div>
                              <div className="text-[10px] text-neutral-400 mt-0.5">
                                {customer.countryName} ({customer.countryDialCode})
                              </div>
                            </td>

                            {/* Plan */}
                            <td className="px-4 py-3.5">
                              <div className="font-bold text-white">
                                {customer.selectedPlanName}
                              </div>
                              <div className="inline-flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] text-neutral-400">{customer.selectedPlanDuration}</span>
                                <span className="text-xs font-black text-[#FFE600]">{customer.selectedPlanPrice}</span>
                              </div>
                            </td>

                            {/* Date */}
                            <td className="px-4 py-3.5 text-neutral-400 text-[11px] whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                                <span>{new Date(customer.createdAt).toLocaleDateString('ar-EG', { dateStyle: 'medium' })}</span>
                              </div>
                              <span className="text-[10px] text-neutral-500">
                                {new Date(customer.createdAt).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </td>

                            {/* Status Dropdown */}
                            <td className="px-4 py-3.5 whitespace-nowrap">
                              <div className="space-y-1">
                                <div>{getStatusBadge(customer.status)}</div>
                                <select
                                  value={customer.status}
                                  onChange={async (e) => {
                                    await updateCustomerStatus(
                                      customer.id,
                                      e.target.value as CustomerRegistration['status']
                                    );
                                    triggerSaveNotification();
                                  }}
                                  className="bg-neutral-900 border border-neutral-700 rounded text-[10px] text-neutral-300 px-2 py-1 mt-1 focus:border-[#FFE600] focus:outline-none cursor-pointer"
                                >
                                  <option value="new">عميل جديد (New)</option>
                                  <option value="contacted">تم التواصل (Contacted)</option>
                                  <option value="confirmed">تم التأكيد (Confirmed)</option>
                                  <option value="active">مشترك نشط (Active)</option>
                                  <option value="completed">مكتمل (Completed)</option>
                                  <option value="cancelled">ملغي (Cancelled)</option>
                                </select>
                              </div>
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3.5 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-1.5">
                                {/* WhatsApp Direct Button */}
                                <button
                                  type="button"
                                  onClick={() => handleOpenCustomerWhatsApp(customer)}
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-sm text-xs transition-all shadow-sm cursor-pointer"
                                  title="فتح محادثة واتساب مع رسالة تأكيد جاهزة"
                                >
                                  <MessageCircle className="w-3.5 h-3.5 fill-black" />
                                  <span>واتساب</span>
                                </button>

                                {/* View Details Modal Button */}
                                <button
                                  type="button"
                                  onClick={() => setSelectedCustomerModal(customer)}
                                  className="p-1.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded text-neutral-300 hover:text-white cursor-pointer"
                                  title="عرض كافة تفاصيل المشترك"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                {/* Delete Button */}
                                <button
                                  type="button"
                                  onClick={async () => {
                                    if (window.confirm(`هل أنت متأكد من حذف العميل (${customer.name})؟`)) {
                                      await deleteCustomer(customer.id);
                                      triggerSaveNotification();
                                    }
                                  }}
                                  className="p-1.5 bg-red-950/50 border border-red-800/60 hover:bg-red-900 rounded text-red-400 hover:text-white cursor-pointer"
                                  title="حذف هذا العميل"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CUSTOMER DETAILS POPUP MODAL */}
          {selectedCustomerModal && (
            <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
              <div className="bg-[#161616] border-2 border-[#FFE600] rounded-xl max-w-lg w-full p-6 text-right space-y-4 shadow-2xl">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="font-heading font-black text-xl text-white">
                    ملف المشترك: {selectedCustomerModal.name}
                  </h3>
                  <button
                    onClick={() => setSelectedCustomerModal(null)}
                    className="p-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-black/60 p-3 rounded border border-neutral-800">
                    <span className="text-neutral-400 block mb-1 font-bold">الباقة والاشتراك:</span>
                    <p className="text-sm font-bold text-white">{selectedCustomerModal.selectedPlanName}</p>
                    <p className="text-xs text-[#FFE600] font-black mt-0.5">
                      المدة: {selectedCustomerModal.selectedPlanDuration} — السعر: {selectedCustomerModal.selectedPlanPrice}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black/60 p-2.5 rounded border border-neutral-800">
                      <span className="text-neutral-400 block mb-1">رقم الهاتف الدولي:</span>
                      <span className="font-mono text-white font-bold ltr inline-block" dir="ltr">
                        {selectedCustomerModal.fullInternationalPhone}
                      </span>
                    </div>
                    <div className="bg-black/60 p-2.5 rounded border border-neutral-800">
                      <span className="text-neutral-400 block mb-1">الدولة:</span>
                      <span className="text-white font-bold">{selectedCustomerModal.countryName}</span>
                    </div>
                  </div>

                  {selectedCustomerModal.email && (
                    <div className="bg-black/60 p-2.5 rounded border border-neutral-800">
                      <span className="text-neutral-400 block mb-1">البريد الإلكتروني:</span>
                      <span className="text-white">{selectedCustomerModal.email}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-black/60 p-2.5 rounded border border-neutral-800">
                      <span className="text-neutral-400 block mb-1">الهدف التدريبي:</span>
                      <span className="text-white font-bold">{selectedCustomerModal.fitnessGoal || 'غير محدد'}</span>
                    </div>
                    <div className="bg-black/60 p-2.5 rounded border border-neutral-800">
                      <span className="text-neutral-400 block mb-1">الخبرة الرياضية:</span>
                      <span className="text-white font-bold">{selectedCustomerModal.trainingExperience || 'غير محدد'}</span>
                    </div>
                  </div>

                  <div className="bg-black/60 p-2.5 rounded border border-neutral-800">
                    <span className="text-neutral-400 block mb-1">تاريخ ووقت التسجيل:</span>
                    <span className="text-white">
                      {new Date(selectedCustomerModal.createdAt).toLocaleString('ar-EG')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenCustomerWhatsApp(selectedCustomerModal);
                    }}
                    className="flex-1 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-heading font-black text-sm rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageCircle className="w-4 h-4 fill-black" />
                    <span>مراسلة عبر واتساب</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCustomerModal(null)}
                    className="px-4 py-3 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 text-xs font-bold rounded-sm cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: HERO BANNER */}
          {activeTab === 'hero' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-neutral-900/60 p-4 border border-neutral-800 rounded-md">
                <h3 className="font-heading font-black text-xl text-white mb-1">
                  إعدادات الواجهة الرئيسية (HERO BANNER)
                </h3>
                <p className="text-xs text-neutral-400">
                  تعديل العنوان الترحيبي، النص البارز [ BE YOURSELF ]، صورة أو فيديو الخلفية، وزر الانضمام.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    الشارة العلوية (Badge Text)
                  </label>
                  <input
                    type="text"
                    value={config.hero.badge}
                    onChange={(e) => updateHero({ badge: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    عنوان الكوتش الرئيسي (Main Title)
                  </label>
                  <input
                    type="text"
                    value={config.hero.mainTitle}
                    onChange={(e) => updateHero({ mainTitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#FFE600] mb-1">
                  النص البارز المميز في المنتصف (Reference: [ BE YOURSELF ]) *
                </label>
                <input
                  type="text"
                  value={config.hero.highlightText}
                  onChange={(e) => updateHero({ highlightText: e.target.value })}
                  className="w-full bg-black border-2 border-[#FFE600] rounded-sm px-4 py-2.5 text-base font-bold text-white focus:outline-none"
                  placeholder="[ BE YOURSELF ]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  الوصف الترحيبي ورسالة الكوتش (Subheadline)
                </label>
                <textarea
                  rows={2}
                  value={config.hero.subheadline}
                  onChange={(e) => updateHero({ subheadline: e.target.value })}
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    نص زر الانضمام (CTA Button)
                  </label>
                  <input
                    type="text"
                    value={config.hero.buttonText}
                    onChange={(e) => updateHero({ buttonText: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    درجة تعتيم الخلفية ({config.hero.overlayDarkness}%)
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={config.hero.overlayDarkness}
                    onChange={(e) => updateHero({ overlayDarkness: Number(e.target.value) })}
                    className="w-full accent-[#FFE600] mt-2"
                  />
                </div>
              </div>

              {/* Media Settings: Image or Video */}
              <div className="bg-black/60 p-4 border border-neutral-800 rounded-md space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white">
                    نوع خلفية الواجهة (صورة أو فيديو)
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => updateHero({ mediaType: 'image' })}
                      className={`px-3 py-1 text-xs font-bold rounded-sm ${
                        config.hero.mediaType === 'image'
                          ? 'bg-[#FFE600] text-black'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      صورة ثابتة
                    </button>
                    <button
                      type="button"
                      onClick={() => updateHero({ mediaType: 'video' })}
                      className={`px-3 py-1 text-xs font-bold rounded-sm ${
                        config.hero.mediaType === 'video'
                          ? 'bg-[#FFE600] text-black'
                          : 'bg-neutral-800 text-neutral-300'
                      }`}
                    >
                      فيديو متحرك
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">
                    رابط ملف الوسائط (Media URL):
                  </label>
                  <input
                    type="text"
                    value={config.hero.mediaUrl}
                    onChange={(e) => updateHero({ mediaUrl: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">
                    أو رفع صورة / فيديو من جهازك:
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleFileUpload(e, (dataUrl) => updateHero({ mediaUrl: dataUrl }))}
                    className="text-xs text-neutral-400 file:mr-0 file:ml-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#FFE600] file:text-black hover:file:bg-[#fff033]"
                  />
                </div>

                {/* Preview Box */}
                <div className="mt-2 h-36 rounded overflow-hidden relative border border-neutral-800 bg-neutral-950">
                  {config.hero.mediaType === 'video' ? (
                    <video
                      src={config.hero.mediaUrl}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={config.hero.mediaUrl}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div
                    className="absolute inset-0 bg-black"
                    style={{ opacity: config.hero.overlayDarkness / 100 }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="font-heading font-black text-2xl text-white tracking-widest uppercase">
                      {config.hero.highlightText}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ABOUT COACH MATBOLY */}
          {activeTab === 'about' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-neutral-900/60 p-4 border border-neutral-800 rounded-md">
                <h3 className="font-heading font-black text-xl text-white mb-1">
                  قسم: من هو كوتش مدبولي (ABOUT COACH)
                </h3>
                <p className="text-xs text-neutral-400">
                  تعديل سيرة المدرب، المؤهلات والشهادات، الصور الشخصية، وإحصائيات التحولات والخبرة.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    عنوان القسم (Section Title)
                  </label>
                  <input
                    type="text"
                    value={config.about.sectionTitle}
                    onChange={(e) => updateAbout({ sectionTitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    العنوان الفرعي (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={config.about.subtitle}
                    onChange={(e) => updateAbout({ subtitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    اسم المدرب
                  </label>
                  <input
                    type="text"
                    value={config.about.coachName}
                    onChange={(e) => updateAbout({ coachName: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    المسمى الوظيفي والشهادات (Coach Title)
                  </label>
                  <input
                    type="text"
                    value={config.about.coachTitle}
                    onChange={(e) => updateAbout({ coachTitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  النبذة التعريفية - الفقرة الأولى
                </label>
                <textarea
                  rows={3}
                  value={config.about.bioParagraph1}
                  onChange={(e) => updateAbout({ bioParagraph1: e.target.value })}
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  النبذة التعريفية - الفقرة الثانية
                </label>
                <textarea
                  rows={3}
                  value={config.about.bioParagraph2}
                  onChange={(e) => updateAbout({ bioParagraph2: e.target.value })}
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                />
              </div>

              {/* Credentials / Qualifications List */}
              <div className="bg-black/60 p-4 border border-neutral-800 rounded-md">
                <label className="block text-xs font-bold text-[#FFE600] mb-2">
                  الاعتمادات والمؤهلات الرياضية (سطر لكل مؤهل):
                </label>
                <textarea
                  rows={4}
                  value={config.about.credentials.join('\n')}
                  onChange={(e) =>
                    updateAbout({
                      credentials: e.target.value.split('\n').filter((c) => c.trim().length > 0),
                    })
                  }
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  placeholder="Certified Strength & Conditioning Specialist (CSCS)..."
                />
              </div>

              {/* Coach Stats */}
              <div className="bg-black/60 p-4 border border-neutral-800 rounded-md space-y-3">
                <label className="block text-xs font-bold text-white mb-2">
                  إحصائيات النجاح الأربعة:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {config.about.stats.map((st, idx) => (
                    <div key={idx} className="bg-neutral-900 p-2.5 rounded border border-neutral-800">
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => {
                          const nextStats = [...config.about.stats];
                          nextStats[idx] = { ...nextStats[idx], value: e.target.value };
                          updateAbout({ stats: nextStats });
                        }}
                        className="w-full bg-black border border-neutral-700 rounded px-2 py-1 text-sm font-bold text-[#FFE600] mb-1"
                      />
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => {
                          const nextStats = [...config.about.stats];
                          nextStats[idx] = { ...nextStats[idx], label: e.target.value };
                          updateAbout({ stats: nextStats });
                        }}
                        className="w-full bg-black border border-neutral-700 rounded px-2 py-1 text-[11px] text-neutral-300"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Coach Photos */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/60 p-4 border border-neutral-800 rounded-md space-y-2">
                  <label className="block text-xs font-bold text-white">
                    الصورة الرئيسية للكوتش (Primary Photo)
                  </label>
                  <input
                    type="text"
                    value={config.about.primaryImage}
                    onChange={(e) => updateAbout({ primaryImage: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (dataUrl) => updateAbout({ primaryImage: dataUrl }))}
                    className="text-xs text-neutral-400 file:py-1 file:px-2.5 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#FFE600] file:text-black"
                  />
                  <img
                    src={config.about.primaryImage}
                    alt="Primary Coach"
                    className="w-full h-40 object-cover rounded mt-2 border border-neutral-800"
                  />
                </div>

                <div className="bg-black/60 p-4 border border-neutral-800 rounded-md space-y-2">
                  <label className="block text-xs font-bold text-white">
                    الصورة الثانوية أثناء التدريب (Action Photo)
                  </label>
                  <input
                    type="text"
                    value={config.about.secondaryImage}
                    onChange={(e) => updateAbout({ secondaryImage: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-1.5 text-xs text-white"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, (dataUrl) => updateAbout({ secondaryImage: dataUrl }))}
                    className="text-xs text-neutral-400 file:py-1 file:px-2.5 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#FFE600] file:text-black"
                  />
                  <img
                    src={config.about.secondaryImage}
                    alt="Secondary Coach"
                    className="w-full h-40 object-cover rounded mt-2 border border-neutral-800"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 3 VERTICAL INSTAGRAM-STYLE REELS VIDEOS */}
          {activeTab === 'reels' && (
            <div className="space-y-6 max-w-5xl">
              <div className="bg-neutral-900/90 p-5 border-2 border-[#FFE600]/40 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-[#FFE600] font-heading font-black text-xl">
                    <Film className="w-6 h-6" />
                    <span>مدير فيديوهات الريلز الثلاثة (3 REELS VIDEOS)</span>
                  </div>
                  <p className="text-xs text-neutral-300 mt-1 leading-relaxed max-w-2xl">
                    تُعرض فيديوهات الريلز الثلاثة جنباً إلى جنب في صف أفقي واحد على الموقع. تعمل جميعها تلقائياً بدون صوت وبشكل متكرر ومستمر. يمكنك رفع فيديوهات من جهازك، تغيير الروابط، حذف، أو إعادة ترتيب الفيديوهات.
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      if (config.subscription.reels.length < 3) {
                        const newSlot: ReelVideoItem = {
                          id: `reel-${Date.now()}`,
                          title: `Phase 0${config.subscription.reels.length + 1} Protocol`,
                          stepNumber: `0${config.subscription.reels.length + 1}`,
                          description: 'Custom tailored coaching progression and metrics.',
                          videoUrl: PRESET_FITNESS_VIDEOS[config.subscription.reels.length % PRESET_FITNESS_VIDEOS.length].url,
                          badge: `STEP 0${config.subscription.reels.length + 1}`,
                        };
                        updateSubscription({ reels: [...config.subscription.reels, newSlot] });
                      }
                    }}
                    disabled={config.subscription.reels.length >= 3}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FFE600] disabled:opacity-40 text-black font-heading font-black text-xs rounded-sm hover:bg-[#fff033] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة خانة ريلز ({config.subscription.reels.length}/3)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateSubscription({
                        reels: DEFAULT_SITE_CONFIG.subscription.reels,
                      });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white text-xs font-bold rounded-sm cursor-pointer"
                    title="استعادة الفيديوهات الافتراضية الثلاثة"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>استعادة الافتراضي</span>
                  </button>
                </div>
              </div>

              {/* Section Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    عنوان قسم الاشتراكات (Section Title)
                  </label>
                  <input
                    type="text"
                    value={config.subscription.sectionTitle}
                    onChange={(e) => updateSubscription({ sectionTitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    العنوان الفرعي (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={config.subscription.subtitle}
                    onChange={(e) => updateSubscription({ subtitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>
              </div>

              {/* The Reel Slots */}
              <div className="space-y-6 pt-2">
                {config.subscription.reels.map((reel, idx) => (
                  <div
                    key={reel.id || idx}
                    className="bg-black/90 border border-neutral-800 rounded-lg p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start shadow-xl"
                  >
                    {/* Live Reel Preview Column */}
                    <div className="lg:col-span-4 flex flex-col items-center">
                      <div className="relative w-44 aspect-[9/16] bg-neutral-950 rounded-lg overflow-hidden border-2 border-[#FFE600]/60 shadow-lg">
                        <video
                          src={reel.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-[#FFE600]">
                          {reel.badge || `STEP 0${idx + 1}`}
                        </div>
                        <div className="absolute bottom-2 right-2 left-2 p-1.5 bg-gradient-to-t from-black via-black/80 to-transparent">
                          <p className="text-[11px] font-black text-white truncate">{reel.title}</p>
                          <p className="text-[9px] text-neutral-300 truncate">{reel.description}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-medium mt-2">
                        معاينة طولية 9:16 (تشغيل مستمر)
                      </span>
                    </div>

                    {/* Reel Configuration Form */}
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-[#FFE600] text-black font-heading font-black text-xs flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <h4 className="font-heading font-black text-lg text-white">
                            فيديو الريلز رقم {idx + 1} (Reel #{idx + 1})
                          </h4>
                        </div>

                        {/* Actions: Reorder & Delete */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => {
                              if (idx > 0) {
                                const next = [...config.subscription.reels];
                                const temp = next[idx - 1];
                                next[idx - 1] = next[idx];
                                next[idx] = temp;
                                updateSubscription({ reels: next });
                              }
                            }}
                            className="p-1.5 bg-neutral-900 border border-neutral-700 disabled:opacity-30 rounded text-neutral-300 hover:text-white hover:border-[#FFE600] cursor-pointer"
                            title="تحريك الفيديو للأمام / اليمين"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === config.subscription.reels.length - 1}
                            onClick={() => {
                              if (idx < config.subscription.reels.length - 1) {
                                const next = [...config.subscription.reels];
                                const temp = next[idx + 1];
                                next[idx + 1] = next[idx];
                                next[idx] = temp;
                                updateSubscription({ reels: next });
                              }
                            }}
                            className="p-1.5 bg-neutral-900 border border-neutral-700 disabled:opacity-30 rounded text-neutral-300 hover:text-white hover:border-[#FFE600] cursor-pointer"
                            title="تحريك الفيديو للخلف / اليسار"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (config.subscription.reels.length <= 1) {
                                alert('يجب الإبقاء على فيديو واحد على الأقل.');
                                return;
                              }
                              const next = config.subscription.reels.filter((_, i) => i !== idx);
                              updateSubscription({ reels: next });
                            }}
                            className="p-1.5 bg-red-950/50 border border-red-800/80 hover:bg-red-900 text-red-300 hover:text-white rounded cursor-pointer mr-1"
                            title="حذف هذا الفيديو"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                            عنوان الخطوة (Title)
                          </label>
                          <input
                            type="text"
                            value={reel.title}
                            onChange={(e) => {
                              const next = [...config.subscription.reels];
                              next[idx] = { ...next[idx], title: e.target.value };
                              updateSubscription({ reels: next });
                            }}
                            className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-1.5 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                            رقم المرحلة (e.g. 01)
                          </label>
                          <input
                            type="text"
                            value={reel.stepNumber}
                            onChange={(e) => {
                              const next = [...config.subscription.reels];
                              next[idx] = { ...next[idx], stepNumber: e.target.value };
                              updateSubscription({ reels: next });
                            }}
                            className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-1.5 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                            placeholder="01"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                          وصف الخطوة والمرحلة (Description)
                        </label>
                        <textarea
                          rows={2}
                          value={reel.description}
                          onChange={(e) => {
                            const next = [...config.subscription.reels];
                            next[idx] = { ...next[idx], description: e.target.value };
                            updateSubscription({ reels: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-1.5 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                        />
                      </div>

                      {/* Video Source Upload, Replace, & Presets */}
                      <div className="bg-neutral-900/90 p-3.5 rounded border border-neutral-800 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <label className="block text-[11px] font-bold text-[#FFE600]">
                            تعديل واستبدال مصدر الفيديو:
                          </label>
                          <span className="text-[10px] text-neutral-400">صيغ MP4 أو WebM أو رابط مباشر</span>
                        </div>

                        <input
                          type="text"
                          value={reel.videoUrl}
                          onChange={(e) => {
                            const next = [...config.subscription.reels];
                            next[idx] = { ...next[idx], videoUrl: e.target.value };
                            updateSubscription({ reels: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-1.5 text-xs text-white font-mono"
                          placeholder="https://... (رابط الفيديو)"
                        />

                        {/* Quick Presets Dropdown */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          <span className="text-[10px] text-neutral-400 font-bold">نماذج جاهزة سريعة:</span>
                          {PRESET_FITNESS_VIDEOS.map((preset, pIdx) => (
                            <button
                              key={pIdx}
                              type="button"
                              onClick={() => {
                                const next = [...config.subscription.reels];
                                next[idx] = { ...next[idx], videoUrl: preset.url };
                                updateSubscription({ reels: next });
                              }}
                              className="px-2 py-0.5 bg-black border border-neutral-700 hover:border-[#FFE600] rounded text-[10px] text-neutral-300 hover:text-white cursor-pointer"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>

                        {/* Direct File Upload */}
                        <div className="pt-2 border-t border-neutral-800">
                          <label className="block text-[10px] text-neutral-300 font-bold mb-1">
                            رفع فيديو مخصص من جهازك (Upload Video):
                          </label>
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/quicktime"
                            onChange={(e) =>
                              handleFileUpload(e, (dataUrl) => {
                                const next = [...config.subscription.reels];
                                next[idx] = { ...next[idx], videoUrl: dataUrl };
                                updateSubscription({ reels: next });
                              })
                            }
                            className="text-xs text-neutral-400 file:py-1 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-[#FFE600] file:text-black cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MEMBERSHIP PLANS & PRICING */}
          {activeTab === 'plans' && (
            <div className="space-y-6 max-w-5xl">
              <div className="bg-neutral-900/60 p-4 border border-neutral-800 rounded-md flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-black text-xl text-white mb-1">
                    إدارة باقات الاشتراك والأسعار (MEMBERSHIP PLANS)
                  </h3>
                  <p className="text-xs text-neutral-400">
                    تُعرض الباقات كـ باقتين في كل صف (2x2). يمكنك تعديل الأسعار، المميزات، الخصومات، وإضافة أو حذف باقات.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newPlan: MembershipPlan = {
                        id: `plan-${Date.now()}`,
                        name: 'VIP PROTOCOL',
                        duration: '24 WEEKS',
                        price: '$499',
                        originalPrice: '$699',
                        periodText: 'HALF YEAR ACCESS',
                        description: 'Ultimate body transformation package with direct access.',
                        features: [
                          'Custom Nutrition & Calorie Tracking',
                          'Bi-weekly Video Form Analysis',
                          'Direct WhatsApp Priority Line',
                          'Supplement Optimization Protocol',
                        ],
                        ctaText: 'JOIN PLAN',
                        ctaLink: '#contact',
                      };
                      updatePlans({ plans: [...config.plans.plans, newPlan] });
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#FFE600] text-black font-heading font-black text-xs rounded-sm hover:bg-[#fff033] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة باقة جديدة</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updatePlans({ plans: DEFAULT_SITE_CONFIG.plans.plans });
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-neutral-900 border border-neutral-700 text-neutral-300 text-xs font-bold rounded-sm cursor-pointer"
                    title="استعادة الباقات الأربعة الافتراضية"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>استعادة الافتراضي</span>
                  </button>
                </div>
              </div>

              {/* Section Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    عنوان قسم الباقات (Section Title)
                  </label>
                  <input
                    type="text"
                    value={config.plans.sectionTitle}
                    onChange={(e) => updatePlans({ sectionTitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    العنوان الفرعي (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={config.plans.subtitle}
                    onChange={(e) => updatePlans({ subtitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>
              </div>

              {/* Individual Plan Cards */}
              <div className="space-y-4">
                {config.plans.plans.map((plan, idx) => (
                  <div
                    key={plan.id}
                    className={`bg-black/80 border p-5 rounded-lg space-y-4 ${
                      plan.isPopular ? 'border-2 border-[#FFE600]' : 'border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#FFE600] text-black font-heading font-black text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-heading font-black text-lg text-white">
                          {plan.name} — ({plan.duration})
                        </h4>
                        {plan.isPopular && (
                          <span className="bg-[#FFE600] text-black text-[10px] font-black px-2 py-0.5 rounded">
                            الباقة المميزة الأكثر طلباً
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const next = [...config.plans.plans];
                            next[idx] = { ...next[idx], isPopular: !next[idx].isPopular };
                            updatePlans({ plans: next });
                          }}
                          className={`px-2.5 py-1 text-xs font-bold rounded cursor-pointer ${
                            plan.isPopular
                              ? 'bg-[#FFE600] text-black'
                              : 'bg-neutral-900 border border-neutral-700 text-neutral-400'
                          }`}
                        >
                          {plan.isPopular ? '★ باقة مميزة' : 'تعيين كباقة مميزة'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (config.plans.plans.length <= 1) {
                              alert('يجب الإبقاء على باقة واحدة على الأقل.');
                              return;
                            }
                            const next = config.plans.plans.filter((_, i) => i !== idx);
                            updatePlans({ plans: next });
                          }}
                          className="p-1 bg-red-950/50 border border-red-800/80 hover:bg-red-900 text-red-300 rounded cursor-pointer"
                          title="حذف الباقة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                          اسم الباقة (Plan Name)
                        </label>
                        <input
                          type="text"
                          value={plan.name}
                          onChange={(e) => {
                            const next = [...config.plans.plans];
                            next[idx] = { ...next[idx], name: e.target.value };
                            updatePlans({ plans: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                          مدة الباقة (Duration)
                        </label>
                        <input
                          type="text"
                          value={plan.duration}
                          onChange={(e) => {
                            const next = [...config.plans.plans];
                            next[idx] = { ...next[idx], duration: e.target.value };
                            updatePlans({ plans: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white font-bold text-[#FFE600]"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                          الشارة المميزة (Badge Text)
                        </label>
                        <input
                          type="text"
                          value={plan.badgeText || ''}
                          onChange={(e) => {
                            const next = [...config.plans.plans];
                            next[idx] = { ...next[idx], badgeText: e.target.value };
                            updatePlans({ plans: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                          placeholder="MOST POPULAR / BEST VALUE"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#FFE600] mb-1">
                          السعر الحالي (Price)
                        </label>
                        <input
                          type="text"
                          value={plan.price}
                          onChange={(e) => {
                            const next = [...config.plans.plans];
                            next[idx] = { ...next[idx], price: e.target.value };
                            updatePlans({ plans: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-[#FFE600] font-bold"
                          placeholder="$199"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-400 mb-1">
                          السعر قبل الخصم (Original Price)
                        </label>
                        <input
                          type="text"
                          value={plan.originalPrice || ''}
                          onChange={(e) => {
                            const next = [...config.plans.plans];
                            next[idx] = { ...next[idx], originalPrice: e.target.value };
                            updatePlans({ plans: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-neutral-400 line-through"
                          placeholder="$299"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                          نص المدة (Period Text)
                        </label>
                        <input
                          type="text"
                          value={plan.periodText}
                          onChange={(e) => {
                            const next = [...config.plans.plans];
                            next[idx] = { ...next[idx], periodText: e.target.value };
                            updatePlans({ plans: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                          placeholder="FULL 12-WEEK ACCESS"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        وصف الباقة (Description)
                      </label>
                      <input
                        type="text"
                        value={plan.description}
                        onChange={(e) => {
                          const next = [...config.plans.plans];
                          next[idx] = { ...next[idx], description: e.target.value };
                          updatePlans({ plans: next });
                        }}
                        className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>

                    {/* Plan Features Checklist */}
                    <div>
                      <label className="block text-[11px] font-bold text-[#FFE600] mb-1">
                        مميزات الباقة (سطر لكل ميزة):
                      </label>
                      <textarea
                        rows={3}
                        value={plan.features.join('\n')}
                        onChange={(e) => {
                          const next = [...config.plans.plans];
                          next[idx] = {
                            ...next[idx],
                            features: e.target.value.split('\n').filter((f) => f.trim().length > 0),
                          };
                          updatePlans({ plans: next });
                        }}
                        className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: HEALTHIER CHOICE SECTION */}
          {activeTab === 'choices' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-neutral-900/60 p-4 border border-neutral-800 rounded-md">
                <h3 className="font-heading font-black text-xl text-white mb-1">
                  قسم خيارات صحية أفضل (MAKE A HEALTHIER CHOICE)
                </h3>
                <p className="text-xs text-neutral-400">
                  تعديل كروت الركائز الصحية والتدريبية ومميزات برنامج الكوتش.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    عنوان القسم (Section Title)
                  </label>
                  <input
                    type="text"
                    value={config.choices.sectionTitle}
                    onChange={(e) => updateChoices({ sectionTitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    العنوان الفرعي (Subtitle)
                  </label>
                  <input
                    type="text"
                    value={config.choices.subtitle}
                    onChange={(e) => updateChoices({ subtitle: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {config.choices.features.map((feature, idx) => (
                  <div key={feature.id} className="bg-black/60 border border-neutral-800 p-4 rounded-md space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#FFE600] text-black text-xs font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-white text-sm">{feature.title}</h4>
                      </div>
                      <span className="text-xs text-neutral-400 font-mono">{feature.highlightNumber}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">عنوان الميزة</label>
                        <input
                          type="text"
                          value={feature.title}
                          onChange={(e) => {
                            const next = [...config.choices.features];
                            next[idx] = { ...next[idx], title: e.target.value };
                            updateChoices({ features: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] text-neutral-400 mb-1">الرقم التعريفي (Highlight Number)</label>
                        <input
                          type="text"
                          value={feature.highlightNumber || ''}
                          onChange={(e) => {
                            const next = [...config.choices.features];
                            next[idx] = { ...next[idx], highlightNumber: e.target.value };
                            updateChoices({ features: next });
                          }}
                          className="w-full bg-black border border-neutral-700 rounded px-3 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">الشرح والتفاصيل</label>
                      <textarea
                        rows={2}
                        value={feature.description}
                        onChange={(e) => {
                          const next = [...config.choices.features];
                          next[idx] = { ...next[idx], description: e.target.value };
                          updateChoices({ features: next });
                        }}
                        className="w-full bg-black border border-neutral-700 rounded px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-neutral-900/60 p-4 border border-neutral-800 rounded-md">
                <h3 className="font-heading font-black text-xl text-white mb-1">
                  بيانات التواصل وروابط السوشيال ميديا (GET IN TOUCH)
                </h3>
                <p className="text-xs text-neutral-400">
                  تعديل رقم الواتساب المباشر، البريد الإلكتروني، وحسابات تيك توك وإنستجرام وفيسبوك.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#FFE600] mb-1">
                    رقم الواتساب المباشر (Direct WhatsApp Number) *
                  </label>
                  <input
                    type="text"
                    value={config.contact.whatsappNumber}
                    onChange={(e) => updateContact({ whatsappNumber: e.target.value })}
                    className="w-full bg-black border-2 border-[#FFE600] rounded-sm px-3 py-2 text-sm text-white focus:outline-none font-mono"
                    placeholder="+201000000000"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 mb-1">
                    البريد الإلكتروني الرسمي (Email)
                  </label>
                  <input
                    type="email"
                    value={config.contact.email}
                    onChange={(e) => updateContact({ email: e.target.value })}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-black/60 p-4 border border-neutral-800 rounded-md space-y-3">
                <h4 className="text-xs font-bold text-[#FFE600]">حسابات التواصل الاجتماعي:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Instagram Profile Link</label>
                    <input
                      type="text"
                      value={config.contact.socials.instagram}
                      onChange={(e) =>
                        updateContact({
                          socials: { ...config.contact.socials, instagram: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">TikTok Account Link</label>
                    <input
                      type="text"
                      value={config.contact.socials.tiktok}
                      onChange={(e) =>
                        updateContact({
                          socials: { ...config.contact.socials, tiktok: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">Facebook Page Link</label>
                    <input
                      type="text"
                      value={config.contact.socials.facebook}
                      onChange={(e) =>
                        updateContact({
                          socials: { ...config.contact.socials, facebook: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-neutral-400 mb-1">YouTube Channel Link</label>
                    <input
                      type="text"
                      value={config.contact.socials.youtube || ''}
                      onChange={(e) =>
                        updateContact({
                          socials: { ...config.contact.socials, youtube: e.target.value },
                        })
                      }
                      className="w-full bg-black border border-neutral-700 rounded px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: FOOTER & POLICIES */}
          {activeTab === 'footer' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-neutral-900/60 p-4 border border-neutral-800 rounded-md">
                <h3 className="font-heading font-black text-xl text-white mb-1">
                  الفوتر والسياسات القانونية (FOOTER & POLICIES)
                </h3>
                <p className="text-xs text-neutral-400">
                  تعديل حقوق الملكية، شروط الاستخدام، سياسة الخصوصية، وصفحة الدعم الفني والمساعدة.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  نص حقوق الملكية (Copyright Notice)
                </label>
                <input
                  type="text"
                  value={config.footer.copyrightText}
                  onChange={(e) => updateFooter({ copyrightText: e.target.value })}
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  محتوى شروط الخدمة والاستخدام (Terms & Conditions)
                </label>
                <textarea
                  rows={4}
                  value={config.footer.termsContent}
                  onChange={(e) => updateFooter({ termsContent: e.target.value })}
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  محتوى سياسة الخصوصية (Privacy Policy)
                </label>
                <textarea
                  rows={4}
                  value={config.footer.privacyContent}
                  onChange={(e) => updateFooter({ privacyContent: e.target.value })}
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 mb-1">
                  محتوى صفحة المساعدة والدعم الفني (Support & Help)
                </label>
                <textarea
                  rows={4}
                  value={config.footer.supportContent}
                  onChange={(e) => updateFooter({ supportContent: e.target.value })}
                  className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* TAB 8: BACKUP & RESTORE */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-4xl">
              <div className="bg-neutral-900/60 p-4 border border-neutral-800 rounded-md">
                <h3 className="font-heading font-black text-xl text-white mb-1">
                  النسخ الاحتياطي واستعادة البيانات (BACKUP & RESTORE)
                </h3>
                <p className="text-xs text-neutral-400">
                  تصدير كامل إعدادات الموقع، الفيديوهات، والأسعار إلى ملف JSON أو استيراد نسخة سابقة أو استعادة الضبط الأصلي.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/60 p-5 border border-neutral-800 rounded-md flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-heading font-black text-base text-[#FFE600] mb-1">
                      تصدير نسخة احتياطية (EXPORT JSON)
                    </h4>
                    <p className="text-xs text-neutral-300">
                      قم بتحميل ملف يحتوي على كامل بيانات الموقع لحفظه بأمان على جهازك واستعادته في أي وقت.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={exportConfigJSON}
                    className="w-full py-2.5 bg-[#FFE600] hover:bg-[#fff033] text-black font-heading font-black text-sm rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>تحميل ملف النسخة الاحتياطية</span>
                  </button>
                </div>

                <div className="bg-black/60 p-5 border border-neutral-800 rounded-md flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-heading font-black text-base text-white mb-1">
                      استيراد نسخة سابقة (IMPORT JSON)
                    </h4>
                    <p className="text-xs text-neutral-300">
                      رفع ملف نسخة احتياطية JSON لتطبيق كافة الإعدادات والأسعار المحفوظة مسبقاً.
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            const res = importConfigJSON(evt.target?.result as string);
                            if (!res.success) {
                              setImportError(res.error || 'الملف غير صالح');
                            } else {
                              setImportError(null);
                              triggerSaveNotification();
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="text-xs text-neutral-400 file:py-2 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-bold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 cursor-pointer"
                    />
                    {importError && (
                      <p className="text-xs text-red-400 mt-2 font-bold">{importError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Hard Reset Box */}
              <div className="bg-red-950/20 border border-red-900/60 p-5 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading font-black text-base text-red-400 mb-1">
                    استعادة الإعدادات الافتراضية الأصلية (RESET TO DEFAULTS)
                  </h4>
                  <p className="text-xs text-neutral-400">
                    سيتم مسح كافة التعديلات المخزنة واسترجاع التصميم والمحتوى الأصلي المعتمد.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('هل أنت متأكد من رغبتك في استعادة الإعدادات الأصلية للموقع؟')) {
                      resetToDefaults();
                      triggerSaveNotification();
                    }
                  }}
                  className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white font-heading font-bold text-xs rounded-sm whitespace-nowrap cursor-pointer"
                >
                  استعادة الضبط الأصلي
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Bar */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#0e0e0e] border-t border-neutral-800 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>قاعدة البيانات السحابية (Cloud Firestore) متصلة ونشطة</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#FFE600] hover:bg-[#fff033] text-black font-heading font-black text-xs uppercase tracking-wider rounded-sm cursor-pointer"
          >
            إغلاق لوحة التحكم
          </button>
        </div>
      </div>
    </div>
  );
};
