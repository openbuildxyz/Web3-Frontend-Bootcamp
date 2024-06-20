import style from './index.module.css'

const Header = (props) => {
    const {title} = props

    return <div className={style.header}>
        { title }
    </div>
}

export default Header