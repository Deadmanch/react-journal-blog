import cn from 'classnames';
import styles from './CardButton.module.css';

function CardButton({ children, className, ...props }) {
	return (
		<button {...props} className={cn(styles['card-button'], className)}>
			{children}
		</button>
	);
}
export default CardButton;
