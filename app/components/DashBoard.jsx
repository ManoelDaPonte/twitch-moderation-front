import { useState } from "react";
import ModerationCounter from "@/components/dashboard/ModerationCounter";
import ModerationGraph from "@/components/dashboard/ModerationGraph";
import Topics from "@/components/dashboard/Topics";
import styles from "@/styles/dashBoard.module.css";

export default function DashBoard({ graphDataModeration }) {
    // State to manage the active tab
    const [activeTab, setActiveTab] = useState("moderation");

    return (
        <div className={styles.dashBoardContainer}>
            <div className={styles.header}>
                {/* Tab selection buttons with conditional styling for active tab */}
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
                <div className={styles.moderation}>
                    {graphDataModeration && (
                        <>
                            <ModerationCounter
                                graphDataModeration={graphDataModeration}
                            />

                            <ModerationGraph
                                graphDataModeration={graphDataModeration}
                            />
                        </>
                    )}
                </div>
            )}
            {activeTab === "topics" && (
                <div className={styles.topics}>
                    <Topics />
                </div>
            )}
        </div>
    );
}
