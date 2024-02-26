import { Client } from "tmi.js";
import { useEffect, useState } from "react";
import { useTextToSpeech } from "@/api/TextToSpeech";
import styles from "@/styles/twitchChat.module.css";

function TwitchChat({ channelName = "v4ssler" }) {
    const [messages, setMessages] = useState([]);
    const { playAudioFromText, isLoading, error } = useTextToSpeech();

    useEffect(() => {
        const client = new Client({
            channels: [channelName],
        });

        client.connect();

        client.on("message", (channel, tags, message, self) => {
            if (!self) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { displayName: tags["display-name"], message },
                ]);
            }
        });

        return () => {
            client.disconnect();
        };
    }, [channelName]);

    return (
        <div className={styles.chatContainer}>
            <div className={styles.header}>{channelName}.tv</div>
            <div className={styles.chat}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={styles.chatMessage}
                        onClick={() => playAudioFromText(msg.message)}
                    >
                        <div className={styles.userName}>{msg.displayName}</div>
                        <div className={styles.point}>:</div>
                        <div className={styles.message}>{msg.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TwitchChat;
