import { Client } from 'tmi.js';
import { useEffect, useState } from "react";
import styles from "@/styles/TwitchChat.module.css";


function TwitchChat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        console.log("Effect triggered"); // Log to check if useEffect is triggered multiple times

        const client = new Client({
            channels: ['V4SSLER']
        });

        client.connect();

        client.on('message', (channel, tags, message, self) => {
            // Ignore messages sent by the bot itself
            if (!self) {
                setMessages(prevMessages => [...prevMessages, { displayName: tags['display-name'], message }]);
                console.log(`${tags['display-name']}: ${message}`);
            }
        });

        return () => {
            client.disconnect();
        };

    }, []); // Empty dependency array ensures the effect runs only once after the initial render

    console.log("Component rendered"); // Log to check if the component is rendered multiple times

    return (
        <div className={styles.chatContainer}>
            {messages.map((msg, index) => (
                <div key={index} className={styles.chatMessage}>
                    <div className={styles.userName}>{msg.displayName}</div>
                    <div className={styles.point}> : </div>
                    <div className={styles.message}>{msg.message}</div>
                </div>
            ))}
        </div>
    );
}

export default TwitchChat;
