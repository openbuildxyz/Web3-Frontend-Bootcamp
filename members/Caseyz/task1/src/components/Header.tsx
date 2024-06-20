interface IProps {
  title: string;
}

const Header: React.FC<IProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export default Header;
