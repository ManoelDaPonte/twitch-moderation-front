import React from "react";
import styles from "@/styles/messageCounter.module.css";

const MessageCounter = ({ messageCount, minimumRequired = 10 }) => {
	const progress = Math.min((messageCount / minimumRequired) * 100, 100);

	return (
		<div className={styles.counterContainer}>
			<div className={styles.count}>
				<span className={styles.number}>{messageCount}</span>
				<span className={styles.label}>messages collectés</span>
			</div>

			<div className={styles.progressContainer}>
				<div
					className={styles.progressBar}
					style={{ width: `${progress}%` }}
				></div>
				<div className={styles.requiredLabel}>
					{messageCount < minimumRequired ? (
						<span>
							Besoin de {minimumRequired - messageCount} messages
							de plus pour l'analyse
						</span>
					) : (
						<span>Nombre suffisant pour l'analyse</span>
					)}
				</div>
			</div>
		</div>
	);
};

export default MessageCounter;
