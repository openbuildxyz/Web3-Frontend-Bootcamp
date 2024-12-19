
interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return <h4>{title}</h4>
}

export default Header;