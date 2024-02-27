import Questions from "@/components/dashboard/topicsQuestions/Questions";
import Topics from "@/components/dashboard/topicsQuestions/Topics";
import styles from "@/styles/topicsAndQuestion.module.css";

export default function TopicsQuestions({ messagesState }) {
    return (
        <div className={styles.wrapper}>
            <Topics messagesState={messagesState} />
            <Questions messagesState={messagesState} />
        </div>
    );
}
