import CardButton from '../CardButton';
import JournalItem from '../JournalItem';
import styles from './JournalList.module.css';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ items, setItem }) {
	const { userId } = useContext(UserContext);
	const sortItems = (a, b) => (a.date > b.date ? -1 : 1);
	const filteredItems = useMemo(
		() => items.filter(el => el.userId === userId).sort(sortItems),
		[items, userId]
	);

	console.log(items);
	if (items.length === 0) {
		return <div className={styles['journal-list']}>Записей пока нет. Добавьте первую</div>;
	}

	return (
		<div className={styles['journal-list']}>
			{filteredItems.map(el => (
				<CardButton key={el.id} onClick={() => setItem(el)}>
					<JournalItem title={el.title} post={el.post} date={el.date} />
				</CardButton>
			))}
		</div>
	);
}
export default JournalList;
