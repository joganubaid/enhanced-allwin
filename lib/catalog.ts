/* Allwin Marbles — product & project catalog (EN/AR), ported from catalog.js. */
export interface CatalogItem {
  en: string;
  ar: string;
  sen: string; // spec EN
  sar: string; // spec AR
}
export interface CatalogCategory {
  id: string;
  label: string; // i18n key
  items: CatalogItem[];
}

export const products: CatalogCategory[] = [
  { id: "marble", label: "products.marble", items: [
    { en: "Makrana White Marble", ar: "رخام مكرانا الأبيض", sen: "95–98% CaCO₃", sar: "٩٥–٩٨٪ كربونات كالسيوم" },
    { en: "Makrana Albeta Marble", ar: "رخام مكرانا ألبيتا", sen: "Calcite stone", sar: "حجر كالسيت" },
    { en: "Makrana Adanga Marble", ar: "رخام مكرانا أدانغا", sen: "Grey to brown", sar: "رمادي إلى بني" },
    { en: "Makrana Pink Marble", ar: "رخام مكرانا الوردي", sen: "Pink striations", sar: "خطوط وردية" },
    { en: "Makrana Kumari Marble", ar: "رخام مكرانا كوماري", sen: "Grey pattern", sar: "نمط رمادي" },
    { en: "Makrana Dungri Marble", ar: "رخام مكرانا دونغري", sen: "Finest quality", sar: "أرقى جودة" },
    { en: "Makrana Waves Marble", ar: "رخام مكرانا الموجي", sen: "Wavy pattern", sar: "نمط مويجي" },
    { en: "Makrana Grey Marble", ar: "رخام مكرانا الرمادي", sen: "Elegant grey", sar: "رمادي أنيق" },
    { en: "Ambaji White Marble", ar: "رخام أمباجي الأبيض", sen: "Gujarat origin", sar: "أصل غوجارات" },
    { en: "Ambaji Green Marble", ar: "رخام أمباجي الأخضر", sen: "Rich green tones", sar: "درجات خضراء غنية" },
    { en: "Fantasy Brown Marble", ar: "رخام بني فانتازي", sen: "Brown-beige veining", sar: "عروق بنية-بيج" },
  ]},
  { id: "granite", label: "products.granite", items: [
    { en: "Alaska Pink Granite", ar: "جرانيت ألاسكا الوردي", sen: "Icy blue tones", sar: "درجات زرقاء جليدية" },
    { en: "Alaska Blue Dunes", ar: "كثبان ألاسكا الزرقاء", sen: "Exotic pattern", sar: "نمط غريب" },
    { en: "Alaska Black & White", ar: "ألاسكا أبيض وأسود", sen: "Premium white", sar: "أبيض متميز" },
    { en: "Alaska Gold Granite", ar: "جرانيت ألاسكا الذهبي", sen: "Rich gold", sar: "ذهبي غني" },
    { en: "Alaska White Granite", ar: "جرانيت ألاسكا الأبيض", sen: "White with movement", sar: "أبيض بحركة" },
    { en: "Alaska Waves Granite", ar: "جرانيت ألاسكا الموجي", sen: "European green", sar: "أخضر أوروبي" },
    { en: "Alaska Mixed Granite", ar: "جرانيت ألاسكا المختلط", sen: "Warm cappuccino", sar: "كابتشينو دافئ" },
    { en: "Alaska Red Granite", ar: "جرانيت ألاسكا الأحمر", sen: "Indian red", sar: "أحمر هندي" },
    { en: "Alaska Super Gold", ar: "ألاسكا سوبر الذهبي", sen: "Divine gold", sar: "ذهبي مهيب" },
    { en: "Alaska Super Pink", ar: "ألاسكا سوبر الوردي", sen: "Rose pink", sar: "وردي" },
    { en: "Imperial Red Granite", ar: "جرانيت إمبراطوري أحمر", sen: "Deep red", sar: "أحمر عميق" },
    { en: "Black Galaxy Granite", ar: "جرانيت بلاك غالاكسي", sen: "Antique finish", sar: "تشطيب أثري" },
    { en: "Blue Pearl Granite", ar: "جرانيت اللؤلؤ الأزرق", sen: "Marine black", sar: "أسود بحري" },
    { en: "Tan Brown Granite", ar: "جرانيت بني فاتح", sen: "Brown tones", sar: "درجات بنية" },
    { en: "Kashmir White Granite", ar: "جرانيت كشمير الأبيض", sen: "White base", sar: "قاعدة بيضاء" },
    { en: "Jet Black Granite", ar: "جرانيت أسود نفاث", sen: "Deep black", sar: "أسود عميق" },
    { en: "Green Pearl Granite", ar: "جرانيت اللؤلؤ الأخضر", sen: "Green-toned", sar: "بلون أخضر" },
  ]},
  { id: "cultured", label: "products.cultured", items: [
    { en: "Iced White Cultured", ar: "أبيض متجمد مصنّع", sen: "Engineered · pure white", sar: "هندسي · أبيض نقي" },
    { en: "Calcutta Royal Cultured", ar: "كالكوتا الملكي مصنّع", sen: "Calacatta pattern", sar: "نمط كالاكاتا" },
    { en: "Ocean Blue Cultured", ar: "أزرق المحيط مصنّع", sen: "Blue tones", sar: "درجات زرقاء" },
    { en: "Black Cultured Marble", ar: "أسود مصنّع", sen: "Rich red", sar: "أحمر غني" },
    { en: "Snow White Cultured", ar: "أبيض ثلجي مصنّع", sen: "Snow white", sar: "أبيض ثلجي" },
    { en: "Nano White Cultured", ar: "نانو أبيض مصنّع", sen: "Nano white", sar: "نانو أبيض" },
    { en: "Beige Royal Cultured", ar: "بيج ملكي مصنّع", sen: "Warm beige", sar: "بيج دافئ" },
    { en: "Royal Marmi Cultured", ar: "رويال مارمي مصنّع", sen: "Royal pattern", sar: "نمط ملكي" },
  ]},
  { id: "mosaic", label: "products.mosaic", items: [
    { en: "Mosaic — Pattern 1", ar: "موزاييك — نمط ١", sen: "Custom patterns", sar: "أنماط مخصصة" },
    { en: "Mosaic — Pattern 2", ar: "موزاييك — نمط ٢", sen: "Geometric design", sar: "تصميم هندسي" },
    { en: "Mosaic — Pattern 3", ar: "موزاييك — نمط ٣", sen: "Contemporary", sar: "معاصر" },
    { en: "Mosaic — Pattern 4", ar: "موزاييك — نمط ٤", sen: "Classic design", sar: "تصميم كلاسيكي" },
    { en: "Mosaic — Herringbone", ar: "موزاييك — هيرنغبون", sen: "Elegant layout", sar: "تخطيط أنيق" },
    { en: "Mosaic — Hexagonal", ar: "موزاييك — سداسي", sen: "Modern pattern", sar: "نمط حديث" },
    { en: "Mosaic — Chevron", ar: "موزاييك — شيفرون", sen: "Trendy design", sar: "تصميم عصري" },
    { en: "Mosaic — Basket Weave", ar: "موزاييك — نسيج السلة", sen: "Traditional", sar: "تقليدي" },
  ]},
  { id: "quartz", label: "products.quartz", items: [
    { en: "Sparkle Quartz — Pure White", ar: "كوارتز لامع — أبيض نقي", sen: "Sparkle finish", sar: "تشطيب لامع" },
    { en: "Sparkle Quartz — Midnight Black", ar: "كوارتز لامع — أسود", sen: "Black sparkle", sar: "لمعان أسود" },
    { en: "Sparkle Quartz — Crystal Blue", ar: "كوارتز لامع — أزرق بلوري", sen: "Blue sparkle", sar: "لمعان أزرق" },
    { en: "Sparkle Quartz — Silver Grey", ar: "كوارتز لامع — رمادي فضي", sen: "Grey sparkle", sar: "لمعان رمادي" },
    { en: "Sparkle Quartz — Golden Sand", ar: "كوارتز لامع — رمل ذهبي", sen: "Gold sparkle", sar: "لمعان ذهبي" },
    { en: "Sparkle Quartz — Ruby Red", ar: "كوارتز لامع — أحمر ياقوتي", sen: "Red sparkle", sar: "لمعان أحمر" },
    { en: "Sparkle Quartz — Emerald Green", ar: "كوارتز لامع — أخضر زمردي", sen: "Green sparkle", sar: "لمعان أخضر" },
    { en: "Sparkle Quartz — Rose Pink", ar: "كوارتز لامع — وردي", sen: "Pink sparkle", sar: "لمعان وردي" },
  ]},
  { id: "handicrafts", label: "products.handicrafts", items: [
    { en: "Islamic Calligraphy Panels", ar: "لوحات الخط العربي", sen: "Hand Naqsh work", sar: "عمل نقش يدوي" },
    { en: "Marble Sculptures", ar: "منحوتات رخامية", sen: "Hand carved", sar: "منحوت يدوياً" },
    { en: "Decorative Wall Panels", ar: "لوحات جدارية زخرفية", sen: "Hand Naqsh work", sar: "عمل نقش يدوي" },
    { en: "Marble Dining Tables", ar: "طاولات طعام رخامية", sen: "Naqsh & inlay", sar: "نقش وترصيع" },
    { en: "Marble Bed Frames", ar: "أسرّة رخامية", sen: "Naqsh & inlay", sar: "نقش وترصيع" },
    { en: "Marble Arches & Columns", ar: "عقود وأعمدة رخامية", sen: "Islamic pattern", sar: "نمط إسلامي" },
    { en: "Muqarnas (Honeycomb)", ar: "المقرنصات", sen: "Honeycomb vaulting", sar: "قبو عسلي" },
    { en: "Jali / Lattice Work", ar: "أعمال الجالي والشبك", sen: "Islamic patterns", sar: "أنماط إسلامية" },
    { en: "Garden Furniture", ar: "أثاث الحديقة", sen: "Sandstone carving", sar: "نحت الحجر الرملي" },
    { en: "Marble Column Crowns", ar: "تيجان الأعمدة", sen: "Muqarnas design", sar: "تصميم مقرنص" },
    { en: "Marble Wash Basin", ar: "حوض رخامي", sen: "Hand-made", sar: "صنع يدوي" },
    { en: "Mausoleum Work", ar: "أعمال الأضرحة", sen: "Hand work", sar: "عمل يدوي" },
    { en: "Stone Inlay Work", ar: "أعمال الترصيع الحجري", sen: "Semi-precious stones", sar: "أحجار شبه كريمة" },
  ]},
];

export const projects: CatalogCategory[] = [
  { id: "religious", label: "projects.religious", items: [
    { en: "Masjid Interior — Islamic Arches & Marble Flooring", ar: "داخل المسجد — عقود إسلامية وأرضيات رخامية", sen: "Grand marble arches with geometric inlay flooring and chandelier work.", sar: "عقود رخامية فخمة مع أرضية ترصيع هندسية وأعمال ثريات." },
    { en: "Masjid Qibla & Mihrab — White Marble", ar: "قبلة ومحراب — رخام أبيض", sen: "White marble Qibla wall with hand-carved Mihrab and floral inlay.", sar: "جدار قبلة رخامي أبيض مع محراب منحوت يدوياً وترصيع زهري." },
    { en: "Masjid Wudu Area — Pattern Lattice", ar: "منطقة الوضوء — شبك مزخرف", sen: "Marble & granite wudu stations with Islamic geometric lattice panels.", sar: "محطات وضوء من الرخام والجرانيت بألواح شبكية هندسية إسلامية." },
    { en: "Masjid Exterior — Minaret & Jali Work", ar: "خارج المسجد — مئذنة وجالي", sen: "Complete exterior with illuminated minaret, dome and jali screens.", sar: "واجهة كاملة بمئذنة مضاءة وقبة وشاشات جالي." },
    { en: "Masjid Main Hall — Dome & Chandelier", ar: "القاعة الرئيسية — قبة وثريا", sen: "Grand prayer hall with ornate dome, crystal chandelier and Mihrab.", sar: "قاعة صلاة فخمة بقبة مزخرفة وثريا كريستالية ومحراب." },
    { en: "Masjid Interior — Geometric Inlay", ar: "داخل المسجد — ترصيع هندسي", sen: "Marble corridor with pointed arches and geometric inlay flooring.", sar: "ممر رخامي بعقود مدببة وأرضية ترصيع هندسية." },
  ]},
  { id: "heritage", label: "projects.heritage", items: [
    { en: "Islamic Calligraphy — Hand Naqsh Work", ar: "خط عربي — عمل نقش يدوي", sen: "White marble calligraphy panels for masjid & mausoleum.", sar: "لوحات خط رخامية بيضاء للمساجد والأضرحة." },
    { en: "Marble Jali & Lattice Work", ar: "أعمال الجالي الرخامي", sen: "Intricate marble Jali screens, Muqarnas and lattice work.", sar: "شاشات جالي رخامية دقيقة ومقرنصات وأعمال شبك." },
    { en: "Marble Arch — Islamic Pattern", ar: "عقد رخامي — نمط إسلامي", sen: "White marble arches with Islamic architectural patterns.", sar: "عقود رخامية بيضاء بأنماط معمارية إسلامية." },
    { en: "White Marble Mausoleum Work", ar: "أعمال ضريح رخامي أبيض", sen: "White marble hand work with Islamic architectural detailing.", sar: "عمل يدوي رخامي أبيض بتفاصيل معمارية إسلامية." },
    { en: "Muqarnas & Honeycomb Vaulting", ar: "مقرنصات وأقبية عسلية", sen: "White marble Muqarnas, Qibla work and lattice Panjara.", sar: "مقرنصات رخامية بيضاء وأعمال قبلة وشبك بنجارا." },
    { en: "Jodhpuri Stone Arch — Heritage Design", ar: "عقد حجر جودبوري — تصميم تراثي", sen: "Traditional Jodhpuri arch with hand-carved panels and Naqsh work.", sar: "عقد جودبوري تقليدي بألواح منحوتة يدوياً وعمل نقش." },
  ]},
  { id: "homeDecor", label: "projects.homeDecor", items: [
    { en: "White Marble Column & Cladding", ar: "عمود وتكسية رخامية بيضاء", sen: "Fluted white marble column with carved base.", sar: "عمود رخامي أبيض مخدد بقاعدة منحوتة." },
    { en: "Marble Baluster Staircase", ar: "درج رخامي بدرابزين", sen: "Hand-carved white marble baluster staircase with ornate railing.", sar: "درج رخامي أبيض منحوت يدوياً بدرابزين مزخرف." },
    { en: "Marble Sculptures & Figurines", ar: "منحوتات وتماثيل رخامية", sen: "Hand-carved sculptures using traditional Makrana techniques.", sar: "منحوتات يدوية بتقنيات مكرانا التقليدية." },
    { en: "White Marble & Stone Inlay Work", ar: "أعمال ترصيع رخامي وحجري", sen: "Lapis lazuli and semi-precious stone inlay in white marble.", sar: "ترصيع لازورد وأحجار شبه كريمة في رخام أبيض." },
    { en: "White Marble Entrance & Steps", ar: "مدخل ودرجات رخامية بيضاء", sen: "Polished white Makrana entrance with steps, columns and portico.", sar: "مدخل مكرانا أبيض مصقول بدرجات وأعمدة ورواق." },
    { en: "Z Black Granite Staircase", ar: "درج جرانيت أسود", sen: "Polished Z Black granite staircase with wooden railing.", sar: "درج جرانيت أسود مصقول بدرابزين خشبي." },
  ]},
];

/** Home gallery categories (label i18n key + how many tiles). */
export const homeCategories: { key: string; n: number }[] = [
  { key: "cat.floor", n: 13 }, { key: "cat.fountain", n: 6 },
  { key: "cat.handCraft", n: 16 }, { key: "cat.inlay", n: 6 },
  { key: "cat.masjid", n: 9 }, { key: "cat.stair", n: 7 }, { key: "cat.table", n: 11 },
];

/** Heritage "types of Makrana marble" — palette per type card (1..8). */
export const marbleTypePalettes = ["white", "white", "white", "grey", "grey", "pink", "rose", "brown"];
