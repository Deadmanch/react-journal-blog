import styles from './Header.module.css';
import SelectUser from '../SelectUser';

function Header() {
	return (
		<>
			<img className={styles.logo} src='/logo.svg' alt='Логотип блога' />
			<SelectUser />
		</>
	);
}
export default Header;
