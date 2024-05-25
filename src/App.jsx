import Header from '@components/Header';
import JournalAddButton from '@components/JournalAddButton';
import JournalForm from '@components/JournalForm';
import JournalList from '@components/JournalList';
import styles from './App.module.css';
import useLocalStorage from './hooks/use-localStorage.hook';
import Body from './layouts/Body';
import LeftPanel from './layouts/LeftPanel';

function mapItems(items) {
	if(!items) {
		return [];
}

}

function App() {
	const [items, setItems] = useLocalStorage('data');

	const addItems = item => {
		setItems([
			...items.map(i => ({
				...i,
				date: new Date(item.i)
			})),
			{
				post: item.post,
				title: item.title,
				date: new Date(item.date),
				id: items.length > 0 ? Math.max(...items.map(el => el.id)) + 1 : 1
			}
		]);
	};

	return (
		<div className={styles.app}>
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList items={items} />
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItems} />
			</Body>
		</div>
	);
}

export default App;
