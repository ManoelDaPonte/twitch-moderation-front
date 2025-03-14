import React, { useState } from "react";
import styles from "@/styles/channelInput.module.css";

const ChannelInput = ({ onChannelChange, currentChannel }) => {
	const [inputValue, setInputValue] = useState(currentChannel || "");
	const [isEditing, setIsEditing] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputValue.trim()) {
			onChannelChange(inputValue.trim());
			setIsEditing(false);
		}
	};

	return (
		<div className={styles.channelInputContainer}>
			{!isEditing ? (
				<div
					className={styles.channelDisplay}
					onClick={() => setIsEditing(true)}
				>
					<span className={styles.currentChannel}>
						{currentChannel}
					</span>
					<span className={styles.editIcon}>✏️</span>
				</div>
			) : (
				<form onSubmit={handleSubmit} className={styles.inputForm}>
					<input
						type="text"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						placeholder="Entrer le nom de la chaîne"
						className={styles.channelInputField}
						autoFocus
					/>
					<button type="submit" className={styles.submitButton}>
						Suivre
					</button>
				</form>
			)}
		</div>
	);
};

export default ChannelInput;
