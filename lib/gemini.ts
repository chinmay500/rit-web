import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || "")

// Dynamic knowledge base
export interface DynamicKnowledge {
  results: string[]
  placements: string[]
  studentAwards: string[]
  collegeAwards: string[]
  facultyInfo: string[]
  generalInfo: string[]
}

const dynamicKnowledge: DynamicKnowledge = {
  results: [],
  placements: [],
  studentAwards: [],
  collegeAwards: [],
  facultyInfo: [],
  generalInfo: [],
}

// Define more specific types for our data structures
interface FacultyData {
  overview: {
    totalFaculty: number
    phdQualified: string
    keyPoints: string[]
  }
  departments: Array<{
    name: string
    facultyCount: number
    notableAchievements: string[]
  }>
}

interface AcademicsData {
  courses: Array<{
    name: string
    duration: string
    keySubjects: string[]
    careerProspects: string[]
    specialFeatures: string[]
  }>
  results: {
    overallPassPercentage: string
    departmentWise: Record<string, string>
  }
}

interface LabData {
  name: string
  department: string
  
}

interface FacilitiesData {
  academic: string[]
  infrastructure: string[]
  studentSupport: string[]
}

interface AchievementsData {
  student: Array<{
    title: string
    year: number
    description: string
  }>
  college: Array<{
    title: string
    year: number
    awardedBy: string
  }>
}

interface PlacementsData {
  overallStats: {
    placementRate: string
    averagePackage: string
    highestPackage: string
  }
  topRecruiters: string[]
  departmentWise: Array<{
    department: string
    placementRate: string
    averagePackage: string
    topCompanies: string[]
  }>
  yearWiseStats: Array<{
    year: number
    placementRate: string
    averagePackage: string
    totalStudentsPlaced: number
  }>
}

type StudentAwardsData = Array<{
  year: number
  awards: Array<{
    title: string
    students: string[]
    department: string
    description: string
  }>
}>

interface GeneralInformationData {
  collegeName: string
  location: {
    address: string
    nearbyLandmarks: string[]
  }
  establishment: {
    year: number
    founder: string
  }
  accreditation: {
    approvedBy: string
    affiliatedTo: string
  }
  vision: string
  mission: string[]
  campusArea: string
  studentStrength: {
    total: number
    maleToFemaleRatio: string
  }
  facultyStrength: number
  libraryInfo: {
    books: number
    eJournals: number
    readingCapacity: number
  }
  hostelFacilities: {
    boysHostel: {
      capacity: number
      rooms: string
    }
    girlsHostel: {
      capacity: number
      rooms: string
    }
  }
  transportFacility: string
  sportsFacilities: string[]
  extraCurricularActivities: string[]
  industryCollaborations: string[]
  alumniFamousPersonalities: Array<{
    name: string
    batch: number
    achievement: string
  }>
}

interface AdmissionInfoData {
  admissionProcess: string[]
  eligibility: {
    generalCriteria: string
    minimumMarks: string
    ageLimit: string
  }
  requiredDocuments: string[]
  importantDates: {
    applicationStart: string
    applicationEnd: string
    meritListAnnouncement: string
    counselingRounds: Array<{
      round: number
      date: string
    }>
    classesCommence: string
  }
  feesStructure: {
    tuitionFee: string
    developmentFee: string
    cautionDeposit: string
    totalFirstYear: string
  }
  scholarships: Array<{
    name: string
    criteria: string
    benefit: string
  }>
  reservationPolicy: Record<string, string>
  contactInfo: {
    admissionHelpline: string
    email: string
    website: string
  }
}

interface PartnershipData {
  name: string
  focus: string[]
  departments: string[]
}

interface ContextData {
  facultyData: FacultyData
  academicsData: AcademicsData
  labsData: LabData[]
  facilitiesData: FacilitiesData
  achievementsData: AchievementsData
  placementsData: PlacementsData
  studentAwardsData: StudentAwardsData
  generalInformationData: GeneralInformationData
  admissionInfoData: AdmissionInfoData
  partnershipsData: PartnershipData[]
}

const responseCache = new Map<string, string>()

export async function generateGeminiResponse(
  prompt: string,
  context: {
    systemPrompt: string
    data: ContextData
  },
): Promise<string> {
  const cacheKey = `${prompt}-${JSON.stringify(context.data)}`
  if (responseCache.has(cacheKey)) {
    return responseCache.get(cacheKey)!
  }
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1000,
      },
    })

    const fullPrompt = `${context.systemPrompt}\n\n
Format your responses with clear structure:
- Use numbered emojis (1️⃣, 2️⃣, etc.) for main points
- Wrap important terms in **asterisks**
- Use bullet points (•) for details
- Use arrows (→) for outcomes or results
- Add line breaks between sections for clarity

${JSON.stringify(dynamicKnowledge, null, 2)}\n\nStatic Data:\n${JSON.stringify(context.data, null, 2)}\n\nPartnerships:\n${JSON.stringify(context.data.partnershipsData, null, 2)}\n\n${prompt}`

    const result = await model.generateContent(fullPrompt)
    const response = await result.response
    responseCache.set(cacheKey, response.text())
    return response.text()
  } catch (error) {
    console.error("Error generating Gemini response:", error)
    throw error
  }
}

export function addToDynamicKnowledge(category: keyof DynamicKnowledge, newInfo: string) {
  if (newInfo && !dynamicKnowledge[category].includes(newInfo)) {
    dynamicKnowledge[category] = [...dynamicKnowledge[category], newInfo]
  }
}

