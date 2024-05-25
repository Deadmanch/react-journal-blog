import cn from 'classnames';
import styles from './CardButton.module.css';

function CardButton({ children, className }) {
	return <button className={cn(styles['card-button'], className)}>{children}</button>;
}
export default CardButton;
