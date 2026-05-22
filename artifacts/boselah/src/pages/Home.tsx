import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Target, Brain, TrendingUp, Sparkles, ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Info, Mail, Phone, Compass, GraduationCap, Wrench } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Home() {
  const { t, lang } = useLang();
  const h = t.home;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const featureIcons = [
    <Brain className="w-10 h-10 text-primary" />,
    <Target className="w-10 h-10 text-accent" />,
    <TrendingUp className="w-10 h-10 text-secondary" />,
  ];

  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt=""
            className="w-full h-full object-cover object-center opacity-40 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>{h.badge}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold text-foreground leading-[1.2] mb-6"
            >
              {h.heroTitle1} <span className="text-gradient">{h.heroTitle2}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              {h.heroDesc}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/assessment">
                <Button size="lg" className="w-full sm:w-auto text-lg gap-2 group">
                  {h.startFree}
                  <ArrowIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                {h.learnMore}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <img
          src={`${import.meta.env.BASE_URL}images/pattern.png`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {h.howItWorks} <span className="text-primary">{h.boselah}</span>؟
            </h2>
            <p className="text-xl text-muted-foreground">{h.howDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {h.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <Card className="h-full p-8 group hover:-translate-y-2 transition-all duration-300">
                  <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 group-hover:bg-white group-hover:shadow-lg transition-all">
                    {featureIcons[i]}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Jordan Tawjihi Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50/50 to-background pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border-2 border-amber-200 shadow-xl shadow-amber-100/60 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-3xl">🇯🇴</span>
                <Compass className="w-8 h-8" />
                <span className="text-3xl">🇯🇴</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-1">
                {lang === "ar" ? "طلاب التوجيهي الأردني — هذا لكم!" : "Jordanian Tawjihi Students — This Is For You!"}
              </h2>
              <p className="text-amber-100 text-sm">
                {lang === "ar"
                  ? "نظام ذكي مخصص لمساعدتك على اختيار حقلك المناسب في نظام التوجيهي الجديد"
                  : "A smart system dedicated to helping you choose your right field in the new Tawjihi system"}
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl border-2 border-blue-100 bg-blue-50/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-extrabold text-blue-800">
                      {lang === "ar" ? "المسار الأكاديمي" : "Academic Track"}
                    </h3>
                  </div>
                  <p className="text-blue-700/80 text-sm mb-4">
                    {lang === "ar"
                      ? "6 حقول دراسية متخصصة مرتبطة بمواد وزارية محددة وتفضي إلى تخصصات جامعية"
                      : "6 specialized fields linked to ministry subjects leading to university majors"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === "ar"
                      ? ["🏥 الصحي", "⚙️ الهندسي", "💻 العلوم والتكنولوجيا", "🌐 اللغات", "⚖️ القانون", "💼 الأعمال"]
                      : ["🏥 Health", "⚙️ Engineering", "💻 Sci & Tech", "🌐 Languages", "⚖️ Law", "💼 Business"]
                    ).map((f, i) => (
                      <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">{f}</span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-6 rounded-2xl border-2 border-amber-100 bg-amber-50/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                      <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-extrabold text-amber-800">
                      {lang === "ar" ? "مسار BTEC (المهني)" : "BTEC Vocational Track"}
                    </h3>
                  </div>
                  <p className="text-amber-700/80 text-sm mb-4">
                    {lang === "ar"
                      ? "11 تخصصاً تطبيقياً عملياً للطلاب الراغبين في التعلم المهني والعمل الميداني"
                      : "11 applied vocational specializations for students who prefer practical hands-on learning"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === "ar"
                      ? ["💻 IT", "⚙️ هندسة", "💼 أعمال", "🏨 فندقة", "🎨 فنون", "✈️ سياحة", "💪 صحة", "✨ تجميل"]
                      : ["💻 IT", "⚙️ Eng.", "💼 Business", "🏨 Hospitality", "🎨 Arts", "✈️ Tourism", "💪 Health", "✨ Beauty"]
                    ).map((f, i) => (
                      <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">{f}</span>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="text-center">
                <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-muted-foreground">
                  {(lang === "ar"
                    ? ["⏱️ دقيقتان فقط", "🎯 7 أسئلة ذكية", "🏅 توصية مخصصة لك", "🆓 مجاني 100%"]
                    : ["⏱️ Only 2 minutes", "🎯 7 smart questions", "🏅 Personalized result", "🆓 100% free"]
                  ).map((b, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-muted/40 rounded-full px-3 py-1.5 font-medium">{b}</span>
                  ))}
                </div>
                <Link href="/tawjihi">
                  <Button size="lg"
                    className="text-lg h-14 px-10 gap-2 shadow-xl shadow-amber-200 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0">
                    <Compass className="w-5 h-5" />
                    {lang === "ar" ? "اكتشف حقلك المناسب الآن" : "Discover Your Right Field Now"}
                    {lang === "ar" ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transparency Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4 border border-primary/20">
              <ShieldCheck className="w-4 h-4" />
              <span>{h.transparencyTitle}</span>
            </div>
          </motion.div>

          <div className="space-y-4">
            {h.transparencyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: lang === "ar" ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Info className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-foreground">{item.label}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">{h.ctaTitle}</h2>
          <p className="text-xl text-secondary-foreground/80 mb-10">{h.ctaDesc}</p>
          <Link href="/assessment">
            <Button size="lg" className="text-lg h-16 px-12 text-xl shadow-2xl shadow-primary/30">
              {h.startNow}
            </Button>
          </Link>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-secondary-foreground/60 font-bold">
            {h.badges.map((badge, i) => (
              <span key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-3">{h.contactTitle}</h3>
            <p className="text-muted-foreground mb-8 text-lg">{h.contactDesc}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info@boselah.app"
                className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group w-full sm:w-auto justify-center"
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-bold" dir="ltr">info@boselah.app</span>
              </a>
              <a
                href="tel:+96279000000"
                className="flex items-center gap-3 px-6 py-3 rounded-xl border-2 border-border hover:border-primary/50 hover:bg-primary/5 transition-all group w-full sm:w-auto justify-center"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-bold" dir="ltr">+962 79 000 0000</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
