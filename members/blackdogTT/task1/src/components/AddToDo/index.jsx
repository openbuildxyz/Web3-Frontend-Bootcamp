import { useContext, useState } from 'react';
import { AppContext } from '../../App';

export default () => {
	const [inputValue, setInputValue] = useState('');
	const { storeTodoList, todoList } = useContext(AppContext);
	const handleChange = (event) => {
		setInputValue(event.target.value);
	};
	const addItem = () => {
		storeTodoList([
			...todoList,
			{ status: 0, key: Date.now(), content: inputValue },
		]);
	};

	return (
		<>
			<div className='relative py-4 border-b-2'>
				<textarea
					value={inputValue}
					onChange={handleChange}
					className='textarea block mb-4 w-[100%] textarea-bordered'
					placeholder='请输入代办事项'
				></textarea>
				<button onClick={addItem} className='block btn btn-primary'>
					新增
				</button>
			</div>
		</>
	);
};
