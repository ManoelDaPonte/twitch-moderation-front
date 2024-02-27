import { useState } from "react";
import Moderation from "@/components/dashboard/moderation/Moderation";
import TopicsQuestions from "@/components/dashboard/topicsQuestions/TopicsQuestions";
import styles from "@/styles/dashBoard.module.css";

export default function DashBoard({ messagesState, lastMessageState }) {
    const [activeTab, setActiveTab] = useState("moderation");

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
                <Moderation lastMessageState={lastMessageState} />
            )}

            {activeTab === "topics" && (
                <TopicsQuestions messagesState={messagesState} />
            )}
        </div>
    );
}
