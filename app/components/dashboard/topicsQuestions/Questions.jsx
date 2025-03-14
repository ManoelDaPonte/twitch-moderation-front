import React, { useState, useEffect } from "react";
import { useQueryTopicsModelisation } from "@/api/QueryModelisation";
import MessageCounter from "@/components/MessageCounter";
import ErrorMessage from "@/components/ErrorMessage";
import styles from "@/styles/questions.module.css";

export default function Questions({ messagesState }) {
	const [messages, setMessages] = messagesState;
	const [data, fetchData, isLoadingFetch, fetchError] =
		useQueryTopicsModelisation("questions");
	const [isLoading, setIsLoading] = useState(false);
	const [hasEnoughMessages, setHasEnoughMessages] = useState(false);

	// Vérifier s'il y a assez de messages (au moins 10)
	useEffect(() => {
		setHasEnoughMessages(messages && messages.length >= 10);
	}, [messages]);

	// Handler pour le click sur le bouton
	const handleClick = async () => {
		if (!hasEnoughMessages || isLoadingFetch) return;

		try {
			await fetchData(messages);
		} catch (error) {
			console.error("Error fetching questions:", error);
		}
	};

	return (
		<div className={styles.wrapper}>
			<MessageCounter
				messageCount={messages ? messages.length : 0}
				minimumRequired={10}
			/>

			{fetchError && (
				<ErrorMessage error={fetchError} onDismiss={() => {}} />
			)}

			<div
				onClick={handleClick}
				className={`${styles.button} ${
					!hasEnoughMessages ? styles.disabled : ""
				} ${isLoadingFetch ? styles.loading : ""}`}
			>
				{isLoadingFetch ? "Analyse en cours..." : "Fetch Questions"}
				{!hasEnoughMessages && (
					<span className={styles.tooltipText}>
						Besoin d'au moins 10 messages
					</span>
				)}
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
