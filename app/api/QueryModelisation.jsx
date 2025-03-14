import { useState, useCallback } from "react";

export function useQueryTopicsModelisation(endpoint) {
	const [data, setData] = useState(null);

	// This function is what we'll call to trigger the data fetch
	const fetchData = useCallback(async (messages) => {
		const comments = messages.map((messageObject) => messageObject.message);
		const API_BASE_URL =
			process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
		console.log(comments); // Debug: Log the comments being sent

		try {
			const response = await fetch(`${API_BASE_URL}/${endpoint}/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ comments }),
			});

			if (response.ok) {
				const json = await response.json();
				setData(json);
			} else {
				console.error("Error:", response.statusText);
			}
		} catch (error) {
			console.error("Error:", error);
		}
	}, []);
	return [data, fetchData];
}
