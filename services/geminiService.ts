import { GoogleGenAI } from "@google/genai";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Converts a File object to a base64 string suitable for the API (stripping headers).
 */
const fileToGenerativePart = async (
  file: File
): Promise<{ inlineData: { data: string; mimeType: string } }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Split the base64 string to get the data part
      const base64Data = base64String.split(",")[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Generates a console-styled avatar using Gemini 2.5 Flash Image (Nano Banana).
 */
export const generateConsoleAvatar = async (
  imageFile: File,
  consoleName: string
): Promise<string> => {
  try {
    const imagePart = await fileToGenerativePart(imageFile);

    const prompt = `
      Reimagine a cena da foto enviada, mantendo as características faciais originais do sujeito (cabelo, rosto, acessórios), como uma festa de aniversário vibrante onde o tema central é o console de videogame ${consoleName}.
      
      A estética da imagem deve ser realista
  
      Inclua decorações de festa (bolo, balões, banners) que remetam diretamente à identidade visual do ${consoleName}.
      A saída deve ser SOMENTE a imagem transformada.
    `;

    // Using 'gemini-2.5-flash-image' as requested
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: {
        parts: [imagePart, { text: prompt }],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;

    if (!parts) {
      throw new Error("No content generated");
    }

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating avatar:", error);
    throw error;
  }
};
