"use client";
import styles from "@/styles/page.module.css";
import TwitchChat from "@/components/TwitchChat";
import DashBoard from "@/components/dashboard/DashBoard";
import React, { useState } from "react";

export default function Page() {
    const [lastMessage, setLastMesage] = useState(null);
    const [messages, setMessages] = useState([]);

    return (
        <div className={styles.container}>
            <TwitchChat
                channelName={"shisheyu_mayamoto"}
                messagesState={[messages, setMessages]}
                lastMessageState={[lastMessage, setLastMesage]}
            />

            <DashBoard
                messagesState={[messages, setMessages]}
                lastMessageState={[lastMessage, setLastMesage]}
            />
        </div>
    );
}
