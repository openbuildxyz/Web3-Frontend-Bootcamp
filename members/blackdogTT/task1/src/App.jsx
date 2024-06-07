import React, { useEffect, useState, useRef } from 'react';
import { useCallback } from 'react';
import EditModal from './components/EditModal';
import Header from './components/Header';
import ToDoList from './components/ToDoList';

const TO_DO_LIST_DATA_KEY = [];
const MOCK_DATA = [
	{
		status: 0, // 1: 已完成；0：未完成
		content: '待办事项1',
		key: 1,
	},
	{
		status: 0, // 1: 已完成；0：未完成
		content: '待办事项2',
		key: 2,
	},
	{
		status: 0, // 1: 已完成；0：未完成
		content: '待办事项3',
		key: 3,
	},
	{
		status: 1, // 1: 已完成；0：未完成
		content: '待办事项4',
		key: 4,
	},
	{
		status: 1, // 1: 已完成；0：未完成
		content:
			'待办事项超长待办事项超长待办事项超长待办事项超长待办事项超长待办事项超长待办事项超长待办事项超长待办事项超长',
		key: 5,
	},
];
export const AppContext = React.createContext({
	setTodoList: () => {},
	setCurrentIndex: () => {},
	currentIndex: 0,
	todoList: [],
	modalRef: null,
});

function App() {
	// todoList数据
	const [todoList, setTodoList] = useState([]);
	const [currentIndex, setCurrentIndex] = useState({});
	const modalRef = useRef();
	useEffect(() => {
		console.log('Component will be mounted!');
		const data =
			localStorage.getItem(TO_DO_LIST_DATA_KEY) ||
			JSON.stringify(MOCK_DATA);
		setTodoList(JSON.parse(data));
	}, []);
	const storeTodoList = useCallback(
		(_todoList) => {
			setTodoList(_todoList);
			localStorage.setItem(
				TO_DO_LIST_DATA_KEY,
				JSON.stringify(_todoList)
			);
		},
		[setTodoList]
	);

	return (
		<AppContext.Provider
			value={{
				todoList,
				storeTodoList,
				modalRef,
				currentIndex,
				setCurrentIndex,
			}}
		>
			<div className='w-[600px] mx-auto my-0'>
				<Header></Header>
				<ToDoList></ToDoList>
			</div>
			<EditModal
				modalRef={modalRef}
				currentIndex={currentIndex}
			></EditModal>
		</AppContext.Provider>
	);
}

export default App;
