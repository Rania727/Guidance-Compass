import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useGetAssessmentQuestions, useSubmitAssessment } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, Loader2, Sparkles, CheckCircle2, Globe, MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/LanguageContext";
import { COUNTRIES } from "@/lib/translations";

type AnswerState = Record<string, { selectedOptionId: string; value: number }>;
type OtherTexts = Record<string, string>;

// Step layout:
// 0 = language selection
// 1 = basic info (name, education, country)
// 2..N+1 = question categories
export default function Assessment() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { lang, setLang, t, dir } = useLang();
  const a = t.assessment;

  const { data: categories, isLoading, error } = useGetAssessmentQuestions();
  const submitMutation = useSubmitAssessment();

  const [currentStep, setCurrentStep] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [country, setCountry] = useState("الأردن");
  const [answers, setAnswers] = useState<AnswerState>({});
  const [otherTexts, setOtherTexts] = useState<OtherTexts>({});

  // When language changes, reset country to proper display
  useEffect(() => {
    const jordan = COUNTRIES.find(c => c.en === "Jordan");
    if (jordan) {
      setCountry(lang === "ar" ? jordan.ar : jordan.en);
    }
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background" dir={dir}>
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-xl font-bold text-foreground animate-pulse">{a.loading}</p>
      </div>
    );
  }

  if (error || !categories) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center" dir={dir}>
        <Card className="max-w-md p-8">
          <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">{a.errorTitle}</h2>
          <p className="text-muted-foreground mb-6">{a.errorDesc}</p>
          <Button onClick={() => window.location.reload()} className="w-full">{a.retry}</Button>
        </Card>
      </div>
    );
  }

  const LANG_STEP = 0;
  const INFO_STEP = 1;
  const FIRST_Q_STEP = 2;

  const totalSteps = FIRST_Q_STEP + categories.length;
  const progress = (currentStep / (totalSteps - 1)) * 100;
  const currentCategoryIndex = currentStep - FIRST_Q_STEP;
  const currentCategory = currentStep >= FIRST_Q_STEP ? categories[currentCategoryIndex] : null;

  const getOptionText = (option: { text: string; textEn?: string }) =>
    lang === "en" && option.textEn ? option.textEn : option.text;

  const getQuestionText = (q: { text: string; textEn?: string }) =>
    lang === "en" && q.textEn ? q.textEn : q.text;

  const getCategoryName = (cat: { name: string; nameEn?: string }) =>
    lang === "en" && cat.nameEn ? cat.nameEn : cat.name;

  const getCategoryDesc = (cat: { description: string; descriptionEn?: string }) =>
    lang === "en" && cat.descriptionEn ? cat.descriptionEn : cat.description;

  const isOtherOption = (optionId: string) => optionId.endsWith("-other");

  const handleOptionSelect = (questionId: string, optionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: { selectedOptionId: optionId, value } }));
  };

  const canGoNext = (): boolean => {
    if (currentStep === LANG_STEP) return true;
    if (currentStep === INFO_STEP) {
      const base = studentName.trim().length >= 2 && educationLevel !== "" && country !== "";
      return base;
    }
    if (currentCategory) {
      return currentCategory.questions.every(q => {
        const ans = answers[q.id];
        if (!ans) return false;
        if (isOtherOption(ans.selectedOptionId)) {
          return (otherTexts[q.id] || "").trim().length >= 2;
        }
        return true;
      });
    }
    return false;
  };

  const handleNext = () => {
    if (canGoNext()) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast({
        title: a.incompleteTitle,
        description: a.incompleteDesc,
        variant: "destructive",
      });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
  };

  const handleSubmit = async () => {
    if (!canGoNext()) {
      toast({ title: a.incompleteTitle, description: a.incompleteDesc, variant: "destructive" });
      return;
    }
    try {
      const submissionData = {
        studentName,
        educationLevel,
        language: lang,
        country,
        answers: Object.entries(answers).map(([questionId, data]) => ({
          questionId,
          selectedOptionId: data.selectedOptionId,
          value: data.value,
          ...(isOtherOption(data.selectedOptionId) && otherTexts[questionId]
            ? { otherText: otherTexts[questionId] }
            : {}),
        })),
      };
      const result = await submitMutation.mutateAsync({ data: submissionData });
      toast({ title: a.successTitle, description: a.successDesc });
      setLocation(`/results/${result.id}`);
    } catch {
      toast({ title: a.submitError, description: a.submitErrorDesc, variant: "destructive" });
    }
  };

  const stepTitle = () => {
    if (currentStep === LANG_STEP) return a.chooseLanguage;
    if (currentStep === INFO_STEP) return a.basicInfo;
    return currentCategory ? getCategoryName(currentCategory) : "";
  };

  const stepDesc = () => {
    if (currentStep === LANG_STEP) return a.chooseLanguageDesc;
    if (currentStep === INFO_STEP) return a.basicInfoDesc;
    return currentCategory ? getCategoryDesc(currentCategory) : "";
  };

  const ChevPrev = dir === "rtl" ? ChevronRight : ChevronLeft;
  const ChevNext = dir === "rtl" ? ChevronLeft : ChevronRight;

  // Unique analyzing overlay
  if (submitMutation.isPending) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8 text-center" dir={dir}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border-4 border-accent/20 border-t-accent"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3 text-foreground">{a.analyzing}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {a.analyzingMessage} <span className="text-primary font-bold">{country}</span>...
          </p>
          <div className="mt-8 flex justify-center gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background/50" dir={dir}>
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header & Progress */}
        <div className="mb-10 sticky top-20 z-40 bg-background/90 backdrop-blur-md pt-4 pb-6 border-b border-border/50">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-display">{stepTitle()}</h1>
              <p className="text-muted-foreground mt-1 text-sm">{stepDesc()}</p>
            </div>
            {currentStep > 0 && (
              <div className={dir === "rtl" ? "text-left" : "text-right"}>
                <span className="text-2xl font-bold text-primary">{currentStep}</span>
                <span className="text-muted-foreground"> / {totalSteps - 1}</span>
              </div>
            )}
          </div>
          {currentStep > 0 && <Progress value={progress} className="h-2" />}
        </div>

        {/* Content Area */}
        <div className="min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: dir === "rtl" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir === "rtl" ? -50 : 50 }}
              transition={{ duration: 0.3 }}
            >
              {/* STEP 0: Language Selection */}
              {currentStep === LANG_STEP && (
                <div className="max-w-lg mx-auto">
                  <Card className="p-8 shadow-lg border-border/50 text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Globe className="w-10 h-10 text-primary" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Arabic */}
                      <button
                        onClick={() => setLang("ar")}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 ${
                          lang === "ar"
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-4xl">🇯🇴</span>
                        <div>
                          <div className="font-extrabold text-xl" dir="rtl">العربية</div>
                          <div className="text-sm text-muted-foreground">Arabic</div>
                        </div>
                        {lang === "ar" && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </button>

                      {/* English */}
                      <button
                        onClick={() => setLang("en")}
                        className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 ${
                          lang === "en"
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border bg-card hover:border-primary/30 hover:bg-muted/50"
                        }`}
                      >
                        <span className="text-4xl">🌐</span>
                        <div>
                          <div className="font-extrabold text-xl" dir="ltr">English</div>
                          <div className="text-sm text-muted-foreground">الإنجليزية</div>
                        </div>
                        {lang === "en" && <CheckCircle2 className="w-5 h-5 text-primary" />}
                      </button>
                    </div>
                  </Card>
                </div>
              )}

              {/* STEP 1: Basic Info */}
              {currentStep === INFO_STEP && (
                <Card className="p-8 md:p-10 shadow-lg border-border/50">
                  <div className="space-y-8">
                    {/* Name */}
                    <div>
                      <label className="block text-lg font-bold mb-3 text-foreground">{a.fullName}</label>
                      <Input
                        placeholder={a.namePlaceholder}
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="text-lg h-14 bg-muted/30 focus:bg-white"
                        dir={dir}
                      />
                    </div>

                    {/* Education Level */}
                    <div>
                      <label className="block text-lg font-bold mb-4 text-foreground">{a.educationLevel}</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {a.educationLevels.map((level) => (
                          <button
                            key={level}
                            onClick={() => setEducationLevel(level)}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                              educationLevel === level
                                ? "border-primary bg-primary/5 shadow-md text-primary"
                                : "border-border bg-card hover:border-primary/30 hover:bg-muted/50 text-foreground"
                            }`}
                          >
                            <span className="font-bold text-sm">{level}</span>
                            {educationLevel === level && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-lg font-bold mb-3 text-foreground">
                        <MapPin className="inline w-5 h-5 me-2 text-primary" />
                        {a.country}
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-1">
                        {COUNTRIES.map((c) => {
                          const label = lang === "ar" ? c.ar : c.en;
                          const isSelected = country === label;
                          return (
                            <button
                              key={c.en}
                              onClick={() => { setCountry(label); }}
                              className={`flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-all text-sm ${
                                isSelected
                                  ? "border-primary bg-primary/5 text-primary font-bold"
                                  : "border-border bg-card hover:border-primary/30 hover:bg-muted/50 text-foreground"
                              }`}
                            >
                              <span className={isSelected ? "font-bold" : ""}>{label}</span>
                              {isSelected && <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </Card>
              )}

              {/* STEPS 2+: Question Categories */}
              {currentStep >= FIRST_Q_STEP && currentCategory && (
                <div className="space-y-8">
                  {currentCategory.questions.map((question, qIndex) => {
                    const selectedId = answers[question.id]?.selectedOptionId;
                    const selectedIsOther = selectedId ? isOtherOption(selectedId) : false;

                    return (
                      <Card key={question.id} className="p-6 md:p-8 shadow-md border-border/50 hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-bold mb-6 text-foreground leading-relaxed">
                          <span className="text-primary me-2">{qIndex + 1}.</span>
                          {getQuestionText(question)}
                        </h3>

                        <div className="flex flex-col gap-3">
                          {question.options.map((option) => {
                            const isSelected = selectedId === option.id;
                            const isOther = isOtherOption(option.id);

                            return (
                              <div key={option.id}>
                                <button
                                  onClick={() => handleOptionSelect(question.id, option.id, option.value)}
                                  className={`flex items-center w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                                    isSelected
                                      ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                                      : "border-border/60 bg-card hover:border-primary/40 hover:bg-muted/30"
                                  } ${isOther ? "border-dashed" : ""}`}
                                >
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center me-4 flex-shrink-0 ${
                                    isSelected ? "border-primary" : "border-muted-foreground/40"
                                  }`}>
                                    {isSelected && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
                                  </div>
                                  <span className={`text-base ${isSelected ? "font-bold text-primary" : "text-foreground"} ${isOther ? "italic" : ""}`}>
                                    {getOptionText(option)}
                                  </span>
                                </button>

                                {/* Other text input */}
                                {isSelected && isOther && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-2 px-2"
                                  >
                                    <Input
                                      placeholder={a.otherPlaceholder}
                                      value={otherTexts[question.id] || ""}
                                      onChange={(e) =>
                                        setOtherTexts(prev => ({ ...prev, [question.id]: e.target.value }))
                                      }
                                      className="bg-primary/5 border-primary/30 focus:bg-white"
                                      autoFocus
                                      dir={dir}
                                    />
                                  </motion.div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/50">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ChevPrev className="w-5 h-5" />
            {a.prev}
          </Button>

          {currentStep === totalSteps - 1 ? (
            <Button
              size="lg"
              onClick={handleSubmit}
              className="gap-2 px-10 shadow-lg shadow-primary/20"
            >
              <Sparkles className="w-5 h-5" />
              {a.discover}
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={handleNext}
              className="gap-2 px-10 shadow-md shadow-primary/10"
            >
              {a.next}
              <ChevNext className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
