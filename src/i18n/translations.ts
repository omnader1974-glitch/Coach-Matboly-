export type Language = 'ar' | 'en';

export interface PlanTranslationItem {
  name: string;
  duration: string;
  badgeText?: string;
  description: string;
  periodText: string;
  ctaText: string;
  features: string[];
}

export interface Translations {
  nav: {
    about: string;
    howTo: string;
    memberships: string;
    transformations: string;
    whyUs: string;
    contact: string;
    joinToday: string;
    switchLangTooltip: string;
    currentLangDisplay: string;
  };
  hero: {
    badge: string;
    mainTitle: string;
    highlightText: string;
    subheadline: string;
    buttonText: string;
    tailoredBadge: string;
    guaranteedBadge: string;
  };
  about: {
    badge: string;
    sectionTitle: string;
    coachName: string;
    subtitle: string;
    paragraphs: string[];
    qualificationsTitle: string;
    credentials: string[];
    stats: { value: string; label: string }[];
    trainBtn: string;
    learnHow: string;
    tagCoach: string;
  };
  howTo: {
    badge: string;
    sectionTitle: string;
    subtitle: string;
    phase: string;
    muted: string;
    reels: {
      stepNumber: string;
      title: string;
      description: string;
      badge: string;
    }[];
    note: string;
    ctaBtn: string;
  };
  plans: {
    badge: string;
    sectionTitle: string;
    subtitle: string;
    includedTitle: string;
    guaranteeTitle: string;
    guaranteeText: string;
    plans: PlanTranslationItem[];
  };
  transformations: {
    badge: string;
    sectionTitle: string;
    subtitle: string;
    ctaBtn: string;
    verified: string;
    timeline: string;
    result: string;
    hoverHint: string;
  };
  choices: {
    badge: string;
    sectionTitle: string;
    subtitle: string;
    pillar: string;
    features: {
      title: string;
      description: string;
    }[];
    ctaBtn: string;
  };
  contact: {
    badge: string;
    sectionTitle: string;
    subtitle: string;
    socialTitle: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    goalLabel: string;
    goals: string[];
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    successTitle: string;
    successDesc: string;
    sendAnother: string;
    socialButtons: {
      facebook: string;
      tiktok: string;
      instagram: string;
      whatsapp: string;
      youtube: string;
    };
  };
  footer: {
    brandName: string;
    tagline: string;
    terms: string;
    privacy: string;
    support: string;
    copyright: string;
    backToTop: string;
  };
  modal: {
    title: string;
    subtitle: string;
    selectDuration: string;
    fullName: string;
    fullNamePlaceholder: string;
    countryAndPhone: string;
    searchCountry: string;
    selectedIntNumber: string;
    emailOptional: string;
    emailPlaceholder: string;
    primaryGoal: string;
    goalsList: { id: string; label: string }[];
    trainingExperience: string;
    expList: { id: string; label: string }[];
    confirmBtn: string;
    saving: string;
    guaranteeText: string;
    submittedTitle: string;
    submittedDesc: string;
    closeBtn: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    submittedTitle: string;
    submittedDesc: string;
    closeBtn: string;
    selectCommitment: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    countryPhoneLabel: string;
    searchCountry: string;
    selectedInternational: string;
    emailLabel: string;
    fitnessGoalLabel: string;
    goalFatLoss: string;
    goalMuscleBuilding: string;
    goalBodyRecomposition: string;
    goalStrength: string;
    goalPosture: string;
    experienceLabel: string;
    expBeginner: string;
    expIntermediate: string;
    expAdvanced: string;
    expReturning: string;
    submittingBtn: string;
    confirmBtn: string;
    guarantee: string;
  };
  legal: {
    termsTitle: string;
    privacyTitle: string;
    supportTitle: string;
    closeBtn: string;
    termsContent: string;
    privacyContent: string;
    supportContent: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  ar: {
    nav: {
      about: 'من نحن',
      howTo: 'كيفية الاشتراك',
      memberships: 'الباقات والاشتراكات',
      transformations: 'قصص التحول',
      whyUs: 'قصص التحول',
      contact: 'تواصل معنا',
      joinToday: 'اشترك الآن',
      switchLangTooltip: 'تغيير اللغة إلى English',
      currentLangDisplay: 'English',
    },
    hero: {
      badge: 'تدريب احترافي أونلاين وحضوري',
      mainTitle: 'كوتش مدبولي',
      highlightText: '[ اصنع نسختك الأقوى ]',
      subheadline: 'حوّل جسمك، طوّر التزامك، وأطلق أقصى إمكانياتك مع تدريب وتغذية مخصصة 100% لتحقيق هدفك',
      buttonText: 'اشترك الآن',
      tailoredBadge: 'برامج مخصصة 100%',
      guaranteedBadge: 'نتائج وتطور مضمون',
    },
    about: {
      badge: 'تعرف على مدربك الخاص',
      sectionTitle: 'من هو كوتش مدبولي؟',
      coachName: 'كوتش مدبولي',
      subtitle: 'رياضي محترف ومدرب متخصص في صناعة التحولات الجسدية',
      paragraphs: [
        'بخبرة تزيد عن 10 سنوات في مجال التدريب الرياضي عالي الأداء، ساعد كوتش مدبولي مئات المشتركين في كسر الثبات الجيني، حرق الدهون العنيدة، وبناء أجسام قوية ومتناسقة.',
        'فلسفتي في التدريب قائمة على أسس علمية مدروسة، وتغذية مخصصة بدقة، والتزام ذهني غير مشروط. سواء كنت تبدأ أول خطوة في الجيم أو تستعد لمستوى رياضي متقدم، سنبني معاً خطة مخصصة تلائم نمط حياتك اليومي.',
      ],
      qualificationsTitle: 'المؤهلات والشهادات المعتمدة',
      credentials: [
        'أخصائي معتمد في القوة واللياقة البدنية (CSCS)',
        'أخصائي تغذية رياضية وحساب السعرات والمغذيات الدقيقة',
        'أكثر من 500+ قصة نجاح وتحول جسدي حقيقي موثق',
        'لاعب فيزيك وبناء أجسام ومدرب لياقة بدنية معتمد',
      ],
      stats: [
        { value: '+10', label: 'سنوات خبرة' },
        { value: '+500', label: 'تحول جسدي' },
        { value: '98%', label: 'نسبة النجاح' },
        { value: '24/7', label: 'دعم ومتابعة' },
      ],
      trainBtn: 'تدرّب مع كوتش مدبولي',
      learnHow: 'تعرف على خطوات الاشتراك ↓',
      tagCoach: 'مدرب تحولات بدنية معتمد',
    },
    howTo: {
      badge: '3 خطوات سهلة وسريعة',
      sectionTitle: 'كيفية الاشتراك في التدريب',
      subtitle: 'اتبع هذه الخطوات البسيطة لتبدأ رحلة التحول الخاصة بك اليوم',
      phase: 'المرحلة',
      muted: 'صامت',
      reels: [
        {
          stepNumber: '01',
          title: 'اختر هدفك والباقة المناسبة',
          description: 'اختر مدة الاشتراك المناسبة لهدفك ووقتك للبدء في برنامجك التدريبي المخصص.',
          badge: 'الخطوة 1',
        },
        {
          stepNumber: '02',
          title: 'استلم جدولك المخصص',
          description: 'احصل على جدول تمارينك، خطتك الغذائية، وفيديوهات شرح التكنيك مباشرة على هاتفك.',
          badge: 'الخطوة 2',
        },
        {
          stepNumber: '03',
          title: 'التزم وحقق نتائج مذهلة',
          description: 'متابعة وتقييم أسبوعي مع كوتش مدبولي لتعديل الخطة وضمان وصولك لهدفك بأسرع وقت.',
          badge: 'الخطوة 3',
        },
      ],
      note: 'جميع البرامج مصممة ومخصصة 100% من قِبل كوتش مدبولي بعد ملء استمارة البيانات الأولية.',
      ctaBtn: 'اشترك وابدأ رحلتك الآن',
    },
    plans: {
      badge: 'اختر خطتك التدريبية',
      sectionTitle: 'باقات التدريب والاشتراكات',
      subtitle: 'استثمر في صحتك مع تدريب شخصي مصمم خصيصاً لك لضمان أفضل النتائج والوصول لجسم أحلامك',
      includedTitle: 'ما تتضمنه هذه الباقة:',
      guaranteeTitle: 'ضمان الالتزام 100%:',
      guaranteeText: 'عند التزامك بالخطة المخصصة والمتابعات الأسبوعية، نضمن لك تحقيق أفضل شكل وأداء جسدي ممكن.',
      plans: [
        {
          name: 'باقة البداية',
          duration: 'شهر واحد',
          badgeText: 'للبداية والتعود',
          description: 'مثالية لبداية رحلتك بنظام تدريبي وغذائي مخصص ومدروس لكسر الروتين وبدء التغيير.',
          periodText: 'اشتراك شهري',
          ctaText: 'اشترك لمدة شهر',
          features: [
            'جدول تمارين مخصص (جيم / منزل)',
            'خطة غذائية محسوبة السعرات والماكروز',
            'متابعة وتقييم أسبوعي للنتائج',
            'مكتبة فيديوهات لشرح أداء التمارين',
            'دعم وإجابة على الاستفسارات عبر واتساب',
          ],
        },
        {
          name: 'باقة الاستمرارية والتطوير',
          duration: '3 شهور',
          badgeText: 'الأكثر طلباً',
          description: 'المدة المثالية لبناء كتلة عضلية وحرق الدهون وترسيخ عادات صحية تدوم معك طويلاً.',
          periodText: 'الإجمالي / خصم 25%',
          ctaText: 'اشترك 3 شهور',
          features: [
            'جميع مميزات باقة الشهر',
            'تصحيح تكنيك وأداء التمارين بالفيديو',
            'تعديل السعرات والخطة الغذائية دورياً',
            'تواصل مباشر وسريع عبر واتساب',
            'دليل شامل ومخصص للمكملات الغذائية',
            'جدول متابعة زيادة الأوزان والتطور',
          ],
        },
        {
          name: 'باقة التحول الشامل',
          duration: '6 شهور',
          badgeText: 'أفضل قيمة وتوفير',
          description: 'تغيير جذري كامل في شكل الجسم ونسبة الدهون ومستوى اللياقة والنشاط البدني.',
          periodText: 'الإجمالي / خصم 35%',
          ctaText: 'اشترك 6 شهور',
          features: [
            'جميع مميزات باقة الـ 3 شهور',
            'أولوية التواصل الصوتي 24/7 عبر واتساب',
            'برنامج كارديو متقدم لحرق الدهون',
            'أنظمة تدريبية متطورة لكسر ثبات الوزن',
            'دليل التعامل مع المطاعم وأوقات السفر',
            'تمارين استشفاء وإطالات لحماية المفاصل',
          ],
        },
        {
          name: 'باقة VIP السنوية',
          duration: 'سنة كاملة (12 شهر)',
          badgeText: 'أقصى نتائج وتطور',
          description: 'إشراف ومتابعة خاصة على مدار العام مع كوتش مدبولي للوصول للقمة والحفاظ على النتائج.',
          periodText: 'الإجمالي / أفضل توفير سنوي',
          ctaText: 'اشترك سنة كاملة',
          features: [
            'اشتراك كامل VIP لمدة 365 يوماً',
            'مكالمات فيديو شهرية خاصة لمتابعة الخطة',
            'تعديل وتجديد لا محدود لجدول التمارين',
            'تعديل فوري للوجبات وفق يومك وظروفك',
            'باقة ترحيبية خاصة بالمشتركين VIP',
            'عقد التزام وتحول جسدي مضمون 100%',
          ],
        },
      ],
    },
    transformations: {
      badge: 'قصص ونتائج قبل وبعد • REAL RESULTS',
      sectionTitle: 'قصص ونتائج التحول الحقيقية',
      subtitle: 'شاهد التغييرات المذهلة للأبطال الذين التزموا بخطط وبرامج كوتش مدبولي المخصصة وحققوا نتائج قياسية',
      ctaBtn: 'ابدأ قصة تحولك الآن مع كوتش مدبولي',
      verified: 'نتيجة حقيقية وموثقة',
      timeline: 'المدة الزمنية',
      result: 'النتيجة المحققة',
      hoverHint: 'مرر الماوس أو المس البطاقة لإيقاف الحركة والقراءة بالتفصيل',
    },
    choices: {
      badge: 'معادلة النجاح والتطور',
      sectionTitle: 'اصنع خيارات أكثر صحة',
      subtitle: 'الركائز الثلاث للتميز الجسدي والذهني الدائم مع كوتش مدبولي',
      pillar: 'الركيزة الأساسية',
      features: [
        {
          title: 'جدول تمارين مصمم خصيصاً لك',
          description: 'كل تمرين وعدد مجموعات وفترات راحة محسوبة بدقة بناءً على بنيتك الجسدية ومستواك وهدفك الرياضي.',
        },
        {
          title: 'نظام غذائي مرن ومستدام',
          description: 'بدون حرمان أو دايت قاسي. تناول أطعمة لذيذة محسوبة السعرات بدقة لتسريع حرق الدهون وبناء العضلات.',
        },
        {
          title: 'متابعة وتواصل مستمر 24/7',
          description: 'تواصل مباشر مع كوتش مدبولي لتصحيح الأداء وتجاوز التحديات والبقاء على أعلى درجات الالتزام يومياً.',
        },
      ],
      ctaBtn: 'ابدأ حياة أكثر صحة وقوة اليوم',
    },
    contact: {
      badge: 'استفسار وتواصل مباشر',
      sectionTitle: 'تواصل مع كوتش مدبولي',
      subtitle: 'ابدأ رحلة تحولك الآن - تواصل مباشرة عبر واتساب أو شبكات التواصل الاجتماعي',
      socialTitle: 'تابع وتواصل عبر شبكات التواصل الاجتماعي',
      formTitle: 'طلب استشارة وانضمام سريع',
      formSubtitle: 'أرسل بياناتك وسيتواصل معك كوتش مدبولي لتقييم حالتك والرد على استفساراتك فوراً.',
      nameLabel: 'الاسم بالكامل *',
      namePlaceholder: 'مثال: المتدرب (الاسم الأول والأخير)',
      phoneLabel: 'رقم الهاتف / واتساب *',
      phonePlaceholder: '+20 100 000 0000',
      goalLabel: 'هدفك الأساسي من التدريب',
      goals: [
        'حرق الدهون ونحت الجسم',
        'بناء وزيادة الكتلة العضلية (تضخيم عضلي صافي)',
        'إعادة تشكيل الجسم (Body Recomposition)',
        'زيادة القوة واللياقة البدنية العامة',
        'التحضير لبطولة أو مناسبة خاصة',
        'تحسين الصحة العامة وتعديل القوام وعلاج آلام الظهر',
      ],
      notesLabel: 'ملاحظات إضافية أو إصابات سابقة (اختياري)',
      notesPlaceholder: 'اكتب لكوتش مدبولي عن خبرتك التدريبية السابقة أو أي تفاصيل ترغب بمشاركتها...',
      submitBtn: 'إرسال والتواصل عبر واتساب',
      successTitle: 'تم إرسال طلبك بنجاح!',
      successDesc: 'جاري فتح محادثة واتساب مع كوتش مدبولي. سيتم الرد عليك في أسرع وقت!',
      sendAnother: 'إرسال استفسار آخر',
      socialButtons: {
        facebook: 'فيسبوك',
        tiktok: 'تيك توك',
        instagram: 'إنستغرام',
        whatsapp: 'محادثة واتساب',
        youtube: 'يوتيوب',
      },
    },
    footer: {
      brandName: 'كوتش مدبولي',
      tagline: 'غيّر جسمك. ارتقِ بطاقتك وتفكيرك.',
      terms: 'الشروط والأحكام',
      privacy: 'سياسة الخصوصية',
      support: 'خدمة العملاء والمساعدة',
      copyright: `© ${new Date().getFullYear()} كوتش مدبولي للياقة البدنية. جميع الحقوق محفوظة.`,
      backToTop: 'العودة للأعلى',
    },
    modal: {
      title: 'الانضمام لبرنامج التدريب',
      subtitle: 'إشراف ومتابعة مباشرة مع كوتش مدبولي',
      selectDuration: 'اختر مدة اشتراكك التدريبي:',
      fullName: 'اسمك بالكامل *',
      fullNamePlaceholder: 'مثال: المتدرب (الاسم الأول والأخير)',
      countryAndPhone: 'الدولة ورقم الواتساب *',
      searchCountry: 'ابحث عن الدولة أو كود الاتصال...',
      selectedIntNumber: 'الرقم الدولي المحدد:',
      emailOptional: 'البريد الإلكتروني (اختياري)',
      emailPlaceholder: 'name@example.com',
      primaryGoal: 'الهدف الرياضي الأساسي',
      goalsList: [
        { id: 'Fat Loss & Shredding', label: 'حرق الدهون ونحت القوام' },
        { id: 'Muscle Building & Hypertrophy', label: 'بناء وزيادة الكتلة العضلية' },
        { id: 'Body Recomposition', label: 'إعادة تشكيل الجسم (خسارة دهون وبناء عضل معاً)' },
        { id: 'Strength & Athletic Performance', label: 'زيادة القوة والأداء الرياضي' },
        { id: 'Posture & Injury Recovery', label: 'تحسين القوام والاستشفاء من الإصابات' },
      ],
      trainingExperience: 'الخبرة التدريبية السابقة',
      expList: [
        { id: 'Beginner (< 1 year)', label: 'مبتدئ (أقل من سنة)' },
        { id: 'Intermediate (1-3 years)', label: 'متوسط (1 إلى 3 سنوات)' },
        { id: 'Advanced (3+ years)', label: 'متقدم (أكثر من 3 سنوات)' },
        { id: 'Returning after a break', label: 'عائد للتمرين بعد انقطاع' },
      ],
      confirmBtn: 'تأكيد التسجيل والمتابعة عبر واتساب',
      saving: 'جاري حفظ بياناتك...',
      guaranteeText: 'بدء سريع خلال 24 ساعة. بياناتك مسجلة ومحفوظة مباشرة لدى الكوتش.',
      submittedTitle: 'تم تسجيل طلبك بنجاح!',
      submittedDesc: 'تم حفظ بيانات اشتراكك في النظام وتحويلك مباشرة إلى محادثة واتساب مع كوتش مدبولي.',
      closeBtn: 'إغلاق',
    },
    checkout: {
      title: 'الانضمام لبرنامج التدريب',
      subtitle: 'إشراف ومتابعة مباشرة مع كوتش مدبولي',
      submittedTitle: 'تم تسجيل طلبك بنجاح!',
      submittedDesc: 'تم حفظ بيانات اشتراكك في النظام وتحويلك مباشرة إلى محادثة واتساب مع كوتش مدبولي',
      closeBtn: 'إغلاق',
      selectCommitment: 'اختر مدة اشتراكك التدريبي:',
      fullNameLabel: 'اسمك بالكامل *',
      fullNamePlaceholder: 'مثال: المتدرب (الاسم الأول والأخير)',
      countryPhoneLabel: 'الدولة ورقم الواتساب *',
      searchCountry: 'ابحث عن الدولة أو كود الاتصال...',
      selectedInternational: 'الرقم الدولي المحدد',
      emailLabel: 'البريد الإلكتروني (اختياري)',
      fitnessGoalLabel: 'الهدف الرياضي الأساسي',
      goalFatLoss: 'حرق الدهون ونحت القوام',
      goalMuscleBuilding: 'بناء وزيادة الكتلة العضلية',
      goalBodyRecomposition: 'إعادة تشكيل الجسم (خسارة دهون وبناء عضل معاً)',
      goalStrength: 'زيادة القوة والأداء الرياضي',
      goalPosture: 'تحسين القوام والاستشفاء من الإصابات',
      experienceLabel: 'الخبرة التدريبية السابقة',
      expBeginner: 'مبتدئ (أقل من سنة)',
      expIntermediate: 'متوسط (1 إلى 3 سنوات)',
      expAdvanced: 'متقدم (أكثر من 3 سنوات)',
      expReturning: 'عائد للتمرين بعد انقطاع',
      submittingBtn: 'جاري حفظ بياناتك...',
      confirmBtn: 'تأكيد التسجيل والمتابعة عبر واتساب',
      guarantee: 'بدء سريع خلال 24 ساعة. بياناتك مسجلة ومحفوظة مباشرة لدى الكوتش.',
    },
    legal: {
      termsTitle: 'الشروط والأحكام - تدريب كوتش مدبولي',
      privacyTitle: 'سياسة الخصوصية وسرية البيانات',
      supportTitle: 'خدمة العملاء والدعم الفني',
      closeBtn: 'إغلاق',
      termsContent: `الشروط والأحكام - تدريب كوتش مدبولي

1. خدمات التدريب:
يقدم كوتش مدبولي برامج تدريب وتغذية مخصصة عبر الإنترنت وإشراف تدريبي مباشر. جميع البرامج والأنظمة مصممة لتلائم الأفراد الأصحاء ويتم تطبيقها تحت المسؤولية الشخصية للمشترك.

2. الفحص الطبي والصحي:
يُنصح جميع المشتركين باستشارة الطبيب المختص قبل البدء في أي نشاط بدني مكثف أو حمية غذائية جديدة للتأكد من ملاءمتها لحالتهم الصحية.

3. الاشتراكات والدفع:
يتم سداد رسوم الباقات مقدماً للمدة المختارة (شهر، 3 شهور، 6 شهور، أو سنة). يتم إعداد وإرسال البرامج المخصصة خلال 24 إلى 48 ساعة من تاريخ استلام استمارة البيانات الأولية.

4. سياسة الإلغاء والاسترجاع:
نظراً لطبيعة البرامج الرقمية والخطط المفصلة والمخصصة لكل متدرب بشكل فردي، فإن الرسوم غير قابلة للاسترداد بعد تصميم وتسليم الخطة.

5. المتابعة والالتزام:
يلتزم المشترك بإرسال تقارير المتابعة والصور الدورية في المواعيد المحددة لضمان التطور المستمر والحصول على أفضل نتيجة ممكنة.`,
      privacyContent: `سياسة الخصوصية - كوتش مدبولي للياقة البدنية

1. البيانات التي نجمعها:
نقوم بجمع البيانات الضرورية فقط لتصميم برامجك التدريبية والغذائية، وتشمل: الاسم، رقم الهاتف، العمر، الوزن، الطول، التاريخ التدريبي، والأهداف الصحية.

2. سرية الصور والبيانات:
جميع صور التطور والقياسات والبيانات الشخصية تُعامل بأقصى درجات السرية التامة ولن يتم نشرها أو مشاركتها بأي شكل من الأشكال إلا بعد الحصول على موافقة خطية صريحة من المشترك.

3. حماية البيانات:
نستخدم أحدث تقنيات التشفير السحابية الآمنة لضمان حماية بيانات العملاء ومعلوماتهم على الدوام.`,
      supportContent: `خدمة العملاء والدعم الفني

هل تحتاج لمساعدة في اشتراكك أو لديك استفسار لكوتش مدبولي؟

- واتساب المباشر: التواصل الفوري مع فريق التدريب
- أوقات العمل: من السبت إلى الخميس: 9:00 صباحاً - 9:00 مساءً
- سرعة الاستجابة: الرد على الرسائل خلال بضع ساعات
- مواعيد التقييم الأسبوعي: يتم إرسال التحديثات واستلام الجداول الجديدة في المواعيد المتفق عليها دورياً.`,
    },
  },
  en: {
    nav: {
      about: 'ABOUT',
      howTo: 'HOW TO SUBSCRIBE',
      memberships: 'MEMBERSHIPS',
      transformations: 'TRANSFORMATIONS',
      whyUs: 'TRANSFORMATIONS',
      contact: 'CONTACT',
      joinToday: 'JOIN TODAY',
      switchLangTooltip: 'Switch language to العربية',
      currentLangDisplay: 'العربية',
    },
    hero: {
      badge: 'ELITE ONLINE & IN-PERSON COACHING',
      mainTitle: 'COACH MATBOLY',
      highlightText: '[ BE YOURSELF ]',
      subheadline: 'TRANSFORM YOUR PHYSIQUE, ELEVATE YOUR DISCIPLINE, UNLEASH YOUR TRUE POTENTIAL WITH 100% CUSTOMIZED PROTOCOLS',
      buttonText: 'JOIN TODAY',
      tailoredBadge: '100% Tailored Plans',
      guaranteedBadge: 'Guaranteed Progress',
    },
    about: {
      badge: 'MEET YOUR HEAD COACH',
      sectionTitle: 'WHO IS COACH MATBOLY',
      coachName: 'Coach Matboly',
      subtitle: 'PROFESSIONAL FITNESS ATHLETE & MASTER TRANSFORMATION COACH',
      paragraphs: [
        'With over a decade of high-performance coaching experience, Coach Matboly has helped hundreds of dedicated individuals break through genetic plateaus, shed stubborn fat, and build sculpted, functional physiques.',
        'My coaching philosophy is rooted in science-backed training protocols, individualized nutritional precision, and uncompromising mental discipline. Whether you are stepping into the gym for the first time or preparing for peak athletic conditioning, we build a tailored roadmap designed exclusively for your lifestyle.',
      ],
      qualificationsTitle: 'QUALIFICATIONS & SPECIALIZATIONS',
      credentials: [
        'Certified Strength & Conditioning Specialist (CSCS)',
        'Advanced Sports Nutrition & Macronutrient Specialist',
        'Over 500+ Documented Client Body Transformations',
        'Former Competitive Physique Athlete & Trainer',
      ],
      stats: [
        { value: '10+', label: 'Years Coaching' },
        { value: '500+', label: 'Transformations' },
        { value: '98%', label: 'Success Rate' },
        { value: '24/7', label: 'Direct Support' },
      ],
      trainBtn: 'TRAIN WITH MATBOLY',
      learnHow: 'Learn How The Subscription Works ↓',
      tagCoach: 'ELITE TRANSFORMATION COACH',
    },
    howTo: {
      badge: 'SEAMLESS 3-STEP PROCESS',
      sectionTitle: 'HOW TO SUBSCRIBE',
      subtitle: 'FOLLOW THESE 3 SIMPLE STEPS TO START YOUR PERSONALIZED JOURNEY TODAY',
      phase: 'PHASE',
      muted: 'MUTED',
      reels: [
        {
          stepNumber: '01',
          title: 'SELECT YOUR GOAL & PLAN',
          description: 'Choose your desired membership tier that matches your timeline and personal fitness aspirations.',
          badge: 'STEP 1',
        },
        {
          stepNumber: '02',
          title: 'RECEIVE CUSTOM PROTOCOL',
          description: 'Get your customized training split, macro targets, and form video guides directly on your phone.',
          badge: 'STEP 2',
        },
        {
          stepNumber: '03',
          title: 'EXECUTE & TRANSFORM',
          description: 'Track weekly check-ins with Coach Matboly, adjust metrics in real-time, and guarantee results.',
          badge: 'STEP 3',
        },
      ],
      note: 'All programs are 100% personalized by Coach Matboly after submitting your onboarding intake.',
      ctaBtn: 'START YOUR SUBSCRIPTION NOW',
    },
    plans: {
      badge: 'CHOOSE YOUR COMMITMENT',
      sectionTitle: 'MEMBERSHIP PLANS',
      subtitle: 'INVEST IN YOUR HEALTH AND GET TAILORED COACHING DESIGNED FOR GUARANTEED RESULTS',
      includedTitle: 'INCLUDED IN THIS PROTOCOL:',
      guaranteeTitle: '100% Commitment Guarantee:',
      guaranteeText: 'If you follow your customized protocol and attend weekly check-ins, you are guaranteed to reach your target body composition.',
      plans: [
        {
          name: 'STARTER PASS',
          duration: '1 MONTH',
          badgeText: 'GETTING STARTED',
          description: 'Ideal for kickstarting your routine with customized workout splits and nutrition guidelines.',
          periodText: 'Per Month / Billed Monthly',
          ctaText: 'START 1 MONTH',
          features: [
            'Personalized Workout Split (Gym/Home)',
            'Customized Macronutrient Targets',
            'Weekly Email Progress Check-ins',
            'Exercise Video Demonstration Library',
            'Private WhatsApp Support & Q&A',
          ],
        },
        {
          name: 'MOMENTUM BUILDER',
          duration: '3 MONTHS',
          badgeText: 'MOST POPULAR',
          description: 'The optimal timeframe to build sustainable muscle mass, shed body fat, and create permanent habits.',
          periodText: 'Total / Save 25%',
          ctaText: 'JOIN 3 MONTHS',
          features: [
            'Everything in Starter Pass',
            'Weekly 1-on-1 Video Form Assessment',
            'Bi-Weekly Nutrition & Calorie Tweaks',
            'Direct WhatsApp Messaging Access',
            'Supplementation Protocol & Guide',
            'Progressive Overload Tracking Sheet',
          ],
        },
        {
          name: 'TOTAL TRANSFORMATION',
          duration: '6 MONTHS',
          badgeText: 'BEST VALUE',
          description: 'A complete physical overhaul for those serious about dramatic aesthetic and athletic results.',
          periodText: 'Total / Save 35%',
          ctaText: 'JOIN 6 MONTHS',
          features: [
            'Everything in Momentum Plan',
            'Priority 24/7 WhatsApp Voice Support',
            'Dynamic Cardio & Conditioning Split',
            'Plateau-Busting Periodization Blocks',
            'Travel & Restaurant Dining Cheat Sheets',
            'Personalized Mobility & Recovery Routine',
          ],
        },
        {
          name: 'ELITE VIP YEAR',
          duration: '12 MONTHS',
          badgeText: 'MAXIMUM GAINS',
          description: 'Year-round elite mentorship with Coach Matboly. Total body recomposition and peak performance.',
          periodText: 'Total / Best Long-term Deal',
          ctaText: 'JOIN 12 MONTHS',
          features: [
            'Full 365-Day Complete VIP Access',
            '1-on-1 Monthly Strategy Zoom Calls',
            'Unlimited Workout Plan Revisions',
            'Real-Time Meal Adjustments & Coaching',
            'Exclusive VIP Merch Welcome Pack',
            'Guaranteed Results Transformation Contract',
          ],
        },
      ],
    },
    transformations: {
      badge: 'PROVEN CLIENT RESULTS • BEFORE & AFTER',
      sectionTitle: 'REAL CLIENT TRANSFORMATIONS',
      subtitle: 'EXPLORE THE REMARKABLE RESULTS OF DEDICATED ATHLETES WHO COMMITTED TO COACH MATBOLY CUSTOM PROTOCOLS',
      ctaBtn: 'START YOUR TRANSFORMATION WITH COACH MATBOLY',
      verified: 'Verified Transformation',
      timeline: 'Timeline',
      result: 'Result',
      hoverHint: 'Hover or touch any card to pause animation and view details',
    },
    choices: {
      badge: 'THE WINNING FORMULA',
      sectionTitle: 'MAKE HEALTHIER CHOICES',
      subtitle: 'THE THREE PILLARS OF LIFELONG PHYSICAL AND MENTAL EXCELLENCE',
      pillar: 'CORE PILLAR',
      features: [
        {
          title: 'CUSTOMIZED WORKOUT REGIMEN',
          description: 'Every rep, set, tempo, and rest period is calibrated to your biomechanics, training age, and target goals.',
        },
        {
          title: 'SUSTAINABLE NUTRITION PROTOCOL',
          description: 'No starving, no extreme bland diets. Enjoy delicious foods calculated precisely for your metabolism and body fat loss.',
        },
        {
          title: '24/7 ACCOUNTABILITY & COACHING',
          description: 'Direct access to Coach Matboly to eliminate guesswork, fix technique mistakes, and keep you disciplined every single day.',
        },
      ],
      ctaBtn: 'START LIVING HEALTHIER TODAY',
    },
    contact: {
      badge: 'DIRECT COACHING INQUIRY',
      sectionTitle: 'GET IN TOUCH TODAY',
      subtitle: 'START YOUR TRANSFORMATION WITH COACH MATBOLY - REACH OUT DIRECTLY VIA WHATSAPP OR SOCIALS',
      socialTitle: 'CONNECT DIRECTLY ON SOCIAL MEDIA',
      formTitle: 'REQUEST FAST INTAKE & CONSULTATION',
      formSubtitle: 'Send your fitness details directly to Coach Matboly for instant assessment.',
      nameLabel: 'Your Full Name *',
      namePlaceholder: 'e.g. Alex Morgan',
      phoneLabel: 'Phone / WhatsApp *',
      phonePlaceholder: '+1 (555) 000-0000',
      goalLabel: 'Primary Transformation Goal',
      goals: [
        'Fat Loss & Muscle Toning',
        'Hypertrophy & Muscle Mass Building',
        'Body Recomposition',
        'Strength & Athletic Conditioning',
        'Competition / Event Prep',
        'General Health & Posture Fix',
      ],
      notesLabel: 'Brief Note / Injuries / Current Routine (Optional)',
      notesPlaceholder: 'Tell Coach Matboly about your training background or targets...',
      submitBtn: 'SUBMIT & CHAT DIRECTLY',
      successTitle: 'INQUIRY SENT SUCCESSFULLY',
      successDesc: 'Opening WhatsApp chat with Coach Matboly. We will reply within a few hours!',
      sendAnother: 'Send another message',
      socialButtons: {
        facebook: 'FACEBOOK',
        tiktok: 'TIKTOK',
        instagram: 'INSTAGRAM',
        whatsapp: 'CHAT ON WHATSAPP',
        youtube: 'YOUTUBE',
      },
    },
    footer: {
      brandName: 'COACH MATBOLY',
      tagline: 'TRANSFORM YOUR BODY. ELEVATE YOUR MIND.',
      terms: 'TERMS & CONDITIONS',
      privacy: 'PRIVACY POLICY',
      support: 'CLIENT SUPPORT',
      copyright: `© ${new Date().getFullYear()} COACH MATBOLY FITNESS. ALL RIGHTS RESERVED.`,
      backToTop: 'Back to Top',
    },
    modal: {
      title: 'JOIN COACHING PROGRAM',
      subtitle: 'Direct Mentorship with Coach Matboly',
      selectDuration: 'Select Your Commitment Duration:',
      fullName: 'Your Full Name *',
      fullNamePlaceholder: 'e.g. John Smith',
      countryAndPhone: 'Country & WhatsApp / Phone Number *',
      searchCountry: 'Search country...',
      selectedIntNumber: 'Selected International Number:',
      emailOptional: 'Email Address (Optional)',
      emailPlaceholder: 'john@example.com',
      primaryGoal: 'Primary Fitness Goal',
      goalsList: [
        { id: 'Fat Loss & Shredding', label: 'Fat Loss & Shredding' },
        { id: 'Muscle Building & Hypertrophy', label: 'Muscle Building & Hypertrophy' },
        { id: 'Body Recomposition', label: 'Body Recomposition' },
        { id: 'Strength & Athletic Performance', label: 'Strength & Athletic Performance' },
        { id: 'Posture & Injury Recovery', label: 'Posture & Injury Recovery' },
      ],
      trainingExperience: 'Training Experience',
      expList: [
        { id: 'Beginner (< 1 year)', label: 'Beginner (< 1 year)' },
        { id: 'Intermediate (1-3 years)', label: 'Intermediate (1-3 years)' },
        { id: 'Advanced (3+ years)', label: 'Advanced (3+ years)' },
        { id: 'Returning after a break', label: 'Returning after a break' },
      ],
      confirmBtn: 'CONFIRM & START ON WHATSAPP',
      saving: 'SAVING REGISTRATION...',
      guaranteeText: 'Fast onboarding within 24 hours. Data saved directly in coach system.',
      submittedTitle: 'REGISTRATION SUBMITTED!',
      submittedDesc: 'Your registration has been saved in the system and redirected to WhatsApp.',
      closeBtn: 'CLOSE',
    },
    checkout: {
      title: 'JOIN COACHING PROGRAM',
      subtitle: 'Direct Mentorship with Coach Matboly',
      submittedTitle: 'REGISTRATION SUBMITTED!',
      submittedDesc: 'Your registration has been saved in the system and redirected to WhatsApp with Coach Matboly',
      closeBtn: 'CLOSE',
      selectCommitment: 'Select Your Commitment Duration:',
      fullNameLabel: 'Your Full Name *',
      fullNamePlaceholder: 'e.g. John Smith',
      countryPhoneLabel: 'Country & WhatsApp / Phone Number *',
      searchCountry: 'Search country...',
      selectedInternational: 'Selected International Number',
      emailLabel: 'Email Address (Optional)',
      fitnessGoalLabel: 'Primary Fitness Goal',
      goalFatLoss: 'Fat Loss & Shredding',
      goalMuscleBuilding: 'Muscle Building & Hypertrophy',
      goalBodyRecomposition: 'Body Recomposition',
      goalStrength: 'Strength & Athletic Performance',
      goalPosture: 'Posture & Injury Recovery',
      experienceLabel: 'Training Experience',
      expBeginner: 'Beginner (< 1 year)',
      expIntermediate: 'Intermediate (1-3 years)',
      expAdvanced: 'Advanced (3+ years)',
      expReturning: 'Returning after a break',
      submittingBtn: 'SAVING REGISTRATION...',
      confirmBtn: 'CONFIRM & START ON WHATSAPP',
      guarantee: 'Fast onboarding within 24 hours. Data saved directly in coach system.',
    },
    legal: {
      termsTitle: 'TERMS & CONDITIONS - COACH MATBOLY FITNESS',
      privacyTitle: 'PRIVACY POLICY - COACH MATBOLY FITNESS',
      supportTitle: 'CLIENT SUPPORT & HELP',
      closeBtn: 'CLOSE',
      termsContent: `TERMS & CONDITIONS - COACH MATBOLY FITNESS COACHING

1. COACHING SERVICES
Coach Matboly provides customized online training, nutritional guidance, and direct coaching. All workout and dietary recommendations are designed for healthy individuals and should be followed under personal responsibility.

2. HEALTH & MEDICAL CLEARANCE
Before starting any physical exercise or nutrition program, clients are strongly advised to consult with a qualified medical professional. Coach Matboly does not provide medical diagnoses or treatment.

3. SUBSCRIPTION & PAYMENTS
All membership plans are paid upfront for the designated duration (1, 3, 6, or 12 months). Upon successful payment, customized programs are delivered within 24 to 48 hours following the onboarding assessment.

4. CANCELLATION & REFUND POLICY
Due to the digital and custom nature of personalized training and nutritional programs, fees are non-refundable once the customized plan has been generated and delivered.

5. CLIENT CONDUCT & COMMUNICATION
Clients are expected to uphold respectful communication during weekly check-ins and WhatsApp interactions. Dedicated coaching support is provided in accordance with the purchased tier.`,
      privacyContent: `PRIVACY POLICY - COACH MATBOLY FITNESS

1. INFORMATION WE COLLECT
We collect personal information necessary to design your custom fitness plans, including your name, contact details, age, body weight, fitness history, and dietary preferences.

2. HOW WE USE YOUR INFORMATION
Your personal data is used solely to:
- Deliver customized workout and meal plans
- Conduct weekly check-ins and progress assessments
- Provide customer support and program updates

3. DATA SECURITY & CONFIDENTIALITY
All client check-in photos, measurements, and personal data are kept strictly confidential and will never be shared, sold, or publicly displayed without your explicit written consent.

4. COOKIES & LOCAL STORAGE
This website uses local browser storage to remember your user preferences and dashboard settings.`,
      supportContent: `SUPPORT & CLIENT ASSISTANCE

Need help with your subscription or have questions for Coach Matboly?

- WHATSAPP: Direct fast response via WhatsApp
- EMAIL: support@coachmatboly.com
- RESPONSE TIME: Within 24 Hours on Business Days
- WORKING HOURS: Saturday - Thursday: 9:00 AM - 9:00 PM

Check-in Schedule:
- Weekly check-in forms are submitted every week.
- Program updates and coaching video reviews are returned within 24-48 hours.`,
    },
  },
};

export const OFFICIAL_LOGO_URL = 'https://i.postimg.cc/8zSB2bV3/1000243021-removebg-preview.png';
