import React from "react";
import Plot from "react-plotly.js";

const Graph = ({ graphDataModeration }) => {
    // Initialize dictionaries to store accumulated scores and flagged status for each category
    let categoryScores = {};
    let categoryFlagged = {};

    // Iterate through each instance of res
    graphDataModeration.forEach((resInstance) => {
        // Iterate through each category in the dictionary
        Object.entries(resInstance.categories).forEach(([category, data]) => {
            // Accumulate the score for the category
            if (!categoryScores[category]) {
                categoryScores[category] = [];
            }
            categoryScores[category].push(data.score);

            // Set flagged status to True if at least one instance has it flagged
            if (data.flagged) {
                categoryFlagged[category] = true;
            }
        });
    });

    // Calculate the average score for each category
    let categories = [];
    let averagedScores = [];
    Object.entries(categoryScores).forEach(([category, scores]) => {
        if (categoryFlagged[category]) {
            let averageScore =
                scores.reduce((a, b) => a + b, 0) / scores.length;
            categories.push(category);
            averagedScores.push(averageScore);
        }
    });

    // Set flagged status for each category
    let flaggedCategories = Object.keys(categoryFlagged).filter(
        (category) => categoryFlagged[category]
    );

    return (
        <Plot
            data={[
                {
                    type: "scatterpolar",
                    r: averagedScores,
                    theta: categories,
                    fill: "toself",
                    mode: "none",
                    line: { color: "yellow" }, // Bright yellow for visibility against the dark theme
                },
            ]}
            layout={{
                polar: {
                    radialaxis: {
                        visible: false,
                        range: [0, Math.max(...averagedScores) || 1],
                    },
                    bgcolor: "rgba(55,55,55,0.5)", // Adjusted to a lighter dark for subtle contrast
                },
                paper_bgcolor: "#222222", // Matching the dashboard container background color
                plot_bgcolor: "#222222", // Consistent with the dashboard theme
                showlegend: false,
                title: {
                    font: {
                        color: "white", // Ensures the title is visible against the dark background
                        size: 16, // Adjusted for better readability
                    },
                },
                margin: { t: 40, b: 40, l: 40, r: 40 }, // Adjust margins to fit your layout
                font: {
                    color: "white", // Ensures all text is visible against the dark background
                },
            }}
        />
    );
};

export default Graph;
