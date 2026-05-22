import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { useGetAssessmentResult } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Loader2, Printer, Compass, GraduationCap,
  Briefcase, Star, Target, CheckCircle2, TrendingUp, AlertCircle,
  Brain, Sparkles, MapPin, Mail, Phone
} from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Results() {
  const [, params] = useRoute("/results/:id");
  const resultId = parseInt(params?.id || "0", 10);

  const { data: result, isLoading, error } = useGetAssessmentResult(resultId);
  const { t, dir } = useLang();
  const r = t.results;
  const f = t.footer;

  useEffect(() => {
    if (result) {
      const duration = 3000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#f59e0b', '#0f766e', '#14b8a6'] });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#f59e0b', '#0f766e', '#14b8a6'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  }, [result]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background" dir={dir}>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <Compass className="w-16 h-16 text-primary relative z-10" style={{ animation: "spin 3s linear infinite" }} />
        </div>
        <h2 className="mt-8 text-2xl font-bold text-foreground font-display">{r.loading}</h2>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center" dir={dir}>
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-bold mb-2">{r.notFoundTitle}</h2>
        <p className="text-muted-foreground mb-6">{r.notFoundDesc}</p>
        <Link href="/">
          <Button variant="outline">{r.backHome}</Button>
        </Link>
      </div>
    );
  }

  const resultLang = result.language || "ar";
  const resultDir = resultLang === "ar" ? "rtl" : "ltr";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-background/50 pt-24 pb-20 print:pt-10 print:bg-white" dir={resultDir}>
      <div className="container mx-auto px-4 max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-white p-8 rounded-3xl shadow-sm border border-border/50 print:shadow-none print:border-none"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-display font-extrabold text-foreground">{r.yourReport}</h1>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 font-bold text-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {result.studentName}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                {result.educationLevel}
              </span>
              {result.country && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {result.country}
                </span>
              )}
            </div>
          </div>
          <Button onClick={() => window.print()} variant="outline" className="print:hidden gap-2">
            <Printer className="w-4 h-4" />
            {r.printReport}
          </Button>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">

          {/* Section 1: Personality */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold font-display">{r.personalityTitle}</h2>
            </div>

            <Card className="p-8 border-primary/20 shadow-lg shadow-primary/5 bg-gradient-to-br from-white to-primary/5">
              <h3 className="text-3xl font-extrabold text-primary mb-4 font-display">
                {result.personalityProfile.type}
              </h3>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                {result.personalityProfile.description}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-emerald-700">
                    <CheckCircle2 className="w-5 h-5" /> {r.strengths}
                  </h4>
                  <ul className="space-y-3">
                    {result.personalityProfile.strengths.map((strength, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="flex items-center gap-2 font-bold text-lg mb-4 text-amber-600">
                    <Target className="w-5 h-5" /> {r.growthAreas}
                  </h4>
                  <ul className="space-y-3">
                    {result.personalityProfile.areasForGrowth.map((area, i) => (
                      <li key={i} className="flex items-start gap-2 text-foreground/80">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </motion.section>

          {/* Section 2: Majors */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl font-bold font-display">{r.recommendedMajors}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {result.recommendedMajors.map((major, index) => (
                <Card key={index} className="p-6 relative overflow-hidden group hover:border-accent/50 transition-colors">
                  {index === 0 && (
                    <div className="absolute top-0 end-0 bg-accent text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
                      ★ {r.matchPercent}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2">{major.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{major.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-bold mb-1">
                      <span>{r.matchPercent}</span>
                      <span className="text-accent">{major.matchPercentage}%</span>
                    </div>
                    <Progress value={major.matchPercentage} indicatorClassName="bg-accent" />
                  </div>

                  <div className="pt-4 border-t border-border/50">
                    <p className="text-xs font-bold text-muted-foreground mb-2">{r.universities}:</p>
                    <div className="flex flex-wrap gap-2">
                      {major.universities.slice(0, 3).map((uni, i) => (
                        <span key={i} className="text-xs bg-muted px-2 py-1 rounded-md text-foreground">{uni}</span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Section 3: Careers */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-secondary" />
              </div>
              <h2 className="text-2xl font-bold font-display">{r.careerPaths}</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {result.recommendedCareers.map((career, index) => (
                <Card key={index} className="p-6 hover:border-secondary/50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{career.title}</h3>
                    <span className="bg-secondary/10 text-secondary font-bold px-2 py-1 rounded-lg text-sm flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {career.matchPercentage}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{career.description}</p>

                  <div className="bg-muted/30 rounded-xl p-3 mb-4">
                    <p className="text-xs text-muted-foreground mb-0.5">{r.salary}</p>
                    <p className="font-bold text-sm text-foreground">{career.averageSalary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{r.demand}</p>
                      <p className="font-bold text-sm text-foreground">{career.demandLevel}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{r.growth}</p>
                      <p className="font-bold text-sm text-emerald-600">{career.growthOutlook}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Section 4: Skills */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-2xl font-bold font-display">{r.skillDev}</h2>
            </div>

            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {result.skillRecommendations.map((skill, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/50">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg">{skill.name}</h4>
                        <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{skill.category}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          skill.importance === r.essential || skill.importance === "Essential"
                            ? "bg-red-100 text-red-700"
                            : skill.importance === r.important || skill.importance === "Important"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {skill.importance}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{skill.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.section>

          {/* CTA: Retake or Contact */}
          <motion.section variants={itemVariants}>
            <Card className="p-8 bg-gradient-to-br from-secondary/10 to-primary/5 border-secondary/20 text-center">
              <h3 className="text-2xl font-bold mb-2">{r.contactUs}</h3>
              <p className="text-muted-foreground mb-6 text-lg">
                {resultLang === "ar"
                  ? "هل تريد إرشاداً مخصصاً؟ تواصل مع فريق بوصلة."
                  : "Want personalized guidance? Reach out to the Boselah team."}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`mailto:${f.email}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span dir="ltr">{f.email}</span>
                </a>
                <a
                  href={`tel:${f.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-primary/30 text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{f.phone}</span>
                </a>
              </div>
              <div className="mt-6">
                <Link href="/assessment">
                  <Button variant="ghost" className="text-muted-foreground">
                    {r.retakeAssessment}
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}
