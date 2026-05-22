export type TawjihiTrack = "academic" | "btec";

export interface JordanianUniversity {
  name: string;
  nameEn: string;
  minGPA: number;
  city: string;
}

export interface TvetProgram {
  name: string;
  nameEn: string;
  provider: string;
  city: string;
}

export interface FieldData {
  id: string;
  nameAr: string;
  nameEn: string;
  emoji: string;
  color: string;
  descriptionAr: string;
  descriptionEn: string;
  subjectsAr?: string[];
  subjectsEn?: string[];
  majorsAr?: string[];
  majorsEn?: string[];
  careersAr: string[];
  careersEn: string[];
  reasonsAr: string[];
  reasonsEn: string[];
  jordanianUniversities?: JordanianUniversity[];
  tvetPrograms?: TvetProgram[];
}

export interface QuizOption {
  id: string;
  textAr: string;
  textEn: string;
  emoji: string;
  scores: Partial<Record<string, number>>;
}

export interface QuizQuestion {
  id: string;
  textAr: string;
  textEn: string;
  hintAr: string;
  hintEn: string;
  options: QuizOption[];
}

export interface FieldResult {
  field: FieldData;
  score: number;
  percentage: number;
}

export const FIELD_COLORS: Record<string, { bg: string; text: string; border: string; light: string }> = {
  emerald: { bg: "bg-emerald-500", text: "text-emerald-700", border: "border-emerald-200", light: "bg-emerald-50" },
  blue:    { bg: "bg-blue-500",    text: "text-blue-700",    border: "border-blue-200",    light: "bg-blue-50" },
  violet:  { bg: "bg-violet-500",  text: "text-violet-700",  border: "border-violet-200",  light: "bg-violet-50" },
  orange:  { bg: "bg-orange-500",  text: "text-orange-700",  border: "border-orange-200",  light: "bg-orange-50" },
  amber:   { bg: "bg-amber-500",   text: "text-amber-700",   border: "border-amber-200",   light: "bg-amber-50" },
  rose:    { bg: "bg-rose-500",    text: "text-rose-700",    border: "border-rose-200",    light: "bg-rose-50" },
  pink:    { bg: "bg-pink-500",    text: "text-pink-700",    border: "border-pink-200",    light: "bg-pink-50" },
  purple:  { bg: "bg-purple-500",  text: "text-purple-700",  border: "border-purple-200",  light: "bg-purple-50" },
  fuchsia: { bg: "bg-fuchsia-500", text: "text-fuchsia-700", border: "border-fuchsia-200", light: "bg-fuchsia-50" },
  sky:     { bg: "bg-sky-500",     text: "text-sky-700",     border: "border-sky-200",     light: "bg-sky-50" },
  green:   { bg: "bg-green-500",   text: "text-green-700",   border: "border-green-200",   light: "bg-green-50" },
  teal:    { bg: "bg-teal-500",    text: "text-teal-700",    border: "border-teal-200",    light: "bg-teal-50" },
  stone:   { bg: "bg-stone-500",   text: "text-stone-700",   border: "border-stone-200",   light: "bg-stone-50" },
  slate:   { bg: "bg-slate-500",   text: "text-slate-700",   border: "border-slate-200",   light: "bg-slate-50" },
};

export const ACADEMIC_FIELDS: FieldData[] = [
  {
    id: "health",
    nameAr: "الحقل الصحي",
    nameEn: "Health Field",
    emoji: "🏥",
    color: "emerald",
    descriptionAr: "طريقك نحو عالم الطب والعلوم الصحية وإنقاذ الأرواح",
    descriptionEn: "Your path to medicine, health sciences, and saving lives",
    subjectsAr: ["أحياء", "كيمياء", "إنجليزي متقدم"],
    subjectsEn: ["Biology", "Chemistry", "Advanced English"],
    majorsAr: ["طب بشري", "طب أسنان", "صيدلة", "تمريض", "علاج فيزيائي", "تقنيات مختبر طبي", "إدارة خدمات صحية"],
    majorsEn: ["Medicine", "Dentistry", "Pharmacy", "Nursing", "Physical Therapy", "Medical Lab Tech", "Health Services Management"],
    careersAr: ["طبيب", "صيدلاني", "ممرض", "باحث طبي", "مدير مستشفى"],
    careersEn: ["Doctor", "Pharmacist", "Nurse", "Medical Researcher", "Hospital Manager"],
    reasonsAr: ["الأحياء والكيمياء هما قلب هذا الحقل وأنت تتفوق فيهما", "مهن صحية عالية الطلب في الأردن والعالم", "الإنجليزي المتقدم يفتح لك أبواب الأبحاث الطبية العالمية"],
    reasonsEn: ["Biology and Chemistry are the core of this field and you excel in them", "Health careers are in high demand in Jordan and globally", "Advanced English opens doors to international medical research"],
    jordanianUniversities: [
      { name: "الجامعة الأردنية", nameEn: "University of Jordan", minGPA: 70, city: "عمّان" },
      { name: "جامعة العلوم والتكنولوجيا الأردنية", nameEn: "JUST", minGPA: 68, city: "إربد" },
      { name: "جامعة مؤتة", nameEn: "Mutah University", minGPA: 65, city: "الكرك" },
      { name: "الجامعة الهاشمية", nameEn: "Hashemite University", minGPA: 65, city: "الزرقاء" },
      { name: "جامعة اليرموك", nameEn: "Yarmouk University", minGPA: 63, city: "إربد" },
      { name: "جامعة البلقاء التطبيقية", nameEn: "Al-Balqa Applied University", minGPA: 62, city: "السلط" },
      { name: "جامعة العلوم التطبيقية الخاصة", nameEn: "Applied Science University", minGPA: 60, city: "عمّان" },
    ],
  },
  {
    id: "engineering",
    nameAr: "الحقل الهندسي",
    nameEn: "Engineering Field",
    emoji: "⚙️",
    color: "blue",
    descriptionAr: "بناء المستقبل بالأرقام والفيزياء والإبداع الهندسي",
    descriptionEn: "Building the future with numbers, physics, and engineering creativity",
    subjectsAr: ["رياضيات متقدم", "فيزياء"],
    subjectsEn: ["Advanced Mathematics", "Physics"],
    majorsAr: ["هندسة مدنية", "هندسة كهربائية", "هندسة ميكانيكية", "هندسة معمارية", "هندسة نظم طاقة", "هندسة بيئية", "هندسة نووية"],
    majorsEn: ["Civil Engineering", "Electrical Engineering", "Mechanical Engineering", "Architecture", "Power Engineering", "Environmental Engineering", "Nuclear Engineering"],
    careersAr: ["مهندس مدني", "مهندس كهربائي", "مهندس ميكانيكي", "معماري", "مدير مشاريع"],
    careersEn: ["Civil Engineer", "Electrical Engineer", "Mechanical Engineer", "Architect", "Project Manager"],
    reasonsAr: ["الرياضيات المتقدمة والفيزياء أساس جميع الهندسات", "مطلوب بشكل كبير في الأردن والخليج وأوروبا", "يفتح أبواب المشاريع الكبرى والهجرة المهنية"],
    reasonsEn: ["Advanced Math and Physics are the foundation of all engineering", "Highly demanded in Jordan, Gulf, and Europe", "Opens doors to megaprojects and professional migration"],
    jordanianUniversities: [
      { name: "الجامعة الأردنية", nameEn: "University of Jordan", minGPA: 78, city: "عمّان" },
      { name: "جامعة العلوم والتكنولوجيا الأردنية", nameEn: "JUST", minGPA: 80, city: "إربد" },
      { name: "الجامعة الهاشمية", nameEn: "Hashemite University", minGPA: 76, city: "الزرقاء" },
      { name: "جامعة مؤتة", nameEn: "Mutah University", minGPA: 75, city: "الكرك" },
      { name: "جامعة اليرموك", nameEn: "Yarmouk University", minGPA: 72, city: "إربد" },
      { name: "جامعة البلقاء التطبيقية", nameEn: "Al-Balqa Applied University", minGPA: 70, city: "السلط" },
      { name: "جامعة الأمير الحسين بن عبدالله", nameEn: "Prince Hussein University", minGPA: 65, city: "معان" },
    ],
  },
  {
    id: "science-tech",
    nameAr: "العلوم والتكنولوجيا",
    nameEn: "Science & Technology",
    emoji: "💻",
    color: "violet",
    descriptionAr: "ادخل عالم البرمجة والذكاء الاصطناعي والعلوم التطبيقية",
    descriptionEn: "Enter the world of programming, AI, and applied sciences",
    subjectsAr: ["رياضيات"],
    subjectsEn: ["Mathematics"],
    majorsAr: ["علوم حاسوب", "هندسة برمجيات", "ذكاء اصطناعي", "أمن معلومات", "رياضيات تطبيقية", "فيزياء وكيمياء تطبيقية"],
    majorsEn: ["Computer Science", "Software Engineering", "Artificial Intelligence", "Information Security", "Applied Mathematics", "Applied Physics & Chemistry"],
    careersAr: ["مطور برمجيات", "عالم بيانات", "مختص أمن سيبراني", "باحث ذكاء اصطناعي"],
    careersEn: ["Software Developer", "Data Scientist", "Cybersecurity Specialist", "AI Researcher"],
    reasonsAr: ["الرياضيات لغة التكنولوجيا والبرمجة والذكاء الاصطناعي", "أعلى الرواتب ونمو الوظائف في المستقبل", "مجال سريع التطور يُكافئ الشغف والإبداع"],
    reasonsEn: ["Math is the language of technology, programming, and AI", "Highest salaries and fastest job growth", "A rapidly evolving field that rewards passion"],
    jordanianUniversities: [
      { name: "جامعة العلوم والتكنولوجيا الأردنية", nameEn: "JUST", minGPA: 78, city: "إربد" },
      { name: "الجامعة الأردنية", nameEn: "University of Jordan", minGPA: 75, city: "عمّان" },
      { name: "الجامعة الهاشمية", nameEn: "Hashemite University", minGPA: 72, city: "الزرقاء" },
      { name: "جامعة مؤتة", nameEn: "Mutah University", minGPA: 70, city: "الكرك" },
      { name: "جامعة اليرموك", nameEn: "Yarmouk University", minGPA: 68, city: "إربد" },
      { name: "جامعة الأميرة سمية للتكنولوجيا", nameEn: "Princess Sumaya University for Technology", minGPA: 70, city: "عمّان" },
      { name: "جامعة البلقاء التطبيقية", nameEn: "Al-Balqa Applied University", minGPA: 65, city: "السلط" },
    ],
  },
  {
    id: "languages-social",
    nameAr: "اللغات والعلوم الاجتماعية",
    nameEn: "Languages & Social Sciences",
    emoji: "🌐",
    color: "orange",
    descriptionAr: "قوة الكلمة والتواصل والفهم الإنساني العميق",
    descriptionEn: "The power of language, communication, and deep human understanding",
    subjectsAr: ["عربي", "إنجليزي"],
    subjectsEn: ["Arabic", "English"],
    majorsAr: ["لغة إنجليزية وآدابها", "ترجمة وتفسير", "صحافة وإعلام", "علاقات عامة", "علم اجتماع", "علم نفس", "علاقات دولية"],
    majorsEn: ["English Language & Literature", "Translation & Interpretation", "Journalism & Media", "Public Relations", "Sociology", "Psychology", "International Relations"],
    careersAr: ["مترجم", "صحفي", "دبلوماسي", "أخصائي اجتماعي", "مدير علاقات عامة"],
    careersEn: ["Translator", "Journalist", "Diplomat", "Social Worker", "PR Manager"],
    reasonsAr: ["إتقانك للعربي والإنجليزي يفتح أبواب الدبلوماسية والإعلام", "مهن اجتماعية تُحدث فرقاً حقيقياً في المجتمع", "يناسب الشخصيات التواصلية والتعبيرية"],
    reasonsEn: ["Your Arabic and English mastery opens diplomacy and media doors", "Social careers that make a real difference", "Perfect for communicative and expressive personalities"],
    jordanianUniversities: [
      { name: "الجامعة الأردنية", nameEn: "University of Jordan", minGPA: 65, city: "عمّان" },
      { name: "جامعة اليرموك", nameEn: "Yarmouk University", minGPA: 62, city: "إربد" },
      { name: "جامعة مؤتة", nameEn: "Mutah University", minGPA: 60, city: "الكرك" },
      { name: "الجامعة الهاشمية", nameEn: "Hashemite University", minGPA: 60, city: "الزرقاء" },
      { name: "جامعة آل البيت", nameEn: "Al al-Bayt University", minGPA: 58, city: "المفرق" },
      { name: "جامعة فيلادلفيا", nameEn: "Philadelphia University", minGPA: 55, city: "جرش" },
      { name: "جامعة الزيتونة الأردنية", nameEn: "Al-Zaytoonah University", minGPA: 55, city: "عمّان" },
    ],
  },
  {
    id: "law-sharia",
    nameAr: "القانون والعلوم الشرعية",
    nameEn: "Law & Islamic Studies",
    emoji: "⚖️",
    color: "amber",
    descriptionAr: "حامل رسالة العدالة والحق في المجتمع",
    descriptionEn: "Carrying the message of justice and rights in society",
    subjectsAr: ["ثقافة إسلامية", "عربي"],
    subjectsEn: ["Islamic Culture", "Arabic"],
    majorsAr: ["قانون عام", "شريعة إسلامية", "قانون أعمال", "قضاء", "حقوق إنسان"],
    majorsEn: ["Public Law", "Islamic Sharia", "Business Law", "Judiciary", "Human Rights"],
    careersAr: ["محامٍ", "قاضٍ", "مستشار قانوني", "مدعٍ عام", "باحث شرعي"],
    careersEn: ["Lawyer", "Judge", "Legal Advisor", "Public Prosecutor", "Sharia Researcher"],
    reasonsAr: ["الثقافة الإسلامية واللغة العربية أساس الدراسات القانونية والشرعية", "مهنة رفيعة ومؤثرة في المجتمع الأردني", "الطلب على المحامين والقضاة مستمر لا ينقطع"],
    reasonsEn: ["Islamic culture and Arabic are the foundation of legal and sharia studies", "A prestigious and impactful profession in Jordanian society", "Continuous demand for lawyers and judges"],
    jordanianUniversities: [
      { name: "الجامعة الأردنية", nameEn: "University of Jordan", minGPA: 65, city: "عمّان" },
      { name: "جامعة اليرموك", nameEn: "Yarmouk University", minGPA: 62, city: "إربد" },
      { name: "جامعة مؤتة", nameEn: "Mutah University", minGPA: 60, city: "الكرك" },
      { name: "الجامعة الهاشمية", nameEn: "Hashemite University", minGPA: 60, city: "الزرقاء" },
      { name: "جامعة آل البيت", nameEn: "Al al-Bayt University", minGPA: 58, city: "المفرق" },
      { name: "جامعة الزيتونة الأردنية", nameEn: "Al-Zaytoonah University", minGPA: 55, city: "عمّان" },
      { name: "جامعة عمان العربية", nameEn: "Amman Arab University", minGPA: 55, city: "عمّان" },
    ],
  },
  {
    id: "business",
    nameAr: "حقل الأعمال",
    nameEn: "Business Field",
    emoji: "💼",
    color: "rose",
    descriptionAr: "قيادة الأعمال والاستثمار وبناء مستقبل مالي ناجح",
    descriptionEn: "Leading businesses, investing, and building a successful financial future",
    subjectsAr: ["رياضيات", "ثقافة مالية", "إنجليزي متقدم"],
    subjectsEn: ["Mathematics", "Financial Literacy", "Advanced English"],
    majorsAr: ["إدارة أعمال", "محاسبة وتدقيق", "تسويق رقمي", "تمويل ومصارف", "اقتصاد", "ريادة أعمال"],
    majorsEn: ["Business Administration", "Accounting & Auditing", "Digital Marketing", "Finance & Banking", "Economics", "Entrepreneurship"],
    careersAr: ["مدير تسويق", "محاسب قانوني", "مدير مالي", "رائد أعمال", "مستشار استثماري"],
    careersEn: ["Marketing Manager", "Chartered Accountant", "CFO", "Entrepreneur", "Investment Advisor"],
    reasonsAr: ["الرياضيات والثقافة المالية أساس عالم الأعمال والاستثمار", "مجال مرن يُحقق دخلاً مرتفعاً", "يناسب طموحي ريادة الأعمال والمشاريع التجارية"],
    reasonsEn: ["Math and financial literacy are the basis of business and investment", "A flexible field with high earning potential", "Perfect for entrepreneurship and business ambitions"],
    jordanianUniversities: [
      { name: "الجامعة الأردنية", nameEn: "University of Jordan", minGPA: 65, city: "عمّان" },
      { name: "جامعة العلوم والتكنولوجيا الأردنية", nameEn: "JUST", minGPA: 63, city: "إربد" },
      { name: "جامعة اليرموك", nameEn: "Yarmouk University", minGPA: 62, city: "إربد" },
      { name: "الجامعة الهاشمية", nameEn: "Hashemite University", minGPA: 62, city: "الزرقاء" },
      { name: "جامعة مؤتة", nameEn: "Mutah University", minGPA: 60, city: "الكرك" },
      { name: "جامعة الزيتونة الأردنية", nameEn: "Al-Zaytoonah University", minGPA: 55, city: "عمّان" },
      { name: "جامعة عمان الأهلية", nameEn: "Amman Private University", minGPA: 55, city: "عمّان" },
    ],
  },
];

export const BTEC_FIELDS: FieldData[] = [
  {
    id: "it-btec",
    nameAr: "تكنولوجيا المعلومات",
    nameEn: "Information Technology",
    emoji: "💻",
    color: "blue",
    descriptionAr: "مستقبل رقمي: برمجة، شبكات، وأمن معلومات",
    descriptionEn: "Digital future: programming, networking, and cybersecurity",
    careersAr: ["مطور ويب", "متخصص أمن معلومات", "مدير شبكات", "دعم تقني", "مطور تطبيقات موبايل"],
    careersEn: ["Web Developer", "Information Security Specialist", "Network Admin", "Tech Support", "Mobile App Developer"],
    reasonsAr: ["مجال الحاسوب يتطور بسرعة ويوفر وظائف مستقبلية", "يمكن العمل عن بُعد من أي مكان في العالم", "لا يحتاج رياضيات متقدمة مقارنة بالمسار الأكاديمي"],
    reasonsEn: ["IT evolves rapidly and offers future-proof jobs", "Remote work from anywhere is possible", "No advanced math required compared to academic track"],
    tvetPrograms: [
      { name: "تقنية المعلومات والشبكات", nameEn: "IT & Networks", provider: "كلية الحسين التقنية", city: "عمّان" },
      { name: "برمجة التطبيقات", nameEn: "Application Programming", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "الأمن السيبراني", nameEn: "Cybersecurity", provider: "كلية الإسراء", city: "عمّان" },
      { name: "تقنية الحاسوب", nameEn: "Computer Technology", provider: "مركز التدريب المهني والتقني", city: "إربد" },
    ],
  },
  {
    id: "engineering-btec",
    nameAr: "الهندسة (التطبيقية)",
    nameEn: "Applied Engineering",
    emoji: "⚙️",
    color: "slate",
    descriptionAr: "هندسة عملية: كهرباء، ميكانيك، وتبريد وتكييف",
    descriptionEn: "Practical engineering: electrical, mechanical, and HVAC",
    careersAr: ["فني كهرباء", "ميكانيكي متخصص", "فني تكييف وتبريد", "مراقب جودة", "فني صناعي"],
    careersEn: ["Electrician", "Specialized Mechanic", "HVAC Technician", "Quality Inspector", "Industrial Technician"],
    reasonsAr: ["مهارات يدوية وعملية ذات طلب عالٍ في السوق الأردني", "العمل في مصانع وشركات كبرى وورش متخصصة", "دخل جيد ومستقر من اليوم الأول"],
    reasonsEn: ["Hands-on practical skills in high demand in the Jordanian market", "Work in factories, major companies, and specialized workshops", "Good stable income from day one"],
    tvetPrograms: [
      { name: "تقنية الكهرباء والإلكترونيات", nameEn: "Electrical & Electronics Technology", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "تقنية الميكانيك والمركبات", nameEn: "Mechanics & Vehicles Technology", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "تقنية التكييف والتبريد", nameEn: "HVAC Technology", provider: "مركز التدريب المهني", city: "إربد" },
      { name: "الأتمتة الصناعية", nameEn: "Industrial Automation", provider: "كلية الحسين التقنية", city: "عمّان" },
    ],
  },
  {
    id: "business-btec",
    nameAr: "الأعمال (التطبيقي)",
    nameEn: "Business (Applied)",
    emoji: "📊",
    color: "rose",
    descriptionAr: "مهارات الأعمال العملية: تسويق، مبيعات، وإدارة",
    descriptionEn: "Practical business skills: marketing, sales, and management",
    careersAr: ["مدير مبيعات", "متخصص تسويق رقمي", "مدير متجر", "منسق أعمال", "رائد أعمال شاب"],
    careersEn: ["Sales Manager", "Digital Marketing Specialist", "Store Manager", "Business Coordinator", "Young Entrepreneur"],
    reasonsAr: ["يعلمك مهارات المبيعات والتسويق بشكل عملي مباشر", "قابل للتطبيق في أي قطاع وأي دولة", "أساس قوي لبدء مشروعك الخاص مبكراً"],
    reasonsEn: ["Teaches practical sales and marketing skills directly", "Applicable in any sector and any country", "Strong foundation for starting your own business early"],
    tvetPrograms: [
      { name: "تسويق ومبيعات", nameEn: "Marketing & Sales", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "إدارة الأعمال التطبيقية", nameEn: "Applied Business Management", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "محاسبة تطبيقية", nameEn: "Applied Accounting", provider: "مركز التدريب المهني والتقني", city: "الزرقاء" },
      { name: "ريادة الأعمال الصغيرة", nameEn: "Small Business Entrepreneurship", provider: "كلية الحسين التقنية", city: "عمّان" },
    ],
  },
  {
    id: "hospitality",
    nameAr: "الفندقة والضيافة",
    nameEn: "Hospitality & Hotel Management",
    emoji: "🏨",
    color: "amber",
    descriptionAr: "فن الضيافة والإدارة الفندقية والطهي الاحترافي",
    descriptionEn: "The art of hospitality, hotel management, and professional culinary",
    careersAr: ["مدير فندق", "شيف محترف", "مدير مطعم", "مشرف استقبال", "مخطط فعاليات"],
    careersEn: ["Hotel Manager", "Professional Chef", "Restaurant Manager", "Front Desk Supervisor", "Event Planner"],
    reasonsAr: ["يناسب من يحب الناس وإسعادهم وتقديم تجارب استثنائية", "فرص عمل في الأردن والخليج والسياحة الدولية", "الطهي الاحترافي مهنة ذات كرامة وعائد مالي جيد"],
    reasonsEn: ["Perfect for those who love making others happy", "Job opportunities in Jordan, Gulf, and international tourism", "Professional culinary arts is a dignified and profitable career"],
    tvetPrograms: [
      { name: "إدارة الفنادق والمطاعم", nameEn: "Hotel & Restaurant Management", provider: "كلية الإسراء", city: "عمّان" },
      { name: "فنون الطهي الاحترافي", nameEn: "Professional Culinary Arts", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "إدارة الضيافة", nameEn: "Hospitality Management", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "تنظيم الفعاليات والمؤتمرات", nameEn: "Events & Conferences", provider: "كلية الحسين التقنية", city: "عمّان" },
    ],
  },
  {
    id: "agriculture",
    nameAr: "الزراعة",
    nameEn: "Agriculture",
    emoji: "🌱",
    color: "green",
    descriptionAr: "علوم الأرض والنباتات والبيئة والإنتاج الغذائي الذكي",
    descriptionEn: "Earth sciences, plants, environment, and smart food production",
    careersAr: ["مهندس زراعي", "مشرف مزرعة", "باحث زراعة ذكية", "مدير مشروع زراعي", "تاجر منتجات زراعية"],
    careersEn: ["Agricultural Engineer", "Farm Supervisor", "Smart Farming Researcher", "Agricultural Project Manager", "Agri-Products Trader"],
    reasonsAr: ["الأردن يحتاج خبراء زراعة لمواجهة تحديات الأمن الغذائي", "الزراعة الذكية والهيدروبونيك مجال مستقبلي واعد", "يناسب من يحب الطبيعة والعمل الميداني"],
    reasonsEn: ["Jordan needs agriculture experts to face food security challenges", "Smart farming and hydroponics are promising future fields", "Ideal for those who love nature and field work"],
    tvetPrograms: [
      { name: "الإنتاج النباتي والزراعة المائية", nameEn: "Crop Production & Hydroponics", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "الإنتاج الحيواني", nameEn: "Animal Production", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "الزراعة الذكية والمائية", nameEn: "Smart & Water-Efficient Farming", provider: "مركز التدريب الزراعي", city: "إربد" },
      { name: "الأمن الغذائي وسلامة الغذاء", nameEn: "Food Security & Safety", provider: "مؤسسة التدريب المهني", city: "الزرقاء" },
    ],
  },
  {
    id: "beauty",
    nameAr: "التجميل",
    nameEn: "Beauty & Cosmetology",
    emoji: "✨",
    color: "pink",
    descriptionAr: "فن التجميل والعناية بالشعر والمكياج الاحترافي",
    descriptionEn: "The art of beauty, hair care, and professional makeup",
    careersAr: ["خبير تجميل", "مصفف شعر محترف", "فنان مكياج", "صاحب صالون", "متخصص عناية بالبشرة"],
    careersEn: ["Cosmetologist", "Professional Hairstylist", "Makeup Artist", "Salon Owner", "Skincare Specialist"],
    reasonsAr: ["سوق التجميل ينمو بشكل متسارع في الأردن والمنطقة", "مهنة مستقلة يمكن البدء بها بسرعة وبرأس مال بسيط", "يناسب من لديه ذوق جمالي وإبداع تشكيلي"],
    reasonsEn: ["The beauty market is growing rapidly in Jordan and the region", "An independent career you can start quickly with little capital", "Ideal for those with aesthetic taste and creative ability"],
    tvetPrograms: [
      { name: "تصفيف الشعر والعناية به", nameEn: "Hair Styling & Care", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "المكياج الاحترافي وعناية البشرة", nameEn: "Professional Makeup & Skincare", provider: "مركز التدريب المهني والتقني", city: "عمّان" },
      { name: "إدارة صالونات التجميل", nameEn: "Beauty Salon Management", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "علاج الأظافر والسبا", nameEn: "Nail Tech & Spa Therapy", provider: "مؤسسة التدريب المهني", city: "الزرقاء" },
    ],
  },
  {
    id: "creative-media",
    nameAr: "الوسائط الإبداعية",
    nameEn: "Creative Media",
    emoji: "🎬",
    color: "purple",
    descriptionAr: "إنتاج محتوى رقمي: فيديو، تصوير، وإعلام رقمي",
    descriptionEn: "Digital content production: video, photography, and digital media",
    careersAr: ["منتج محتوى رقمي", "مونتير فيديو", "مصور احترافي", "كاتب محتوى", "مؤثر رقمي"],
    careersEn: ["Digital Content Creator", "Video Editor", "Professional Photographer", "Content Writer", "Digital Influencer"],
    reasonsAr: ["عصر المحتوى الرقمي يحتاج مبدعين ذوي مهارات احترافية", "يمكن بناء شهرة ودخل مستقل من الإنترنت والمنصات", "مهنة مرنة تجمع الإبداع مع التكنولوجيا"],
    reasonsEn: ["The digital content era needs creators with professional skills", "Build fame and independent income from platforms", "A flexible career combining creativity with technology"],
    tvetPrograms: [
      { name: "إنتاج الفيديو والمونتاج", nameEn: "Video Production & Editing", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "التصوير الاحترافي", nameEn: "Professional Photography", provider: "كلية الحسين التقنية", city: "عمّان" },
      { name: "إدارة وسائل التواصل الاجتماعي", nameEn: "Social Media Management", provider: "مركز التدريب المهني والتقني", city: "إربد" },
      { name: "إنتاج البودكاست والإذاعة الرقمية", nameEn: "Podcast & Digital Radio Production", provider: "كلية البلقاء التطبيقية", city: "السلط" },
    ],
  },
  {
    id: "arts-design",
    nameAr: "الفنون والتصميم",
    nameEn: "Arts & Design",
    emoji: "🎨",
    color: "fuchsia",
    descriptionAr: "التصميم الجرافيكي، الفنون البصرية، وتصميم المنتجات",
    descriptionEn: "Graphic design, visual arts, and product design",
    careersAr: ["مصمم جرافيك", "مصمم واجهات UX/UI", "رسام ومصمم تحريك", "مصمم ديكور داخلي", "مصمم أزياء"],
    careersEn: ["Graphic Designer", "UX/UI Designer", "Illustrator & Animator", "Interior Designer", "Fashion Designer"],
    reasonsAr: ["كل شركة وعلامة تجارية تحتاج مصمماً جرافيك اليوم", "التصميم يجمع بشكل مثالي بين الفن والتكنولوجيا", "يناسب من يرى العالم بعيون جمالية ويُعبّر بالألوان والأشكال"],
    reasonsEn: ["Every company and brand needs a graphic designer today", "Design perfectly combines art and technology", "Ideal for those who see the world through artistic eyes"],
    tvetPrograms: [
      { name: "تصميم الجرافيك والهوية البصرية", nameEn: "Graphic Design & Visual Identity", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "تصميم UX/UI للتطبيقات", nameEn: "UX/UI App Design", provider: "كلية الحسين التقنية", city: "عمّان" },
      { name: "الرسوم المتحركة والموشن جرافيك", nameEn: "Animation & Motion Graphics", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "تصميم الأزياء والمنسوجات", nameEn: "Fashion & Textile Design", provider: "مركز التدريب المهني والتقني", city: "إربد" },
    ],
  },
  {
    id: "travel-tourism",
    nameAr: "السفر والسياحة",
    nameEn: "Travel & Tourism",
    emoji: "✈️",
    color: "sky",
    descriptionAr: "استكشاف العالم وإدارة الرحلات والسياحة الأردنية",
    descriptionEn: "Exploring the world, managing trips, and Jordanian tourism",
    careersAr: ["مرشد سياحي", "موظف شركة طيران", "مدير وكالة سفر", "منسق رحلات سياحية", "مدير فندق سياحي"],
    careersEn: ["Tour Guide", "Airline Staff", "Travel Agency Manager", "Tourism Trip Coordinator", "Tourist Hotel Manager"],
    reasonsAr: ["الأردن وجهة سياحية عالمية (البتراء، وادي رم، البحر الميت)", "السياحة مصدر دخل حيوي ومتنامٍ للأردن", "يناسب من يحب السفر والتنوع الثقافي والتواصل مع العالم"],
    reasonsEn: ["Jordan is a world tourist destination (Petra, Wadi Rum, Dead Sea)", "Tourism is a vital and growing income source for Jordan", "Perfect for those who love travel, culture, and global connections"],
    tvetPrograms: [
      { name: "الإرشاد السياحي", nameEn: "Tourist Guiding", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "خدمات شركات السفر والطيران", nameEn: "Travel & Airlines Services", provider: "كلية الحسين التقنية", city: "عمّان" },
      { name: "التسويق السياحي الرقمي", nameEn: "Digital Tourism Marketing", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "إدارة المواقع الأثرية والتراثية", nameEn: "Heritage & Archaeological Sites Management", provider: "مركز التدريب المهني والتقني", city: "وادي موسى" },
    ],
  },
  {
    id: "construction",
    nameAr: "البناء والإنشاءات",
    nameEn: "Construction & Civil Works",
    emoji: "🏗️",
    color: "stone",
    descriptionAr: "تشييد المباني والبنية التحتية وإدارة المشاريع الإنشائية",
    descriptionEn: "Building construction, infrastructure, and project management",
    careersAr: ["مقاول بناء", "مشرف موقع", "فني مساحة أراضي", "مدير مشروع إنشائي", "فاحص مباني"],
    careersEn: ["Building Contractor", "Site Supervisor", "Land Surveying Technician", "Construction Project Manager", "Building Inspector"],
    reasonsAr: ["قطاع البناء في الأردن والخليج يوفر وظائف مستمرة لا تنقطع", "مشاريع البنية التحتية والإسكان في نمو دائم", "دخل ثابت مع إمكانية النمو لمقاول مستقل"],
    reasonsEn: ["Jordan and Gulf construction sectors offer non-stop jobs", "Infrastructure and housing projects always growing", "Stable income with growth potential as an independent contractor"],
    tvetPrograms: [
      { name: "تقنية البناء والإنشاءات", nameEn: "Construction Technology", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "الإشراف على المواقع الإنشائية", nameEn: "Construction Site Supervision", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "المساحة والرفع الطبوغرافي", nameEn: "Land Surveying & Topography", provider: "مركز التدريب المهني والتقني", city: "إربد" },
      { name: "السباكة وأعمال الصرف الصحي", nameEn: "Plumbing & Sanitation Works", provider: "مؤسسة التدريب المهني", city: "الزرقاء" },
    ],
  },
  {
    id: "healthcare-fitness",
    nameAr: "الرعاية الصحية واللياقة",
    nameEn: "Healthcare & Fitness",
    emoji: "💪",
    color: "teal",
    descriptionAr: "العناية بصحة الجسم: مساعد طبي، لياقة، وتمريض مجتمعي",
    descriptionEn: "Body health care: medical assistant, fitness, and community nursing",
    careersAr: ["مدرب لياقة بدنية", "مساعد طبي", "ممرض مجتمعي", "متخصص تغذية", "مشرف مركز رياضي"],
    careersEn: ["Fitness Trainer", "Medical Assistant", "Community Nurse", "Nutritionist", "Sports Center Supervisor"],
    reasonsAr: ["الوعي الصحي المتزايد يرفع الطلب على هذه المهن بشكل سريع", "يمكن العمل المستقل كمدرب شخصي بدخل جيد", "يناسب من يهتم بصحته وصحة المجتمع من حوله"],
    reasonsEn: ["Growing health awareness rapidly increases demand for these careers", "Freelance work as a personal trainer with good income", "Ideal for those passionate about personal and community health"],
    tvetPrograms: [
      { name: "مساعد طبي وتمريض مجتمعي", nameEn: "Medical Assistant & Community Nursing", provider: "مؤسسة التدريب المهني", city: "عمّان" },
      { name: "تدريب اللياقة البدنية", nameEn: "Fitness Training", provider: "كلية البلقاء التطبيقية", city: "السلط" },
      { name: "التغذية والصحة العامة", nameEn: "Nutrition & Public Health", provider: "مركز التدريب المهني والتقني", city: "إربد" },
      { name: "إدارة مراكز اللياقة والسبا", nameEn: "Fitness Center & Spa Management", provider: "كلية الحسين التقنية", city: "عمّان" },
    ],
  },
];

export const ACADEMIC_QUESTIONS: QuizQuestion[] = [
  {
    id: "aq1",
    textAr: "يوم فارغ كامل أمامك — ماذا ستجد نفسك تفعل تلقائياً؟",
    textEn: "You have a completely free day — what do you naturally find yourself doing?",
    hintAr: "ما تفعله في وقت الفراغ يكشف ما يشغل عقلك حقاً",
    hintEn: "What you do in free time reveals what truly occupies your mind",
    options: [
      { id: "aq1-a", textAr: "أشاهد وثائقياً عن الطب والجسم البشري", textEn: "Watching a documentary about medicine or the human body", emoji: "🔬", scores: { health: 5, "science-tech": 1 } },
      { id: "aq1-b", textAr: "أحل ألغازاً هندسية أو أبني نموذجاً بيدي", textEn: "Solving engineering puzzles or building something by hand", emoji: "🏗️", scores: { engineering: 5, "science-tech": 2 } },
      { id: "aq1-c", textAr: "أجرّب برنامجاً جديداً أو أتعلم شيئاً تقنياً", textEn: "Trying out new software or learning something technical", emoji: "💻", scores: { "science-tech": 5, engineering: 1 } },
      { id: "aq1-d", textAr: "أقرأ رواية أو أشاهد فيلماً وأحلّله", textEn: "Reading a novel or watching a film and analyzing it", emoji: "📚", scores: { "languages-social": 5, "law-sharia": 1 } },
      { id: "aq1-e", textAr: "أتابع نقاشاً قانونياً أو برنامجاً دينياً", textEn: "Following a legal debate or a religious program", emoji: "⚖️", scores: { "law-sharia": 5, "languages-social": 1 } },
      { id: "aq1-f", textAr: "أتصفح أخبار الأسواق والاستثمار والأعمال", textEn: "Browsing market news, investments, and business updates", emoji: "📈", scores: { business: 5, "science-tech": 1 } },
    ],
  },
  {
    id: "aq2",
    textAr: "صديقك يستعد لامتحان غداً — أي مادة ستتطوع لمساعدته فيها؟",
    textEn: "Your friend is preparing for an exam tomorrow — which subject would you volunteer to help with?",
    hintAr: "المادة التي تُحب تعليمها هي المادة التي تتقنها فعلاً",
    hintEn: "The subject you love to teach is the one you truly master",
    options: [
      { id: "aq2-a", textAr: "رياضيات وفيزياء", textEn: "Math and Physics", emoji: "📐", scores: { engineering: 5, "science-tech": 3, business: 1 } },
      { id: "aq2-b", textAr: "أحياء وكيمياء", textEn: "Biology and Chemistry", emoji: "🧬", scores: { health: 5, "science-tech": 2 } },
      { id: "aq2-c", textAr: "عربي وأدب ولغات", textEn: "Arabic, literature, and languages", emoji: "📖", scores: { "languages-social": 4, "law-sharia": 2 } },
      { id: "aq2-d", textAr: "ثقافة إسلامية وتاريخ", textEn: "Islamic culture and history", emoji: "☪️", scores: { "law-sharia": 5, "languages-social": 2 } },
      { id: "aq2-e", textAr: "إنجليزي أو لغات أجنبية", textEn: "English or foreign languages", emoji: "🌍", scores: { "languages-social": 4, business: 2, health: 1 } },
      { id: "aq2-f", textAr: "اقتصاد وأعمال ومحاسبة", textEn: "Economics, business, and accounting", emoji: "💰", scores: { business: 5, engineering: 1, "science-tech": 1 } },
    ],
  },
  {
    id: "aq3",
    textAr: "أُعطيت مشروعاً حراً في المدرسة — أي فكرة ستختارها؟",
    textEn: "You're given a free project at school — which idea would you pick?",
    hintAr: "المشروع الذي تختاره بحرية يكشف شغفك الحقيقي",
    hintEn: "The project you freely choose reveals your true passion",
    options: [
      { id: "aq3-a", textAr: "تجربة علمية عن الجسم البشري أو الأدوية", textEn: "A scientific experiment about the human body or medicines", emoji: "🏥", scores: { health: 5, "science-tech": 1 } },
      { id: "aq3-b", textAr: "بناء نموذج هندسي أو تصميم آلية ميكانيكية", textEn: "Building an engineering model or designing a mechanical device", emoji: "⚙️", scores: { engineering: 5, "science-tech": 2 } },
      { id: "aq3-c", textAr: "برمجة تطبيق أو بناء موقع إلكتروني", textEn: "Programming an app or building a website", emoji: "💻", scores: { "science-tech": 5, engineering: 1 } },
      { id: "aq3-d", textAr: "كتابة قصة أو إجراء مقابلة صحفية", textEn: "Writing a story or conducting a journalistic interview", emoji: "✍️", scores: { "languages-social": 5, "law-sharia": 1 } },
      { id: "aq3-e", textAr: "محاكاة جلسة محكمة وتقديم حجة قانونية", textEn: "Simulating a court session and presenting a legal argument", emoji: "⚖️", scores: { "law-sharia": 5, "languages-social": 2 } },
      { id: "aq3-f", textAr: "إطلاق حملة تسويقية وتحليل الجمهور المستهدف", textEn: "Launching a marketing campaign and analyzing the target audience", emoji: "📊", scores: { business: 5, "languages-social": 1 } },
    ],
  },
  {
    id: "aq4",
    textAr: "تخيّل نفسك في سن الثلاثين في يوم عادي — أين أنت؟",
    textEn: "Picture yourself at age 30 on an ordinary day — where are you?",
    hintAr: "الصورة التي تتخيلها لنفسك هي هدفك الحقيقي",
    hintEn: "The image you picture for yourself is your true goal",
    options: [
      { id: "aq4-a", textAr: "أُعالج مريضاً أو أُجري بحثاً في مختبر علمي", textEn: "Treating a patient or conducting research in a scientific lab", emoji: "👨‍⚕️", scores: { health: 5 } },
      { id: "aq4-b", textAr: "أُشرف على مشروع هندسي أو أُصمّم مبنى", textEn: "Overseeing an engineering project or designing a building", emoji: "👷", scores: { engineering: 5, "science-tech": 1 } },
      { id: "aq4-c", textAr: "أعمل في شركة تكنولوجيا أو أمام شاشتي من المنزل", textEn: "Working at a tech company or remotely from home on my screen", emoji: "🖥️", scores: { "science-tech": 5, business: 1 } },
      { id: "aq4-d", textAr: "أُدرّس أو أعمل في منظمة دولية أو وسائل إعلام", textEn: "Teaching or working for an international organization or media", emoji: "🎓", scores: { "languages-social": 5 } },
      { id: "aq4-e", textAr: "أُرافع في قضية أمام المحكمة أو أُقدّم استشارة", textEn: "Arguing a case in court or providing a legal consultation", emoji: "👨‍⚖️", scores: { "law-sharia": 5 } },
      { id: "aq4-f", textAr: "أُدير اجتماعاً في شركتي أو أتفاوض على صفقة", textEn: "Running a meeting at my company or negotiating a deal", emoji: "💼", scores: { business: 5, engineering: 1 } },
    ],
  },
  {
    id: "aq5",
    textAr: "أصدقاؤك يصفونك دائماً بأنك...؟",
    textEn: "Your friends always describe you as...?",
    hintAr: "نظرة الآخرين لك تكشف موهبتك الأوضح",
    hintEn: "How others see you reveals your most visible talent",
    options: [
      { id: "aq5-a", textAr: "«الشخص الذي يسألونه عن الأعراض والصحة»", textEn: "\"The person everyone asks about health and symptoms\"", emoji: "💊", scores: { health: 4, "science-tech": 1 } },
      { id: "aq5-b", textAr: "«يفهم الأجهزة والأرقام أكثر من أي أحد»", textEn: "\"Understands machines and numbers better than anyone\"", emoji: "🔧", scores: { engineering: 4, "science-tech": 3 } },
      { id: "aq5-c", textAr: "«خبير التقنية — الكل يجيء إليه بمشاكل حاسوبه»", textEn: "\"The tech expert — everyone comes to them with computer issues\"", emoji: "💻", scores: { "science-tech": 5, engineering: 1 } },
      { id: "aq5-d", textAr: "«صاحب أسلوب جميل في الكلام والكتابة»", textEn: "\"Has a beautiful way with words and writing\"", emoji: "🗣️", scores: { "languages-social": 5, "law-sharia": 1 } },
      { id: "aq5-e", textAr: "«العادل الذي يدافع عن حقوق الناس دائماً»", textEn: "\"The fair one who always defends people's rights\"", emoji: "⚖️", scores: { "law-sharia": 5, "languages-social": 1 } },
      { id: "aq5-f", textAr: "«عنده تفكير تجاري — يُحوّل كل شيء لفرصة»", textEn: "\"Has a business mindset — turns everything into an opportunity\"", emoji: "🎯", scores: { business: 5, engineering: 1 } },
    ],
  },
  {
    id: "aq6",
    textAr: "صديقك يشاركك مشكلة — في أي موقف ستشعر بدافع حقيقي للمساعدة؟",
    textEn: "Your friend shares a problem — in which situation would you feel most driven to help?",
    hintAr: "المواقف التي تُحرّكك تكشف قيمك المهنية العميقة",
    hintEn: "The situations that move you reveal your deep professional values",
    options: [
      { id: "aq6-a", textAr: "يقول إنه مريض ويريد أن يفهم ما يحدث له", textEn: "They say they're ill and want to understand what's happening to them", emoji: "🏥", scores: { health: 5, "science-tech": 1 } },
      { id: "aq6-b", textAr: "يريد بناء شيء أو إصلاح خلل في تصميم ما", textEn: "They want to build something or fix a design flaw", emoji: "🔩", scores: { engineering: 5, "science-tech": 2 } },
      { id: "aq6-c", textAr: "تطبيقه أو موقعه به خلل تقني", textEn: "Their app or website has a technical glitch", emoji: "⌨️", scores: { "science-tech": 5 } },
      { id: "aq6-d", textAr: "يعاني من سوء تفاهم ويريد مساعدة في التعبير عن نفسه", textEn: "They're facing a misunderstanding and need help expressing themselves", emoji: "💬", scores: { "languages-social": 5 } },
      { id: "aq6-e", textAr: "تعرّض لظلم ويريد معرفة حقوقه القانونية", textEn: "They've been wronged and want to know their legal rights", emoji: "📜", scores: { "law-sharia": 5, "languages-social": 1 } },
      { id: "aq6-f", textAr: "يريد بدء مشروع لكنه لا يعرف من أين يبدأ", textEn: "They want to start a project but don't know where to begin", emoji: "🚀", scores: { business: 5 } },
    ],
  },
  {
    id: "aq7",
    textAr: "لو كتبت كتاباً يوماً ما — عن ماذا سيكون على الأرجح؟",
    textEn: "If you were to write a book someday — what would it most likely be about?",
    hintAr: "موضوع الكتاب الذي تتخيله يعكس ما يملأ تفكيرك",
    hintEn: "The book topic you imagine reflects what fills your thinking",
    options: [
      { id: "aq7-a", textAr: "مستقبل الطب وكيف سنقضي على الأمراض", textEn: "The future of medicine and how we'll defeat diseases", emoji: "🔬", scores: { health: 5, "science-tech": 1 } },
      { id: "aq7-b", textAr: "كيف نبني مدناً أفضل ومشاريع هندسية ضخمة", textEn: "How to build better cities and massive engineering projects", emoji: "🏙️", scores: { engineering: 5 } },
      { id: "aq7-c", textAr: "ثورة الذكاء الاصطناعي وتأثيرها على البشرية", textEn: "The AI revolution and its impact on humanity", emoji: "🤖", scores: { "science-tech": 5, engineering: 1 } },
      { id: "aq7-d", textAr: "قصة إنسانية أو تحليل ثقافي وسياسي عميق", textEn: "A human story or a deep cultural and political analysis", emoji: "📝", scores: { "languages-social": 5 } },
      { id: "aq7-e", textAr: "العدالة والحرية وبناء نظام قانوني أفضل", textEn: "Justice, freedom, and building a better legal system", emoji: "⚖️", scores: { "law-sharia": 5, "languages-social": 1 } },
      { id: "aq7-f", textAr: "سيرة رجل أعمال ناجح أو دليل الثروة والاستثمار", textEn: "A successful entrepreneur's biography or a wealth and investment guide", emoji: "💎", scores: { business: 5 } },
    ],
  },
];

export const BTEC_QUESTIONS: QuizQuestion[] = [
  {
    id: "bq1",
    textAr: "الجمعة الصباح — يوم حر بالكامل — ماذا ستفعل تلقائياً؟",
    textEn: "Friday morning — a completely free day — what do you automatically do?",
    hintAr: "ما تختاره بحرية يكشف ما تحبه فعلاً",
    hintEn: "What you freely choose reveals what you truly love",
    options: [
      { id: "bq1-a", textAr: "أفتح الحاسوب وأُجرّب شيئاً تقنياً أو برمجياً", textEn: "Open my computer and try something technical or coding-related", emoji: "💻", scores: { "it-btec": 5, "creative-media": 1 } },
      { id: "bq1-b", textAr: "أُصلح شيئاً معطوباً في البيت أو أُركّب شيئاً جديداً", textEn: "Fix something broken at home or assemble something new", emoji: "🔧", scores: { "engineering-btec": 4, "construction": 3 } },
      { id: "bq1-c", textAr: "أُجهّز وجبة مميزة أو أُرتّب لعزومة", textEn: "Prepare a special meal or organize a gathering", emoji: "🍳", scores: { "hospitality": 5, "travel-tourism": 1 } },
      { id: "bq1-d", textAr: "أهتم بنباتاتي أو أمشي في الطبيعة", textEn: "Take care of my plants or walk in nature", emoji: "🌿", scores: { "agriculture": 5 } },
      { id: "bq1-e", textAr: "أرسم أو أُصمّم أو أعمل على شيء فني", textEn: "Draw, design, or work on something artistic", emoji: "🎨", scores: { "arts-design": 4, "creative-media": 3 } },
      { id: "bq1-f", textAr: "أذهب للجيم أو أمارس رياضتي المفضلة", textEn: "Go to the gym or practice my favorite sport", emoji: "💪", scores: { "healthcare-fitness": 5 } },
      { id: "bq1-g", textAr: "أُفكّر في مشروع تجاري أو أبيع شيئاً أونلاين", textEn: "Think about a business idea or sell something online", emoji: "💰", scores: { "business-btec": 5 } },
      { id: "bq1-h", textAr: "أُخطّط لرحلة أو أتصفح وجهات سفر جديدة", textEn: "Plan a trip or browse new travel destinations", emoji: "✈️", scores: { "travel-tourism": 5, "hospitality": 1 } },
      { id: "bq1-i", textAr: "أُجرّب تسريحة أو ميكياج جديد", textEn: "Try a new hairstyle or makeup look", emoji: "✨", scores: { "beauty": 5 } },
    ],
  },
  {
    id: "bq2",
    textAr: "أي فيديو ستضغط عليه تلقائياً في يوتيوب؟",
    textEn: "Which video would you automatically click on YouTube?",
    hintAr: "ما تختار مشاهدته يعكس ما يشغل اهتمامك فعلاً",
    hintEn: "What you choose to watch reflects what genuinely interests you",
    options: [
      { id: "bq2-a", textAr: "شرح تقني لمشروع برمجي أو أداة جديدة", textEn: "Technical explanation of a coding project or new tool", emoji: "🖥️", scores: { "it-btec": 5 } },
      { id: "bq2-b", textAr: "شخص يُصلح سيارة أو يبني شيئاً بيده", textEn: "Someone fixing a car or building something by hand", emoji: "🔩", scores: { "engineering-btec": 5, "construction": 2 } },
      { id: "bq2-c", textAr: "وصفة طبخ رائعة أو زيارة مطعم مميز", textEn: "An amazing recipe or a restaurant review", emoji: "🍽️", scores: { "hospitality": 5, "travel-tourism": 1 } },
      { id: "bq2-d", textAr: "مزرعة بيوت أو نصائح زراعة عضوية", textEn: "Home farming or organic gardening tips", emoji: "🌱", scores: { "agriculture": 5 } },
      { id: "bq2-e", textAr: "تصميم إبداعي أو تحويل مساحة فارغة بأسلوب فني", textEn: "Creative design or transforming a space with artistic style", emoji: "🖌️", scores: { "arts-design": 4, "creative-media": 3 } },
      { id: "bq2-f", textAr: "تحدي لياقة أو روتين تمرين يومي", textEn: "A fitness challenge or daily workout routine", emoji: "🏋️", scores: { "healthcare-fitness": 5 } },
      { id: "bq2-g", textAr: "نصائح بيع وتسويق وريادة أعمال", textEn: "Sales, marketing, and entrepreneurship tips", emoji: "📊", scores: { "business-btec": 5 } },
      { id: "bq2-h", textAr: "مدوّنة سفر أو استكشاف مدينة جديدة", textEn: "A travel vlog or exploring a new city", emoji: "🗺️", scores: { "travel-tourism": 5 } },
      { id: "bq2-i", textAr: "تحويل مظهر كامل أو مراجعة منتج تجميل", textEn: "A full makeover or beauty product review", emoji: "💄", scores: { "beauty": 5 } },
    ],
  },
  {
    id: "bq3",
    textAr: "عائلتك تستعد لحفلة كبيرة — أي دور تأخذه تلقائياً؟",
    textEn: "Your family is preparing for a big party — which role do you naturally take?",
    hintAr: "الدور الذي تتولاه طوعاً يكشف موهبتك الطبيعية",
    hintEn: "The role you take voluntarily reveals your natural talent",
    options: [
      { id: "bq3-a", textAr: "أتولى كل شيء تقني: الصوت، الإضاءة، العرض", textEn: "Handle everything technical: sound, lighting, screen setup", emoji: "🎛️", scores: { "it-btec": 4, "creative-media": 3 } },
      { id: "bq3-b", textAr: "أُصلح ما يحتاج إصلاحاً وأُرتّب التجهيزات", textEn: "Fix what needs fixing and arrange all the setups", emoji: "🔧", scores: { "engineering-btec": 4, "construction": 3 } },
      { id: "bq3-c", textAr: "أهتم بالطعام والضيافة وإسعاد الضيوف", textEn: "Take care of food, hospitality, and making guests happy", emoji: "🍴", scores: { "hospitality": 5 } },
      { id: "bq3-d", textAr: "أُرتّب الديكور بعناصر طبيعية وأزهار", textEn: "Arrange the decor with natural elements and flowers", emoji: "🌸", scores: { "agriculture": 3, "arts-design": 3 } },
      { id: "bq3-e", textAr: "أُصمّم ديكور الحفلة كلها بذوق فني خاص", textEn: "Design the entire party decor with my own artistic touch", emoji: "🎨", scores: { "arts-design": 5, "creative-media": 2 } },
      { id: "bq3-f", textAr: "أتأكد من راحة وصحة الجميع وأُساعد من يحتاج", textEn: "Make sure everyone is comfortable and healthy", emoji: "❤️", scores: { "healthcare-fitness": 5 } },
      { id: "bq3-g", textAr: "أُدير الميزانية وأتفاوض مع الموردين", textEn: "Manage the budget and negotiate with suppliers", emoji: "💼", scores: { "business-btec": 5 } },
      { id: "bq3-h", textAr: "أقترح مكاناً رائعاً وأُنظّم برنامج الحفلة", textEn: "Suggest an amazing venue and organize the event program", emoji: "🗺️", scores: { "travel-tourism": 5 } },
      { id: "bq3-i", textAr: "أهتم بإطلالة الجميع وأقترح ما يناسب كل شخص", textEn: "Take care of everyone's look and suggest what suits each person", emoji: "✨", scores: { "beauty": 5 } },
    ],
  },
  {
    id: "bq4",
    textAr: "أيهم يصف طبيعتك بشكل أقرب للصحيح؟",
    textEn: "Which one describes your nature most accurately?",
    hintAr: "اختر الوصف الذي يشعرك بأنه يتحدث عنك أنت",
    hintEn: "Choose the description that feels like it's talking about you",
    options: [
      { id: "bq4-a", textAr: "أستطيع الجلوس ساعات أمام الشاشة بسعادة حقيقية", textEn: "I can happily sit for hours in front of a screen", emoji: "💻", scores: { "it-btec": 5 } },
      { id: "bq4-b", textAr: "أفضّل العمل بيدي على الجلوس خلف المكتب", textEn: "I prefer working with my hands over sitting at a desk", emoji: "🔨", scores: { "engineering-btec": 4, "construction": 4 } },
      { id: "bq4-c", textAr: "أشعر بالسعادة الحقيقية حين يشعر الآخرون بالراحة بسببي", textEn: "I feel truly happy when others feel comfortable because of me", emoji: "😊", scores: { "hospitality": 4, "travel-tourism": 3 } },
      { id: "bq4-d", textAr: "أجد سلاماً داخلياً حين أكون وسط الطبيعة", textEn: "I find inner peace when I'm surrounded by nature", emoji: "🌿", scores: { "agriculture": 5 } },
      { id: "bq4-e", textAr: "أرى جمالاً في تفاصيل لا يلاحظها الآخرون", textEn: "I see beauty in details others don't notice", emoji: "🎨", scores: { "arts-design": 4, "creative-media": 4 } },
      { id: "bq4-f", textAr: "صحتي ولياقتي في أولوياتي اليومية دائماً", textEn: "My health and fitness are always a daily priority", emoji: "💪", scores: { "healthcare-fitness": 5 } },
      { id: "bq4-g", textAr: "أُفكّر دائماً في كيف أُحوّل الفرصة لربح حقيقي", textEn: "I always think about how to turn an opportunity into real profit", emoji: "📈", scores: { "business-btec": 5 } },
      { id: "bq4-h", textAr: "أشعر بالحياة الحقيقية حين أكون في مكان أو بلد جديد", textEn: "I feel truly alive when I'm in a new place or country", emoji: "✈️", scores: { "travel-tourism": 5 } },
      { id: "bq4-i", textAr: "إسعاد الناس وتجميلهم يُشعرني بالرضا الكامل", textEn: "Making people happy and beautiful gives me complete satisfaction", emoji: "✨", scores: { "beauty": 5 } },
    ],
  },
  {
    id: "bq5",
    textAr: "بعد 10 سنوات — أي صورة تجعلك تبتسم أكثر؟",
    textEn: "In 10 years — which image makes you smile the most?",
    hintAr: "الصورة التي تُسعدك في المستقبل تكشف هدفك الحقيقي اليوم",
    hintEn: "The image that makes you happy in the future reveals your true goal today",
    options: [
      { id: "bq5-a", textAr: "أرى تطبيقاً بنيته يُستخدم من آلاف الناس", textEn: "Seeing an app I built being used by thousands", emoji: "📱", scores: { "it-btec": 5 } },
      { id: "bq5-b", textAr: "أنظر لشيء شيّدته بيدي لا يزال صامداً", textEn: "Looking at something I built by hand that still stands strong", emoji: "🏗️", scores: { "engineering-btec": 4, "construction": 4 } },
      { id: "bq5-c", textAr: "أستقبل زبائن في مطعمي أو فندقي الخاص", textEn: "Welcoming guests at my own restaurant or hotel", emoji: "🏨", scores: { "hospitality": 5 } },
      { id: "bq5-d", textAr: "أُحصد محصولاً زرعته بجهدي ويُطعم عائلتي", textEn: "Harvesting a crop I grew with my own effort that feeds my family", emoji: "🌾", scores: { "agriculture": 5 } },
      { id: "bq5-e", textAr: "أرى عملاً فنياً أو محتوى صنعته يُؤثّر في الناس", textEn: "Seeing artwork or content I created that impacts people", emoji: "🖼️", scores: { "arts-design": 4, "creative-media": 4 } },
      { id: "bq5-f", textAr: "أرى شخصاً غيّرت حياته الصحية بمساعدتي", textEn: "Seeing someone whose health journey I helped transform", emoji: "❤️", scores: { "healthcare-fitness": 5 } },
      { id: "bq5-g", textAr: "أُدير شركتي وأُتابع أرباحها وهي تنمو", textEn: "Running my own company and watching its profits grow", emoji: "💹", scores: { "business-btec": 5 } },
      { id: "bq5-h", textAr: "أكون في مكان جميل وأُعرّف الناس على جماله", textEn: "Being in a beautiful place and introducing others to its beauty", emoji: "🌍", scores: { "travel-tourism": 5 } },
      { id: "bq5-i", textAr: "أُجمّل عروساً في يومها الأهم وأرى فرحتها", textEn: "Beautifying a bride on her most important day and seeing her joy", emoji: "💐", scores: { "beauty": 5 } },
    ],
  },
  {
    id: "bq6",
    textAr: "صديقك يحتاج مساعدة فوراً — في أي موقف ستشعر «أنا الأنسب هنا»؟",
    textEn: "Your friend urgently needs help — in which situation would you feel 'I'm the right person here'?",
    hintAr: "الموقف الذي تثق بنفسك فيه يكشف مهارتك الحقيقية",
    hintEn: "The situation where you trust yourself reveals your real skill",
    options: [
      { id: "bq6-a", textAr: "حاسوبه تعطّل أو تطبيقه فيه مشكلة تقنية", textEn: "Their computer broke down or their app has a technical issue", emoji: "💻", scores: { "it-btec": 5 } },
      { id: "bq6-b", textAr: "شيء مكسور في بيته أو سيارته يحتاج إصلاحاً", textEn: "Something broken in their home or car needs fixing", emoji: "🔧", scores: { "engineering-btec": 5, "construction": 2 } },
      { id: "bq6-c", textAr: "لديه ضيوف مفاجئون ويحتاج مساعدة في الطعام", textEn: "They have unexpected guests and need help with food", emoji: "🍽️", scores: { "hospitality": 5 } },
      { id: "bq6-d", textAr: "نباتاته تذبل أو يريد زرع شيء في شقته", textEn: "Their plants are wilting or they want to grow something in their apartment", emoji: "🌱", scores: { "agriculture": 5 } },
      { id: "bq6-e", textAr: "يريد تصميماً عاجلاً أو محتوى إبداعياً سريعاً", textEn: "They need urgent design work or quick creative content", emoji: "🎨", scores: { "arts-design": 4, "creative-media": 4 } },
      { id: "bq6-f", textAr: "يشعر بألم أو يريد نصيحة عن لياقته وصحته", textEn: "They're in pain or want advice about their fitness and health", emoji: "🏃", scores: { "healthcare-fitness": 5 } },
      { id: "bq6-g", textAr: "يريد بيع شيء أو تسويق فكرته التجارية", textEn: "They want to sell something or market their business idea", emoji: "📣", scores: { "business-btec": 5 } },
      { id: "bq6-h", textAr: "يريد تخطيط رحلة سريعة ولا يعرف من أين يبدأ", textEn: "They want to plan a quick trip and don't know where to start", emoji: "✈️", scores: { "travel-tourism": 5 } },
      { id: "bq6-i", textAr: "يريد إطلالة مميزة لمقابلة أو مناسبة", textEn: "They want a special look for an interview or occasion", emoji: "✨", scores: { "beauty": 5 } },
    ],
  },
  {
    id: "bq7",
    textAr: "لو نشرت فيديو قصيراً على الإنترنت — عن ماذا سيكون؟",
    textEn: "If you posted a short video online — what would it be about?",
    hintAr: "ما تريد مشاركته مع العالم يكشف ما تُجيده حقاً",
    hintEn: "What you want to share with the world reveals what you truly excel at",
    options: [
      { id: "bq7-a", textAr: "شرح تقني أو حل مشكلة في جهاز أو تطبيق", textEn: "A technical tutorial or solving a device or app problem", emoji: "💻", scores: { "it-btec": 5 } },
      { id: "bq7-b", textAr: "مشروع يدوي صنعته أو شيء أصلحته بيدي", textEn: "A handmade project I created or something I fixed myself", emoji: "🔨", scores: { "engineering-btec": 5, "construction": 2 } },
      { id: "bq7-c", textAr: "وصفة مميزة أو تجربة في مطعم", textEn: "A special recipe or a restaurant experience", emoji: "🍳", scores: { "hospitality": 5 } },
      { id: "bq7-d", textAr: "نبتة أزرعها أو منتج طبيعي أصنعه بيدي", textEn: "A plant I'm growing or a natural product I'm making by hand", emoji: "🌿", scores: { "agriculture": 5 } },
      { id: "bq7-e", textAr: "تصميم إبداعي أو فيديو فني يُعبّر عني", textEn: "A creative design or artistic video that expresses who I am", emoji: "🎬", scores: { "arts-design": 4, "creative-media": 5 } },
      { id: "bq7-f", textAr: "روتين لياقتي الصباحي أو تحدي رياضي", textEn: "My morning fitness routine or a sports challenge", emoji: "💪", scores: { "healthcare-fitness": 5 } },
      { id: "bq7-g", textAr: "نصيحة مالية أو قصة نجاح تجاري", textEn: "A financial tip or a business success story", emoji: "📈", scores: { "business-btec": 5 } },
      { id: "bq7-h", textAr: "استكشاف مكان جميل أو نصيحة سفر", textEn: "Exploring a beautiful place or a travel tip", emoji: "🗺️", scores: { "travel-tourism": 5 } },
      { id: "bq7-i", textAr: "تحويل مظهر Makeover أو تجربة منتج تجميل", textEn: "A full makeover or beauty product review", emoji: "✨", scores: { "beauty": 5 } },
    ],
  },
];

export function scoreResults(answers: Record<string, string>, track: TawjihiTrack): FieldResult[] {
  const questions = track === "academic" ? ACADEMIC_QUESTIONS : BTEC_QUESTIONS;
  const fields = track === "academic" ? ACADEMIC_FIELDS : BTEC_FIELDS;

  const rawScores: Record<string, number> = {};
  fields.forEach(f => { rawScores[f.id] = 0; });

  questions.forEach(q => {
    const selectedOptionId = answers[q.id];
    if (!selectedOptionId) return;
    const option = q.options.find(o => o.id === selectedOptionId);
    if (!option) return;
    Object.entries(option.scores).forEach(([fieldId, score]) => {
      if (rawScores[fieldId] !== undefined) {
        rawScores[fieldId] += score ?? 0;
      }
    });
  });

  const sorted = fields
    .map(f => ({ field: f, score: rawScores[f.id] || 0 }))
    .sort((a, b) => b.score - a.score);

  const maxScore = sorted[0]?.score || 1;

  return sorted.map(({ field, score }) => ({
    field,
    score,
    percentage: maxScore === 0 ? 0 : Math.min(Math.round((score / maxScore) * 88 + 7), 95),
  }));
}
