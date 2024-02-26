"use client";
import styles from "@/styles/page.module.css";
import TwitchChat from "@/components/TwitchChat";
import QueryData from "@/api/QueryData";
import DashBoard from "@/components/DashBoard";
import React, { useState } from "react";

export default function Page() {
    const [userInput, setUserInput] = useState(null);
    const [graphDataModeration, setGraphDataModeration] = useState([]);

    return (
        <div className={styles.container}>
            <TwitchChat setUserInput={setUserInput} channelName={"v4ssler"} />
            <QueryData
                userInput={userInput}
                setGraphDataModeration={setGraphDataModeration}
            />
            <DashBoard graphDataModeration={graphDataModeration} />
        </div>
    );
}
