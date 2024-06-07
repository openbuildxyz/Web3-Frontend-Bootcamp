import { useContext } from 'react';
import { AppContext } from '../../App';

export default (props) => {
	const { item, index } = props;
	const { todoList, storeTodoList, setCurrentIndex, modalRef } =
		useContext(AppContext);
	const del = (arr, index) => {
		const firstPart = arr.slice(0, index);
		const secondPart = arr.slice(index + 1);
		storeTodoList([...firstPart, ...secondPart]);
	};
	const edit = (index) => {
		setCurrentIndex(index);
		modalRef.current.showModal();
	};

	return (
		<>
			<tr>
				<th>{index + 1}</th>
				<td>
					<p className='truncate w-[400px]'>{item?.content || ''}</p>
				</td>
				<td>
					<div className='flex justify-center space-x-4'>
						<button
							onClick={() => {
								edit(index);
							}}
							className='btn btn-outline btn-info btn-sm'
						>
							编辑
						</button>
						<button
							onClick={() => {
								del(todoList, index);
							}}
							className='btn btn-outline btn-error btn-sm'
						>
							删除
						</button>
					</div>
				</td>
			</tr>
		</>
	);
};
