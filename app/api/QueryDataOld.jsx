import React, { useEffect } from "react";
import { useQuery } from "react-query";

const fetchDataCompletion = async (userInput) => {
    const response = await fetch(
        `http://127.0.0.1:8000/completion/${userInput}`
    );
    return response.json();
};

const fetchDataModeration = async (userInput) => {
    const response = await fetch(
        `http://127.0.0.1:8000/moderation/${userInput}`
    );
    return response.json();
};

export default function QueryData({
    userInput,
    // setGraphDataCompletion,
    setGraphDataModeration,
}) {
    // Only fetch data when userInput is provided
    // const { data: graphDataCompletion, isLoading: isLoadingCompletion } =
    //     useQuery(
    //         ["completion", userInput],
    //         () => userInput && fetchDataCompletion(userInput)
    //     );

    const { data: graphDataModeration, isLoading: isLoadingModeration } =
        useQuery(
            ["moderation", userInput],
            () => userInput && fetchDataModeration(userInput)
        );

    // Update the graphData state with fetched data using useEffect
    // useEffect(() => {
    //     if (graphDataCompletion) setGraphDataCompletion(graphDataCompletion);
    // }, [graphDataCompletion, setGraphDataCompletion]);

    useEffect(() => {
        if (graphDataModeration) setGraphDataModeration(graphDataModeration);
    }, [graphDataModeration, setGraphDataModeration]);

    // Display loading message while fetching data
    if (isLoadingModeration) return <div>Loading...</div>;

    return null;
}
