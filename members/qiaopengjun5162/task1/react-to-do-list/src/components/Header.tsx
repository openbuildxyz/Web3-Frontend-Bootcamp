import classes from './Header.module.css';

interface HeaderProps {
  title?: string;  // title 是可选的，因为我们会提供默认值
}

// Header 组件：展示应用标题。
const Header: React.FC<HeaderProps> = ({ title = '欢迎使用 To Do List' }) => {
  return (
    <div className={classes.header}>
      <h1 className={classes.title}>{title}</h1>
    </div>
  )
}

export default Header
