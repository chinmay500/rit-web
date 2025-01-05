import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || '');

// Dynamic knowledge base
export interface DynamicKnowledge {
  results: string[];
  placements: string[];
  studentAwards: string[];
  collegeAwards: string[];
  facultyInfo: string[];
  generalInfo: string[];
}

const dynamicKnowledge: DynamicKnowledge = {
  results: [],
  placements: [],
  studentAwards: [],
  collegeAwards: [],
  facultyInfo: [],
  generalInfo: []
};

export async function generateGeminiResponse(prompt: string, systemPrompt: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: 1000,
      }
    });
    
    const fullPrompt = `${systemPrompt}\n\nDynamic Knowledge:\n${JSON.stringify(dynamicKnowledge, null, 2)}\n\n${prompt}`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating Gemini response:', error);
    throw error;
  }
}

export function addToDynamicKnowledge(category: keyof DynamicKnowledge, newInfo: string) {
  if (newInfo && !dynamicKnowledge[category].includes(newInfo)) {
    dynamicKnowledge[category] = [...dynamicKnowledge[category], newInfo];
  }
}

