import React, { useEffect, useState } from "react";
import { Client } from "tmi.js";

const TwitchChat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const client = new Client({
            connection: {
                secure: true,
                reconnect: true,
            },
            channels: ["https://www.twitch.tv/v4ssler"],
        });

        client.connect().catch(console.error);

        client.on("message", (channel, tags, message, self) => {
            if (self) return; // Ignore messages from the bot itself
            const newMessage = {
                author: tags["display-name"],
                message: message,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => {
            client.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>Twitch Chat</h1>
            {console.log(messages)}
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.author}: </strong>
                        <span>{msg.message}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TwitchChat;
