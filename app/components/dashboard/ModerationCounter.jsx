import React from "react";
import styles from "@/styles/moderationCounter.module.css"; // Import the CSS module

const ModerationCounter = ({ graphDataModeration }) => {
    const flaggedCount = graphDataModeration.filter(
        (item) => item.flagged
    ).length;
    const unflaggedCount = graphDataModeration.length - flaggedCount;

    return (
        <div className={styles.counterContainer}>
            <div className={styles.counterItem}>
                <div className={`${styles.point} ${styles.greenPoint}`}></div>
                <div>{unflaggedCount}</div>
            </div>
            <div className={styles.counterItem}>
                <div className={`${styles.point} ${styles.redPoint}`}></div>
                <div>{flaggedCount}</div>
            </div>
        </div>
    );
};

export default ModerationCounter;
