import React, { useState, useEffect } from 'react';
import { X, MessageCircle, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';
import { SiteConfig } from '../types/fitness';
import { COUNTRIES, DEFAULT_COUNTRY, CountryItem } from '../data/countries';
import { CustomerRegistration } from '../types/customer';
import { useLanguage } from '../context/LanguageContext';

interface PlanCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
  config: SiteConfig;
  onSaveCustomer: (customerData: Omit<CustomerRegistration, 'id' | 'createdAt' | 'createdAtTimestamp' | 'status'>) => Promise<{ success: boolean; id?: string; error?: string }>;
}

export const PlanCheckoutModal: React.FC<PlanCheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId,
  config,
  onSaveCustomer,
}) => {
  const { t, isRTL, language } = useLanguage();
  const plans = config.plans.plans;
  const [activePlanId, setActivePlanId] = useState<string>(selectedPlanId || plans[1]?.id || plans[0]?.id);
  const [name, setName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<CountryItem>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('Intermediate (1-3 years)');
  const [fitnessGoal, setFitnessGoal] = useState('Muscle Building & Hypertrophy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');

  useEffect(() => {
    if (selectedPlanId) {
      setActivePlanId(selectedPlanId);
    }
  }, [selectedPlanId]);

  useEffect(() => {
    if (isOpen) {
      setSubmittedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentPlanIndex = plans.findIndex((p) => p.id === activePlanId);
  const currentPlan = plans[currentPlanIndex >= 0 ? currentPlanIndex : 0] || plans[0];
  const translatedPlan = t.plans.plans[currentPlanIndex >= 0 ? currentPlanIndex : 0] || {
    name: currentPlan.name,
    duration: currentPlan.duration,
    badgeText: currentPlan.badgeText,
    periodText: currentPlan.periodText,
  };

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(searchCountry.toLowerCase()) ||
      c.nameAr.includes(searchCountry) ||
      c.dialCode.includes(searchCountry)
  );

  const formatCleanInternationalNumber = () => {
    const cleanPhone = phoneNumber.replace(/[^0-9]/g, '').replace(/^0+/, '');
    return `${selectedCountry.dialCode}${cleanPhone}`;
  };

  const handleProceed = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneNumber.trim()) return;

    setIsSubmitting(true);

    const fullPhone = formatCleanInternationalNumber();

    // 1. Save customer to persistent Firestore Database
    await onSaveCustomer({
      name: name.trim(),
      countryCode: selectedCountry.code,
      countryDialCode: selectedCountry.dialCode,
      countryName: selectedCountry.name,
      rawPhoneNumber: phoneNumber.trim(),
      fullInternationalPhone: fullPhone,
      email: email.trim() ? email.trim() : '',
      selectedPlanId: currentPlan.id,
      selectedPlanName: currentPlan.name,
      selectedPlanDuration: currentPlan.duration,
      selectedPlanPrice: currentPlan.price,
      trainingExperience: experience,
      fitnessGoal,
      notes: '',
    });

    setIsSubmitting(false);
    setSubmittedSuccess(true);

    // 2. Open Coach's WhatsApp with registration details pre-filled
    const coachPhone = (config.contact.whatsappNumber || '+201000000000').replace(/[^0-9]/g, '');
    const waMessage = encodeURIComponent(
      `Hello Coach Matboly! 🏋️‍♂️\nI have just registered on your website for the [${translatedPlan.name} - ${translatedPlan.duration}] plan (${currentPlan.price}).\n\n📌 Details:\n- Name: ${name}\n- Phone: ${fullPhone}\n- Country: ${selectedCountry.flag} ${language === 'ar' ? selectedCountry.nameAr : selectedCountry.name}\n- Experience: ${experience}\n- Goal: ${fitnessGoal}\n\nReady to start!`
    );
    const waUrl = `https://wa.me/${coachPhone}?text=${waMessage}`;

    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#121212] border-2 border-[#FFE600] rounded-xl shadow-2xl overflow-hidden text-neutral-200 my-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0c0c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#FFE600] text-black font-black flex items-center justify-center text-lg">
              ⚡
            </div>
            <div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-wider">
                {t.checkout.title}
              </h3>
              <p className="text-[11px] text-neutral-400">{t.checkout.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-neutral-900 border border-neutral-700 hover:text-white text-neutral-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {submittedSuccess ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#FFE600] text-black rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,230,0,0.5)]">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>
              <h4 className="font-heading font-black text-2xl text-white uppercase">
                {t.checkout.submittedTitle}
              </h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                {t.checkout.submittedDesc}{' '}
                <strong className="text-[#FFE600]">{name}</strong>! [{translatedPlan.name} - {translatedPlan.duration}]
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#FFE600] text-black font-heading font-black text-sm px-6 py-3 rounded-sm uppercase tracking-wider hover:bg-[#fff033]"
                >
                  {t.checkout.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Plan Selector Buttons (4 plans) */}
              <div>
                <label className="block text-xs font-bold text-[#FFE600] uppercase tracking-wider mb-2">
                  {t.checkout.selectCommitment}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {plans.map((p, idx) => {
                    const isSelected = p.id === activePlanId;
                    const pTrans = t.plans.plans[idx] || { duration: p.duration };
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setActivePlanId(p.id)}
                        className={`p-2.5 rounded-sm border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFE600] border-[#FFE600] text-black shadow-md font-bold'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-600'
                        }`}
                      >
                        <p className="font-heading font-black text-xs sm:text-sm uppercase truncate">{pTrans.duration}</p>
                        <p className={`text-xs font-extrabold ${isSelected ? 'text-black' : 'text-[#FFE600]'}`}>
                          {p.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Active Plan Highlights Box */}
              <div className="bg-black/80 border border-neutral-800 p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-xl sm:text-2xl text-white uppercase">
                      {translatedPlan.name}
                    </span>
                    {translatedPlan.badgeText && (
                      <span className="px-2 py-0.5 rounded bg-[#FFE600] text-black text-[10px] font-black uppercase">
                        {translatedPlan.badgeText}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 mt-0.5">{translatedPlan.periodText} — {translatedPlan.duration}</p>
                </div>
                <div className={isRTL ? 'text-left' : 'text-right'}>
                  <span className="font-heading font-black text-2xl sm:text-3xl text-[#FFE600]">{currentPlan.price}</span>
                  {currentPlan.originalPrice && (
                    <span className="text-xs text-neutral-500 line-through ml-2 font-bold">
                      {currentPlan.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              {/* User Information Form */}
              <form onSubmit={handleProceed} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1">
                    {t.checkout.fullNameLabel}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t.contact.fullNamePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2.5 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  />
                </div>

                {/* Country Code & Phone Field */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1">
                    {t.checkout.countryPhoneLabel}
                  </label>
                  <div className="flex items-stretch gap-2">
                    {/* Country Selector with Flag */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                        className="h-full bg-neutral-900 border border-neutral-700 hover:border-[#FFE600] px-3 py-2 rounded-sm flex items-center gap-1.5 text-sm text-white font-medium cursor-pointer min-w-[110px] justify-between"
                      >
                        <span className="text-lg leading-none">{selectedCountry.flag}</span>
                        <span className="font-bold text-xs">{selectedCountry.dialCode}</span>
                        <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                      </button>

                      {/* Country Dropdown Popover */}
                      {isCountryDropdownOpen && (
                        <div className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-1 w-72 bg-[#161616] border border-neutral-700 rounded shadow-2xl z-50 max-h-60 overflow-y-auto`}>
                          <div className="p-2 border-b border-neutral-800 sticky top-0 bg-[#161616]">
                            <input
                              type="text"
                              placeholder={t.checkout.searchCountry}
                              value={searchCountry}
                              onChange={(e) => setSearchCountry(e.target.value)}
                              className="w-full bg-black border border-neutral-700 rounded px-2.5 py-1 text-xs text-white focus:border-[#FFE600] focus:outline-none"
                              autoFocus
                            />
                          </div>
                          <div className="py-1">
                            {filteredCountries.map((country) => (
                              <button
                                key={country.code}
                                type="button"
                                onClick={() => {
                                  setSelectedCountry(country);
                                  setIsCountryDropdownOpen(false);
                                  setSearchCountry('');
                                }}
                                className={`w-full px-3 py-1.5 text-left flex items-center justify-between text-xs hover:bg-neutral-800 transition-colors cursor-pointer ${
                                  selectedCountry.code === country.code ? 'bg-[#FFE600]/15 text-[#FFE600]' : 'text-neutral-200'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span className="text-base">{country.flag}</span>
                                  <span>{language === 'ar' ? country.nameAr : country.name}</span>
                                </span>
                                <span className="font-mono text-neutral-400 font-bold">{country.dialCode}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex-1 relative">
                      <input
                        type="tel"
                        required
                        placeholder="100 123 4567"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2.5 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    {t.checkout.selectedInternational}: <strong className="text-[#FFE600]" dir="ltr">{formatCleanInternationalNumber()}</strong>
                  </p>
                </div>

                {/* Email & Fitness Goal */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1">
                      {t.checkout.emailLabel}
                    </label>
                    <input
                      type="email"
                      placeholder="user@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1">
                      {t.checkout.fitnessGoalLabel}
                    </label>
                    <select
                      value={fitnessGoal}
                      onChange={(e) => setFitnessGoal(e.target.value)}
                      className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                    >
                      <option value="Fat Loss & Shredding">{t.checkout.goalFatLoss}</option>
                      <option value="Muscle Building & Hypertrophy">{t.checkout.goalMuscleBuilding}</option>
                      <option value="Body Recomposition">{t.checkout.goalBodyRecomposition}</option>
                      <option value="Strength & Athletic Performance">{t.checkout.goalStrength}</option>
                      <option value="Posture & Injury Recovery">{t.checkout.goalPosture}</option>
                    </select>
                  </div>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-1">
                    {t.checkout.experienceLabel}
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-black border border-neutral-700 rounded-sm px-3 py-2 text-sm text-white focus:border-[#FFE600] focus:outline-none"
                  >
                    <option value="Beginner (< 1 year)">{t.checkout.expBeginner}</option>
                    <option value="Intermediate (1-3 years)">{t.checkout.expIntermediate}</option>
                    <option value="Advanced (3+ years)">{t.checkout.expAdvanced}</option>
                    <option value="Returning after a break">{t.checkout.expReturning}</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FFE600] hover:bg-[#fff033] active:scale-[0.99] disabled:opacity-50 text-black font-heading font-black text-lg sm:text-xl py-4 rounded-sm uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,230,0,0.4)] cursor-pointer flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>{isSubmitting ? t.checkout.submittingBtn : t.checkout.confirmBtn}</span>
                  </button>
                </div>
              </form>

              {/* Guarantee */}
              <div className="flex items-center gap-2 text-[11px] text-neutral-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-[#FFE600]" />
                <span>{t.checkout.guarantee}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

