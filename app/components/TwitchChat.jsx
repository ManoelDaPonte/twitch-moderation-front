import { Client } from "tmi.js";
import { useEffect, useState } from "react";
import { useTextToSpeech } from "@/api/QueryTextToSpeech";
import ChannelInput from "@/components/ChannelInput";
import styles from "@/styles/twitchChat.module.css";

function TwitchChat({
	channelName: initialChannelName,
	messagesState,
	lastMessageState,
}) {
	const [messages, setMessages] = messagesState;
	const [lastMessage, setLastMessage] = lastMessageState;
	const [channelName, setChannelName] = useState(initialChannelName);
	const [client, setClient] = useState(null);

	const { playAudioFromText, isLoading, error } = useTextToSpeech();

	// Fonction pour changer de chaîne
	const handleChannelChange = (newChannel) => {
		if (newChannel !== channelName) {
			// Réinitialiser les messages
			setMessages([]);
			setLastMessage(null);
			// Mettre à jour le nom de la chaîne
			setChannelName(newChannel);

			// Si un client existe déjà, le déconnecter d'abord
			if (client) {
				client.disconnect();
			}
		}
	};

	useEffect(() => {
		// Créer un nouveau client TMI.js
		const newClient = new Client({
			channels: [channelName],
		});

		// Connecter le client
		newClient.connect();

		// Mettre à jour l'état du client
		setClient(newClient);

		// Écouter les messages
		newClient.on("message", (channel, tags, message, self) => {
			if (!self) {
				const newMessage = {
					displayName: tags["display-name"],
					message,
				};
				setMessages((prevMessages) => [...prevMessages, newMessage]);
				setLastMessage(newMessage);
			}
		});

		// Nettoyer lors du démontage
		return () => {
			newClient.disconnect();
		};
	}, [channelName]); // Recréer le client lorsque channelName change

	return (
		<div className={styles.chatContainer}>
			<div className={styles.header}>
				<ChannelInput
					onChannelChange={handleChannelChange}
					currentChannel={channelName}
				/>
			</div>
			<div className={styles.chat}>
				{messages.length === 0 ? (
					<div className={styles.emptyChat}>
						<p>En attente de messages...</p>
						<p className={styles.smallText}>
							Les messages du chat apparaîtront ici
						</p>
					</div>
				) : (
					messages.map((msg, index) => (
						<div
							key={index}
							className={styles.chatMessage}
							onClick={() => playAudioFromText(msg.message)}
						>
							<div className={styles.userName}>
								{msg.displayName}
							</div>
							<div className={styles.point}>:</div>
							<div className={styles.message}>{msg.message}</div>
						</div>
					))
				)}
			</div>
		</div>
	);
}

export default TwitchChat;
