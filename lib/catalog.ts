/* Allwin Marbles — product & project catalog (EN/AR) + real photo paths. */
export interface CatalogItem {
  en: string;
  ar: string;
  sen: string; // spec EN
  sar: string; // spec AR
  img: string; // photo under /public
}
export interface CatalogCategory {
  id: string;
  label: string; // i18n key
  items: CatalogItem[];
}

export const products: CatalogCategory[] = [
  { id: "marble", label: "products.marble", items: [
    { en: "Makrana White Marble", ar: "رخام مكرانا الأبيض", sen: "95–98% CaCO₃", sar: "٩٥–٩٨٪ كربونات كالسيوم", img: "/assets/marble-makrana-white.jpg" },
    { en: "Makrana Albeta Marble", ar: "رخام مكرانا ألبيتا", sen: "Calcite stone", sar: "حجر كالسيت", img: "/assets/marble-makrana-albeta.jpg" },
    { en: "Makrana Adanga Marble", ar: "رخام مكرانا أدانغا", sen: "Grey to brown", sar: "رمادي إلى بني", img: "/assets/marble-makrana-adanga.jpg" },
    { en: "Makrana Pink Marble", ar: "رخام مكرانا الوردي", sen: "Pink striations", sar: "خطوط وردية", img: "/assets/marble-makrana-pink.jpg" },
    { en: "Makrana Kumari Marble", ar: "رخام مكرانا كوماري", sen: "Grey pattern", sar: "نمط رمادي", img: "/assets/marble-makrana-kumari.jpg" },
    { en: "Makrana Dungri Marble", ar: "رخام مكرانا دونغري", sen: "Finest quality", sar: "أرقى جودة", img: "/assets/marble-makrana-dungri.jpg" },
    { en: "Makrana Waves Marble", ar: "رخام مكرانا الموجي", sen: "Wavy pattern", sar: "نمط مويجي", img: "/assets/marble-makrana-waves.jpg" },
    { en: "Makrana Grey Marble", ar: "رخام مكرانا الرمادي", sen: "Elegant grey", sar: "رمادي أنيق", img: "/assets/marble-makrana-grey.jpg" },
    { en: "Ambaji White Marble", ar: "رخام أمباجي الأبيض", sen: "Gujarat origin", sar: "أصل غوجارات", img: "/assets/marble-ambaji-white.jpg" },
    { en: "Ambaji Green Marble", ar: "رخام أمباجي الأخضر", sen: "Rich green tones", sar: "درجات خضراء غنية", img: "/assets/marble-ambaji-green.jpg" },
    { en: "Fantasy Brown Marble", ar: "رخام بني فانتازي", sen: "Brown-beige veining", sar: "عروق بنية-بيج", img: "/assets/marble-fantasy-brown.jpg" },
  ]},
  { id: "granite", label: "products.granite", items: [
    { en: "Alaska Pink Granite", ar: "جرانيت ألاسكا الوردي", sen: "Icy blue tones", sar: "درجات زرقاء جليدية", img: "/assets/granite-alaska-pink.jpg" },
    { en: "Alaska Blue Dunes", ar: "كثبان ألاسكا الزرقاء", sen: "Exotic pattern", sar: "نمط غريب", img: "/assets/granite-alaska-blue-dunes.jpg" },
    { en: "Alaska Black & White", ar: "ألاسكا أبيض وأسود", sen: "Premium white", sar: "أبيض متميز", img: "/assets/granite-alaska-black-white.jpg" },
    { en: "Alaska Gold Granite", ar: "جرانيت ألاسكا الذهبي", sen: "Rich gold", sar: "ذهبي غني", img: "/assets/granite-alaska-gold.jpg" },
    { en: "Alaska White Granite", ar: "جرانيت ألاسكا الأبيض", sen: "White with movement", sar: "أبيض بحركة", img: "/assets/granite-alaska-white.jpg" },
    { en: "Alaska Waves Granite", ar: "جرانيت ألاسكا الموجي", sen: "European green", sar: "أخضر أوروبي", img: "/assets/granite-alaska-waves.jpg" },
    { en: "Alaska Mixed Granite", ar: "جرانيت ألاسكا المختلط", sen: "Warm cappuccino", sar: "كابتشينو دافئ", img: "/assets/granite-alaska-mixed.jpg" },
    { en: "Alaska Red Granite", ar: "جرانيت ألاسكا الأحمر", sen: "Indian red", sar: "أحمر هندي", img: "/assets/granite-alaska-red.jpg" },
    { en: "Alaska Super Gold", ar: "ألاسكا سوبر الذهبي", sen: "Divine gold", sar: "ذهبي مهيب", img: "/assets/granite-alaska-super-gold.jpg" },
    { en: "Alaska Super Pink", ar: "ألاسكا سوبر الوردي", sen: "Rose pink", sar: "وردي", img: "/assets/granite-alaska-super-pink.jpg" },
    { en: "Imperial Red Granite", ar: "جرانيت إمبراطوري أحمر", sen: "Deep red", sar: "أحمر عميق", img: "/assets/granite-imperial-red.jpg" },
    { en: "Black Galaxy Granite", ar: "جرانيت بلاك غالاكسي", sen: "Antique finish", sar: "تشطيب أثري", img: "/assets/granite-black-galaxy.jpg" },
    { en: "Blue Pearl Granite", ar: "جرانيت اللؤلؤ الأزرق", sen: "Marine black", sar: "أسود بحري", img: "/assets/granite-blue-pearl.jpg" },
    { en: "Tan Brown Granite", ar: "جرانيت بني فاتح", sen: "Brown tones", sar: "درجات بنية", img: "/assets/granite-tan-brown.jpg" },
    { en: "Kashmir White Granite", ar: "جرانيت كشمير الأبيض", sen: "White base", sar: "قاعدة بيضاء", img: "/assets/granite-kashmir-white.jpg" },
    { en: "Jet Black Granite", ar: "جرانيت أسود نفاث", sen: "Deep black", sar: "أسود عميق", img: "/assets/granite-jet-black.jpg" },
    { en: "Green Pearl Granite", ar: "جرانيت اللؤلؤ الأخضر", sen: "Green-toned", sar: "بلون أخضر", img: "/assets/granite-green-pearl.jpg" },
  ]},
  { id: "cultured", label: "products.cultured", items: [
    { en: "Iced White Cultured", ar: "أبيض متجمد مصنّع", sen: "Engineered · pure white", sar: "هندسي · أبيض نقي", img: "/assets/handicraft-item-25.jpg" },
    { en: "Calcutta Royal Cultured", ar: "كالكوتا الملكي مصنّع", sen: "Calacatta pattern", sar: "نمط كالاكاتا", img: "/assets/handicraft-item-02.jpg" },
    { en: "Ocean Blue Cultured", ar: "أزرق المحيط مصنّع", sen: "Blue tones", sar: "درجات زرقاء", img: "/assets/handicraft-item-03.jpg" },
    { en: "Black Cultured Marble", ar: "أسود مصنّع", sen: "Rich red", sar: "أحمر غني", img: "/assets/handicraft-item-04.jpg" },
    { en: "Snow White Cultured", ar: "أبيض ثلجي مصنّع", sen: "Snow white", sar: "أبيض ثلجي", img: "/assets/handicraft-item-05.jpg" },
    { en: "Nano White Cultured", ar: "نانو أبيض مصنّع", sen: "Nano white", sar: "نانو أبيض", img: "/assets/handicraft-item-06.jpg" },
    { en: "Beige Royal Cultured", ar: "بيج ملكي مصنّع", sen: "Warm beige", sar: "بيج دافئ", img: "/assets/handicraft-item-07.jpg" },
    { en: "Royal Marmi Cultured", ar: "رويال مارمي مصنّع", sen: "Royal pattern", sar: "نمط ملكي", img: "/assets/handicraft-item-08.jpg" },
  ]},
  { id: "mosaic", label: "products.mosaic", items: [
    { en: "Mosaic — Pattern 1", ar: "موزاييك — نمط ١", sen: "Custom patterns", sar: "أنماط مخصصة", img: "/assets/handicraft-item-09.jpg" },
    { en: "Mosaic — Pattern 2", ar: "موزاييك — نمط ٢", sen: "Geometric design", sar: "تصميم هندسي", img: "/assets/handicraft-item-10.jpg" },
    { en: "Mosaic — Pattern 3", ar: "موزاييك — نمط ٣", sen: "Contemporary", sar: "معاصر", img: "/assets/handicraft-item-11.jpg" },
    { en: "Mosaic — Pattern 4", ar: "موزاييك — نمط ٤", sen: "Classic design", sar: "تصميم كلاسيكي", img: "/assets/handicraft-item-12.jpg" },
    { en: "Mosaic — Herringbone", ar: "موزاييك — هيرنغبون", sen: "Elegant layout", sar: "تخطيط أنيق", img: "/assets/handicraft-item-13.jpg" },
    { en: "Mosaic — Hexagonal", ar: "موزاييك — سداسي", sen: "Modern pattern", sar: "نمط حديث", img: "/assets/handicraft-item-14.jpg" },
    { en: "Mosaic — Chevron", ar: "موزاييك — شيفرون", sen: "Trendy design", sar: "تصميم عصري", img: "/assets/handicraft-item-15.jpg" },
    { en: "Mosaic — Basket Weave", ar: "موزاييك — نسيج السلة", sen: "Traditional", sar: "تقليدي", img: "/assets/handicraft-item-16.jpg" },
  ]},
  { id: "quartz", label: "products.quartz", items: [
    { en: "Sparkle Quartz — Pure White", ar: "كوارتز لامع — أبيض نقي", sen: "Sparkle finish", sar: "تشطيب لامع", img: "/assets/handicraft-item-17.jpg" },
    { en: "Sparkle Quartz — Midnight Black", ar: "كوارتز لامع — أسود", sen: "Black sparkle", sar: "لمعان أسود", img: "/assets/handicraft-item-18.jpg" },
    { en: "Sparkle Quartz — Crystal Blue", ar: "كوارتز لامع — أزرق بلوري", sen: "Blue sparkle", sar: "لمعان أزرق", img: "/assets/handicraft-item-19.jpg" },
    { en: "Sparkle Quartz — Silver Grey", ar: "كوارتز لامع — رمادي فضي", sen: "Grey sparkle", sar: "لمعان رمادي", img: "/assets/handicraft-item-20.jpg" },
    { en: "Sparkle Quartz — Golden Sand", ar: "كوارتز لامع — رمل ذهبي", sen: "Gold sparkle", sar: "لمعان ذهبي", img: "/assets/handicraft-item-21.jpg" },
    { en: "Sparkle Quartz — Ruby Red", ar: "كوارتز لامع — أحمر ياقوتي", sen: "Red sparkle", sar: "لمعان أحمر", img: "/assets/handicraft-item-22.jpg" },
    { en: "Sparkle Quartz — Emerald Green", ar: "كوارتز لامع — أخضر زمردي", sen: "Green sparkle", sar: "لمعان أخضر", img: "/assets/handicraft-item-23.jpg" },
    { en: "Sparkle Quartz — Rose Pink", ar: "كوارتز لامع — وردي", sen: "Pink sparkle", sar: "لمعان وردي", img: "/assets/handicraft-item-24.jpg" },
  ]},
  { id: "handicrafts", label: "products.handicrafts", items: [
    { en: "Islamic Calligraphy Panels", ar: "لوحات الخط العربي", sen: "Hand Naqsh work", sar: "عمل نقش يدوي", img: "/assets/handicraft-calligraphy-panel.jpg" },
    { en: "Marble Sculptures", ar: "منحوتات رخامية", sen: "Hand carved", sar: "منحوت يدوياً", img: "/assets/handicraft-hand-carving.jpg" },
    { en: "Decorative Wall Panels", ar: "لوحات جدارية زخرفية", sen: "Hand Naqsh work", sar: "عمل نقش يدوي", img: "/assets/handicraft-wall-panel.jpg" },
    { en: "Marble Dining Tables", ar: "طاولات طعام رخامية", sen: "Naqsh & inlay", sar: "نقش وترصيع", img: "/assets/handicraft-dining-table.jpg" },
    { en: "Marble Bed Frames", ar: "أسرّة رخامية", sen: "Naqsh & inlay", sar: "نقش وترصيع", img: "/assets/handicraft-bed.jpg" },
    { en: "Marble Arches & Columns", ar: "عقود وأعمدة رخامية", sen: "Islamic pattern", sar: "نمط إسلامي", img: "/assets/handicraft-arch.jpg" },
    { en: "Muqarnas (Honeycomb)", ar: "المقرنصات", sen: "Honeycomb vaulting", sar: "قبو عسلي", img: "/assets/handicraft-muqarnas.jpg" },
    { en: "Jali / Lattice Work", ar: "أعمال الجالي والشبك", sen: "Islamic patterns", sar: "أنماط إسلامية", img: "/assets/handicraft-jali.jpg" },
    { en: "Garden Furniture", ar: "أثاث الحديقة", sen: "Sandstone carving", sar: "نحت الحجر الرملي", img: "/assets/handicraft-garden-furniture.jpg" },
    { en: "Marble Column Crowns", ar: "تيجان الأعمدة", sen: "Muqarnas design", sar: "تصميم مقرنص", img: "/assets/handicraft-column-crown.jpg" },
    { en: "Marble Wash Basin", ar: "حوض رخامي", sen: "Hand-made", sar: "صنع يدوي", img: "/assets/handicraft-wash-basin.jpg" },
    { en: "Mausoleum Work", ar: "أعمال الأضرحة", sen: "Hand work", sar: "عمل يدوي", img: "/assets/handicraft-mausoleum.jpg" },
    { en: "Stone Inlay Work", ar: "أعمال الترصيع الحجري", sen: "Semi-precious stones", sar: "أحجار شبه كريمة", img: "/assets/handicraft-inlay-work.jpg" },
  ]},
];

export const projects: CatalogCategory[] = [
  { id: "religious", label: "projects.religious", items: [
    { en: "Masjid Interior — Islamic Arches & Marble Flooring", ar: "داخل المسجد — عقود إسلامية وأرضيات رخامية", sen: "Grand marble arches with geometric inlay flooring and chandelier work.", sar: "عقود رخامية فخمة مع أرضية ترصيع هندسية وأعمال ثريات.", img: "/assets/project-masjid-arches.jpg" },
    { en: "Masjid Qibla & Mihrab — White Marble", ar: "قبلة ومحراب — رخام أبيض", sen: "White marble Qibla wall with hand-carved Mihrab and floral inlay.", sar: "جدار قبلة رخامي أبيض مع محراب منحوت يدوياً وترصيع زهري.", img: "/assets/project-masjid-qibla.jpg" },
    { en: "Masjid Wudu Area — Pattern Lattice", ar: "منطقة الوضوء — شبك مزخرف", sen: "Marble & granite wudu stations with Islamic geometric lattice panels.", sar: "محطات وضوء من الرخام والجرانيت بألواح شبكية هندسية إسلامية.", img: "/assets/project-masjid-wudu.jpg" },
    { en: "Masjid Exterior — Minaret & Jali Work", ar: "خارج المسجد — مئذنة وجالي", sen: "Complete exterior with illuminated minaret, dome and jali screens.", sar: "واجهة كاملة بمئذنة مضاءة وقبة وشاشات جالي.", img: "/assets/project-masjid-exterior.jpg" },
    { en: "Masjid Main Hall — Dome & Chandelier", ar: "القاعة الرئيسية — قبة وثريا", sen: "Grand prayer hall with ornate dome, crystal chandelier and Mihrab.", sar: "قاعة صلاة فخمة بقبة مزخرفة وثريا كريستالية ومحراب.", img: "/assets/project-masjid-dome.jpg" },
    { en: "Masjid Interior — Geometric Inlay", ar: "داخل المسجد — ترصيع هندسي", sen: "Marble corridor with pointed arches and geometric inlay flooring.", sar: "ممر رخامي بعقود مدببة وأرضية ترصيع هندسية.", img: "/assets/project-masjid-interior.jpg" },
  ]},
  { id: "heritage", label: "projects.heritage", items: [
    { en: "Islamic Calligraphy — Hand Naqsh Work", ar: "خط عربي — عمل نقش يدوي", sen: "White marble calligraphy panels for masjid & mausoleum.", sar: "لوحات خط رخامية بيضاء للمساجد والأضرحة.", img: "/assets/project-calligraphy.jpg" },
    { en: "Marble Jali & Lattice Work", ar: "أعمال الجالي الرخامي", sen: "Intricate marble Jali screens, Muqarnas and lattice work.", sar: "شاشات جالي رخامية دقيقة ومقرنصات وأعمال شبك.", img: "/assets/handicraft-jali.jpg" },
    { en: "Marble Arch — Islamic Pattern", ar: "عقد رخامي — نمط إسلامي", sen: "White marble arches with Islamic architectural patterns.", sar: "عقود رخامية بيضاء بأنماط معمارية إسلامية.", img: "/assets/handicraft-arch.jpg" },
    { en: "White Marble Mausoleum Work", ar: "أعمال ضريح رخامي أبيض", sen: "White marble hand work with Islamic architectural detailing.", sar: "عمل يدوي رخامي أبيض بتفاصيل معمارية إسلامية.", img: "/assets/handicraft-mausoleum.jpg" },
    { en: "Muqarnas & Honeycomb Vaulting", ar: "مقرنصات وأقبية عسلية", sen: "White marble Muqarnas, Qibla work and lattice Panjara.", sar: "مقرنصات رخامية بيضاء وأعمال قبلة وشبك بنجارا.", img: "/assets/handicraft-muqarnas.jpg" },
    { en: "Jodhpuri Stone Arch — Heritage Design", ar: "عقد حجر جودبوري — تصميم تراثي", sen: "Traditional Jodhpuri arch with hand-carved panels and Naqsh work.", sar: "عقد جودبوري تقليدي بألواح منحوتة يدوياً وعمل نقش.", img: "/assets/project-jodhpuri-arch.jpg" },
  ]},
  { id: "homeDecor", label: "projects.homeDecor", items: [
    { en: "White Marble Column & Cladding", ar: "عمود وتكسية رخامية بيضاء", sen: "Fluted white marble column with carved base.", sar: "عمود رخامي أبيض مخدد بقاعدة منحوتة.", img: "/assets/project-marble-column.jpg" },
    { en: "Marble Baluster Staircase", ar: "درج رخامي بدرابزين", sen: "Hand-carved white marble baluster staircase with ornate railing.", sar: "درج رخامي أبيض منحوت يدوياً بدرابزين مزخرف.", img: "/assets/project-marble-baluster.jpg" },
    { en: "Marble Sculptures & Figurines", ar: "منحوتات وتماثيل رخامية", sen: "Hand-carved sculptures using traditional Makrana techniques.", sar: "منحوتات يدوية بتقنيات مكرانا التقليدية.", img: "/assets/handicraft-sculpture.jpg" },
    { en: "White Marble & Stone Inlay Work", ar: "أعمال ترصيع رخامي وحجري", sen: "Lapis lazuli and semi-precious stone inlay in white marble.", sar: "ترصيع لازورد وأحجار شبه كريمة في رخام أبيض.", img: "/assets/handicraft-inlay-work.jpg" },
    { en: "White Marble Entrance & Steps", ar: "مدخل ودرجات رخامية بيضاء", sen: "Polished white Makrana entrance with steps, columns and portico.", sar: "مدخل مكرانا أبيض مصقول بدرجات وأعمدة ورواق.", img: "/assets/project-marble-entrance.jpg" },
    { en: "Z Black Granite Staircase", ar: "درج جرانيت أسود", sen: "Polished Z Black granite staircase with wooden railing.", sar: "درج جرانيت أسود مصقول بدرابزين خشبي.", img: "/assets/project-granite-stairs.jpg" },
  ]},
];

/** Home gallery categories (label i18n key + how many tiles). Photos come from lib/gallery-images. */
export const homeCategories: { key: string; gallery: string; n: number }[] = [
  { key: "cat.floor", gallery: "floor", n: 13 },
  { key: "cat.fountain", gallery: "fountain", n: 6 },
  { key: "cat.handCraft", gallery: "handCraft", n: 16 },
  { key: "cat.inlay", gallery: "inlay", n: 6 },
  { key: "cat.masjid", gallery: "masjid", n: 9 },
  { key: "cat.stair", gallery: "stair", n: 7 },
  { key: "cat.table", gallery: "table", n: 11 },
];

/** Heritage "types of Makrana marble" — palette + real photo per type card (1..8). */
export const marbleTypePalettes = ["white", "white", "white", "grey", "grey", "pink", "rose", "brown"];
export const marbleTypeImages = [
  "/assets/marble-makrana-white.jpg",
  "/assets/marble-makrana-albeta.jpg",
  "/assets/marble-makrana-dungri.jpg",
  "/assets/marble-makrana-adanga.jpg",
  "/assets/marble-makrana-kumari.jpg",
  "/assets/marble-makrana-pink.jpg",
  "/assets/marble-makrana-pink.jpg",
  "/assets/marble-makrana-adanga.jpg",
];
