import React from 'react'
import profilePic from '../assests/profilePic.png';
import '../index.css';
function ToDoItem(props){
	return( <div className="to-do-item">
		<img className="to-do-item-img" src={profilePic} alt="profile pic"/>
		<h2 className='to-do-item-taskName'>{props.taskName}</h2>
		<h2>{props.isDone ? "Done" : "Not Done" }</h2>	
	</div>);
}

export default ToDoItem