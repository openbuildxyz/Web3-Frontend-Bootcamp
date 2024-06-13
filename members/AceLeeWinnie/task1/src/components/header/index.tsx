import React from 'react';

interface IProps {
    tool: React.ReactElement
}
const App: React.FC<IProps> = (props) => {
    const { tool } = props;
    return <div><h1>TodoList</h1>{tool}</div>
}

export default App;