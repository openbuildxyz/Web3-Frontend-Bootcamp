import React from 'react';
import  {Header,ToDoList} from '@/components';
import { BrowserRouter } from 'react-router-dom';

function App({store}) {
	return (
		<BrowserRouter>
			<div className="App">
				<Header addTodo={store.addTodo}/>
				<ToDoList store={store}/>
			</div>
		</BrowserRouter>
	);
}

export default App;
