
import { GoogleGenAI, Type } from "@google/genai";
import { AIExplanation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getIdiomExplanation = async (idiom: string): Promise<AIExplanation> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Azaldu nazazu euskarazko esaera hau: "${idiom}". Eman azalpen labur bat, adibide esaldi bat eta zein testuingurutan erabiltzen den.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          azalpena: {
            type: Type.STRING,
            description: "Esaeraren esanahiaren azalpen laburra.",
          },
          adibidea: {
            type: Type.STRING,
            description: "Esaera erabiltzen duen esaldi adibide bat.",
          },
          testuingurua: {
            type: Type.STRING,
            description: "Esaera hau noiz edo nola erabiltzen den (lagunartean, formala, etab.).",
          },
        },
        required: ["azalpena", "adibidea", "testuingurua"],
      },
    },
  });

  const text = response.text.trim();
  return JSON.parse(text) as AIExplanation;
};
