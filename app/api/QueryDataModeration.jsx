import { useQuery } from "react-query";

const fetchDataModeration = async (userInput) => {
    const response = await fetch(
        `http://127.0.0.1:8000/moderation/${userInput.message}`
    );
    return response.json();
};

export default function QueryData({ userInput, setGraphDataModeration }) {
    const { data, isLoading: isLoadingModeration } = useQuery(
        ["moderation", userInput],
        () => userInput && fetchDataModeration(userInput),
        {
            onSuccess: (data) => {
                if (data !== null) {
                    setGraphDataModeration((prevData) => [...prevData, data]);
                }
            },
            onError: (error) => {
                console.error("Error fetching moderation data:", error);
            },

            // Set staleTime to Infinity to prevent refetching when the component re-mounts
            staleTime: Infinity,
        }
    );
}
