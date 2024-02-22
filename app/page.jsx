"use client";
import styles from "@/styles/page.module.css";
import TwitchChat from "@/components/TwitchChat";

export default function Page() {
    return (
        <div className={styles.container}>
            <TwitchChat />
        </div>
    );
}
