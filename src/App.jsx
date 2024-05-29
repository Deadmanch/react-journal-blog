import Header from '@components/Header';
import JournalAddButton from '@components/JournalAddButton';
import JournalForm from '@components/JournalForm';
import JournalList from '@components/JournalList';
import styles from './App.module.css';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import Body from './layouts/Body';
import LeftPanel from './layouts/LeftPanel';
import { UserContextProvider } from './context/user.context';

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');

	const addItems = item => {
		const currentItems = items || [];
		setItems([
			...mapItems(currentItems),
			{
				...item,
				date: new Date(item.date),
				id: currentItems.length > 0 ? Math.max(...currentItems.map(i => i.id)) + 1 : 1
			}
		]);
	};

	return (
		<UserContextProvider>
			<div className={styles.app}>
				<LeftPanel>
					<Header />
					<JournalAddButton />
					<JournalList items={mapItems(items)} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItems} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
