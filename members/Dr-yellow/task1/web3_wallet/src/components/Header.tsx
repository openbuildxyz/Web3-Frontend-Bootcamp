import { HeaderProps } from '../typings'

const Header: React.FC<HeaderProps> = ({ title }) => <h1 className="text-6xl mb-8">{title}</h1>



export default Header;