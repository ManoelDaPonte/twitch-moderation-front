import { Client } from "tmi.js";
import { useEffect, useState } from "react";
import styles from "@/styles/twitchChat.module.css";

function TwitchChat({ setUserInput, channelName = "v4ssler" }) {
    // Default value is "v4ssler"
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const client = new Client({
            channels: [channelName], // Use the channelName variable
        });

        client.connect();

        client.on("message", (channel, tags, message, self) => {
            // Ignore messages sent by the bot itself
            if (!self) {
                setUserInput({ message });
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { displayName: tags["display-name"], message },
                ]);
            }
        });

        return () => {
            client.disconnect();
        };
    }, [channelName]); // Add channelName as a dependency to useEffect

    return (
        <div className={styles.chatContainer}>
            <div className={styles.header}>{channelName}.tv</div>{" "}
            {/* Display the channel name */}
            <div className={styles.chat}>
                {messages.map((msg, index) => (
                    <div key={index} className={styles.chatMessage}>
                        <div className={styles.userName}>{msg.displayName}</div>
                        <div className={styles.point}> : </div>
                        <div className={styles.message}>{msg.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TwitchChat;
