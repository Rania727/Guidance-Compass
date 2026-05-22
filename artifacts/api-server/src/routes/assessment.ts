import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, assessmentResultsTable } from "@workspace/db";
import { openai } from "@workspace/integrations-openai-ai-server";
import {
  GetAssessmentQuestionsResponse,
  SubmitAssessmentBody,
  GetAssessmentResultParams,
  GetAssessmentResultResponse,
} from "@workspace/api-zod";
import { assessmentQuestions } from "../lib/questions";

const router: IRouter = Router();

router.get("/assessment/questions", async (_req, res): Promise<void> => {
  res.json(GetAssessmentQuestionsResponse.parse(assessmentQuestions));
});

router.post("/assessment/submit", async (req, res): Promise<void> => {
  const parsed = SubmitAssessmentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { studentName, educationLevel, language, country, tawjihiStream, answers } = parsed.data;
  const isArabic = language === "ar";

  const answersContext = answers
    .map((a) => {
      const category = assessmentQuestions.find((c) =>
        c.questions.some((q) => q.id === a.questionId)
      );
      const question = category?.questions.find((q) => q.id === a.questionId);
      const option = question?.options.find((o) => o.id === a.selectedOptionId);

      const isOther = a.selectedOptionId.endsWith("-other");
      const answerText = isOther && a.otherText
        ? `${isArabic ? "غير ذلك" : "Other"}: ${a.otherText}`
        : (isArabic ? option?.text : (option?.textEn || option?.text)) || a.selectedOptionId;

      const questionText = isArabic
        ? question?.text || a.questionId
        : (question?.textEn || question?.text || a.questionId);

      const categoryName = isArabic
        ? category?.name || "غير محددة"
        : (category?.nameEn || category?.name || "Unknown");

      return `Q: ${questionText}\nA: ${answerText}\nCategory: ${categoryName}`;
    })
    .join("\n\n");

  const langInstruction = isArabic
    ? "Respond entirely in Arabic. All text in the JSON must be in Arabic."
    : "Respond entirely in English. All text in the JSON must be in English.";

  const countryContext = isArabic
    ? `الطالب من ${country}. قدّم توصيات مخصصة لسوق العمل في ${country}، بما في ذلك الجامعات المتاحة هناك، ونطاقات الرواتب الواقعية بعملة ${country}، ومستوى الطلب على المهن في ذلك السوق تحديداً.`
    : `The student is from ${country}. Provide recommendations tailored to the job market in ${country}, including universities available there, realistic salary ranges in ${country}'s currency, and demand levels specific to that market.`;

  const isJordan = country === "الأردن" || country === "Jordan";
  const tawjihiContext = isJordan && tawjihiStream
    ? (isArabic
        ? `\n⭐ فرع التوجيهي الأردني: ${tawjihiStream}\nيجب أن تكون التخصصات الجامعية المقترحة متوافقة مع هذا الفرع وقابلة للقبول في الجامعات الأردنية. اذكر المعدل التقريبي اللازم لكل تخصص في الأردن. لا تقترح تخصصات لا يُسمح لهذا الفرع الالتحاق بها أصلاً.`
        : `\n⭐ Jordanian Tawjihi Stream: ${tawjihiStream}\nRecommended university majors must be compatible with this Tawjihi stream and accepted in Jordanian universities. Mention the approximate required average for each major. Do not suggest majors that are not open to this stream.`)
    : "";

  const prompt = isArabic
    ? `أنت مستشار أكاديمي ومهني متخصص. بناءً على إجابات الطالب، قدّم تحليلاً شاملاً وتوصيات مخصصة ودقيقة.

اسم الطالب: ${studentName}
المرحلة الدراسية: ${educationLevel}
الدولة: ${country}

${countryContext}${tawjihiContext}

إجابات الطالب:
${answersContext}

قدّم ردك بتنسيق JSON فقط (بدون أي نص إضافي خارج JSON) يحتوي على:
{
  "personalityProfile": {
    "type": "اسم نمط الشخصية (مثل: القائد المبتكر، المحلل الاستراتيجي، المبدع الاجتماعي)",
    "description": "وصف مفصل لنمط الشخصية بـ 2-3 جمل واضحة",
    "strengths": ["نقطة قوة 1", "نقطة قوة 2", "نقطة قوة 3", "نقطة قوة 4"],
    "areasForGrowth": ["مجال تطوير 1", "مجال تطوير 2", "مجال تطوير 3"]
  },
  "recommendedMajors": [
    {
      "name": "اسم التخصص",
      "matchPercentage": 95,
      "description": "لماذا هذا التخصص مناسب لهذا الطالب تحديداً",
      "requiredSkills": ["مهارة 1", "مهارة 2", "مهارة 3"],
      "universities": ["جامعة في ${country} 1", "جامعة في ${country} 2", "جامعة دولية"]
    }
  ],
  "recommendedCareers": [
    {
      "title": "المسمى الوظيفي",
      "matchPercentage": 90,
      "description": "لماذا هذه المهنة مناسبة وما طبيعة العمل فيها",
      "averageSalary": "نطاق الراتب الواقعي في ${country}",
      "demandLevel": "مرتفع/متوسط/منخفض",
      "growthOutlook": "توقعات النمو في السنوات القادمة في ${country}"
    }
  ],
  "skillRecommendations": [
    {
      "name": "اسم المهارة",
      "category": "تقنية/شخصية/أكاديمية",
      "importance": "أساسية/مهمة/مفيدة",
      "description": "لماذا هذه المهارة مهمة وكيف يطورها الطالب عملياً"
    }
  ]
}

قدّم 3-4 تخصصات جامعية، 3-4 مسارات مهنية (تشمل خيارات للراغبين في الدراسة والراغبين في العمل المباشر وريادة الأعمال)، و4-5 مهارات للتطوير. النسب المئوية يجب أن تكون واقعية ومتنوعة (لا تجعل الكل 90%+). جميع الردود باللغة العربية.`
    : `You are a specialized academic and career advisor. Based on the student's answers, provide a comprehensive and personalized analysis.

Student Name: ${studentName}
Education Level: ${educationLevel}
Country: ${country}

${countryContext}${tawjihiContext}

Student's Answers:
${answersContext}

Respond in JSON format only (no text outside JSON):
{
  "personalityProfile": {
    "type": "Personality type name (e.g., Innovative Leader, Strategic Analyst, Social Creator)",
    "description": "Detailed 2-3 sentence description of this personality type",
    "strengths": ["Strength 1", "Strength 2", "Strength 3", "Strength 4"],
    "areasForGrowth": ["Growth area 1", "Growth area 2", "Growth area 3"]
  },
  "recommendedMajors": [
    {
      "name": "Major name",
      "matchPercentage": 95,
      "description": "Why this major specifically suits this student",
      "requiredSkills": ["Skill 1", "Skill 2", "Skill 3"],
      "universities": ["University in ${country} 1", "University in ${country} 2", "International university"]
    }
  ],
  "recommendedCareers": [
    {
      "title": "Job title",
      "matchPercentage": 90,
      "description": "Why this career fits and what the work involves",
      "averageSalary": "Realistic salary range in ${country}",
      "demandLevel": "High/Medium/Low",
      "growthOutlook": "Growth outlook for the coming years in ${country}"
    }
  ],
  "skillRecommendations": [
    {
      "name": "Skill name",
      "category": "Technical/Personal/Academic",
      "importance": "Essential/Important/Useful",
      "description": "Why this skill matters and how to develop it practically"
    }
  ]
}

Provide 3-4 university majors, 3-4 career paths (including options for those planning to study, enter the job market directly, or start a business), and 4-5 skill recommendations. Make percentages realistic and varied. All responses in English.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-5.2",
    max_completion_tokens: 8192,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const responseText = completion.choices[0]?.message?.content;
  if (!responseText) {
    res.status(500).json({ error: isArabic ? "فشل في توليد التوصيات" : "Failed to generate recommendations" });
    return;
  }

  let recommendations;
  try {
    recommendations = JSON.parse(responseText);
  } catch {
    res.status(500).json({ error: isArabic ? "فشل في معالجة التوصيات" : "Failed to process recommendations" });
    return;
  }

  const [result] = await db
    .insert(assessmentResultsTable)
    .values({
      studentName,
      educationLevel,
      language: language ?? "ar",
      country: country ?? "الأردن",
      tawjihiStream: tawjihiStream ?? null,
      answers,
      personalityProfile: recommendations.personalityProfile,
      recommendedMajors: recommendations.recommendedMajors,
      recommendedCareers: recommendations.recommendedCareers,
      skillRecommendations: recommendations.skillRecommendations,
    })
    .returning();

  const response = {
    id: result.id,
    studentName: result.studentName,
    educationLevel: result.educationLevel,
    language: result.language,
    country: result.country,
    ...(result.tawjihiStream ? { tawjihiStream: result.tawjihiStream } : {}),
    personalityProfile: result.personalityProfile,
    recommendedMajors: result.recommendedMajors,
    recommendedCareers: result.recommendedCareers,
    skillRecommendations: result.skillRecommendations,
    createdAt: result.createdAt.toISOString(),
  };

  res.status(201).json(response);
});

router.get("/assessment/results/:id", async (req, res): Promise<void> => {
  const params = GetAssessmentResultParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [result] = await db
    .select()
    .from(assessmentResultsTable)
    .where(eq(assessmentResultsTable.id, params.data.id));

  if (!result) {
    res.status(404).json({ error: "Result not found" });
    return;
  }

  const response = {
    id: result.id,
    studentName: result.studentName,
    educationLevel: result.educationLevel,
    language: result.language,
    country: result.country,
    ...(result.tawjihiStream ? { tawjihiStream: result.tawjihiStream } : {}),
    personalityProfile: result.personalityProfile,
    recommendedMajors: result.recommendedMajors,
    recommendedCareers: result.recommendedCareers,
    skillRecommendations: result.skillRecommendations,
    createdAt: result.createdAt.toISOString(),
  };

  res.json(response);
});

export default router;
