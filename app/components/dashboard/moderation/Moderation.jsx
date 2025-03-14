import Counter from "@/components/dashboard/moderation/Counter";
import Graph from "@/components/dashboard/moderation/Graph";
import FlaggedMessages from "@/components/dashboard/moderation/FlaggedMessages";
import EmptyState from "@/components/EmptyState";

import styles from "@/styles/dashBoard.module.css";

export default function Moderation({ graphDataModeration }) {
	// Vérifiez si nous avons des données à afficher
	const hasData = graphDataModeration && graphDataModeration.length > 0;

	return (
		<div className={styles.wrapper}>
			{hasData ? (
				<>
					<div className={styles.moderation}>
						<Counter graphDataModeration={graphDataModeration} />
						<Graph graphDataModeration={graphDataModeration} />
					</div>
					<FlaggedMessages
						graphDataModeration={graphDataModeration}
					/>
				</>
			) : (
				<EmptyState type="moderation" />
			)}
		</div>
	);
}
