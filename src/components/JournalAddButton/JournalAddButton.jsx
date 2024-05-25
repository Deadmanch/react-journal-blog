import CardButton from '../CardButton';
import styles from './JournalAddButton.module.css';

function JournalAddButton() {
	return (
		<CardButton className={styles['journal-add']}>
			<img src='/plus.svg' alt='Добавить новое воспоминание' />
			Новое воспоминание
		</CardButton>
	);
}
export default JournalAddButton;
