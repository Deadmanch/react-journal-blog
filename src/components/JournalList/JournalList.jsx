import CardButton from '../CardButton';
import JournalItem from '../JournalItem';
import styles from './JournalList.module.css';

function JournalList({ items }) {
	if (items.length === 0) {
		return <div className={styles['journal-list']}>Записей пока нет. Добавьте первую</div>;
	}
	const sortItems = (a, b) => (a.date > b.date ? -1 : 1);

	return (
		<div className={styles['journal-list']}>
			{items.sort(sortItems).map(el => (
				<CardButton key={el.id}>
					<JournalItem title={el.title} post={el.post} date={el.date} />
				</CardButton>
			))}
		</div>
	);
}
export default JournalList;
