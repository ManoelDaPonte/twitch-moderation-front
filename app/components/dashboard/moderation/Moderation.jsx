import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { fetchDataModeration } from "@/api/QueryDataModeration";

import Counter from "@/components/dashboard/moderation/Counter";
import Graph from "@/components/dashboard/moderation/Graph";
import FlaggedMessages from "@/components/dashboard/moderation/FlaggedMessages";

import styles from "@/styles/dashBoard.module.css";

export default function Moderation({ messagesState, lastMessageState }) {
    const [graphDataModeration, setGraphDataModeration] = useState([]);
    const [lastMessage, setLastMessage] = lastMessageState;

    const { data, isLoading, isError, error } = useQuery(
        ["moderation", lastMessage?.message],
        () => fetchDataModeration(lastMessage),
        {
            enabled: !!lastMessage?.message,
            onSuccess: (fetchedData) => {
                setGraphDataModeration((prevData) => [
                    ...prevData,
                    fetchedData,
                ]);
            },
            refetchOnWindowFocus: false,
            staleTime: Infinity, // Adjust based on your requirements
        }
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.moderation}>
                <Counter graphDataModeration={graphDataModeration} />
                <Graph graphDataModeration={graphDataModeration} />
            </div>

            <FlaggedMessages graphDataModeration={graphDataModeration} />
        </div>
    );
}
