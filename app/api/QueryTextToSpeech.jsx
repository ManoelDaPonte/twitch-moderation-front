import { useState } from "react";

// Custom hook for fetching and playing TTS audio
export const useTextToSpeech = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const playAudioFromText = async (inputText) => {
        setIsLoading(true);
        setError(null);

        try {
            const options = {
                method: "POST",
                headers: {
                    "xi-api-key": process.env.NEXT_PUBLIC_ELEVEN_API_KEY,

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model_id: "eleven_multilingual_v2",
                    text: inputText,
                }),
            };

            const response = await fetch(
                `https://api.elevenlabs.io/v1/text-to-speech/${process.env.NEXT_PUBLIC_ELEVEN_ENDPOINT}`,
                options
            );
            if (!response.ok) throw new Error("Failed to fetch TTS data");

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return { playAudioFromText, isLoading, error };
};
