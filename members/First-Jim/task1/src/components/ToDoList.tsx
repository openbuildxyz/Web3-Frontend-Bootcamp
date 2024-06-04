import React from 'react';
import {ToDoItem} from './ToDoItem';
import Footer from './Footer';
import { observer } from 'mobx-react-lite';

export const ToDoList = observer(({ store }) => {
	function renderToggleAll() {
		if (store.todos.length > 0) {
			return (
				<span>
					<input className="toggle-all" id="toggle-all" type="checkbox" checked={store.completedCount === store.todos.length} onChange={() => store.completeAll()} />
					<label htmlFor="toggle-all">Mark all as complete</label>
				</span>
			);
		}
	}

	function renderFooter() {
		if (store.todos.length) {
			return <Footer store={store} />;
		}
	}

	const { filteredTodos } = store;

	return (
		<section className="main">
			{renderToggleAll()}
			<ul className="todo-list">
				{filteredTodos.map((todo) => (
					<ToDoItem key={todo.id} todo={todo} />
				))}
			</ul>
			{renderFooter()}
		</section>
	);
})

