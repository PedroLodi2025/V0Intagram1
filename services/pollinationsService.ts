import { Tone } from "../types";

const TEXT_API_URL = 'https://text.pollinations.ai/';
const IMAGE_API_URL = 'https://image.pollinations.ai/prompt/';

export const generateCaption = async (tema: string, descricao: string, tom: Tone): Promise<string> => {
    const prompt = `Crie uma caption envolvente para Instagram sobre ${tema}. ${descricao ? `Contexto: ${descricao}` : ''} Tom: ${tom}. Inclua emojis e call-to-action. Máximo 2200 caracteres.`;
    const encodedPrompt = encodeURIComponent(prompt);
    try {
        const response = await fetch(`${TEXT_API_URL}${encodedPrompt}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Falha ao gerar legenda');
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error("Error generating caption:", error);
        return "Desculpe, não consegui gerar uma legenda no momento. Por favor, tente novamente.";
    }
};

export const generateImages = async (tema: string, estilo: string, quantidade: number, isStory: boolean): Promise<{ url: string; prompt: string }[]> => {
    const basePrompt = `Professional Instagram post image, ${tema}, modern design, vibrant colors, high quality, ${estilo} style`;
    const images = [];

    const width = isStory ? 1080 : 1080;
    const height = isStory ? 1920 : 1080;

    for (let i = 0; i < quantidade; i++) {
        const variation = i > 0 ? `, variation ${i + 1}` : '';
        const prompt = basePrompt + variation;
        const encodedPrompt = encodeURIComponent(prompt);
        const imageUrl = `${IMAGE_API_URL}${encodedPrompt}?width=${width}&height=${height}&seed=${Date.now()+i}`;
        images.push({ url: imageUrl, prompt });
    }
    return images;
};

export const generateHashtags = async (tema: string): Promise<string[]> => {
    const prompt = `Liste 15-20 hashtags relevantes para Instagram sobre o tema: ${tema}. Misture hashtags populares e de nicho. Retorne apenas as hashtags separadas por espaço.`;
    const encodedPrompt = encodeURIComponent(prompt);
    try {
        const response = await fetch(`${TEXT_API_URL}${encodedPrompt}`, { cache: 'no-store' });
        if (!response.ok) {
            throw new Error('Falha ao gerar hashtags');
        }
        const text = await response.text();
        return text.split(' ').map(h => h.replace(/#/g, '')).filter(Boolean);
    } catch (error) {
        console.error("Error generating hashtags:", error);
        return ["erro", "gerando", "hashtags"];
    }
};