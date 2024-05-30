import Header from '@components/Header';
import JournalAddButton from '@components/JournalAddButton';
import JournalForm from '@components/JournalForm';
import JournalList from '@components/JournalList';
import styles from './App.module.css';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import Body from './layouts/Body';
import LeftPanel from './layouts/LeftPanel';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

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
	const [selectedItem, setSelectedItem] = useState(null);

	const addItems = item => {
		const currentItems = items || [];
		if (!item.id) {
			setItems([
				...mapItems(currentItems),
				{
					...item,
					date: new Date(item.date),
					id: currentItems.length > 0 ? Math.max(...currentItems.map(i => i.id)) + 1 : 1
				}
			]);
		} else {
			setItems([
				...mapItems(currentItems).map(i => {
					if (i.id === item.id) {
						return {
							...item
						};
					}
					return i;
				})
			]);
		}
	};

	const deleteItem = id => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className={styles.app}>
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setSelectedItem(null)} />
					<JournalList items={mapItems(items)} setItem={setSelectedItem} />
				</LeftPanel>
				<Body>
					<JournalForm onDelete={deleteItem} onSubmit={addItems} data={selectedItem} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;
