import React, { useState } from "react";
import { useQueryTopicsModelisation } from "@/api/QueryModelisation";
import styles from "@/styles/questions.module.css";

export default function Questions({ messagesState }) {
    const [messages, setMessages] = messagesState;
    const [data, fetchData] = useQueryTopicsModelisation("questions"); // Use the modified hook

    // Handler for the click event
    const handleClick = () => {
        fetchData(messages); // Trigger data fetch with current messages
    };

    return (
        <div className={styles.wrapper}>
            <div onClick={handleClick} className={styles.button}>
                Fetch Questions
            </div>
            {data && (
                <div className={styles.topicsContainer}>
                    <div className={styles.topicsHeader}>
                        <div className={styles.headerTheme}>Theme</div>
                        <div className={styles.headerTopics}>Sample Topics</div>
                    </div>
                    {data.map((item) => (
                        <div className={styles.topicRow} key={item.cluster}>
                            <div className={styles.topicTheme}>
                                {item.theme}
                            </div>
                            <div className={styles.topicTopics}>
                                {item.questions
                                    .slice(0, 2)
                                    .map((topic, index) => (
                                        <div
                                            key={index}
                                            className={styles.topic}
                                        >
                                            {topic}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
