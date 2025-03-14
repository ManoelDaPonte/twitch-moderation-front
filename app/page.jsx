"use client";
import styles from "@/styles/page.module.css";
import TwitchChat from "@/components/TwitchChat";
import DashBoard from "@/components/dashboard/DashBoard";
import React, { useState } from "react";

export default function Page() {
	const [lastMessage, setLastMessage] = useState(null);
	const [messages, setMessages] = useState([]);
	const [channelName, setChannelName] = useState("mistermv"); // Valeur par défaut

	return (
		<div className={styles.container}>
			<TwitchChat
				channelName={channelName}
				messagesState={[messages, setMessages]}
				lastMessageState={[lastMessage, setLastMessage]}
			/>

			<DashBoard
				messagesState={[messages, setMessages]}
				lastMessageState={[lastMessage, setLastMessage]}
			/>
		</div>
	);
}
