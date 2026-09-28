// Competition Data Repository
const competitionsData = [
    {
        id: "iasc-2026",
        rank: 1,
        title: "International AI Startup Challenge 2026–27",
        category: "AI & Startup Competition",
        badge: "🥇 الخيار الأول (Top Choice)",
        isFree: true,
        feeText: "مجاني 100%",
        isSolo: true,
        soloText: "مسموح Solo 👤 أو Team (13–18 سنة)",
        isEgypt: false,
        regDeadline: "2026-11-01T23:59:59",
        regDeadlineText: "1 نوفمبر 2026 (التسجيل مفتوح الآن)",
        buildPhaseText: "2 نوفمبر – 20 ديسمبر 2026 (7 أسابيع لبناء المشروع)",
        judgingText: "22 ديسمبر 2026 – 20 يناير 2027",
        emailTimeline: "الإيميل الأول فور التسجيل | النتيجة والنهائيات عبر الإيميل: 22 يناير 2027",
        regUrl: "https://www.joiniasc.org/?utm_source=chatgpt.com",
        matchingScore: 98,
        
        evaluationCriteria: [
            "أهمية المشكلة — 20%",
            "الابتكار والحل الذكي — 20%",
            "تطبيق الـ AI الحقيقي — 20%",
            "جودة المنتج والـ UX/UI — 15%",
            "الإمكانية التجارية والسوق — 15%",
            "العرض التقديمي (Pitch) — 10%"
        ],

        taskSummary: "المسابقة تطلب تقديم مشروع شركة ناشئة قائمة على الذكاء الاصطناعي (AI-powered Startup) تتناول مشكلة حقيقية في مجالات مثل المناخ والطاقة والتكنولوجيا الذكية والسلامة. يتطلب تقديم Pitch Deck ومجسم/نموذج أولي عملي للمنتج.",

        novaStrategy: "🔥 التحويل الذكي: بدل ما نقدم NOVA Home كمجرد Smart Home مع ESP32 وموقع، نحول الفكرة إلى: 'NOVA AI: Autonomous Household Energy & Climate Intelligence Platform' — منصة ذكاء اصطناعي تتعلم نمط حياة الأسرة يومياً، وتتنبأ بالاستهلاك، وتوصي وتتحكم ذاتياً في أجهزة التدفئة والتكييف والإضاءة لتوفير حتى 30% من الطاقة وتحسين الراحة. والدخول الفردي Solo يبعدك عن الاعتماد على أي فريق قديم!",

        tasks: [
            { id: "iasc-1", label: "التسجيل في الموقع الرسمي لحجز المقعد قبل 1 نوفمبر" },
            { id: "iasc-2", label: "صياغة فكرة NOVA Home كـ AI Startup بدلاً من مجرد Hardware Project" },
            { id: "iasc-3", label: "إعداد نموذج Predictive ML (محاكاة بيانات الحرارة والاستهلاك والوجود)" },
            { id: "iasc-4", label: "تجهيز Pitch Deck احترافي 10 سلايدات يشرح الجانب التجاري والابتكار" },
            { id: "iasc-5", label: "تسجيل فيديو توضيحي (3 دقائق) يعرض الموقع والـ AI Dashboard" }
        ]
    },
    {
        id: "stogo-2026",
        rank: 2,
        title: "STOGO Fest 2026–27 (International STEAM Festival)",
        category: "STEAM & Technology Festival",
        badge: "🌍 عالية الإمكانية (High Potential)",
        isFree: true,
        feeText: "المرحلة الأولى مجاناً (رسم رمزي 100 AED للنهائيات الدولية فقط)",
        isSolo: true,
        soloText: "مفتوحة للطلاب فردي / فرق (Grades 7–12)",
        isEgypt: false,
        regDeadline: "2026-11-30T23:59:59",
        regDeadlineText: "30 نوفمبر 2026 (تسليم Abstract + Video)",
        buildPhaseText: "من الآن حتى 30 نوفمبر (إعداد الملخص والفيديو)",
        judgingText: "ديسمبر 2026 | الحدث الرئيسي: 14 يناير 2027",
        emailTimeline: "إيميل قبول الملخص: أول ديسمبر 2026 | تفاصيل النهائيات: منتصف ديسمبر 2026",
        regUrl: "https://stogofest.com/",
        matchingScore: 92,

        evaluationCriteria: [
            "تطبيق مفاهيم STEM — 25%",
            "الابتكار البرمجي والذكاء الاصطناعي — 25%",
            "جودة تصميم الواجهة والـ Dashboard — 25%",
            "العرض والفيديو التوضيحي — 25%"
        ],

        taskSummary: "مهرجان عالمي في مجال الـ STEAM يتضمن مسارات متعددة مثل STEM Projects, AI / Coding, Web Development. يتطلب التقديم رفع ملخص البحث (Abstract) وفيديو تشغيلي للمشروع.",

        novaStrategy: "🎯 استغلال الواجهات الرائعة: دي فرصة ذهبية لأننا أصلًا عملنا موقع وUI احترافي جداً لـ NOVA Home. تقدر ترفع المشروع تحت مسار 'STEM Projects' أو مسار 'AI / Coding + Web Development'. استخدم صور الموقع المباشرة، مخططات الـ System Architecture، والفيديو التشغيلي بدون ما تضيع أي مجهود سابق!",

        tasks: [
            { id: "stogo-1", label: "كتابة الـ Project Abstract بخطوات الـ STEM وتوضيح دور الذكاء الاصطناعي" },
            { id: "stogo-2", label: "التقاط صور عالية الجودة للـ UI والـ Web Dashboard الخاصة بـ NOVA Home" },
            { id: "stogo-3", label: "تسجيل فيديو 3 دقائق يشرح الربط بين ESP32 وواجهة الموقع والـ ML" },
            { id: "stogo-4", label: "رفع Abstract + الفيديو قبل يوم 30 نوفمبر 2026" }
        ]
    },
    {
        id: "nhs-bigdata-2026",
        rank: 3,
        title: "National High School Big Data & AI Challenge",
        category: "Data Science & Predictive AI",
        badge: "🧠 أفضل مسابقة علوم بيانات (Best Data Science)",
        isFree: true,
        feeText: "مجاني 100%",
        isSolo: true,
        soloText: "مسموح بالتقديم الفردي (High School Students)",
        isEgypt: false,
        regDeadline: "2026-10-18T23:59:59",
        regDeadlineText: "18 أكتوبر 2026 (بدأ التسجيل 1 سبتمبر)",
        buildPhaseText: "19 أكتوبر – 25 نوفمبر 2026 (مرحلة تحليل البيانات والبناء)",
        judgingText: "ديسمبر 2026",
        emailTimeline: "إيميل تأكيد التسجيل: خلال 48 ساعة | إيميل البيانات والورش: أواخر أكتوبر 2026 | النتيجة: منتصف ديسمبر",
        regUrl: "https://stemfellowship.org/",
        matchingScore: 88,

        evaluationCriteria: [
            "طرق تحليل البيانات الكبيرة (Big Data Methods) — 30%",
            "دقة نماذج التنبؤ وتطبيق الـ AI — 30%",
            "جودة البحث والـ Data Visualization — 25%",
            "التوثيق والاستنتاجات العمليّة — 15%"
        ],

        taskSummary: "مسابقة تركز على علوم البيانات، التنبؤ، وحل المشكلات الواقعية باستخدام Open Data والذكاء الاصطناعي بدلاً من الـ Hardware.",

        novaStrategy: "📊 تحويل المشروع إلى Data Science Pipeline: هنحول NOVA Home إلى بحث ونموذج ذكاء اصطناعي باسم: 'AI-Based Smart Home Energy & Occupancy Prediction'. نستخدم Dataset (أو محاكاة بيانات حقيقية): Temperature → Occupancy → Light Usage → Fan Usage → Power Consumption، ونطبق عليها algorithms زي XGBoost أو Random Forest لتنبؤ الاستهلاك وإظهار الرسم البياني!",

        tasks: [
            { id: "nhs-1", label: "التسجيل السريع في المسابقة قبل إغلاق الاستمارة في 18 أكتوبر" },
            { id: "nhs-2", label: "تجهيز أو تحميل Dataset الخاصة بالحرارة والاستهلاك والوجود بالمنزل" },
            { id: "nhs-3", label: "كتابة سكريبت Python لتدريب نموذج ML وتوليد Data Visualizations" },
            { id: "nhs-4", label: "إعداد التقرير النهائي (Research Poster / Data Science Paper)" }
        ]
    },
    {
        id: "arab-iot-2026",
        rank: 4,
        title: "Arab IoT & AI Challenge — Egypt",
        category: "IoT & AI Regional Challenge",
        badge: "🏠 التخصص الأدق ومصر (Under Monitoring)",
        isFree: true,
        feeText: "مجاني 100% (شامل دعم الدعم الفني وتوصيل الأجهزة/Kits)",
        isSolo: false,
        soloText: "مسار High School (STEM Projects) — عادة فرق صغيرة",
        isEgypt: true,
        regDeadline: "2026-12-31T23:59:59",
        regDeadlineText: "تحت المراقبة (بانتظار إعلان مواعيد موسم 2026–27 الرسمي في مصر)",
        buildPhaseText: "تشمل Ideation, Mentorship, Hackathon, Fabrication & Kit Delivery",
        judgingText: "Demo Day في مصر والنهائيات على مستوى الوطن العربي",
        emailTimeline: "إيميل القبول المبدئي بعد إغلاق التقديم | إيميل جدول الجلسات التوجيهية (Mentorship)",
        regUrl: "https://egypt.arabiotai.org/?utm_source=chatgpt.com",
        matchingScore: 85,

        evaluationCriteria: [
            "تكامل الـ IoT مع الـ AI — 35%",
            "القيمة التطبيقية في الـ Smart Homes — 25%",
            "النموذج الأولي الفعلي (Prototype) — 25%",
            "العرض أمام لجنة التحكيم (Demo Day) — 15%"
        ],

        taskSummary: "المسابقة الأقرب لطبيعة مشروعك! تتضمن فئة رسمية كاملة باسم SMART HOMES إلى جانب Smart Cities وEnergy. توفر المسابقة إرشاداً فنيًا وقطع هاردوير (Kits) وورش عمل كاثون.",

        novaStrategy: "🎯 الموائمة المثالية: المسابقة دي فيها فئة SMART HOMES جاهزة. هنقدم NOVA Home بكامل قوته (ESP32 sensors + Cloud / MQTT + AI Models + Web UI). بما إن الموقع لم يحدد تاريخاً نهائياً بعد لموسم سبتمبر 2026 فصاعداً، سنضعها تحت المراقبة اليومية لنكون أول المسجلين فور فتح الباب!",

        tasks: [
            { id: "arab-1", label: "متابعة الموقع الرسمي لـ Arab IoT & AI Challenge - Egypt أسبوعياً" },
            { id: "arab-2", label: "تجهيز ملف المشروعات السابق والـ System Architecture للـ ESP32 + AI" },
            { id: "arab-3", label: "التقديم فور فتح استمارة التسجيل لمسار High School (STEM)" }
        ]
    },
    {
        id: "conrad-2026",
        rank: 5,
        title: "Conrad Challenge 2026–27",
        category: "Global Innovation & Business Concept",
        badge: "🚀 تجارية عالية (تتطلب Financial Aid)",
        isFree: false,
        feeText: "Activation Stage مجاناً | Innovation Stage تكلفتها 499$ (يوجد Financial Aid)",
        isSolo: false,
        soloText: "فرق من 2 إلى 5 طلاب (13–18 سنة)",
        isEgypt: false,
        regDeadline: "2026-10-30T23:59:59",
        regDeadlineText: "30 أكتوبر 2026 (مرحلة Activation Stage)",
        buildPhaseText: "Innovation Stage: 29 أكتوبر 2026 – 7 يناير 2027",
        judgingText: "إعلان النهائيات: 26 فبراير 2027 | القمة في أمريكا: 21–24 أبريل 2027",
        emailTimeline: "إيميل قبول Activation: أول نوفمبر | إيميل نتيجة Financial Aid: ديسمبر 2026 | النتيجة: 26 فبراير 2027",
        regUrl: "https://conrad.spacecenter.org/?utm_source=chatgpt.com",
        matchingScore: 78,

        evaluationCriteria: [
            "الابتكار الفني والتقني — 30%",
            "خطة العمل والجدوى التجارية — 30%",
            "الأثر البيئي والاجتماعي — 25%",
            "فيديو ومستندات العرض — 15%"
        ],

        taskSummary: "مسابقة عالمية مرموقة تركز على بناء مفهوم تجاري ابتكاري (Innovation/Business Concept). تتضمن تقديم وثيقة تقنية وخطة عمل وتستهدف فئات المناخ والطاقة والتكنولوجيا.",

        novaStrategy: "⚠️ استراتيجية الدعم المالي: المسابقة ممتازة لـ NOVA Home تحت فئة Energy & Environment. الخطوة الأولى: تسجيل الـ Activation Stage المجانية تماماً قبل 30 أكتوبر. إذا تم القبول، نتقدم فوراً بطلب Financial Aid بين 2 نوفمبر و 3 ديسمبر لإعفائنا من رسم الـ 499$!",

        tasks: [
            { id: "conrad-1", label: "إنشاء حساب على بوابة Conrad وتعبئة Activation Stage قبل 30 أكتوبر" },
            { id: "conrad-2", label: "تجهيز طلب الدعم المالي (Financial Aid) ورفعه فور فتح الباب في 2 نوفمبر" },
            { id: "conrad-3", label: "إعداد الـ Innovation Brief وفيديو العرض للمرحلة الثانية" }
        ]
    },
    {
        id: "technovation-2026",
        rank: 6,
        title: "Technovation Challenge 2026–27",
        category: "Mobile & Web App AI Challenge",
        badge: "🤖 تركيز برمجي وذكاء اصطناعي",
        isFree: true,
        feeText: "مجاني 100%",
        isSolo: false,
        soloText: "مفتوحة للطلاب تحت 18 سنة (تستهدف الفتيات في الغالب)",
        isEgypt: false,
        regDeadline: "2027-03-11T23:59:59",
        regDeadlineText: "11 مارس 2027 (يبدأ التسجيل 12 أكتوبر 2026 | التسليم 5 مايو 2027)",
        buildPhaseText: "أكتوبر 2026 – مايو 2027 (فترة تطوير طويلة ومريحة)",
        judgingText: "يونيو – يوليو 2027",
        emailTimeline: "تأكيد التسجيل: فوراً | إيميل نتائج التصفيات: يونيو 2027",
        regUrl: "https://technovationchallenge.org/?utm_source=chatgpt.com",
        matchingScore: 70,

        evaluationCriteria: [
            "حل مشكلة مجتمعية بيئية — 30%",
            "تطبيق البرمجة والذكاء الاصطناعي — 30%",
            "خطة التسويق والاستدامة — 20%",
            "عرض الفيديو والـ Pitch — 20%"
        ],

        taskSummary: "مسابقة عالمية تركز على بناء تطبيقات موبايل أو مواقع ويب مدعومة بالذكاء الاصطناعي لحل مشكلة واقعية محلياً أو عالمياً.",

        novaStrategy: "💡 التركيز البرمجي: هنا سنركز على NOVA Home كـ Web/Mobile App + AI Backend مع الاستغناء عن تعقيدات الـ ESP32 هاردوير. العرض يركز على مساعدة العائلات في تقليل الانبعاثات الكربونية وخفض فواتير الكهرباء.",

        tasks: [
            { id: "tech-1", label: "التسجيل في منصة Technovation بعد فتح الباب في 12 أكتوبر 2026" },
            { id: "tech-2", label: "تكييف الواجهات لتعمل كـ Mobile App / Web App ذكي متكامل" },
            { id: "tech-3", label: "توفير خطة عمل واستدامة مجتمعية تسليم الملف قبل 5 مايو 2027" }
        ]
    },
    {
        id: "wrg-egypt-2026",
        rank: 7,
        title: "WRG Egypt (World Robot Games)",
        category: "Robotics & Hardware Competition",
        badge: "🇪🇬 روبوتات هاردوير فقط (تتطلب مشروع مستقل)",
        isFree: true,
        feeText: "رسوم تسجيل محلي بسيطة حسب الفئة",
        isSolo: false,
        soloText: "فرق من 2 إلى 5 طلاب (8–19 سنة)",
        isEgypt: true,
        regDeadline: "2026-11-15T23:59:59",
        regDeadlineText: "أواخر 2026 (مواعيد التصفيات المحلية بمصر)",
        buildPhaseText: "بناء واختبار الروبوت ميدانياً",
        judgingText: "يوم البطولة المباشر في مصر",
        emailTimeline: "إيميل تأكيد التسجيل وفحص الروبوت الفني قبل المسابقة بأسبوع",
        regUrl: "https://www.facebook.com/WRGEgypt/",
        matchingScore: 55,

        evaluationCriteria: [
            "الأداء الميكانيكي والروبوتي — 40%",
            "سرعة ودقة التحكم المستقل — 35%",
            "الابتكار والهندسة — 25%"
        ],

        taskSummary: "بطولة روبوتات تنافسية بمصر (Sumo, Line Follower, Innovative Robot) تتطلب روبوتات متحركة ميكانيكية.",

        novaStrategy: "⚠️ نصيحة عدم تحويل NOVA Home: هذه المسابقة مخصصة للروبوتات الميكانيكية المتحركة أكثر منها للنظم الذكية Smart Homes. إذا قررت دخولها، الأفضل بناء مشروع روبوت مستقل (مثل Line Follower أو Sumo Robot) بدلاً من تعديل NOVA Home.",

        tasks: [
            { id: "wrg-1", label: "تقييم الرغبة في بناء روبوت متحرك مستقل للمشاركة في WRG" },
            { id: "wrg-2", label: "التواصل مع منظمي WRG Egypt لمعرفة الفئات المتاحة هذا العام" }
        ]
    },
    {
        id: "british-council-2026",
        rank: 8,
        title: "British Council Robotics Competition 2026/27",
        category: "Autonomous Racing Robotics",
        badge: "🚫 شروط خاصة (Partner School Only)",
        isFree: true,
        feeText: "مجاني لطلاب المدارس الشريكة",
        isSolo: false,
        soloText: "فرق طلابية (Grades 9–12)",
        isEgypt: true,
        regDeadline: "2026-10-31T23:59:59",
        regDeadlineText: "31 أكتوبر 2026",
        buildPhaseText: "سباقات الروبوت ذاتي القيادة",
        judgingText: "نوفمبر 2026",
        emailTimeline: "إيميل التحقق من تبعية المدرسة للـ British Council Partner Schools",
        regUrl: "https://www.britishcouncil.org.eg/",
        matchingScore: 20,

        evaluationCriteria: [
            "سرعة الروبوت ذاتي القيادة على المضمار — 50%",
            "دقة المستشعرات وخوارزميات التتبع — 30%",
            "التصميم الهندسي — 20%"
        ],

        taskSummary: "مسابقة روبوتات سباق ذاتية القيادة (Autonomous Racing Robot) خاصة حنصرياً بطلاب مدارس British Council Partner Schools.",

        novaStrategy: "❌ غير مرشحة: المسابقة لا تناسب NOVA Home لأنها سباق روبوتات، وتتطلب شرطاً صارماً وهو أن تكون مدرستك رسمياً ضمن British Council Partner Schools. يُنصح باستبعادها وتوفير المجهود للمسابقات الأولى.",

        tasks: [
            { id: "bc-1", label: "التحقق من حالة مدرستك هل هي Partner School للـ British Council أم لا" }
        ]
    }
];

// Local Storage Checklist State Management
function getSavedTasksState() {
    const saved = localStorage.getItem('nova_comp_checklist_v1');
    return saved ? JSON.parse(saved) : {};
}

function saveTaskState(taskId, isChecked) {
    const state = getSavedTasksState();
    state[taskId] = isChecked;
    localStorage.setItem('nova_comp_checklist_v1', JSON.stringify(state));
    updateGlobalProgress();
}

// Calculate Global Progress Percentage
function updateGlobalProgress() {
    const state = getSavedTasksState();
    let totalTasks = 0;
    let completedTasks = 0;

    competitionsData.forEach(comp => {
        comp.tasks.forEach(task => {
            totalTasks++;
            if (state[task.id]) completedTasks++;
        });
    });

    const percent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    const progressEl = document.getElementById('stat-progress');
    if (progressEl) {
        progressEl.textContent = `${percent}%`;
    }
}

// Calculate Remaining Time to Deadline
function getCountdownText(deadlineIsoStr) {
    const now = new Date().getTime();
    const target = new Date(deadlineIsoStr).getTime();
    const diff = target - now;

    if (isNaN(target)) return "تاريخ محدد قريباً";
    if (diff <= 0) return "انتهى الموعد أو قيد المتابعة";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `متبقي ${days} يوم و ${hours} ساعة`;
}

// Render Competition Cards
function renderCompetitions(filter = 'all', searchQuery = '') {
    const container = document.getElementById('competitions-container');
    container.innerHTML = '';

    const tasksState = getSavedTasksState();

    const filtered = competitionsData.filter(comp => {
        // Search Filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch = query === '' || 
            comp.title.toLowerCase().includes(query) ||
            comp.category.toLowerCase().includes(query) ||
            comp.novaStrategy.toLowerCase().includes(query);

        if (!matchesSearch) return false;

        // Category Tab Filter
        if (filter === 'top3') return comp.rank <= 3;
        if (filter === 'solo') return comp.isSolo;
        if (filter === 'free') return comp.isFree;
        if (filter === 'egypt') return comp.isEgypt;
        return true;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 4rem 1rem; color: var(--text-secondary);">
                <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                <h3>لم يتم العثور على مسابقات تطابق البحث</h3>
                <p>جرب تغيير البحث أو اختيار تبويب آخر من الأعلى.</p>
            </div>
        `;
        return;
    }

    filtered.forEach(comp => {
        const card = document.createElement('div');
        card.className = 'comp-card';
        card.setAttribute('data-rank', comp.rank);

        // Calculate progress for this card
        const cardCompleted = comp.tasks.filter(t => tasksState[t.id]).length;
        const cardTotal = comp.tasks.length;
        const cardProgressPercent = Math.round((cardCompleted / cardTotal) * 100);

        // Tags HTML
        const feeTag = comp.isFree 
            ? `<span class="tag tag-free"><i class="fa-solid fa-circle-check"></i> ${comp.feeText}</span>`
            : `<span class="tag tag-fee"><i class="fa-solid fa-circle-dollar-to-slot"></i> ${comp.feeText}</span>`;

        const soloTag = comp.isSolo
            ? `<span class="tag tag-solo"><i class="fa-solid fa-user"></i> Solo Allowed</span>`
            : `<span class="tag tag-team"><i class="fa-solid fa-users"></i> Team Preferred</span>`;

        const egyptTag = comp.isEgypt
            ? `<span class="tag tag-egypt"><i class="fa-solid fa-location-dot"></i> مسابقة مصر 🇪🇬</span>`
            : '';

        const rankBadgeClass = comp.rank === 1 ? 'rank-1' : comp.rank === 2 ? 'rank-2' : comp.rank === 3 ? 'rank-3' : 'rank-other';

        // Checklist HTML
        const tasksHtml = comp.tasks.map(task => {
            const isChecked = !!tasksState[task.id];
            return `
                <div class="task-item ${isChecked ? 'completed' : ''}" data-task-id="${task.id}">
                    <input type="checkbox" class="task-checkbox" id="chk-${task.id}" ${isChecked ? 'checked' : ''}>
                    <label class="task-label" for="chk-${task.id}">${task.label}</label>
                </div>
            `;
        }).join('');

        card.innerHTML = `
            <div class="comp-card-header">
                <div class="comp-title-area">
                    <div class="comp-rank-badge ${rankBadgeClass}">#${comp.rank}</div>
                    <div class="comp-titles">
                        <h2 class="comp-name">${comp.title}</h2>
                        <span class="comp-category">${comp.category} • ${comp.badge}</span>
                    </div>
                </div>
                <div class="comp-meta-tags">
                    ${feeTag}
                    ${soloTag}
                    ${egyptTag}
                </div>
            </div>

            <div class="comp-details-row">
                <div class="detail-item">
                    <span class="detail-label"><i class="fa-regular fa-calendar-xmark"></i> آخر ميعاد للتسجيل</span>
                    <span class="detail-value">${comp.regDeadlineText}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label"><i class="fa-solid fa-hourglass-half"></i> العداد التنازلي</span>
                    <span class="detail-value countdown">${getCountdownText(comp.regDeadline)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label"><i class="fa-solid fa-timeline"></i> مرحلة البناء والتحكيم</span>
                    <span class="detail-value">${comp.buildPhaseText}</span>
                </div>
            </div>

            <div class="strategy-box">
                <div class="strategy-title"><i class="fa-solid fa-wand-magic-sparkles"></i> كيف يستفيد مشروع NOVA Home في هذه المسابقة؟</div>
                <div class="strategy-text">${comp.novaStrategy}</div>
            </div>

            <div class="comp-checklist">
                <div class="checklist-title">
                    <span><i class="fa-solid fa-list-check"></i> قائمة المهام الخاصة بالتقديم (To-Do List)</span>
                    <span class="checklist-progress-text">${cardCompleted}/${cardTotal} مكتمل (${cardProgressPercent}%)</span>
                </div>
                <div class="task-list">
                    ${tasksHtml}
                </div>
            </div>

            <div class="comp-card-actions">
                <div class="email-timeline-info">
                    <i class="fa-solid fa-envelope-open-text"></i>
                    <span><strong>جدول الإيميلات:</strong> ${comp.emailTimeline}</span>
                </div>
                <div class="btn-group">
                    <button class="btn btn-secondary view-details-btn" data-comp-id="${comp.id}">
                        <i class="fa-solid fa-circle-info"></i> تفاصيل المهمة ومعايير التقييم
                    </button>
                    <a href="${comp.regUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> رابط التسجيل المباشر
                    </a>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    // Attach Event Listeners to Checkboxes
    document.querySelectorAll('.task-item').forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent double toggle if clicked directly on input vs item container
            const checkbox = item.querySelector('.task-checkbox');
            if (e.target !== checkbox) {
                checkbox.checked = !checkbox.checked;
            }
            const taskId = item.getAttribute('data-task-id');
            saveTaskState(taskId, checkbox.checked);
            
            if (checkbox.checked) {
                item.classList.add('completed');
            } else {
                item.classList.remove('completed');
            }

            // Re-render to update percentage on card header
            const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-filter');
            const searchVal = document.getElementById('search-input').value;
            renderCompetitions(activeTab, searchVal);
        });
    });

    // Attach Event Listeners for Modal Buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const compId = btn.getAttribute('data-comp-id');
            openDetailModal(compId);
        });
    });
}

// Open Detail Modal
function openDetailModal(compId) {
    const comp = competitionsData.find(c => c.id === compId);
    if (!comp) return;

    const modalBody = document.getElementById('modal-body-content');
    
    const criteriaHtml = comp.evaluationCriteria.map(c => `<li><i class="fa-solid fa-check text-cyan"></i> ${c}</li>`).join('');

    modalBody.innerHTML = `
        <div class="modal-header-section">
            <span style="color: var(--primary-cyan); font-weight: 700; font-size: 0.9rem;">#الترتيب ${comp.rank} في القائمة الموصى بها</span>
            <h2>${comp.title}</h2>
            <p class="modal-text">${comp.category} | ${comp.badge}</p>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title"><i class="fa-solid fa-file-contract"></i> تفاصيل المهمة والطلب الرسمي للمسابقة (Mission Details)</h4>
            <p class="modal-text">${comp.taskSummary}</p>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title"><i class="fa-solid fa-chart-pie"></i> معايير التقييم وت توزيع الدرجات (Evaluation Criteria)</h4>
            <ul style="list-style: none; padding-right: 0; color: var(--text-secondary); line-height: 2;">
                ${criteriaHtml}
            </ul>
        </div>

        <div class="modal-section" style="background: rgba(6, 182, 212, 0.08); padding: 1.2rem; border-radius: var(--radius-md); border-right: 3px solid var(--primary-cyan);">
            <h4 class="modal-section-title"><i class="fa-solid fa-lightbulb"></i> الخطة الذهبية لمشروع NOVA Home</h4>
            <p class="modal-text" style="color: #FFF;">${comp.novaStrategy}</p>
        </div>

        <div class="modal-section">
            <h4 class="modal-section-title"><i class="fa-solid fa-envelope-circle-check"></i> مواعيد استقبال الرسائل الإلكترونية والإشعارات</h4>
            <p class="modal-text">${comp.emailTimeline}</p>
        </div>

        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: flex-end;">
            <a href="${comp.regUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                <i class="fa-solid fa-paper-plane"></i> الذهاب لرابط التسجيل المباشر
            </a>
        </div>
    `;

    document.getElementById('modal-overlay').classList.add('active');
}

// Modal Close Handling
document.getElementById('modal-close-btn').addEventListener('click', () => {
    document.getElementById('modal-overlay').classList.remove('active');
});
document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') {
        document.getElementById('modal-overlay').classList.remove('active');
    }
});

// Event Listeners for Filters & Search
document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const filter = tab.getAttribute('data-filter');
        const searchVal = document.getElementById('search-input').value;
        renderCompetitions(filter, searchVal);
    });
});

document.getElementById('search-input').addEventListener('input', (e) => {
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-filter');
    renderCompetitions(activeTab, e.target.value);
});

// Initial Setup & Render
document.addEventListener('DOMContentLoaded', () => {
    renderCompetitions('all', '');
    updateGlobalProgress();
});
