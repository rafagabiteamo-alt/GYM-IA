import { GoogleGenAI } from "@google/genai";
import { Student, Transaction } from "../types";

// Note: In a real production app, this would likely be a backend call to protect the API Key
// or the key would be injected via a safe environment variable in a build process.
const API_KEY = process.env.API_KEY || ''; 

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const sendMessageToGemini = async (
  message: string, 
  contextData: { students: Student[], transactions: Transaction[] }
): Promise<string> => {
  if (!API_KEY) {
    return "Erro: Chave de API não configurada (process.env.API_KEY).";
  }

  try {
    const systemPrompt = `
      Você é o GymFlow IA, um assistente financeiro especializado para donos de academia.
      
      CONTEXTO DE DADOS ATUAL:
      Alunos: ${JSON.stringify(contextData.students)}
      Transações (Receitas e Despesas): ${JSON.stringify(contextData.transactions)}
      
      SUAS FUNÇÕES:
      1. Analisar os dados fornecidos acima.
      2. Responder perguntas sobre faturamento, lucro, e inadimplência.
      3. Se o usuário pedir para "Listar inadimplentes", liste os nomes e telefones.
      4. Se o usuário pedir "Lucro", calcule (Soma das entradas - Soma das saídas).
      5. Seja direto, use emojis, e fale português do Brasil.
      6. Mantenha um tom prestativo e profissional, mas simples.
      
      PERGUNTA DO USUÁRIO:
      ${message}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: systemPrompt,
    });

    return response.text || "Desculpe, não consegui processar sua solicitação no momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ocorreu um erro ao conectar com a IA. Verifique sua conexão ou a chave de API.";
  }
};
