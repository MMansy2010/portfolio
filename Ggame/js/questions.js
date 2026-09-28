// Complete 40-Level Questions Dataset for 6th Grade German Curriculum
// Based on "Al Khalil Language Schools" 6. Klasse Semester 1

const WORLDS_DATA = [
  {
    id: 1,
    title: "Lektion 1: Schulsachen und bestimmte Artikel",
    subtitle: "Definite Articles (Der / Das / Die)",
    icon: "🏫",
    color: "#3B82F6",
    levels: [1, 2, 3, 4, 5, 6, 7]
  },
  {
    id: 2,
    title: "Lektion 2: Singular, Plural und Sätze",
    subtitle: "Singular & Plural (ist / sind)",
    icon: "🎒",
    color: "#10B981",
    levels: [8, 9, 10, 11, 12, 13, 14]
  },
  {
    id: 3,
    title: "Lektion 3: Unbestimmte Artikel und Negation",
    subtitle: "Indefinite Articles & Negation (ein / eine vs. kein / keine)",
    icon: "✏️",
    color: "#F59E0B",
    levels: [15, 16, 17, 18, 19, 20, 21]
  },
  {
    id: 4,
    title: "Lektion 4: Personalpronomen und Verbkonjugation",
    subtitle: "Personal Pronouns & Verb Endings (er / es / sie)",
    icon: "👤",
    color: "#8B5CF6",
    levels: [22, 23, 24, 25, 26, 27, 28]
  },
  {
    id: 5,
    title: "Lektion 5: Das Kuckucksei, Verben und Bedeutungen",
    subtitle: "Odd Word Out & Verbs (Was passt hier nicht!)",
    icon: "🔍",
    color: "#EC4899",
    levels: [29, 30, 31, 32, 33, 34, 35]
  },
  {
    id: 6,
    title: "Lektion 6: Gesamtherausforderungen und Abschlussprüfungen",
    subtitle: "Boss Levels & Final Exams",
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
      question: "Wähle den richtigen bestimmten Artikel für das gezeigte Wort:",
      text: "____ Bleistift (Pencil)",
      options: ["der", "das", "die"],
      correct: 0,
      explanation: "💡 'Bleistift' is masculine and always takes the article 'der'."
    },
    {
      type: "image-choice",
      svg: "heft",
      question: "Wähle den passenden Artikel für 'Heft':",
      text: "____ Heft (Notebook)",
      options: ["der", "das", "die"],
      correct: 1,
      explanation: "💡 'Heft' (Notebook) is neutral and takes the article 'das'."
    },
    {
      type: "image-choice",
      svg: "schultasche",
      question: "Wähle den passenden Artikel für 'Schultasche':",
      text: "____ Schultasche (School bag)",
      options: ["der", "das", "die"],
      correct: 2,
      explanation: "💡 'Schultasche' (School bag) is feminine and takes the article 'die'."
    }
  ],
  2: [
    {
      type: "image-choice",
      svg: "spitzer",
      question: "Welcher Artikel passt zu 'Spitzer'?",
      text: "____ Spitzer (Pencil sharpener)",
      options: ["das", "der", "die"],
      correct: 1,
      explanation: "💡 'Spitzer' (Pencil sharpener) is masculine and takes the article 'der'."
    },
    {
      type: "image-choice",
      svg: "lineal",
      question: "Welcher Artikel passt zu 'Lineal'?",
      text: "____ Lineal (Ruler)",
      options: ["das", "der", "die"],
      correct: 0,
      explanation: "💡 'Lineal' (Ruler) is neutral and takes the article 'das'."
    },
    {
      type: "image-choice",
      svg: "schere",
      question: "Welcher Artikel passt zu 'Schere'?",
      text: "____ Schere (Scissors)",
      options: ["die", "das", "der"],
      correct: 0,
      explanation: "💡 'Schere' (Scissors) is feminine and takes the article 'die'."
    }
  ],
  3: [
    {
      type: "text-choice",
      question: "Wähle den passenden Artikel:",
      text: "____ Radiergummi (Eraser)",
      options: ["die", "das", "der"],
      correct: 2,
      explanation: "💡 'Radiergummi' is masculine and takes the article 'der'."
    },
    {
      type: "image-choice",
      svg: "buch",
      question: "Wähle den richtigen Artikel für 'Buch':",
      text: "____ Buch (Book)",
      options: ["die", "das", "der"],
      correct: 1,
      explanation: "💡 'Buch' (Book) is neutral and takes the article 'das'."
    },
    {
      type: "image-choice",
      svg: "mappe",
      question: "Wähle den richtigen Artikel für 'Mappe':",
      text: "____ Mappe (Folder)",
      options: ["der", "die", "das"],
      correct: 1,
      explanation: "💡 'Mappe' (Folder) is feminine and takes the article 'die'."
    }
  ],
  4: [
    {
      type: "image-choice",
      svg: "marker",
      question: "Wähle den richtigen Artikel für 'Marker':",
      text: "____ Marker (Highlighter)",
      options: ["der", "das", "die"],
      correct: 0,
      explanation: "💡 'Marker' is masculine and takes the article 'der'."
    },
    {
      type: "image-choice",
      svg: "kugelschreiber",
      question: "Welcher Artikel passt zu 'Kugelschreiber'?",
      text: "____ Kugelschreiber (Ballpoint pen)",
      options: ["das", "der", "die"],
      correct: 1,
      explanation: "💡 'Kugelschreiber' (Pen) is masculine and takes the article 'der'."
    },
    {
      type: "image-choice",
      svg: "taschenrechner",
      question: "Wähle den richtigen Artikel für 'Taschenrechner':",
      text: "____ Taschenrechner (Calculator)",
      options: ["die", "das", "der"],
      correct: 2,
      explanation: "💡 'Taschenrechner' (Calculator) is masculine and takes the article 'der'."
    }
  ],
  5: [
    {
      type: "text-choice",
      question: "Wähle den richtigen bestimmten Artikel:",
      text: "Wie heißt das auf Deutsch? _____ Mäppchen (Pencil case)",
      options: ["der", "das", "die"],
      correct: 1,
      explanation: "💡 'Mäppchen' (Pencil case) is neutral and takes the article 'das'."
    },
    {
      type: "text-choice",
      question: "Wähle den passenden Artikel:",
      text: "_____ Banane (Banana)",
      options: ["der", "das", "die"],
      correct: 2,
      explanation: "💡 'Banane' is feminine and takes the article 'die'."
    },
    {
      type: "text-choice",
      question: "Wähle den passenden Artikel:",
      text: "_____ Kuli (Ballpoint pen)",
      options: ["der", "das", "die"],
      correct: 0,
      explanation: "💡 'Kuli' is short for Kugelschreiber and takes the article 'der'."
    }
  ],
  6: [
    {
      type: "text-choice",
      question: "Ordne die richtigen Artikel zu:",
      text: "1) _____ Tasche  |  2) _____ Buch",
      options: ["1: die / 2: das", "1: der / 2: die", "1: das / 2: der"],
      correct: 0,
      explanation: "💡 die Tasche (feminine) & das Buch (neutral)."
    },
    {
      type: "text-choice",
      question: "Wähle den richtigen Artikel für den Satz:",
      text: "_____ Spitzer ist gelb.",
      options: ["Der", "Das", "Die"],
      correct: 0,
      explanation: "💡 'der Spitzer' (Pencil sharpener) is masculine."
    },
    {
      type: "text-choice",
      question: "Wähle den passenden Artikel für den Satz:",
      text: "_____ Lineal ist lang.",
      options: ["Der", "Das", "Die"],
      correct: 1,
      explanation: "💡 'das Lineal' (Ruler) is neutral."
    }
  ],
  7: [
    {
      type: "text-choice",
      question: "Lektion 1 Test (Frage 1): Welches Wort hat den Artikel 'der'?",
      text: "Welches Wort hat den Artikel 'der'?",
      options: ["Schere", "Bleistift", "Heft"],
      correct: 1,
      explanation: "💡 der Bleistift is masculine (die Schere is feminine, das Heft is neutral)."
    },
    {
      type: "text-choice",
      question: "Lektion 1 Test (Frage 2): Welches Wort hat den Artikel 'das'?",
      text: "Welches Wort hat den Artikel 'das'?",
      options: ["Mäppchen", "Tasche", "Spitzer"],
      correct: 0,
      explanation: "💡 das Mäppchen is neutral."
    },
    {
      type: "text-choice",
      question: "Lektion 1 Test (Frage 3): Welches Wort hat den Artikel 'die'?",
      text: "Welches Wort hat den Artikel 'die'?",
      options: ["Marker", "Lineal", "Schultasche"],
      correct: 2,
      explanation: "💡 die Schultasche is feminine."
    }
  ],

  // ==================== WORLD 2: Singular & Plural (8-14) ====================
  8: [
    {
      type: "text-choice",
      question: "Was ist der Plural von 'der Radiergummi'?",
      text: "der Radiergummi -> die ____",
      options: ["Radiergummie", "Radiergummis", "Radiergummin"],
      correct: 1,
      explanation: "💡 The plural of 'Radiergummi' adds -s: die Radiergummis."
    },
    {
      type: "text-choice",
      question: "Was ist der Plural von 'der Kugelschreiber'?",
      text: "der Kugelschreiber -> die ____",
      options: ["Kugelschreiber", "Kugelschreibere", "Kugelschreibern"],
      correct: 0,
      explanation: "💡 'Kugelschreiber' stays the same in plural, only the article changes to 'die'!"
    },
    {
      type: "text-choice",
      question: "Was ist der Plural von 'der Bleistift'?",
      text: "der Bleistift -> die ____",
      options: ["Bleistift", "Bleistifte", "Bleistiften"],
      correct: 1,
      explanation: "💡 The plural of 'Bleistift' adds -e: die Bleistifte."
    }
  ],
  9: [
    {
      type: "text-choice",
      question: "Was ist der Plural von 'das Heft'?",
      text: "das Heft -> die ____",
      options: ["Hefte", "Hefter", "Heften"],
      correct: 0,
      explanation: "💡 The plural of 'das Heft' is die Hefte (adds -e)."
    },
    {
      type: "text-choice",
      question: "Was ist der Plural von 'das Lineal'?",
      text: "das Lineal -> die ____",
      options: ["Linealen", "Lineale", "Linealer"],
      correct: 1,
      explanation: "💡 The plural of 'das Lineal' is die Lineale."
    },
    {
      type: "text-choice",
      question: "Was ist der Plural von 'das Buch'?",
      text: "das Buch -> die ____",
      options: ["Buche", "Bücher", "Büchern"],
      correct: 1,
      explanation: "💡 The plural of 'das Buch' gets an umlaut + -er: die Bücher."
    }
  ],
  10: [
    {
      type: "text-choice",
      question: "Was ist der Plural von 'die Schere'?",
      text: "die Schere -> die ____",
      options: ["Scheres", "Scheren", "Schere"],
      correct: 1,
      explanation: "💡 Nouns ending in -e form the plural with -n: die Scheren."
    },
    {
      type: "text-choice",
      question: "Was ist der Plural von 'die Mappe'?",
      text: "die Mappe -> die ____",
      options: ["Mappen", "Mappe", "Mapper"],
      correct: 0,
      explanation: "💡 The plural of 'die Mappe' is die Mappen."
    },
    {
      type: "text-choice",
      question: "Was ist der Plural von 'die Tasche'?",
      text: "die Tasche -> die ____",
      options: ["Taschen", "Tasche", "Tasches"],
      correct: 0,
      explanation: "💡 The plural of 'die Tasche' is die Taschen."
    }
  ],
  11: [
    {
      type: "text-choice",
      question: "Wähle das passende Verb für Singular oder Plural (ist / sind):",
      text: "Das _____ der Kuli.",
      options: ["ist", "sind", "sein"],
      correct: 0,
      explanation: "💡 We use 'ist' with singular nouns (der Kuli)."
    },
    {
      type: "text-choice",
      question: "Wähle das passende Verb im Plural:",
      text: "Das _____ die Scheren.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 We use 'sind' with plural nouns (die Scheren)."
    },
    {
      type: "text-choice",
      question: "Wähle das passende Verb für den Satz:",
      text: "Das _____ die Mappen.",
      options: ["ist", "sind", "bist"],
      correct: 1,
      explanation: "💡 We use 'sind' because 'die Mappen' is plural."
    }
  ],
  12: [
    {
      type: "text-choice",
      question: "Wähle die richtige Form für 'Hier ist / Hier sind':",
      text: "Hier _____ drei Bleistifte.",
      options: ["ist", "sind", "sein"],
      correct: 1,
      explanation: "💡 Use 'Hier sind' with numbers and plural nouns (drei Bleistifte)."
    },
    {
      type: "text-choice",
      question: "Wähle die passende Form:",
      text: "Hier _____ ein Heft.",
      options: ["ist", "sind", "seid"],
      correct: 0,
      explanation: "💡 Use 'Hier ist' with singular nouns (ein Heft)."
    },
    {
      type: "text-choice",
      question: "Wähle die passende Form:",
      text: "Hier _____ zwei Radiergummis.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 Use 'Hier sind' with plural nouns (zwei Radiergummis)."
    }
  ],
  13: [
    {
      type: "text-choice",
      question: "Ergänze die Frage im Singular:",
      text: "Wo _____ das Lineal?",
      options: ["ist", "sind", "seid"],
      correct: 0,
      explanation: "💡 Singular questions use 'Wo ist...?'"
    },
    {
      type: "text-choice",
      question: "Ergänze die Frage im Plural:",
      text: "Wo _____ die Lineale?",
      options: ["ist", "sind", "bist"],
      correct: 1,
      explanation: "💡 Plural questions use 'Wo sind...?'"
    },
    {
      type: "text-choice",
      question: "Wähle die passende Antwort:",
      text: "Wo ist die Tasche? -> Hier _____ die Tasche.",
      options: ["ist", "sind", "sein"],
      correct: 0,
      explanation: "💡 Singular answers start with 'Hier ist'."
    }
  ],
  14: [
    {
      type: "text-choice",
      question: "Lektion 2 Test (Frage 1): Welcher Satz ist im Plural richtig?",
      text: "Welcher Satz ist richtig?",
      options: [
        "Hier ist drei Bücher.",
        "Hier sind drei Bücher.",
        "Hier sind ein Buch."
      ],
      correct: 1,
      explanation: "💡 'Hier sind' is always used with plural nouns (drei Bücher)."
    },
    {
      type: "text-choice",
      question: "Lektion 2 Test (Frage 2): Was ist der Singular von 'die Spitzer'?",
      text: "Singular von 'die Spitzer':",
      options: ["das Spitzer", "der Spitzer", "die Spitzerin"],
      correct: 1,
      explanation: "💡 The singular of 'Spitzer' is 'der Spitzer'."
    },
    {
      type: "text-choice",
      question: "Lektion 2 Test (Frage 3): Ergänze den Satz: Hier _____ sechs Lineale.",
      text: "Hier _____ sechs Lineale.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 We use 'sind' because 'sechs Lineale' is plural."
    }
  ],

  // ==================== WORLD 3: ein / eine & kein / keine (15-21) ====================
  15: [
    {
      type: "text-choice",
      question: "Wähle den passenden unbestimmten Artikel (ein / eine):",
      text: "Das ist _____ Bleistift. (der Bleistift)",
      options: ["ein", "eine", "keine"],
      correct: 0,
      explanation: "💡 Masculine nouns (der) use 'ein' as indefinite article."
    },
    {
      type: "text-choice",
      question: "Wähle den unbestimmten Artikel für Femininum:",
      text: "Das ist _____ Schultasche. (die Schultasche)",
      options: ["ein", "eine", "kein"],
      correct: 1,
      explanation: "💡 Feminine nouns (die) use 'eine' as indefinite article."
    },
    {
      type: "text-choice",
      question: "Wähle den Negationsartikel für Neutrum:",
      text: "Das ist _____ Lineal. (das Lineal)",
      options: ["keine", "kein", "nicht"],
      correct: 1,
      explanation: "💡 Neutral nouns (das) use 'kein' for negation."
    }
  ],
  16: [
    {
      type: "text-choice",
      question: "Wähle den passenden unbestimmten Artikel:",
      text: "Das ist _____ Heft. (das Heft)",
      options: ["eine", "ein", "keine"],
      correct: 1,
      explanation: "💡 Neutral nouns (das) use 'ein' as indefinite article."
    },
    {
      type: "text-choice",
      question: "Wähle den passenden Artikel:",
      text: "Das ist _____ Schere. (die Schere)",
      options: ["ein", "eine", "kein"],
      correct: 1,
      explanation: "💡 die Schere -> eine Schere."
    },
    {
      type: "text-choice",
      question: "Wähle den passenden Negationsartikel (kein / keine):",
      text: "Das ist _____ Spitzer. (der Spitzer)",
      options: ["kein", "keine", "nicht"],
      correct: 0,
      explanation: "💡 Masculine nouns (der) use 'kein' for negation."
    }
  ],
  17: [
    {
      type: "text-choice",
      question: "Wähle den richtigen Artikel:",
      text: "Das ist _____ Buch. (das Buch)",
      options: ["ein", "eine", "kein"],
      correct: 0,
      explanation: "💡 das Buch -> ein Buch."
    },
    {
      type: "text-choice",
      question: "Wähle den richtigen Artikel:",
      text: "Das ist _____ Banane. (die Banane)",
      options: ["ein", "eine", "kein"],
      correct: 1,
      explanation: "💡 die Banane -> eine Banane."
    },
    {
      type: "text-choice",
      question: "Wähle die richtige Negation:",
      text: "Das ist _____ Mäppchen. (das Mäppchen)",
      options: ["kein", "keine", "ein"],
      correct: 0,
      explanation: "💡 das Mäppchen -> kein Mäppchen."
    }
  ],
  18: [
    {
      type: "text-choice",
      question: "Wähle den Negationsartikel für Femininum:",
      text: "Das ist _____ Tasche. (die Tasche)",
      options: ["kein", "keine", "ein"],
      correct: 1,
      explanation: "💡 Feminine nouns (die) use 'keine' for negation."
    },
    {
      type: "text-choice",
      question: "Wähle den Negationsartikel im Plural:",
      text: "Das sind _____ Bücher. (die Bücher)",
      options: ["kein", "keine", "ein"],
      correct: 1,
      explanation: "💡 Plural nouns use 'keine' for negation (no indefinite article in plural!)."
    },
    {
      type: "text-choice",
      question: "Wähle die Negation für den Plural:",
      text: "Das sind _____ Scheren.",
      options: ["kein", "keine", "eine"],
      correct: 1,
      explanation: "💡 Always use 'keine' when negating plural nouns."
    }
  ],
  19: [
    {
      type: "text-choice",
      question: "Vervollständige die Artikelregel:",
      text: "Der / Das -> ein / kein | Die / Die Pl. -> ____ / ____",
      options: ["eine / keine", "ein / kein", "eine / kein"],
      correct: 0,
      explanation: "💡 Der & Das take ein / kein. Die (Feminine & Plural) takes eine / keine!"
    },
    {
      type: "text-choice",
      question: "Wähle die richtige Option:",
      text: "Das ist (kein - keine) Radiergummi.",
      options: ["kein", "keine", "eine"],
      correct: 0,
      explanation: "💡 der Radiergummi -> kein Radiergummi."
    },
    {
      type: "text-choice",
      question: "Wähle die richtige Option:",
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
      question: "Antworte mit der passenden Negation:",
      text: "Ist das eine Schere? (Image: Eraser / Radiergummi)",
      options: [
        "Nein, das ist keine Schere. Das ist ein Radiergummi.",
        "Ja, das ist eine Schere.",
        "Nein, das ist ein Schere."
      ],
      correct: 0,
      explanation: "💡 Correct negative response: Nein, das ist keine Schere. Das ist ein Radiergummi."
    },
    {
      type: "text-choice",
      svg: "buch",
      question: "Antworte positiv zum Bild:",
      text: "Ist das ein Buch? (Image: Book / Buch)",
      options: [
        "Ja, das ist ein Buch.",
        "Nein, das ist kein Buch.",
        "Ja, das ist eine Buch."
      ],
      correct: 0,
      explanation: "💡 The image shows a book, so the correct affirmative answer is: Ja, das ist ein Buch."
    },
    {
      type: "text-choice",
      svg: "schere",
      question: "Antworte negativ passend zum Bild:",
      text: "Ist das ein Radiergummi? (Image: Scissors / Schere)",
      options: [
        "Nein, das ist kein Radiergummi. Das ist eine Schere.",
        "Ja, das ist ein Radiergummi.",
        "Nein, das ist keine Radiergummi."
      ],
      correct: 0,
      explanation: "💡 The image shows scissors: negate eraser with 'kein Radiergummi' and confirm 'eine Schere'."
    }
  ],
  21: [
    {
      type: "text-choice",
      question: "Lektion 3 Test (Frage 1): Wähle den richtigen Artikel für den Satz:",
      text: "Das ist _____ Marker.",
      options: ["ein", "eine", "keine"],
      correct: 0,
      explanation: "💡 der Marker -> ein Marker."
    },
    {
      type: "text-choice",
      question: "Lektion 3 Test (Frage 2): Wähle den Negationsartikel im Plural:",
      text: "Das sind _____ Radiergummis.",
      options: ["keine", "kein", "eine"],
      correct: 0,
      explanation: "💡 die Radiergummis (plural) takes 'keine'."
    },
    {
      type: "text-choice",
      question: "Lektion 3 Test (Frage 3): Beantworte die Frage: Ist das ein Mäppchen?",
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
      question: "Ersetze das maskuline Nomen (der) durch das richtige Personalpronomen:",
      text: "Das ist der Bleistift. _____ ist rot.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 Nouns with article 'der' are replaced by the pronoun 'Er' (He/It)."
    },
    {
      type: "text-choice",
      question: "Ersetze das neutrale Nomen (das) durch das richtige Personalpronomen:",
      text: "Das ist das Buch. _____ hat viele Bilder.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 Nouns with article 'das' are replaced by the pronoun 'Es' (It)."
    },
    {
      type: "text-choice",
      question: "Ersetze das feminine Nomen (die) durch das richtige Personalpronomen:",
      text: "Das ist die Schere. _____ schneidet gut.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 Nouns with article 'die' are replaced by the pronoun 'Sie' (She/It)."
    }
  ],
  23: [
    {
      type: "text-choice",
      question: "Wähle das passende Ersatzpronomen:",
      text: "Das ist der Marker. _____ ist gelb.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Marker -> Er."
    },
    {
      type: "text-choice",
      question: "Wähle das passende Ersatzpronomen:",
      text: "Das ist das Baby. _____ ist sehr schön.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 das Baby -> Es."
    },
    {
      type: "text-choice",
      question: "Wähle das passende Ersatzpronomen:",
      text: "Das ist die Tasche. _____ ist groß.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Tasche -> Sie."
    }
  ],
  24: [
    {
      type: "text-choice",
      question: "Wähle das passende Ersatzpronomen:",
      text: "Das ist der Kugelschreiber. _____ schreibt gut.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Kugelschreiber -> Er."
    },
    {
      type: "text-choice",
      question: "Wähle das passende Ersatzpronomen:",
      text: "Das ist das Heft. _____ ist neu.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 das Heft -> Es."
    },
    {
      type: "text-choice",
      question: "Wähle das passende Ersatzpronomen:",
      text: "Das ist die Banane. _____ ist lecker.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Banane -> Sie."
    }
  ],
  25: [
    {
      type: "text-choice",
      question: "Wähle die richtige Verbkonjugation für (ich / du):",
      text: "Ich _____ (trinken) Wasser.",
      options: ["trinke", "trinkst", "trinkt"],
      correct: 0,
      explanation: "💡 Verbs conjugated with 'ich' always end in -e."
    },
    {
      type: "text-choice",
      question: "Wähle die richtige Konjugation für 'du':",
      text: "Du _____ (kommen) aus Ägypten.",
      options: ["komme", "kommst", "kommt"],
      correct: 1,
      explanation: "💡 Verbs conjugated with 'du' always end in -st."
    },
    {
      type: "text-choice",
      question: "Wähle die richtige Konjugation für 'ich':",
      text: "Ich _____ (spielen) Fußball.",
      options: ["spiele", "spielst", "spielt"],
      correct: 0,
      explanation: "💡 ich -> spiele (ending -e)."
    }
  ],
  26: [
    {
      type: "text-choice",
      question: "Wähle die richtige Konjugation für (er / es / sie):",
      text: "Er _____ (trinken) Milch.",
      options: ["trinke", "trinkst", "trinkt"],
      correct: 2,
      explanation: "💡 Verbs conjugated with 'er / es / sie' end in -t."
    },
    {
      type: "text-choice",
      question: "Wähle die richtige Konjugation für 'wir':",
      text: "Wir _____ (spielen) im Garten.",
      options: ["spielen", "spielt", "spiele"],
      correct: 0,
      explanation: "💡 Verbs conjugated with 'wir' end in -en."
    },
    {
      type: "text-choice",
      question: "Wähle die richtige Konjugation für 'ihr':",
      text: "Ihr _____ (kommen) heute.",
      options: ["kommen", "kommst", "kommt"],
      correct: 2,
      explanation: "💡 Verbs conjugated with 'ihr' (you all) end in -t."
    }
  ],
  27: [
    {
      type: "text-choice",
      question: "Verben auf -d, -t, -n erhalten ein -e- vor der Endung. Wähle die richtige Form:",
      text: "Er _____ (zeichnen / er-es-sie).",
      options: ["zeichnt", "zeichnet", "zeichnen"],
      correct: 1,
      explanation: "💡 Verbs with stem ending in -d, -t, -n add an extra -e- before endings (zeichnet, arbeitet)."
    },
    {
      type: "text-choice",
      question: "Wähle die Konjugation von 'arbeiten' mit 'du':",
      text: "Du _____ (arbeiten) gut.",
      options: ["arbeitst", "arbeitest", "arbeite"],
      correct: 1,
      explanation: "💡 du arbeitest (adds -est)."
    },
    {
      type: "text-choice",
      question: "Wähle die Konjugation von 'finden' mit 'er':",
      text: "Er _____ (finden) das Buch.",
      options: ["findt", "findet", "finden"],
      correct: 1,
      explanation: "💡 er findet (adds -et)."
    }
  ],
  28: [
    {
      type: "text-choice",
      question: "Lektion 4 Test (Frage 1): Wähle das passende Pronomen: Das ist die Schultasche. _____ ist klein.",
      text: "Das ist die Schultasche. _____ ist klein.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Schultasche -> Sie."
    },
    {
      type: "text-choice",
      question: "Lektion 4 Test (Frage 2): Wähle die passende Konjugation: Wir _____ (trinken) Saft.",
      text: "Wir _____ Saft.",
      options: ["trinken", "trinkt", "trinke"],
      correct: 0,
      explanation: "💡 wir -> trinken."
    },
    {
      type: "text-choice",
      question: "Lektion 4 Test (Frage 3): Wähle das passende Pronomen: Das ist der Kuli. _____ schreibt gut.",
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
      question: "Finde das Kuckucksei (Was passt hier nicht!):",
      text: "Welches Wort passt nicht in die Gruppe?",
      options: ["Buch", "Heft", "Tasche"],
      correct: 2,
      explanation: "💡 'Buch' & 'Heft' are paper items (das), while 'Tasche' is a bag (die)!"
    },
    {
      type: "odd-word",
      question: "Finde das Kuckucksei:",
      text: "Welches Wort passt nicht?",
      options: ["Kuli", "Spitzer", "Schule"],
      correct: 2,
      explanation: "💡 'Kuli' & 'Spitzer' are tools, while 'Schule' (School) is a place!"
    },
    {
      type: "odd-word",
      question: "Finde das Kuckucksei:",
      text: "Welches Wort passt nicht?",
      options: ["Heft", "Tasche", "Buch"],
      correct: 1,
      explanation: "💡 'Heft' & 'Buch' take the article 'das', while 'Tasche' takes 'die'."
    }
  ],
  30: [
    {
      type: "odd-word",
      question: "Welches Wort passt semantisch nicht?",
      text: "Welches Wort passt nicht?",
      options: ["Banane", "Taschenrechner", "Computer"],
      correct: 0,
      explanation: "💡 'Banane' is food, while 'Taschenrechner' & 'Computer' are electronic devices!"
    },
    {
      type: "odd-word",
      question: "Finde das Kuckucksei:",
      text: "Welches Wort passt nicht?",
      options: ["Lineal", "Heft", "Banane"],
      correct: 2,
      explanation: "💡 'Banane' is a fruit, while 'Lineal' & 'Heft' are school supplies."
    },
    {
      type: "odd-word",
      question: "Finde das Kuckucksei:",
      text: "Welches Wort passt nicht?",
      options: ["Schule", "Tasche", "Radiergummi"],
      correct: 0,
      explanation: "💡 'Schule' is a place, while the others are personal items."
    }
  ],
  31: [
    {
      type: "odd-word",
      question: "Welches Wort hat einen anderen Artikel?",
      text: "Welches Wort passt nicht?",
      options: ["Bleistift", "Schere", "Kugelschreiber"],
      correct: 1,
      explanation: "💡 'Bleistift' & 'Kugelschreiber' take 'der', while 'Schere' takes 'die'!"
    },
    {
      type: "odd-word",
      question: "Welches Wort hat einen anderen Artikel?",
      text: "Welches Wort passt nicht?",
      options: ["Kuli", "Spitzer", "Schere"],
      correct: 2,
      explanation: "💡 'Kuli' & 'Spitzer' take 'der', while 'Schere' takes 'die'."
    },
    {
      type: "odd-word",
      question: "Finde das Kuckucksei:",
      text: "Welches Wort passt nicht?",
      options: ["Radiergummi", "Tasche", "Marker"],
      correct: 1,
      explanation: "💡 'Radiergummi' & 'Marker' take 'der', while 'Tasche' takes 'die'."
    }
  ],
  32: [
    {
      type: "text-choice",
      question: "What does the German verb mean?",
      text: "Was bedeutet das Verb 'brauchen'?",
      options: ["to need", "to cut", "to search"],
      correct: 0,
      explanation: "💡 The verb 'brauchen' means 'to need'."
    },
    {
      type: "text-choice",
      question: "What does the verb 'schneiden' mean?",
      text: "Was bedeutet 'schneiden'?",
      options: ["to write", "to cut", "to fetch"],
      correct: 1,
      explanation: "💡 The verb 'schneiden' means 'to cut'."
    },
    {
      type: "text-choice",
      question: "What does the verb 'kosten' mean?",
      text: "Was bedeutet 'kosten'?",
      options: ["to cost", "to find", "to show"],
      correct: 0,
      explanation: "💡 The verb 'kosten' means 'to cost'."
    }
  ],
  33: [
    {
      type: "text-choice",
      question: "What does the verb 'schreiben' mean?",
      text: "Was bedeutet 'schreiben'?",
      options: ["to cut", "to write", "to fetch"],
      correct: 1,
      explanation: "💡 The verb 'schreiben' means 'to write'."
    },
    {
      type: "text-choice",
      question: "What does the verb 'suchen' mean?",
      text: "Was bedeutet 'suchen'?",
      options: ["to search", "to find", "to introduce oneself"],
      correct: 0,
      explanation: "💡 The verb 'suchen' means 'to search / look for'."
    },
    {
      type: "text-choice",
      question: "What does the verb 'zeigen' mean?",
      text: "Was bedeutet 'zeigen'?",
      options: ["to show", "to need", "to cost"],
      correct: 0,
      explanation: "💡 The verb 'zeigen' means 'to show / point out'."
    }
  ],
  34: [
    {
      type: "text-choice",
      question: "Wähle das passende Verb für den Satz:",
      text: "Die Schere _____ gut. (The scissors cut well)",
      options: ["schneidet", "schreibt", "trinkt"],
      correct: 0,
      explanation: "💡 We use the verb 'schneidet' with scissors (Schere)."
    },
    {
      type: "text-choice",
      question: "Wähle das passende Verb für den Satz:",
      text: "Der Kuli _____ gut. (The pen writes well)",
      options: ["schneidet", "schreibt", "bringt"],
      correct: 1,
      explanation: "💡 We use the verb 'schreibt' with pen (Kuli)."
    },
    {
      type: "text-choice",
      question: "What does 'sich vorstellen' mean?",
      text: "Was bedeutet 'sich vorstellen'?",
      options: ["to introduce oneself", "to bring the bag", "to look for the notebook"],
      correct: 0,
      explanation: "💡 'Sich vorstellen' means 'to introduce oneself'."
    }
  ],
  35: [
    {
      type: "text-choice",
      question: "Lektion 5 Test (Frage 1): Welches Wort passt nicht?",
      text: "Was passt hier nicht? (Schere - Mäppchen - Lineal)",
      options: ["Schere", "Mäppchen", "Lineal"],
      correct: 0,
      explanation: "💡 'Schere' is feminine (die), while 'Mäppchen' & 'Lineal' are neutral (das)."
    },
    {
      type: "text-choice",
      question: "Lektion 5 Test (Frage 2): What is the German verb for 'search/look for'?",
      text: "Wie heißt 'to search / look for' auf Deutsch?",
      options: ["suchen", "bringen", "holen"],
      correct: 0,
      explanation: "💡 suchen = to search / look for."
    },
    {
      type: "text-choice",
      question: "Lektion 5 Test (Frage 3): Welches Wort passt nicht?",
      text: "Was passt hier nicht? (Kuli - Spitzer - Schule)",
      options: ["Kuli", "Spitzer", "Schule"],
      correct: 2,
      explanation: "💡 'Schule' is a place, not a writing tool."
    }
  ],

  // ==================== WORLD 6: Boss Levels (36-40) ====================
  36: [
    {
      type: "text-choice",
      question: "👑 Boss Challenge 1 (Frage 1): Verbinde Artikel und Pronomen:",
      text: "Das ist der Marker. _____ ist rot.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Marker -> Er."
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 1 (Frage 2):",
      text: "Das ist das Lineal. _____ ist lang.",
      options: ["Er", "Es", "Sie"],
      correct: 1,
      explanation: "💡 das Lineal -> Es."
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 1 (Frage 3):",
      text: "Das ist die Schultasche. _____ ist klein.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Schultasche -> Sie."
    }
  ],
  37: [
    {
      type: "text-choice",
      question: "👑 Boss Challenge 2 (Frage 1): Plural & Negation:",
      text: "Das sind _____ Scheren.",
      options: ["keine", "kein", "eine"],
      correct: 0,
      explanation: "💡 Plural is negated with 'keine'."
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 2 (Frage 2): Wähle das passende Verb:",
      text: "Hier _____ zwei Kulis.",
      options: ["ist", "sind", "sein"],
      correct: 1,
      explanation: "💡 'zwei Kulis' is plural -> Hier sind."
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 2 (Frage 3):",
      text: "Das ist _____ Heft.",
      options: ["ein", "eine", "keine"],
      correct: 0,
      explanation: "💡 das Heft -> ein Heft."
    }
  ],
  38: [
    {
      type: "text-choice",
      question: "👑 Boss Challenge 3 (Frage 1): Verbkonjugation im Satz:",
      text: "Ich _____ (schreiben) mit dem Kuli.",
      options: ["schreibe", "schreibst", "schreibt"],
      correct: 0,
      explanation: "💡 ich -> schreibe."
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 3 (Frage 2):",
      text: "Er _____ (suchen) die Tasche.",
      options: ["suchst", "sucht", "suchen"],
      correct: 1,
      explanation: "💡 er -> sucht."
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 3 (Frage 3):",
      text: "Wir _____ (brauchen) ein Lineal.",
      options: ["brauche", "braucht", "brauchen"],
      correct: 2,
      explanation: "💡 wir -> brauchen."
    }
  ],
  39: [
    {
      type: "text-choice",
      question: "👑 Boss Challenge 4 (Frage 1): Gemischte Fragen:",
      text: "Was passt hier nicht? (Banane - Taschenrechner - Computer)",
      options: ["Banane", "Taschenrechner", "Computer"],
      correct: 0,
      explanation: "💡 'Banane' is food."
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 4 (Frage 2):",
      text: "Wo _____ die Bücher?",
      options: ["ist", "sind", "seid"],
      correct: 1,
      explanation: "💡 'die Bücher' is plural -> Wo sind...?"
    },
    {
      type: "text-choice",
      question: "👑 Boss Challenge 4 (Frage 3):",
      text: "Das ist die Schere. _____ schneidet gut.",
      options: ["Er", "Es", "Sie"],
      correct: 2,
      explanation: "💡 die Schere -> Sie."
    }
  ],
  40: [
    {
      type: "text-choice",
      question: "🏆 Abschlussprüfung (Frage 1 von 4): Welches Wort ist neutral (das)?",
      text: "Welches Wort ist neutral (das)?",
      options: ["Mäppchen", "Spitzer", "Schultasche"],
      correct: 0,
      explanation: "💡 das Mäppchen is neutral."
    },
    {
      type: "text-choice",
      question: "🏆 Abschlussprüfung (Frage 2 von 4): Wähle die Negation für Maskulinum:",
      text: "Das ist _____ Bleistift.",
      options: ["kein", "keine", "nicht"],
      correct: 0,
      explanation: "💡 der Bleistift is negated with 'kein'."
    },
    {
      type: "text-choice",
      question: "🏆 Abschlussprüfung (Frage 3 von 4): Pronomen-Ersetzung:",
      text: "Das ist der Kuli. _____ schreibt gut.",
      options: ["Er", "Es", "Sie"],
      correct: 0,
      explanation: "💡 der Kuli -> Er."
    },
    {
      type: "text-choice",
      question: "🏆 Abschlussprüfung (Frage 4 von 4): Plural und Verb:",
      text: "Hier _____ vier Scheren.",
      options: ["ist", "sind", "bin"],
      correct: 1,
      explanation: "💡 Plural takes 'sind': Hier sind..."
    }
  ]
};
