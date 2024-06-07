import { useContext } from 'react';
import { AppContext } from '../../App';
import ToDoItem from '../ToDoItem';

export default () => {
	const { todoList } = useContext(AppContext);
	return (
		<div>
			<table className='table max-w-[600px]'>
				{/* head */}
				<thead>
					<tr>
						<th className='w-[50px]'>序号</th>
						<th>内容</th>
						<th className='w-[200px]'>操作</th>
					</tr>
				</thead>
				<tbody>
					{todoList?.map?.((item, index) => (
						<ToDoItem
							key={item.key}
							item={item}
							index={index}
						></ToDoItem>
					))}
				</tbody>
			</table>
		</div>
	);
};
