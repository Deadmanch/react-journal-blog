import styles from './JournalItem.module.css';

function JournalItem({ title, post, date }) {
	const formattedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className={styles['journal-item__title']}>{title}</h2>
			<div className={styles['journal-item__body']}>
				<div className={styles['journal-item__date']}>{formattedDate}</div>
				<div className={styles['journal-item__post']}>{post}</div>
			</div>
		</>
	);
}
export default JournalItem;
