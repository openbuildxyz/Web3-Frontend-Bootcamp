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
	const edit = (_index) => {
		setCurrentIndex(_index);
		modalRef.current.showModal();
	};

	const onCheckboxClick = (index) => {
		storeTodoList(
			todoList.map((item, _index) => {
				if (index === _index) {
					item.status = item.status === 1 ? 0 : 1;
				}
				return item;
			})
		);
	};

	return (
		<>
			<tr>
				<th>{index + 1}</th>
				<th className='flex space-x-2 align-middle'>
					<input
						onClick={() => {
							onCheckboxClick(index);
						}}
						type='checkbox'
						checked={item.status === 1}
						className='checkbox'
					/>
					<span>{item.status === 1 ? '已办' : '待办'}</span>
				</th>
				<td>
					<p className='truncate w-[300px]'>{item?.content || ''}</p>
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
