import CardButton from '../CardButton';
import styles from './JournalAddButton.module.css';

function JournalAddButton({ clearForm }) {
	return (
		<CardButton className={styles['journal-add']} onClick={clearForm}>
			<img src='/plus.svg' alt='Добавить новое воспоминание' />
			Новое воспоминание
		</CardButton>
	);
}
export default JournalAddButton;
