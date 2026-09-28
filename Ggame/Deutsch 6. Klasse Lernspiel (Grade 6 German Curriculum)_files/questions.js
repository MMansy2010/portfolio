// Complete 40-Level Questions Dataset for 6th Grade German Curriculum
// Based on "Al Khalil Language Schools" 6. Klasse Semester 1

const WORLDS_DATA = [
  {
    id: 1,
    title: "الوحدة 1: الأدوات المدرسية والأدوات الأصلية",
    subtitle: "Der / Das / Die",
    icon: "🏫",
    color: "#3B82F6",
    levels: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 2,
    title: "الوحدة 2: المفرد والجمع والجمل",
    subtitle: "Singular & Plural (ist / sind)",
    icon: "🎒",
    color: "#10B981",
    levels: [8, 9, 10, 11, 12, 13, 14]
  },
  {
    id: 3,
    title: "الوحدة 3: الأدوات النكرة والنفي",
    subtitle: "ein / eine مقابل kein / keine",
    icon: "✏️",
    color: "#F59E0B",
    levels: [15, 16, 17, 18, 19, 20, 21]
  },
  {
    id: 4,
    title: "الوحدة 4: الضمائر الشخصية وتصريف الأفعال",
    subtitle: "er / es / sie & Verb-Endungen",
    icon: "👤",
    color: "#8B5CF6",
    levels: [22, 23, 24, 25, 26, 27, 28]
  },
  {
    id: 5,
    title: "الوحدة 5: الكلمة الغريبة والأفعال والمعاني",
    subtitle: "Was passt hier nicht! & Verben",
    icon: "🔍",
    color: "#EC4899",
    levels: [29, 30, 31, 32, 33, 34, 35]
  },
  {
    id: 6,
    title: "الوحدة 6: التحديات الشاملة والنهائية",
    subtitle: "Boss Levels - الاختبارات النهائية",
    icon: "👑",
    color: "#EF4444",
    levels: [36, 37, 38, 39, 40]
  }
];

const LEVELS_DATA = {
  // ==================== WORLD 1: Der / Das / Die (1-7) ====================
  1: [
    {
      type: "image-choice",
      svg: "bleistift",
      question: "اختر أداة التعريف الصحيحة للكلمة المعروضة:",
      text: "____ Bleistift (قلم رصاص)",
      options: ["der", "das", "die"],
      correct: 0,
      explanation: "💡 كلمة Bleistift مذكر وتأخذ دائماً أداة التعريف der."
    },
    {
      type: "image-choice",
      svg: "heft",
      question: "اختر أداة التعريف المناسبة لـ (كراسة):",
      text: "____ Heft",
      options: ["der", "das", "die"],
      correct: 1,
      explanation: "💡 كلمة Heft (كراسة) محايد وتأخذ أداة das."
    },
    {
      type: "image-choice",
      svg: "schultasche",
      question: "اختر الأداة الصحيحة لـ (حقيبة مدرسية):",
      text: "____ Schultasche",
      options: ["der", "das", "die"],
      correct: 2,
      explanation: "💡 كلمة Schultasche مؤنث وتأخذ أداة die."
    }
  ],
  2: [
    {
      type: "image-choice",
      svg: "spitzer",
      question: "ما هي أداة التعريف الصحيحة لـ (براية)؟",
      text: "____ Spitzer",
      options: ["das", "der", "die"],
      correct: 1,
      explanation: "💡 كلمة Spitzer (براية) مذكر وتأخذ أداة der."
    },
    {
      type: "image-choice",
      svg: "lineal",
      question: "ما هي أداة التعريف الصحيحة لـ (مسطرة)؟",
      text: "____ Lineal",
      options: ["das", "der", "die"],
      correct: 0,
      explanation: "💡 كلمة Lineal (مسطرة) محايد وتأخذ أداة das."
    },
    {
      type: "image-choice",
      svg: "schere",
      question: "ما هي أداة التعريف لـ (مقص)؟",
      text: "____ Schere",
      options: ["die", "das", "der"],
      correct: 0,
      explanation: "💡 كلمة Schere (مقص) مؤنث وتأخذ أداة die."
    }
  ],
  3: [
    {
      type: "text-choice",
      question: "اختر الأداة المناسبة:",
      text: "____ Radiergummi (ممحاة / استيكة)",
      options: ["die", "das", "der"],
      correct: 2,
      explanation: "💡 كلمة Radiergummi مذكر وتأخذ أداة der."
    },
    {
      type: "image-choice",
      svg: "buch",
      question: "اختر الأداة الصحيحة لـ (كتاب):",
      text: "____ Buch",
      options: ["die", "das", "der"],
      correct: 1,
      explanation: "💡 كلمة Buch (كتاب) محايد وتأخذ أداة das."
    },
    {
      type: "image-choice",
      svg: "mappe",
      question: "اختر الأداة المناسبة لـ (دوسيه / حافظة):",
      text: "____ Mappe",
      options: ["der", "die", "das"],
      correct: 1,
      explanation: "💡 كلمة Mappe مؤنث وتأخذ أداة die."
    }
  ],
  4: [
    {
      type: "image-choice",
      svg: "marker",
      question: "اختر الأداة الصحيحة لـ (قلم تحديد / هايلايتر):",
      text: "____ Marker",
      options: ["der", "das", "die"],
      correct: 0,
      explanation: "💡 كلمة Marker مذكر وتأخذ أداة der."
    },
    {
      type: "image-choice",
      svg: "kugelschreiber",
      question: "ما هي أداة (قلم جاف / Kuli)؟",
      text: "____ Kugelschreiber",
      options: ["das", "der", "die"],
      correct: 1,
      explanation: "💡 كلمة Kugelschreiber (Kuli) مذكر وتأخذ أداة der."
    },
    {
      type: "image-choice",
      svg: "taschenrechner",
      question: "اختر الأداة الصحيحة لـ (آلة حاسبة):",
      text: "____ Taschenrechner",
      options: ["die", "das", "der"],
      correct: 2,
      explanation: "💡 كلمة Taschenrechner (آلة حاسبة) مذكر وتأخذ أداة der."
    }
  ],
  5: [
    {
      type: "text-choice",
      question: "اختر أداة التعريف الصحيحة:",
      text: "Wie heißt das auf Deutsch? _____ Mäppchen (مقلمة)",
      options: ["der", "das", "die"],
      correct: 1,
      explanation: "💡 كلمة Mäppchen (مقلمة) محايد وتأخذ أداة das."
    },
    {
      type: "text-choice",
      question: "اختر الأداة المناسبة:",
      text: "_____ Banane (موزة)",
      options: ["der", "das", "die"],
      correct: 2,
      explanation: "💡 كلمة Banane مؤنث وتأخذ أداة die."
    },
    {
      type: "text-choice",
      question: "اختر الأداة المناسبة:",
      text: "_____ Kuli (قلم جاف)",
      options: ["der", "das", "die"],
      correct: 0,
      explanation: "💡 كلمة Kuli هي اختصار Kugelschreiber وتأخذ أداة der."
    }
  ],
  6: [
    {
      type: "text-choice",
      question: "طابق الأداة الصحيحة:",
      text: "1) _____ Tasche  |  2) _____ Buch",
      options: ["1: die / 2: das", "1: der / 2: die", "1: das / 2: der"],
      correct: 0,
      explanation: "💡 die Tasche (مؤنث) و das Buch (محايد)."
    },
    {
      type: "text-choice",
      question: "اختر الأداة الصحيحة للكلمة:",
      text: "_____ Spitzer ist gelb.",
      options: ["Der", "Das", "Die"],
      correct: 0,
      explanation: "💡 der Spitzer (البراية) مذكر."
    },
    {
      type: "text-choice",
      question: "اختر الأداة المناسبة:",
      text: "_____ Lineal ist lang.",
      options: ["Der", "Das", "Die"],
      correct: 1,
      explanation: "💡 das Lineal (المسطرة) محايد."
    }
  ],
  7: [
    {
      type: "text-choice",
      question: "اختبار الوحدة 1 (سؤال 1): اختر الكلمة التي تأخذ أداة der:",
      text: "Welches Wort hat den Artikel 'der'?",
      options: ["Schere", "Bleistift", "Heft"],
      correct: 1,
      explanation: "💡 der Bleistift مذكر (بينما die Schere مؤنث و das Heft محايد)."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 1 (سؤال 2): اختر الكلمة التي تأخذ أداة das:",
      text: "Welches Wort hat den Artikel 'das'?",
      options: ["Mäppchen", "Tasche", "Spitzer"],
      correct: 0,
      explanation: "💡 das Mäppchen محايد."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 1 (سؤال 3): اختر الكلمة التي تأخذ أداة die:",
      text: "Welches Wort hat den Artikel 'die'?",
      options: ["Marker", "Lineal", "Schultasche"],
      correct: 2,
      explanation: "💡 die Schultasche مؤنث."
    }
  ],

  // ==================== WORLD 2: Singular & Plural (8-14) ====================
  8: [
    {
      type: "text-choice",
      question: "ما هو جمع كلمة der Radiergummi (ممحاة)؟",
      text: "der Radiergummi -> die ____",
      options: ["Radiergummie", "Radiergummis", "Radiergummin"],
      correct: 1,
      explanation: "💡 جمع Radiergummi يضاف له s في النهاية: die Radiergummis."
    },
    {
      type: "text-choice",
      question: "ما هو جمع كلمة der Kugelschreiber (قلم جاف)؟",
      text: "der Kugelschreiber -> die ____",
      options: ["Kugelschreiber", "Kugelschreibere", "Kugelschreibern"],
      correct: 0,
      explanation: "💡 كلمة Kugelschreiber تبقى كما هي في الجمع مع تغيير الأداة إلى die!"
    },
    {
      type: "text-choice",
      question: "ما هو جمع كلمة der Bleistift (قلم رصاص)؟",
      text: "der Bleistift -> die ____",
      options: ["Bleistift", "Bleistifte", "Bleistiften"],
      correct: 1,
      explanation: "💡 جمع Bleistift يضاف له حرف e: die Bleistifte."
    }
  ],
  9: [
    {
      type: "text-choice",
      question: "ما هو جمع كلمة das Heft (كراسة)؟",
      text: "das Heft -> die ____",
      options: ["Hefte", "Hefter", "Heften"],
      correct: 0,
      explanation: "💡 جمع das Heft هو die Hefte (بإضافة e)."
    },
    {
      type: "text-choice",
      question: "ما هو جمع كلمة das Lineal (مسطرة)؟",
      text: "das Lineal -> die ____",
      options: ["Linealen", "Lineale", "Linealer"],
      correct: 1,
      explanation: "💡 جمع das Lineal هو die Lineale."
    },
    {
      type: "text-choice",
      question: "ما هو جمع كلمة das Buch (كتاب)؟",
      text: "das Buch -> die ____",
      options: ["Buche", "Bücher", "Büchern"],
      correct: 1,
      explanation: "💡 جمع das Buch يتحول إلى die Bücher (إضافة أوملاوت + er)."
    }
  ],
  10: [
    {
      type: "text-choice",
      question: "ما هو جمع كلمة die Schere (مقص)؟",
      text: "die Schere -> die ____",
      options: ["Scheres", "Scheren", "Schere"],
      correct: 1,
      explanation: "💡 ينتهي الجمع للأدوات التي تنتهي بـ e بإضافة n: die Scheren."
    },
    {
      type: "text-choice",
      question: "ما هو جمع كلمة die Mappe (حافظة/دوسيه)؟",
      text: "die Mappe -> die ____",
      options: ["Mappen", "Mappe", "Mapper"],
      correct: 0,
      explanation: "💡 جمع die Mappe هو die Mappen."
    },
    {
      type: "text-choice",
      question: "ما هو جمع كلمة die Tasche (شنطة)؟",
      text: "die Tasche -> die ____",
      options: ["Taschen", "Tasche", "Tasches"],
      correct: 0,
      explanation: "💡 جمع die Tasche هو die Taschen."
    }
  ],
  11: [
    {
      type: "text-choice",
      question: "اختر الفعل المناسب للمفرد والجمع (ist / sind):",
      text: "Das _____ der Kuli.",
      options: ["ist", "sind", "sein"],
      correct: 0,
      explanation: "💡 نستخدم ist مع المفرد (der Kuli)."
    },
    {
      type: "text-choice",
      question: "اختر الفعل المناسب مع الجمع:",
      text: "Das _____ die Scheren.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 نستخدم sind مع الجمع (die Scheren)."
    },
    {
      type: "text-choice",
      question: "اختر الفعل المناسب للجملة:",
      text: "Das _____ die Mappen.",
      options: ["ist", "sind", "bist"],
      correct: 1,
      explanation: "💡 نستخدم sind لأن die Mappen جمع."
    }
  ],
  12: [
    {
      type: "text-choice",
      question: "اختر الصيغة الصحيحة للتعبير Hier ist / Hier sind:",
      text: "Hier _____ drei Bleistifte.",
      options: ["ist", "sind", "sein"],
      correct: 1,
      explanation: "💡 نستخدم Hier sind مع الأعداد والجمع (drei Bleistifte)."
    },
    {
      type: "text-choice",
      question: "اختر الصيغة المناسبة:",
      text: "Hier _____ ein Heft.",
      options: ["ist", "sind", "seid"],
      correct: 0,
      explanation: "💡 نستخدم Hier ist مع المفرد (ein Heft)."
    },
    {
      type: "text-choice",
      question: "اختر الصيغة المناسبة:",
      text: "Hier _____ zwei Radiergummis.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 نستخدم Hier sind مع الجمع (zwei Radiergummis)."
    }
  ],
  13: [
    {
      type: "text-choice",
      question: "أكمل السؤال الصحيح للمفرد:",
      text: "Wo _____ das Lineal?",
      options: ["ist", "sind", "seid"],
      correct: 0,
      explanation: "💡 السؤال عن مفرد نستخدم فيه Wo ist...?"
    },
    {
      type: "text-choice",
      question: "أكمل السؤال الصحيح للجمع:",
      text: "Wo _____ die Lineale?",
      options: ["ist", "sind", "bist"],
      correct: 1,
      explanation: "💡 السؤال عن جمع نستخدم فيه Wo sind...?"
    },
    {
      type: "text-choice",
      question: "اختر الإجابة المناسبة:",
      text: "Wo ist die Tasche? -> Hier _____ die Tasche.",
      options: ["ist", "sind", "sein"],
      correct: 0,
      explanation: "💡 الإجابة عن المفرد تكون بـ Hier ist."
    }
  ],
  14: [
    {
      type: "text-choice",
      question: "اختبار الوحدة 2 (سؤال 1): حدد الجملة الصحيحة للجمع:",
      text: "Welcher Satz ist richtig?",
      options: [
        "Hier ist drei Bücher.",
        "Hier sind drei Bücher.",
        "Hier sind ein Buch."
      ],
      correct: 1,
      explanation: "💡 Hier sind نستخدمها دائماً مع الجمع (drei Bücher)."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 2 (سؤال 2): ما هو مفرد كلمة die Spitzer؟",
      text: "Singular von 'die Spitzer':",
      options: ["das Spitzer", "der Spitzer", "die Spitzerin"],
      correct: 1,
      explanation: "💡 مفرد Spitzer هو der Spitzer."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 2 (سؤال 3): أكمل الجملة: Hier _____ sechs Lineale.",
      text: "Hier _____ sechs Lineale.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 نستخدم sind لأن sechs Lineale جمع."
    }
  ],

  // ==================== WORLD 3: ein / eine & kein / keine (15-21) ====================
  15: [
    {
      type: "text-choice",
      question: "اختر أداة النكرة المناسبة (ein / eine):",
      text: "Das ist _____ Bleistift. (der Bleistift)",
      options: ["ein", "eine", "keine"],
      correct: 0,
      explanation: "💡 الكلمات التي تأخذ der تكون أداة النكرة لها ein."
    },
    {
      type: "text-choice",
      question: "اختر أداة النكرة الصحيحة للمؤنث:",
      text: "Das ist _____ Schultasche. (die Schultasche)",
      options: ["ein", "eine", "kein"],
      correct: 1,
      explanation: "💡 الكلمات التي تأخذ die (المؤنث) أداة النكرة لها هي eine."
    },
    {
      type: "text-choice",
      question: "اختر أداة النفي للمحايد:",
      text: "Das ist _____ Lineal. (das Lineal)",
      options: ["keine", "kein", "nicht"],
      correct: 1,
      explanation: "💡 نفي الاسم المحايد das يكون بـ kein."
    }
  ],
  16: [
    {
      type: "text-choice",
      question: "اختر أداة النكرة المناسبة:",
      text: "Das ist _____ Heft. (das Heft)",
      options: ["eine", "ein", "keine"],
      correct: 1,
      explanation: "💡 الكلمات التي تأخذ das تكون أداة النكرة لها ein أيضاً."
    },
    {
      type: "text-choice",
      question: "اختر أداة النكرة الصحيحة:",
      text: "Das ist _____ Schere. (die Schere)",
      options: ["ein", "eine", "kein"],
      correct: 1,
      explanation: "💡 die Schere -> eine Schere."
    },
    {
      type: "text-choice",
      question: "اختر أداة النفي المناسبة (kein / keine):",
      text: "Das ist _____ Spitzer. (der Spitzer)",
      options: ["kein", "keine", "nicht"],
      correct: 0,
      explanation: "💡 نفي الاسم المذكر der يكون بـ kein (مثل ein)."
    }
  ],
  17: [
    {
      type: "text-choice",
      question: "اختر أداة النكرة الصحيحة:",
      text: "Das ist _____ Buch. (das Buch)",
      options: ["ein", "eine", "kein"],
      correct: 0,
      explanation: "💡 das Buch -> ein Buch."
    },
    {
      type: "text-choice",
      question: "اختر أداة النكرة الصحيحة:",
      text: "Das ist _____ Banane. (die Banane)",
      options: ["ein", "eine", "kein"],
      correct: 1,
      explanation: "💡 die Banane -> eine Banane."
    },
    {
      type: "text-choice",
      question: "اختر أداة النفي الصحيحة:",
      text: "Das ist _____ Mäppchen. (das Mäppchen)",
      options: ["kein", "keine", "ein"],
      correct: 0,
      explanation: "💡 das Mäppchen -> kein Mäppchen."
    }
  ],
  18: [
    {
      type: "text-choice",
      question: "اختر أداة النفي للمؤنث والجمع:",
      text: "Das ist _____ Tasche. (die Tasche)",
      options: ["kein", "keine", "ein"],
      correct: 1,
      explanation: "💡 نفي الاسم المؤنث die يكون بـ keine."
    },
    {
      type: "text-choice",
      question: "اختر أداة النفي مع الجمع:",
      text: "Das sind _____ Bücher. (die Bücher)",
      options: ["kein", "keine", "ein"],
      correct: 1,
      explanation: "💡 نفي الأسماء في الجمع die Plural يكون بـ keine (الجمع ليس له أداة نكرة!)."
    },
    {
      type: "text-choice",
      question: "اختر أداة النفي للجمع:",
      text: "Das sind _____ Scheren.",
      options: ["kein", "keine", "eine"],
      correct: 1,
      explanation: "💡 للجمع نستخدم دائماً keine عند النفي."
    }
  ],
  19: [
    {
      type: "text-choice",
      question: "طابق القواعد الذهبية للأدوات:",
      text: "Der / Das -> ein / kein | Die / Die Pl. -> ____ / ____",
      options: ["eine / keine", "ein / kein", "eine / kein"],
      correct: 0,
      explanation: "💡 Der و Das يأخذان ein و kein. أما Die للمؤنث والجمع فتأخذ eine و keine!"
    },
    {
      type: "text-choice",
      question: "اختر الخيار الصحيح للجملة:",
      text: "Das ist (kein - keine) Radiergummi.",
      options: ["kein", "keine", "eine"],
      correct: 0,
      explanation: "💡 der Radiergummi -> kein Radiergummi."
    },
    {
      type: "text-choice",
      question: "اختر الخيار الصحيح للجملة:",
      text: "Das ist (kein - keine) Mappe.",
      options: ["kein", "keine", "ein"],
      correct: 1,
      explanation: "💡 die Mappe -> keine Mappe."
    }
  ],
  20: [
    {
      type: "text-choice",
      svg: "radiergummi",
      question: "أجب بالنفي بناءً على السؤال والمعنى:",
      text: "Ist das eine Schere? (الصورة: Radiergummi)",
      options: [
        "Nein, das ist keine Schere. Das ist ein Radiergummi.",
        "Ja, das ist eine Schere.",
        "Nein, das ist ein Schere."
      ],
      correct: 0,
      explanation: "💡 الإجابة الصحيحة بالنفي: Nein, das ist keine Schere. Das ist ein Radiergummi."
    },
    {
      type: "text-choice",
      svg: "buch",
      question: "أجب بالإثبات عن الصورة:",
      text: "Ist das ein Buch? (الصورة: Buch)",
      options: [
        "Ja, das ist ein Buch.",
        "Nein, das ist kein Buch.",
        "Ja, das ist eine Buch."
      ],
      correct: 0,
      explanation: "💡 الصورة كتاب، فالإجابة الإيجابية الصحيحة: Ja, das ist ein Buch."
    },
    {
      type: "text-choice",
      svg: "schere",
      question: "أجب بالنفي بناءً على الصورة والمحتوى:",
      text: "Ist das ein Radiergummi? (الصورة: Schere)",
      options: [
        "Nein, das ist kein Radiergummi. Das ist eine Schere.",
        "Ja, das ist ein Radiergummi.",
        "Nein, das ist keine Radiergummi."
      ],
      correct: 0,
      explanation: "💡 الصورة مقص، فننفي الممحاة بالنفي الصحيح kein Radiergummi وتأكيد eine Schere."
    }
  ],
  21: [
    {
      type: "text-choice",
      question: "اختبار الوحدة 3 (سؤال 1): اختر الأداة الصحيحة للجملة:",
      text: "Das ist _____ Marker.",
      options: ["ein", "eine", "keine"],
      correct: 0,
      explanation: "💡 der Marker -> ein Marker."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 3 (سؤال 2): اختر أداة النفي للجمع:",
      text: "Das sind _____ Radiergummis.",
      options: ["keine", "kein", "eine"],
      correct: 0,
      explanation: "💡 die Radiergummis (جمع) تأخذ keine."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 3 (سؤال 3): أجب عن السؤال: Ist das ein Mäppchen?",
      text: "Ist das ein Mäppchen? -> Ja, das ist _____ Mäppchen.",
      options: ["ein", "eine", "kein"],
      correct: 0,
      explanation: "💡 das Mäppchen -> ein Mäppchen."
    }
  ],

  // ==================== WORLD 4: Personalpronomen & Verben (22-28) ====================
  22: [
    {
      type: "text-choice",
      question: "عوض عن اسم المذكر (der) بالضمير الشخصي المناسب:",
      text: "Das ist der Bleistift. _____ ist rot.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 الاسم الذي أداته der نعوض عنه دائماً بالضمير Er."
    },
    {
      type: "text-choice",
      question: "عوض عن الاسم المحايد (das) بالضمير الشخصي المناسب:",
      text: "Das ist das Buch. _____ hat viele Bilder.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 الاسم الذي أداته das نعوض عنه دائماً بالضمير Es."
    },
    {
      type: "text-choice",
      question: "عوض عن الاسم المؤنث (die) بالضمير الشخصي المناسب:",
      text: "Das ist die Schere. _____ schneidet gut.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 الاسم الذي أداته die نعوض عنه دائماً بالضمير Sie (هي)."
    }
  ],
  23: [
    {
      type: "text-choice",
      question: "اختر الضمير المناسب للتعويض:",
      text: "Das ist der Marker. _____ ist gelb.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Marker -> Er."
    },
    {
      type: "text-choice",
      question: "اختر الضمير المناسب للتعويض:",
      text: "Das ist das Baby. _____ ist sehr schön.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 das Baby -> Es."
    },
    {
      type: "text-choice",
      question: "اختر الضمير المناسب للتعويض:",
      text: "Das ist die Tasche. _____ ist groß.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Tasche -> Sie."
    }
  ],
  24: [
    {
      type: "text-choice",
      question: "اختر الضمير المناسب للتعويض:",
      text: "Das ist der Kugelschreiber. _____ schreibt gut.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Kugelschreiber -> Er."
    },
    {
      type: "text-choice",
      question: "اختر الضمير المناسب للتعويض:",
      text: "Das ist das Heft. _____ ist neu.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 das Heft -> Es."
    },
    {
      type: "text-choice",
      question: "اختر الضمير المناسب للتعويض:",
      text: "Das ist die Banane. _____ ist lecker.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Banane -> Sie."
    }
  ],
  25: [
    {
      type: "text-choice",
      question: "اختر تصريف الفعل المناسب مع (ich / du):",
      text: "Ich _____ (trinken) Wasser.",
      options: ["trinke", "trinkst", "trinkt"],
      correct: 0,
      explanation: "💡 ينتهي تصريف الفعل مع الضمير ich بـ -e دائماً."
    },
    {
      type: "text-choice",
      question: "اختر التصريف المناسب مع الضمير du:",
      text: "Du _____ (kommen) aus Ägypten.",
      options: ["komme", "kommst", "kommt"],
      correct: 1,
      explanation: "💡 ينتهي تصريف الفعل مع الضمير du بـ -st دائماً."
    },
    {
      type: "text-choice",
      question: "اختر التصريف المناسب مع ich:",
      text: "Ich _____ (spielen) Fußball.",
      options: ["spiele", "spielst", "spielt"],
      correct: 0,
      explanation: "💡 ich -> spiele (النهاية e)."
    }
  ],
  26: [
    {
      type: "text-choice",
      question: "اختر التصريف الصحيح للفعل مع (er / es / sie):",
      text: "Er _____ (trinken) Milch.",
      options: ["trinke", "trinkst", "trinkt"],
      correct: 2,
      explanation: "💡 ينتهي التصريف مع er / es / sie بـ -t."
    },
    {
      type: "text-choice",
      question: "اختر التصريف الصحيح مع (wir):",
      text: "Wir _____ (spielen) im Garten.",
      options: ["spielen", "spielt", "spiele"],
      correct: 0,
      explanation: "💡 ينتهي التصريف مع wir بـ -en (الفعل في المصدر)."
    },
    {
      type: "text-choice",
      question: "اختر التصريف الصحيح مع (ihr):",
      text: "Ihr _____ (kommen) heute.",
      options: ["kommen", "kommst", "kommt"],
      correct: 2,
      explanation: "💡 ينتهي التصريف مع ihr (أنتم) بـ -t."
    }
  ],
  27: [
    {
      type: "text-choice",
      question: "الأفعال المنتهية بـ d أو t أو n يضاف لها e قبل st و t! اختر الصحيح:",
      text: "Er _____ (zeichnen / er-es-sie).",
      options: ["zeichnt", "zeichnet", "zeichnen"],
      correct: 1,
      explanation: "💡 مع الأفعال مثل zeichnen و arbeiten نضع e إضافية لسهولة النطق: zeichnet / arbeitet."
    },
    {
      type: "text-choice",
      question: "اختر التصريف المناسب لـ arbeiten مع du:",
      text: "Du _____ (arbeiten) gut.",
      options: ["arbeitst", "arbeitest", "arbeite"],
      correct: 1,
      explanation: "💡 du arbeitest (إضافة est)."
    },
    {
      type: "text-choice",
      question: "اختر التصريف المناسب لـ finden مع er:",
      text: "Er _____ (finden) das Buch.",
      options: ["findt", "findet", "finden"],
      correct: 1,
      explanation: "💡 er findet (إضافة et)."
    }
  ],
  28: [
    {
      type: "text-choice",
      question: "اختبار الوحدة 4 (سؤال 1): اختر الضمير المناسب: Das ist die Schultasche. _____ ist klein.",
      text: "Das ist die Schultasche. _____ ist klein.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Schultasche -> Sie."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 4 (سؤال 2): اختر التصريف المناسب: Wir _____ (trinken) Saft.",
      text: "Wir _____ Saft.",
      options: ["trinken", "trinkt", "trinke"],
      correct: 0,
      explanation: "💡 wir -> trinken."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 4 (سؤال 3): اختر الضمير والتصريف المناسب: Das ist der Kuli. _____ schreibt gut.",
      text: "Das ist der Kuli. _____ schreibt gut.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Kuli -> Er."
    }
  ],

  // ==================== WORLD 5: Odd word out & Verben (29-35) ====================
  29: [
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة (Was passt hier nicht!):",
      text: "اختر الكلمة المختلفة من المجموعة:",
      options: ["Buch", "Heft", "Tasche"],
      correct: 2,
      explanation: "💡 Buch و Heft أدوات كتابة ورقية ومحايد (das)، بينما Tasche حقيبة ومؤنث (die)!"
    },
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة:",
      text: "اختر الكلمة المختلفة:",
      options: ["Kuli", "Spitzer", "Schule"],
      correct: 2,
      explanation: "💡 Kuli و Spitzer من الأدوات المدرسية، بينما Schule (مدرسة) مكان!"
    },
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة:",
      text: "اختر الكلمة المختلفة:",
      options: ["Heft", "Tasche", "Buch"],
      correct: 1,
      explanation: "💡 Heft و Buch أداتهما das، بينما Tasche أداتها die."
    }
  ],
  30: [
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة بناءً على نوع الأشياء:",
      text: "اختر الكلمة المختلفة:",
      options: ["Banane", "Taschenrechner", "Computer"],
      correct: 0,
      explanation: "💡 Banane فاكهة وطعام، بينما Taschenrechner و Computer أجهزة إلكترونية!"
    },
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة:",
      text: "اختر الكلمة المختلفة:",
      options: ["Lineal", "Heft", "Banane"],
      correct: 2,
      explanation: "💡 Banane فاكهة، بينما Lineal و Heft أدوات دراسية."
    },
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة:",
      text: "اختر الكلمة المختلفة:",
      options: ["Schule", "Tasche", "Radiergummi"],
      correct: 0,
      explanation: "💡 Schule مكان، بينما باقي الكلمات مستلزمات شخصية."
    }
  ],
  31: [
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة بناءً على أداة التعريف (der vs die vs das):",
      text: "اختر الكلمة المختلفة:",
      options: ["Bleistift", "Schere", "Kugelschreiber"],
      correct: 1,
      explanation: "💡 Bleistift و Kugelschreiber أداتهما der، بينما Schere أداتها die!"
    },
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة بناءً على الأداة:",
      text: "اختر الكلمة المختلفة:",
      options: ["Kuli", "Spitzer", "Schere"],
      correct: 2,
      explanation: "💡 Kuli و Spitzer أداتهما der، بينما Schere أداتها die."
    },
    {
      type: "odd-word",
      question: "استخرج الكلمة الغريبة:",
      text: "اختر الكلمة المختلفة:",
      options: ["Radiergummi", "Tasche", "Marker"],
      correct: 1,
      explanation: "💡 Radiergummi و Marker أداتهما der، بينما Tasche أداتها die."
    }
  ],
  32: [
    {
      type: "text-choice",
      question: "اختر معنى الفعل الألماني باللغة العربية:",
      text: "Was bedeutet das Verb 'brauchen'?",
      options: ["يحتاج", "يقص", "يبحث"],
      correct: 0,
      explanation: "💡 الفعل brauchen يعني (يحتاج)."
    },
    {
      type: "text-choice",
      question: "ما معنى الفعل schneiden؟",
      text: "Was bedeutet 'schneiden'?",
      options: ["يكتب", "يقص / يقطع", "يحضر"],
      correct: 1,
      explanation: "💡 الفعل schneiden يعني (يقص أو يقطع)."
    },
    {
      type: "text-choice",
      question: "ما معنى الفعل kosten؟",
      text: "Was bedeutet 'kosten'?",
      options: ["يتكلف", "يجد", "يشير"],
      correct: 0,
      explanation: "💡 الفعل kosten يعني (يتكلف / السعر)."
    }
  ],
  33: [
    {
      type: "text-choice",
      question: "اختر المعنى الصحيح للفعل schreiben:",
      text: "Was bedeutet 'schreiben'?",
      options: ["يقص", "يكتب", "يحضر"],
      correct: 1,
      explanation: "💡 الفعل schreiben يعني (يكتب)."
    },
    {
      type: "text-choice",
      question: "ما معنى الفعل suchen؟",
      text: "Was bedeutet 'suchen'?",
      options: ["يبحث", "يوجد", "يقدم نفسه"],
      correct: 0,
      explanation: "💡 الفعل suchen يعني (يبحث عن)."
    },
    {
      type: "text-choice",
      question: "ما معنى الفعل zeigen؟",
      text: "Was bedeutet 'zeigen'?",
      options: ["يعرض / يشير", "يحتاج", "يتكلف"],
      correct: 0,
      explanation: "💡 الفعل zeigen يعني (يعرض / يوضح / يشير إلى)."
    }
  ],
  34: [
    {
      type: "text-choice",
      question: "اختر الفعل المناسب للجملة:",
      text: "Die Schere _____ gut. (المقص يقطع جيدا)",
      options: ["schneidet", "schreibt", "trinkt"],
      correct: 0,
      explanation: "💡 نستخدم الفعل schneidet مع المقص (Schere)."
    },
    {
      type: "text-choice",
      question: "اختر الفعل المناسب للجملة:",
      text: "Der Kuli _____ gut. (القلم يكتب جيدا)",
      options: ["schneidet", "schreibt", "bringt"],
      correct: 1,
      explanation: "💡 نستخدم الفعل schreibt مع القلم (Kuli)."
    },
    {
      type: "text-choice",
      question: "ما معنى الفعل sich vorstellen؟",
      text: "Was bedeutet 'sich vorstellen'?",
      options: ["يقدم نفسه", "يحضر الشنطة", "يبحث عن الكراسة"],
      correct: 0,
      explanation: "💡 Sich vorstellen تعني (يقدم نفسه)."
    }
  ],
  35: [
    {
      type: "text-choice",
      question: "اختبار الوحدة 5 (سؤال 1): استخرج الكلمة الغريبة من المجموعة:",
      text: "Was passt hier nicht? (Schere - Mäppchen - Lineal)",
      options: ["Schere", "Mäppchen", "Lineal"],
      correct: 0,
      explanation: "💡 Schere أداتها die ومؤنث، بينما Mäppchen و Lineal أداتهما das ومحايد."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 5 (سؤال 2): ما هو الفعل المناسب لـ (يبحث)؟",
      text: "Wie heißt 'يبحث' auf Deutsch?",
      options: ["suchen", "bringen", "holen"],
      correct: 0,
      explanation: "💡 suchen = يبحث."
    },
    {
      type: "text-choice",
      question: "اختبار الوحدة 5 (سؤال 3): أكمل بالكلمة الغريبة الصحيحة:",
      text: "Was passt hier nicht? (Kuli - Spitzer - Schule)",
      options: ["Kuli", "Spitzer", "Schule"],
      correct: 2,
      explanation: "💡 Schule مكان وليست أداة كتابة."
    }
  ],

  // ==================== WORLD 6: Boss Levels (36-40) ====================
  36: [
    {
      type: "text-choice",
      question: "👑 تحدي البوس 1 (سؤال 1): طابق الأداة والضمير بالجملة الكاملة:",
      text: "Das ist der Marker. _____ ist rot.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Marker -> Er."
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 1 (سؤال 2):",
      text: "Das ist das Lineal. _____ ist lang.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 das Lineal -> Es."
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 1 (سؤال 3):",
      text: "Das ist die Schultasche. _____ ist klein.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Schultasche -> Sie."
    }
  ],
  37: [
    {
      type: "text-choice",
      question: "👑 تحدي البوس 2 (سؤال 1): اختر الأداة والنفي الصحيح للجمع:",
      text: "Das sind _____ Scheren.",
      options: ["keine", "kein", "eine"],
      correct: 0,
      explanation: "💡 الجمع ينفى بـ keine."
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 2 (سؤال 2): اختر الفعل المناسب للجملة:",
      text: "Hier _____ zwei Kulis.",
      options: ["ist", "sind", "sein"],
      correct: 1,
      explanation: "💡 zwei Kulis جمع -> Hier sind."
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 2 (سؤال 3):",
      text: "Das ist _____ Heft.",
      options: ["ein", "eine", "keine"],
      correct: 0,
      explanation: "💡 das Heft -> ein Heft."
    }
  ],
  38: [
    {
      type: "text-choice",
      question: "👑 تحدي البوس 3 (سؤال 1): اختر التصريف المناسب للفعل والجملة:",
      text: "Ich _____ (schreiben) mit dem Kuli.",
      options: ["schreibe", "schreibst", "schreibt"],
      correct: 0,
      explanation: "💡 ich -> schreibe."
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 3 (سؤال 2):",
      text: "Er _____ (suchen) die Tasche.",
      options: ["suchst", "sucht", "suchen"],
      correct: 1,
      explanation: "💡 er -> sucht."
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 3 (سؤال 3):",
      text: "Wir _____ (brauchen) ein Lineal.",
      options: ["brauche", "braucht", "brauchen"],
      correct: 2,
      explanation: "💡 wir -> brauchen."
    }
  ],
  39: [
    {
      type: "text-choice",
      question: "👑 تحدي البوس 4 (سؤال 1): أسئلة شاملة:",
      text: "Was passt hier nicht? (Banane - Taschenrechner - Computer)",
      options: ["Banane", "Taschenrechner", "Computer"],
      correct: 0,
      explanation: "💡 Banane فاكهة."
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 4 (سؤال 2):",
      text: "Wo _____ die Bücher?",
      options: ["ist", "sind", "seid"],
      correct: 1,
      explanation: "💡 die Bücher جمع -> Wo sind...?"
    },
    {
      type: "text-choice",
      question: "👑 تحدي البوس 4 (سؤال 3):",
      text: "Das ist die Schere. _____ schneidet gut.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Schere -> Sie."
    }
  ],
  40: [
    {
      type: "text-choice",
      question: "🏆 الامتحان النهائي (سؤال 1 من 4): حدد الكلمة التي تأخذ das:",
      text: "Welches Wort ist neutral (das)?",
      options: ["Mäppchen", "Spitzer", "Schultasche"],
      correct: 0,
      explanation: "💡 das Mäppchen محايد."
    },
    {
      type: "text-choice",
      question: "🏆 الامتحان النهائي (سؤال 2 من 4): اختر نفي المفرد المذكر:",
      text: "Das ist _____ Bleistift.",
      options: ["kein", "keine", "nicht"],
      correct: 0,
      explanation: "💡 der Bleistift ينفى بـ kein."
    },
    {
      type: "text-choice",
      question: "🏆 الامتحان النهائي (سؤال 3 من 4): التعويض بالضمير:",
      text: "Das ist der Kuli. _____ schreibt gut.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Kuli -> Er."
    },
    {
      type: "text-choice",
      question: "🏆 الامتحان النهائي (سؤال 4 من 4): الجمع والفعل:",
      text: "Hier _____ vier Scheren.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 الجمع يمر مع sind: Hier sind..."
    }
  ]
};
