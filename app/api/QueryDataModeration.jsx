export const fetchDataModeration = async (userInput) => {
	// Assurez-vous que l'URL n'a pas de barre oblique finale
	const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.endsWith("/")
		? process.env.NEXT_PUBLIC_API_URL.slice(0, -1)
		: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

	if (!userInput?.message) {
		throw new Error("userInput.message is required");
	}

	// Encoder l'URL pour éviter les problèmes avec les caractères spéciaux
	const encodedMessage = encodeURIComponent(userInput.message);

	// Log pour le débogage
	console.log(`Calling API: ${API_BASE_URL}/moderation/${encodedMessage}`);

	try {
		const response = await fetch(
			`${API_BASE_URL}/moderation/${encodedMessage}`
		);

		if (!response.ok) {
			const errorText = await response.text();
			console.error(`API error: ${response.status} - ${errorText}`);
			throw new Error(`Network response was not ok: ${response.status}`);
		}

		return response.json();
	} catch (error) {
		console.error("API call failed:", error);
		throw error;
	}
};
