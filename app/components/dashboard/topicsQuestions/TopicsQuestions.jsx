import Questions from "@/components/dashboard/topicsQuestions/Questions";
import Topics from "@/components/dashboard/topicsQuestions/Topics";
import EmptyState from "@/components/EmptyState";
import styles from "@/styles/topicsAndQuestion.module.css";
import { useState, useEffect } from "react";

export default function TopicsQuestions({ messagesState }) {
	const [messages] = messagesState;
	const [hasMessages, setHasMessages] = useState(false);

	useEffect(() => {
		// Vérifiez s'il y a des messages
		setHasMessages(messages && messages.length > 0);
	}, [messages]);

	return (
		<div className={styles.wrapper}>
			{hasMessages ? (
				<>
					<Topics messagesState={messagesState} />
					<Questions messagesState={messagesState} />
				</>
			) : (
				<EmptyState type="topics" />
			)}
		</div>
	);
}
