import { GoogleGenAI, Chat } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';
import { UserProfile, Language } from '../types';

// Initialize the API client
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const getHonorific = (profile: UserProfile, language: Language): string => {
  const age = parseInt(profile.age) || 25; // Default to 25 if unknown
  const religion = profile.religion;

  if (language === 'en') {
     if (religion === 'Hindu') return age < 35 ? 'Sister' : 'Mother';
     if (religion === 'Muslim') return age < 35 ? 'Sister' : 'Mother';
     if (religion === 'Christian') return age < 35 ? 'Sister' : 'Mom';
     if (religion === 'Sikh') return age < 35 ? 'Sister' : 'Mother';
     return age < 35 ? 'Miss' : 'Ma\'am';
  }

  // Hindi / Hinglish Honorifics
  if (religion === 'Hindu') {
    return age < 35 ? 'Didi' : 'Mummy';
  } else if (religion === 'Muslim') {
    return age < 35 ? 'Aapi' : 'Ammi';
  } else if (religion === 'Christian') {
    return age < 35 ? 'Sis' : 'Mom';
  } else if (religion === 'Sikh') {
    return age < 35 ? 'Bhen' : 'Bebe';
  }
  
  // Default fallback if religion is not set or unknown
  return age < 35 ? 'Didi' : 'Aunty';
};

export const createChatSession = (userProfile: UserProfile, language: Language): Chat | null => {
  if (!apiKey) return null;

  const honorific = getHonorific(userProfile, language);
  const userName = userProfile.name ? userProfile.name : '';
  
  const sisterHonorifics = ['Didi', 'Aapi', 'Sis', 'Bhen', 'Sister', 'Miss'];
  const relation = sisterHonorifics.includes(honorific) ? 'Chota Bhai' : 'Beta';

  const languageInstruction = language === 'en' 
    ? "Respond strictly in English. Use polite and respectful standard English." 
    : "Respond in Hinglish (Hindi written in Roman script). Use the specific vocabulary rules defined.";

  const dynamicInstruction = `
    ${AI_SYSTEM_INSTRUCTION}

    IMPORTANT CONTEXT:
    You are talking to a customer named "${userName}".
    Her religion is "${userProfile.religion || 'Unknown'}" and she is approx ${userProfile.age || 'unknown'} years old.
    
    YOUR PERSONA:
    You are her "${relation}". 
    
    LANGUAGE:
    ${languageInstruction}

    STRICT ADDRESSING RULE:
    You MUST address her as "${honorific}" in every response. 
    Do NOT use "Madam", "Friend", or just "Didi" if the rule says otherwise.
    ALWAYS use: "${honorific}".
  `;

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: dynamicInstruction,
      temperature: 0.7, 
      topK: 40,
      maxOutputTokens: 1000, 
    }
  });
};

export const sendMessageToAmmi = async (chat: Chat | null, userPrompt: string, userProfile: UserProfile, language: Language): Promise<string> => {
  const honorific = getHonorific(userProfile, language);
  
  if (!chat) {
    return language === 'en' 
      ? "Sorry, connection not found. (API Key missing)" 
      : "Maaf kijiye, connection nahi mil raha. (API Key missing)";
  }

  try {
    const response = await chat.sendMessage({ message: userPrompt });
    const fallback = language === 'en' 
      ? `Yes ${honorific}, I didn't understand. Could you say that again?`
      : `Ji ${honorific}, mujhe samajh nahi aaya. Phir se batayengi?`;
    return response.text || fallback;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'en'
      ? `Sorry ${honorific}, there is a server issue. I will check in a moment.`
      : `Maaf karna ${honorific}, server mein kuch dikkat hai. Main thodi der mein check karta hoon.`;
  }
};