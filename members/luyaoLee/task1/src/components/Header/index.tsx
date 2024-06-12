interface IProps {
  children: React.ReactNode;
}

const Header: React.FC<IProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Header;
