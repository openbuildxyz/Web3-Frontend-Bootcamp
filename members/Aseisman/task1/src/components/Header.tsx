import React from'react';
import './Header.css';

const Header:React.FC<{name:string}> = (props) => {
    return <div className="header-cls">{props.name || "ToDoList"}</div>
}
export default Header;