export const fetchDataModeration = async (userInput) => {
    if (!userInput?.message) {
        // Early return or throw an error if userInput.message is not valid
        throw new Error("userInput.message is required");
    }

    const response = await fetch(
        `http://127.0.0.1:8000/moderation/${userInput.message}`
    );
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
};
