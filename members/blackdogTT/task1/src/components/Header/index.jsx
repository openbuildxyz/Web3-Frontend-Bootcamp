import AddToDo from '../AddToDo';

export default () => {
	return (
		<div className='w-[100%]'>
			<div className='flex flex-wrap items-center justify-between p-4 bg-white border-b-2'>
				<span className='text-xl font-semibold text-gray-800 font-heading'>
					代办事项
				</span>
			</div>
			<AddToDo />
		</div>
	);
};
