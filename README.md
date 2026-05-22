# بوصلة - BOSELAH 🧭

<div align="center">

**منصة التوجيه الأكاديمي والمهني المدعومة بالذكاء الاصطناعي**

**AI-Powered Academic & Career Guidance Platform**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-24-green.svg)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5-black.svg)](https://expressjs.com/)

[العربية](#العربية) • [English](#english)

</div>

---

## العربية

### 🎯 ما هي بوصلة؟

**بوصلة (BOSELAH)** هي منصة توجيه أكاديمي ومهني متعددة اللغات (عربي/إنجليزي) تساعد طلاب المدارس الثانوية والجامعات على اتخاذ قرارات مدروسة بشأن مستقبلهم التعليمي والمهني. تعتمد المنصة على الذكاء الاصطناعي لتحليل اهتمامات الطالب وقدراته ومهاراته وتفضيلاته المهنية، ثم تقدم له توصيات شخصية ومخصصة حسب بلده.

### ✨ المميزات

- 🌍 **دعم متعدد اللغات** — عربي (RTL) وإنجليزي (LTR) مع تبديل تلقائي للاتجاه
- 🗺️ **اختيار البلد** — أكثر من 25 دولة، مع توصيات محلية للرواتب والجامعات وسوق العمل
- ✏️ **خيار "أخرى"** — إمكانية الكتابة الحرة في كل سؤال
- 🤖 **توصيات ذكية** — تحليل بالذكاء الاصطناعي (OpenAI GPT) للتخصصات والمسارات المهنية
- 📊 **تقرير شامل** — يتضمن التخصصات المقترحة، المسارات المهنية، المهارات المطلوبة، والرواتب المتوقعة
- 🔒 **شفافية كاملة** — لا توجد إحصائيات وهمية، شرح واضح لكيفية عمل التوصيات وحماية البيانات
- 📞 **تواصل مباشر** — معلومات تواصل واضحة في كل صفحة

### 🛠️ التقنيات المستخدمة

| المجال | التقنية |
|--------|---------|
| إدارة الحزم | pnpm workspaces (monorepo) |
| لغة البرمجة | TypeScript 5.9 |
| Node.js | الإصدار 24 |
| الواجهة الأمامية | React 19 + Vite + Tailwind CSS + Shadcn/UI |
| الواجهة الخلفية | Express 5 |
| قاعدة البيانات | PostgreSQL + Drizzle ORM |
| الذكاء الاصطناعي | OpenAI GPT (عبر Replit AI Integrations) |
| التحقق من البيانات | Zod |
| الرسوم المتحركة | Framer Motion |

### 🚀 التشغيل المحلي

#### المتطلبات
- Node.js 24+
- pnpm 10+
- قاعدة بيانات PostgreSQL
- مفتاح OpenAI API (أو حساب Replit مع AI Integrations)

#### الخطوات

```bash
# 1. استنساخ المستودع
git clone https://github.com/YOUR_USERNAME/boselah.git
cd boselah

# 2. تثبيت الحزم
pnpm install

# 3. إعداد متغيرات البيئة
cp .env.example .env
# ثم عدّل .env وأضف بياناتك

# 4. تهيئة قاعدة البيانات
pnpm --filter @workspace/db run push

# 5. تشغيل الخادم الخلفي (Terminal 1)
pnpm --filter @workspace/api-server run dev

# 6. تشغيل الواجهة الأمامية (Terminal 2)
pnpm --filter @workspace/boselah run dev
```

افتح المتصفح على `http://localhost:24047`

### 📁 هيكل المشروع

```
boselah/
├── artifacts/                    # التطبيقات القابلة للنشر
│   ├── api-server/               # خادم Express API
│   │   └── src/
│   │       ├── routes/           # نقاط النهاية (Endpoints)
│   │       └── lib/questions.ts  # أسئلة التقييم بالعربي والإنجليزي
│   └── boselah/                  # واجهة React + Vite
│       └── src/
│           ├── pages/            # الصفحات (الرئيسية، التقييم، النتائج)
│           ├── components/       # المكونات القابلة لإعادة الاستخدام
│           └── lib/
│               ├── LanguageContext.tsx  # سياق اللغة
│               └── translations.ts      # الترجمات + قائمة الدول
├── lib/                          # المكتبات المشتركة
│   ├── api-spec/                 # مواصفات OpenAPI
│   ├── api-client-react/         # React Query hooks مولّدة
│   ├── api-zod/                  # مخططات Zod مولّدة
│   ├── db/                       # مخطط Drizzle + اتصال قاعدة البيانات
│   └── integrations-openai-ai-server/
└── scripts/
```

### 🌐 النشر

المنصة منشورة حالياً ويمكن الوصول إليها مباشرة. للنشر بنفسك:
- **Replit Deployments** (الموصى به) — انسخ المشروع وانشره بنقرة واحدة
- **Vercel / Railway / Render** — يحتاج إعداد منفصل للواجهة الأمامية والخلفية
- **VPS خاص** — استخدم `pnpm build` ثم `pnpm start`

### 🤝 المساهمة

نرحب بالمساهمات! للمساهمة:
1. Fork المستودع
2. أنشئ فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. افتح Pull Request

### 📜 الترخيص

هذا المشروع مرخص تحت [MIT License](LICENSE).

### 📧 التواصل

- **البريد الإلكتروني**: info@boselah.com
- **الهاتف**: +962 79 123 4567

---

## English

### 🎯 What is BOSELAH?

**BOSELAH (بوصلة, meaning "Compass")** is a multilingual (Arabic/English) academic and career guidance platform that helps high school and university students make informed decisions about their educational and professional future. The platform uses AI to analyze student interests, abilities, skills, and career preferences, then provides personalized, country-specific recommendations.

### ✨ Features

- 🌍 **Multilingual** — Arabic (RTL) and English (LTR) with automatic direction switching
- 🗺️ **Country Selection** — 25+ countries with localized salary, university, and job market recommendations
- ✏️ **"Other" Option** — Free-text input on every question
- 🤖 **AI-Powered Recommendations** — OpenAI GPT analysis for majors and career paths
- 📊 **Comprehensive Report** — Includes suggested majors, career paths, required skills, and expected salaries
- 🔒 **Full Transparency** — No fake stats, clear explanation of how AI works and data privacy
- 📞 **Direct Contact** — Clear contact information on every page

### 🛠️ Tech Stack

| Area | Technology |
|------|-----------|
| Package Manager | pnpm workspaces (monorepo) |
| Language | TypeScript 5.9 |
| Node.js | Version 24 |
| Frontend | React 19 + Vite + Tailwind CSS + Shadcn/UI |
| Backend | Express 5 |
| Database | PostgreSQL + Drizzle ORM |
| AI | OpenAI GPT (via Replit AI Integrations) |
| Validation | Zod |
| Animation | Framer Motion |

### 🚀 Local Development

#### Requirements
- Node.js 24+
- pnpm 10+
- PostgreSQL database
- OpenAI API key (or Replit account with AI Integrations)

#### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/boselah.git
cd boselah

# 2. Install dependencies
pnpm install

# 3. Setup environment variables
cp .env.example .env
# Then edit .env with your credentials

# 4. Initialize the database
pnpm --filter @workspace/db run push

# 5. Run the backend (Terminal 1)
pnpm --filter @workspace/api-server run dev

# 6. Run the frontend (Terminal 2)
pnpm --filter @workspace/boselah run dev
```

Open your browser at `http://localhost:24047`

### 🌐 Deployment

The platform is currently deployed and accessible. To deploy yourself:
- **Replit Deployments** (recommended) — Fork and deploy with one click
- **Vercel / Railway / Render** — Requires separate setup for frontend and backend
- **Custom VPS** — Use `pnpm build` then `pnpm start`

### 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📜 License

This project is licensed under the [MIT License](LICENSE).

### 📧 Contact

- **Email**: info@boselah.com
- **Phone**: +962 79 123 4567

---

<div align="center">

**صُنع بـ ❤️ لمساعدة الطلاب على اتخاذ قرارات مدروسة لمستقبلهم**

**Made with ❤️ to help students make informed decisions about their future**

</div>
