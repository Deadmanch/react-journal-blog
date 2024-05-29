import cn from 'classnames';
import { useEffect, useReducer, useRef, useContext } from 'react';
import Button from '../Button';
import Input from '../Input';
import styles from './JournalForm.module.css';
import { formReducer, INITIAL_STATE } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm({ onSubmit }) {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const postRef = useRef();
	const dateRef = useRef();

	const { userId } = useContext(UserContext);

	const focusError = isValid => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.post:
				postRef.current.focus();
				break;
		}
	};
	useEffect(() => {
		let timerId;
		if (!isValid.title || !isValid.date || !isValid.post) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, onSubmit, values]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const onChange = e => {
		dispatchForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value } });
	};

	const addJournalItem = e => {
		e.preventDefault();
		dispatchForm({ type: 'SUBMIT' });
	};
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div>
				<Input
					ref={titleRef}
					onChange={onChange}
					isValid={isValid.title}
					value={values.title}
					type='text'
					name='title'
					appearance='title'
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='date' className={styles['form-label']}>
					<img src='/calendar.svg' alt='Иконка календаря' />
					<span>Дата</span>
				</label>
				<Input
					isValid={isValid.date}
					ref={dateRef}
					onChange={onChange}
					value={values.date}
					type='date'
					name='date'
					id='date'
				/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor='tag' className={styles['form-label']}>
					<img src='/folder.svg' alt='Иконка папки' />
					<span>Метки</span>
				</label>
				<Input onChange={onChange} value={values.tag} type='text' name='tag' id='tag' />
			</div>

			<textarea
				ref={postRef}
				onChange={onChange}
				value={values.post}
				name='post'
				id='post'
				cols='30'
				rows='10'
				className={cn(styles['input'], { [styles.invalid]: !isValid.post })}
			/>
			<Button text='Сохранить' />
		</form>
	);
}

export default JournalForm;
