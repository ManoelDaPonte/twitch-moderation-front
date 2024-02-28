import { useState } from "react";
import Moderation from "@/components/dashboard/moderation/Moderation";
import TopicsQuestions from "@/components/dashboard/topicsQuestions/TopicsQuestions";
import styles from "@/styles/dashBoard.module.css";
import { fetchDataModeration } from "@/api/QueryDataModeration";
import { useQuery } from "react-query";

export default function DashBoard({ messagesState, lastMessageState }) {
    const [activeTab, setActiveTab] = useState("moderation");
    const [lastMessage, setLastMessage] = lastMessageState;
    const [graphDataModeration, setGraphDataModeration] = useState([]);

    const { data, isLoading, isError, error } = useQuery(
        ["moderation", lastMessage?.message],
        () => fetchDataModeration(lastMessage),
        {
            enabled: !!lastMessage?.message,
            onSuccess: (fetchedData) => {
                setGraphDataModeration((prevData) => [
                    ...prevData,
                    fetchedData,
                ]);
            },
            refetchOnWindowFocus: false,
            staleTime: Infinity, // Adjust based on your requirements,
            cacheTime: Infinity, // Adjust based on your requirements,
        }
    );

    return (
        <div className={styles.dashBoardContainer}>
            <div className={styles.header}>
                <div
                    className={`${styles.tab} ${
                        activeTab === "moderation" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("moderation")}
                >
                    Moderation
                </div>
                <div
                    className={`${styles.tab} ${
                        activeTab === "topics" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("topics")}
                >
                    Topics
                </div>
            </div>

            {activeTab === "moderation" && (
                <Moderation graphDataModeration={graphDataModeration} />
            )}

            {activeTab === "topics" && (
                <TopicsQuestions messagesState={messagesState} />
            )}
        </div>
    );
}
