import { useEffect, useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';

export default (props) => {
	const { currentIndex, modalRef } = props;
	const { todoList, storeTodoList } = useContext(AppContext);
	const [inputValue, setInputValue] = useState(
		todoList[currentIndex]?.content || ''
	);
	const handleChange = (event) => {
		setInputValue(event.target.value);
	};
	useEffect(() => {
		setInputValue(todoList[currentIndex]?.content);
	}, [currentIndex]);
	const confirmEdit = useCallback(() => {
		storeTodoList(
			todoList?.map((_item, _index) => {
				if (_index === currentIndex) {
					_item.content = inputValue;
				}
				return _item;
			}) || []
		);
	}, [currentIndex, inputValue, todoList]);
	return (
		<dialog ref={modalRef} className='modal'>
			<div className='modal-box'>
				<h3 className='font-bold text-lg'>编辑代办事项</h3>
				<div className='modal-action'>
					<form className='w-[100%]' method='dialog'>
						{/* if there is a button in form, it will close the modal */}
						<textarea
							value={inputValue}
							onChange={handleChange}
							className='textarea block mb-4 w-[100%] textarea-bordered'
							placeholder='请输入代办事项'
						></textarea>
						<div className='flex space-x-4'>
							<button
								onClick={confirmEdit}
								className='block btn btn-primary'
							>
								确定
							</button>
							<button className='btn'>关闭</button>
						</div>
					</form>
				</div>
			</div>
		</dialog>
	);
};
