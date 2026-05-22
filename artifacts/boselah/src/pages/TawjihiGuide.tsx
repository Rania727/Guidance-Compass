import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight, ChevronLeft, Compass, Sparkles, GraduationCap,
  Briefcase, ArrowLeft, ArrowRight, CheckCircle2, Star, RefreshCw,
  ChevronDown, ChevronUp, MapPin, Building2
} from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import {
  ACADEMIC_QUESTIONS, BTEC_QUESTIONS, ACADEMIC_FIELDS, BTEC_FIELDS,
  FIELD_COLORS, scoreResults,
  type TawjihiTrack, type FieldResult,
} from "@/lib/tawjihiData";

const TOTAL_QUESTIONS = 7;

export default function TawjihiGuide() {
  const { lang, dir } = useLang();
  const isAr = lang === "ar";

  const [step, setStep] = useState(0); // 0=intro, 1=track, 2-8=questions, 9=results
  const [track, setTrack] = useState<TawjihiTrack | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<FieldResult[]>([]);
  const [uniOpen, setUniOpen] = useState<Record<string, boolean>>({});

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [step]);

  const questions = track === "academic" ? ACADEMIC_QUESTIONS : (track === "btec" ? BTEC_QUESTIONS : []);
  const questionIndex = step - 2;
  const currentQuestion = questions[questionIndex];
  const progress = questionIndex < 0 ? 0 : Math.round(((questionIndex) / TOTAL_QUESTIONS) * 100);

  const ChevPrev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const selectTrack = (t: TawjihiTrack) => {
    setTrack(t);
    setAnswers({});
    setStep(2);
  };

  const handleOptionSelect = (questionId: string, optionId: string) => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);

    const isLast = questionIndex === TOTAL_QUESTIONS - 1;
    setTimeout(() => {
      if (isLast) {
        setIsAnalyzing(true);
        setTimeout(() => {
          const computed = scoreResults(newAnswers, track!);
          setResults(computed);
          setIsAnalyzing(false);
          setStep(9);
        }, 2000);
      } else {
        setStep(s => s + 1);
      }
    }, 350);
  };

  const restart = () => {
    setStep(1);
    setTrack(null);
    setAnswers({});
    setResults([]);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center" dir={dir}>
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md">
          <div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-amber-200 border-t-amber-500" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-4 border-primary/20 border-t-primary" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Compass className="w-12 h-12 text-amber-500" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-foreground">
            {isAr ? "جاري التحليل..." : "Analyzing..."}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {isAr
              ? "المرشد الذكي يحلل ميولك وقدراتك ويختار أنسب الحقول لك..."
              : "The smart advisor is analyzing your interests and abilities to find your best matches..."}
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <motion.div key={i} className="w-3 h-3 rounded-full bg-amber-500"
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }} />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background/50" dir={dir}>
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header for question steps */}
        {step >= 2 && step <= 8 && (
          <div className="mb-8 sticky top-20 z-40 bg-background/90 backdrop-blur-md pt-4 pb-5 border-b border-border/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-bold text-amber-700">
                  {isAr ? "المرشد الأكاديمي" : "Academic Advisor"}
                </span>
              </div>
              <span className="text-sm font-bold text-muted-foreground">
                {isAr ? `${questionIndex + 1} / ${TOTAL_QUESTIONS}` : `${questionIndex + 1} / ${TOTAL_QUESTIONS}`}
              </span>
            </div>
            <Progress value={progress} className="h-2 [&>div]:bg-amber-500" />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: dir === "rtl" ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === "rtl" ? -40 : 40 }}
            transition={{ duration: 0.3 }}
          >

            {/* STEP 0 — Intro */}
            {step === 0 && (
              <div className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
                  className="w-28 h-28 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-200">
                  <Compass className="w-14 h-14 text-white" />
                </motion.div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 font-bold text-sm mb-6 border border-amber-200">
                  <span>🇯🇴</span>
                  <span>{isAr ? "نظام التوجيهي الأردني الجديد" : "New Jordanian Tawjihi System"}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-5 leading-tight">
                  {isAr ? "اكتشف حقلك أو مسارك الأنسب" : "Discover Your Best Field or Track"}
                </h1>
                <p className="text-xl text-muted-foreground mb-4 max-w-xl mx-auto leading-relaxed">
                  {isAr
                    ? "مرشد ذكي يحلل ميولك وقدراتك ويقترح أنسب الحقول الأكاديمية أو مسارات BTEC المهنية في التوجيهي الأردني الجديد."
                    : "An intelligent advisor that analyzes your interests and abilities to suggest the most suitable academic fields or BTEC vocational tracks in Jordan's new Tawjihi system."}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-10 text-sm text-muted-foreground">
                  {[
                    isAr ? "⏱️ دقيقتان فقط" : "⏱️ Only 2 minutes",
                    isAr ? "🎯 7 أسئلة تفاعلية" : "🎯 7 interactive questions",
                    isAr ? "🏅 توصية مخصصة لك" : "🏅 Personalized recommendation",
                    isAr ? "🆓 مجاني تماماً" : "🆓 Completely free",
                  ].map((b, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-muted/50 rounded-full px-3 py-1.5 font-medium">{b}</span>
                  ))}
                </div>

                <Button size="lg" onClick={() => setStep(1)}
                  className="text-xl h-16 px-12 gap-3 shadow-xl shadow-amber-200 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 border-0">
                  {isAr ? "ابدأ الاكتشاف" : "Start Discovery"}
                  <ArrowIcon className="w-6 h-6" />
                </Button>
              </div>
            )}

            {/* STEP 1 — Track Selection */}
            {step === 1 && (
              <div>
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-extrabold text-foreground mb-3">
                    {isAr ? "أولاً: حدد مسارك الدراسي" : "First: Choose Your Study Track"}
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    {isAr
                      ? "نظام التوجيهي الأردني الجديد يتيح مساران رئيسيان — أيهما يصفك أكثر؟"
                      : "Jordan's new Tawjihi system offers two main tracks — which describes you better?"}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Academic Track */}
                  <button onClick={() => selectTrack("academic")}
                    className="group text-start p-8 rounded-3xl border-2 border-border bg-card hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100">
                    <div className="text-5xl mb-4">🎓</div>
                    <h3 className="text-2xl font-extrabold text-foreground mb-2">
                      {isAr ? "المسار الأكاديمي" : "Academic Track"}
                    </h3>
                    <p className="text-muted-foreground mb-5 leading-relaxed">
                      {isAr
                        ? "للطلاب الراغبين بالدراسة الجامعية. يتضمن 6 حقول متخصصة مرتبطة بمواد وزارية محددة."
                        : "For students aiming for university education. Includes 6 specialized fields linked to specific ministry subjects."}
                    </p>
                    <div className="space-y-2">
                      {(isAr
                        ? ["🏥 الصحي", "⚙️ الهندسي", "💻 العلوم والتكنولوجيا", "🌐 اللغات والاجتماعية", "⚖️ القانون والشريعة", "💼 الأعمال"]
                        : ["🏥 Health", "⚙️ Engineering", "💻 Science & Tech", "🌐 Languages & Social", "⚖️ Law & Sharia", "💼 Business"]
                      ).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-blue-600 font-bold group-hover:gap-3 transition-all">
                      <span>{isAr ? "اختر هذا المسار" : "Choose this track"}</span>
                      <ArrowIcon className="w-5 h-5" />
                    </div>
                  </button>

                  {/* BTEC Track */}
                  <button onClick={() => selectTrack("btec")}
                    className="group text-start p-8 rounded-3xl border-2 border-border bg-card hover:border-amber-400 hover:bg-amber-50/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-100">
                    <div className="text-5xl mb-4">🛠️</div>
                    <h3 className="text-2xl font-extrabold text-foreground mb-2">
                      {isAr ? "مسار BTEC (المهني)" : "BTEC Track (Vocational)"}
                    </h3>
                    <p className="text-muted-foreground mb-5 leading-relaxed">
                      {isAr
                        ? "للطلاب الراغبين في التعلم التطبيقي والعملي. يتضمن 11 تخصصاً مهنياً متنوعاً."
                        : "For students who prefer applied and hands-on learning. Includes 11 diverse vocational specializations."}
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {(isAr
                        ? ["💻 IT", "⚙️ الهندسة", "💼 الأعمال", "🏨 الفندقة", "🌱 الزراعة", "✨ التجميل", "🎬 الوسائط", "🎨 الفنون", "✈️ السياحة", "🏗️ البناء", "💪 الرعاية الصحية"]
                        : ["💻 IT", "⚙️ Engineering", "💼 Business", "🏨 Hospitality", "🌱 Agriculture", "✨ Beauty", "🎬 Creative Media", "🎨 Arts & Design", "✈️ Tourism", "🏗️ Construction", "💪 Healthcare"]
                      ).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-amber-600 font-bold group-hover:gap-3 transition-all">
                      <span>{isAr ? "اختر هذا المسار" : "Choose this track"}</span>
                      <ArrowIcon className="w-5 h-5" />
                    </div>
                  </button>
                </div>

                <div className="text-center mt-8">
                  <button onClick={() => setStep(0)} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mx-auto">
                    <ChevPrev className="w-4 h-4" />
                    {isAr ? "العودة" : "Back"}
                  </button>
                </div>
              </div>
            )}

            {/* STEPS 2-8 — Questions */}
            {step >= 2 && step <= 8 && currentQuestion && (
              <div>
                {/* Advisor tip */}
                <div className="flex items-start gap-3 mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
                  <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Compass className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-800 mb-0.5">
                      {isAr ? "المرشد الأكاديمي" : "Academic Advisor"}
                    </p>
                    <p className="text-sm text-amber-700">
                      {isAr ? currentQuestion.hintAr : currentQuestion.hintEn}
                    </p>
                  </div>
                </div>

                <Card className="p-8 shadow-lg border-border/50">
                  <h2 className="text-2xl font-extrabold text-foreground mb-8 leading-relaxed">
                    <span className="text-amber-500 me-2">{questionIndex + 1}.</span>
                    {isAr ? currentQuestion.textAr : currentQuestion.textEn}
                  </h2>

                  <div className="flex flex-col gap-3">
                    {currentQuestion.options.map((option) => {
                      const isSelected = answers[currentQuestion.id] === option.id;
                      return (
                        <button
                          key={option.id}
                          onClick={() => handleOptionSelect(currentQuestion.id, option.id)}
                          className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-start ${
                            isSelected
                              ? "border-amber-500 bg-amber-50 shadow-sm ring-1 ring-amber-200"
                              : "border-border/60 bg-card hover:border-amber-300 hover:bg-amber-50/40"
                          }`}
                        >
                          <span className="text-2xl flex-shrink-0">{option.emoji}</span>
                          <span className={`text-base font-medium flex-1 ${isSelected ? "text-amber-800 font-bold" : "text-foreground"}`}>
                            {isAr ? option.textAr : option.textEn}
                          </span>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </Card>

                {/* Back button */}
                {step > 2 && (
                  <div className="mt-6 text-center">
                    <button onClick={() => setStep(s => s - 1)}
                      className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mx-auto">
                      <ChevPrev className="w-4 h-4" />
                      {isAr ? "السؤال السابق" : "Previous question"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* STEP 9 — Results */}
            {step === 9 && results.length > 0 && (
              <div>
                {/* Header */}
                <div className="text-center mb-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }}
                    className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-amber-200">
                    <Star className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl font-extrabold text-foreground mb-3">
                    {isAr ? "نتائج تحليلك الشخصي" : "Your Personal Analysis Results"}
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    {isAr
                      ? `بناءً على إجاباتك، إليك أنسب الحقول لك في المسار ${track === "academic" ? "الأكاديمي" : "المهني (BTEC)"}`
                      : `Based on your answers, here are your best matches in the ${track === "academic" ? "Academic" : "BTEC Vocational"} track`}
                  </p>
                </div>

                {/* Top result — featured */}
                {(() => {
                  const top = results[0];
                  const colors = FIELD_COLORS[top.field.color] ?? FIELD_COLORS.amber;
                  return (
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                      <div className={`mb-8 rounded-3xl border-2 p-8 ${colors.border} ${colors.light}`}>
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div className="flex items-center gap-4">
                            <div className={`text-5xl`}>{top.field.emoji}</div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${colors.bg} text-white`}>
                                  {isAr ? "توصيتك الأولى" : "Top Recommendation"}
                                </span>
                              </div>
                              <h3 className={`text-2xl font-extrabold ${colors.text}`}>
                                {isAr ? top.field.nameAr : top.field.nameEn}
                              </h3>
                              <p className="text-muted-foreground text-sm mt-1">
                                {isAr ? top.field.descriptionAr : top.field.descriptionEn}
                              </p>
                            </div>
                          </div>
                          <div className="text-center flex-shrink-0">
                            <div className={`text-4xl font-extrabold ${colors.text}`}>{top.percentage}%</div>
                            <div className="text-xs text-muted-foreground">{isAr ? "تطابق" : "match"}</div>
                          </div>
                        </div>

                        {/* Match bar */}
                        <div className="mb-6">
                          <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                            <motion.div className={`h-full rounded-full ${colors.bg}`}
                              initial={{ width: 0 }} animate={{ width: `${top.percentage}%` }}
                              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} />
                          </div>
                        </div>

                        {/* Why it fits */}
                        <div className="mb-6">
                          <h4 className={`font-bold mb-3 ${colors.text}`}>
                            {isAr ? "💡 لماذا يناسبك هذا الحقل؟" : "💡 Why this field suits you?"}
                          </h4>
                          <div className="space-y-2">
                            {(isAr ? top.field.reasonsAr : top.field.reasonsEn).map((r, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${colors.text}`} />
                                <span className="text-foreground/80">{r}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Subjects (academic only) */}
                        {track === "academic" && top.field.subjectsAr && (
                          <div className="mb-5">
                            <h4 className={`font-bold mb-2 text-sm ${colors.text}`}>
                              {isAr ? "📚 المواد الوزارية" : "📚 Ministry Subjects"}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {(isAr ? top.field.subjectsAr : top.field.subjectsEn ?? []).map((s, i) => (
                                <span key={i} className={`text-xs font-bold px-3 py-1.5 rounded-full border ${colors.border} ${colors.text} bg-white/60`}>{s}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Majors (academic) */}
                        {track === "academic" && top.field.majorsAr && (
                          <div className="mb-5">
                            <h4 className={`font-bold mb-2 text-sm ${colors.text}`}>
                              {isAr ? "🎓 التخصصات الجامعية المتاحة" : "🎓 Available University Majors"}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {(isAr ? top.field.majorsAr : top.field.majorsEn ?? []).map((m, i) => (
                                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/70 text-foreground/80 border border-white/80">{m}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Careers */}
                        <div className="mb-5">
                          <h4 className={`font-bold mb-2 text-sm ${colors.text}`}>
                            {isAr ? "💼 المسارات المهنية المحتملة" : "💼 Potential Career Paths"}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {(isAr ? top.field.careersAr : top.field.careersEn).map((c, i) => (
                              <span key={i} className="text-xs font-medium px-2.5 py-1.5 rounded-lg bg-white/70 text-foreground/80 border border-white/80 flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Universities (academic) or TVET programs (BTEC) — collapsible */}
                        {track === "academic" && top.field.jordanianUniversities && (
                          <div>
                            <button
                              onClick={() => setUniOpen(s => ({ ...s, [top.field.id]: !s[top.field.id] }))}
                              className={`w-full flex items-center justify-between p-3 rounded-xl border ${colors.border} bg-white/60 hover:bg-white/80 transition-colors`}
                            >
                              <span className={`text-sm font-bold flex items-center gap-2 ${colors.text}`}>
                                <Building2 className="w-4 h-4" />
                                {isAr ? "🎓 الجامعات الأردنية المقبولة" : "🎓 Accepting Jordanian Universities"}
                              </span>
                              {uniOpen[top.field.id]
                                ? <ChevronUp className={`w-4 h-4 ${colors.text}`} />
                                : <ChevronDown className={`w-4 h-4 ${colors.text}`} />}
                            </button>
                            {uniOpen[top.field.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="mt-2 overflow-hidden"
                              >
                                <div className="p-3 rounded-xl bg-white/50 border border-white/80">
                                  <p className="text-xs text-muted-foreground mb-3">
                                    {isAr
                                      ? "* الحد الأدنى للمعدل مبني على أدنى برنامج متاح في هذا الحقل بكل جامعة"
                                      : "* Min. GPA based on the lowest program in this field at each university"}
                                  </p>
                                  <div className="space-y-2">
                                    {top.field.jordanianUniversities.map((u, i) => (
                                      <div key={i} className="flex items-center justify-between gap-2 text-sm">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                          <span className="text-foreground/80 font-medium truncate">
                                            {isAr ? u.name : u.nameEn}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin className="w-3 h-3" />{u.city}
                                          </span>
                                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.bg} text-white`}>
                                            {u.minGPA}%+
                                          </span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* TVET Programs (BTEC) — collapsible */}
                        {track === "btec" && top.field.tvetPrograms && (
                          <div>
                            <button
                              onClick={() => setUniOpen(s => ({ ...s, [top.field.id]: !s[top.field.id] }))}
                              className={`w-full flex items-center justify-between p-3 rounded-xl border ${colors.border} bg-white/60 hover:bg-white/80 transition-colors`}
                            >
                              <span className={`text-sm font-bold flex items-center gap-2 ${colors.text}`}>
                                <Building2 className="w-4 h-4" />
                                {isAr ? "🏫 البرامج المتاحة في مراكز التدريب" : "🏫 Available TVET/Community College Programs"}
                              </span>
                              {uniOpen[top.field.id]
                                ? <ChevronUp className={`w-4 h-4 ${colors.text}`} />
                                : <ChevronDown className={`w-4 h-4 ${colors.text}`} />}
                            </button>
                            {uniOpen[top.field.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="mt-2 overflow-hidden"
                              >
                                <div className="p-3 rounded-xl bg-white/50 border border-white/80">
                                  <div className="space-y-2">
                                    {top.field.tvetPrograms.map((p, i) => (
                                      <div key={i} className="flex items-start justify-between gap-2 text-sm">
                                        <span className="text-foreground/80 font-medium">
                                          {isAr ? p.name : p.nameEn}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                                          <MapPin className="w-3 h-3" />{p.city}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Alternate results */}
                {results.slice(1, 3).length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-muted-foreground mb-4">
                      {isAr ? "حقول بديلة تناسبك أيضاً" : "Alternative fields that also suit you"}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {results.slice(1, 3).map((result, i) => {
                        const colors = FIELD_COLORS[result.field.color] ?? FIELD_COLORS.slate;
                        return (
                          <motion.div key={result.field.id}
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                            <div className={`p-5 rounded-2xl border-2 ${colors.border} ${colors.light}`}>
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-3xl">{result.field.emoji}</span>
                                  <div>
                                    <div className={`font-extrabold text-sm ${colors.text}`}>
                                      {isAr ? result.field.nameAr : result.field.nameEn}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                      {isAr ? result.field.descriptionAr : result.field.descriptionEn}
                                    </div>
                                  </div>
                                </div>
                                <div className={`text-xl font-extrabold ${colors.text}`}>{result.percentage}%</div>
                              </div>
                              <div className="h-2 bg-white/60 rounded-full overflow-hidden">
                                <motion.div className={`h-full rounded-full ${colors.bg}`}
                                  initial={{ width: 0 }} animate={{ width: `${result.percentage}%` }}
                                  transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeOut" }} />
                              </div>
                              <div className="mt-3 flex flex-wrap gap-1">
                                {(isAr ? result.field.careersAr : result.field.careersEn).slice(0, 3).map((c, ci) => (
                                  <span key={ci} className="text-xs px-2 py-0.5 rounded-md bg-white/70 text-foreground/70 border border-white">{c}</span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Fields distribution (mini) */}
                {results.slice(3, 7).length > 0 && (
                  <div className="mb-8 p-5 bg-muted/30 rounded-2xl border border-border/50">
                    <h4 className="text-sm font-bold text-muted-foreground mb-3">
                      {isAr ? "توزيع بقية الحقول" : "Remaining fields distribution"}
                    </h4>
                    <div className="space-y-2">
                      {results.slice(3, 7).map((result) => {
                        const colors = FIELD_COLORS[result.field.color] ?? FIELD_COLORS.slate;
                        return (
                          <div key={result.field.id} className="flex items-center gap-3">
                            <span className="text-lg w-6">{result.field.emoji}</span>
                            <span className="text-sm text-foreground/70 flex-1 min-w-0 truncate">
                              {isAr ? result.field.nameAr : result.field.nameEn}
                            </span>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${colors.bg}`} style={{ width: `${result.percentage}%` }} />
                              </div>
                              <span className="text-xs font-bold text-muted-foreground w-8 text-end">{result.percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                  className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-border/50 p-8 text-center">
                  <GraduationCap className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-extrabold text-foreground mb-3">
                    {isAr ? "تريد توصيات أكثر تفصيلاً؟" : "Want more detailed recommendations?"}
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    {isAr
                      ? "جرّب التقييم الكامل للحصول على توصيات بالتخصصات والمهن والرواتب والمهارات المطلوبة — مخصصة بالكامل للأردن."
                      : "Try the full assessment for detailed recommendations on majors, careers, salaries, and required skills — fully tailored to Jordan."}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/assessment">
                      <Button size="lg" className="gap-2 px-8 shadow-lg shadow-primary/20">
                        <Sparkles className="w-5 h-5" />
                        {isAr ? "ابدأ التقييم الكامل المجاني" : "Start Full Free Assessment"}
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" onClick={restart} className="gap-2">
                      <RefreshCw className="w-4 h-4" />
                      {isAr ? "أعد الاختبار" : "Retake Quiz"}
                    </Button>
                  </div>
                </motion.div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
