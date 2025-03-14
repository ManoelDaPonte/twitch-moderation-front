import React from "react";
import styles from "@/styles/emptyState.module.css";

const EmptyState = ({ type }) => {
	// Définir le contenu en fonction du type (moderation ou topics)
	const content = {
		moderation: {
			title: "Modération",
			description: "Surveillez les messages problématiques en temps réel",
			icon: "🛡️",
			details: [
				"Détection automatique de contenu toxique",
				"Visualisation des messages signalés",
				"Statistiques des catégories de modération",
			],
		},
		topics: {
			title: "Analyse des sujets",
			description: "Découvrez les sujets de discussion dans votre chat",
			icon: "📊",
			details: [
				"Regroupement automatique des messages par thème",
				"Identification des questions fréquentes",
				"Suivi des tendances de conversation",
			],
		},
	};

	const selectedContent = content[type] || content.moderation;

	return (
		<div className={styles.emptyStateContainer}>
			<div className={styles.iconContainer}>
				<span className={styles.icon}>{selectedContent.icon}</span>
			</div>
			<h2 className={styles.title}>{selectedContent.title}</h2>
			<p className={styles.description}>{selectedContent.description}</p>
			<div className={styles.detailsContainer}>
				{selectedContent.details.map((detail, index) => (
					<div key={index} className={styles.detailItem}>
						<span className={styles.bulletPoint}>•</span>
						<span>{detail}</span>
					</div>
				))}
			</div>
			<div className={styles.waitingMessage}>
				En attente de messages dans le chat...
			</div>
		</div>
	);
};

export default EmptyState;
