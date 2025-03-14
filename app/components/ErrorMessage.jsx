import React, { useState, useEffect } from "react";
import styles from "@/styles/errorMessage.module.css";

const ErrorMessage = ({ error, onDismiss = null, autoDismissTime = 5000 }) => {
	const [visible, setVisible] = useState(!!error);

	useEffect(() => {
		setVisible(!!error);

		// Auto-dismiss after specified time
		if (error && autoDismissTime) {
			const timer = setTimeout(() => {
				setVisible(false);
				if (onDismiss) onDismiss();
			}, autoDismissTime);

			return () => clearTimeout(timer);
		}
	}, [error, autoDismissTime, onDismiss]);

	if (!error || !visible) return null;

	const handleDismiss = () => {
		setVisible(false);
		if (onDismiss) onDismiss();
	};

	return (
		<div className={styles.errorContainer}>
			<div className={styles.errorContent}>
				<div className={styles.errorIcon}>⚠️</div>
				<div className={styles.errorText}>{error}</div>
				<button
					className={styles.dismissButton}
					onClick={handleDismiss}
				>
					×
				</button>
			</div>
		</div>
	);
};

export default ErrorMessage;
