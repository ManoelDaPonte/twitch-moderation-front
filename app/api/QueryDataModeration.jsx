export const fetchDataModeration = async (userInput) => {
	const API_BASE_URL =
		process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

	if (!userInput?.message) {
		// Early return or throw an error if userInput.message is not valid
		throw new Error("userInput.message is required");
	}

	const response = await fetch(
		`${API_BASE_URL}/moderation/${userInput.message}`
	);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};
