import Counter from "@/components/dashboard/moderation/Counter";
import Graph from "@/components/dashboard/moderation/Graph";
import FlaggedMessages from "@/components/dashboard/moderation/FlaggedMessages";

import styles from "@/styles/dashBoard.module.css";

export default function Moderation({ graphDataModeration }) {
    console.log(graphDataModeration);

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
