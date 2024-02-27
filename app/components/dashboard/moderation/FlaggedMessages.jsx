import React from "react";

const FlaggedMessages = ({ graphDataModeration }) => {
    // Initialize accumulators for category scores and flagged status
    let categoryScores = {};
    let categoryFlagged = {};

    // Initialize an array to hold messages that are flagged
    let flaggedMessages = [];

    graphDataModeration.forEach((resInstance) => {
        // Check if the main message is flagged
        if (resInstance.flagged) {
            flaggedMessages.push(resInstance.input); // Add the main message to flaggedMessages if it's flagged
        }

        // Iterate through each category in the dictionary
        Object.entries(resInstance.categories || {}).forEach(
            ([category, data]) => {
                // Initialize categoryScores array if it doesn't exist
                if (!categoryScores[category]) {
                    categoryScores[category] = [];
                }
                categoryScores[category].push(data.score);

                // Set flagged status to true if at least one instance is flagged
                if (data.flagged) {
                    categoryFlagged[category] = true;
                    // Optionally, accumulate flagged messages if they are tied to categories
                    flaggedMessages.push(resInstance.input);
                }
            }
        );
    });

    // Remove duplicates from flaggedMessages
    flaggedMessages = [...new Set(flaggedMessages)];

    return (
        <div>
            <h2>Flagged Messages</h2>
            {flaggedMessages.length > 0 ? (
                <ul>
                    {flaggedMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            ) : (
                <p>No messages are flagged.</p>
            )}
        </div>
    );
};

export default FlaggedMessages;
