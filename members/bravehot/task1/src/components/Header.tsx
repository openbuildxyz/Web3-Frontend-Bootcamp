type Props = {
  title?: string;
};

const Header: React.FC<Props> = ({
  title = "Web3-Frontend-Bootcamp Task1 待办事项应用",
}) => {
  return (
    <div className="w-full flex bg-base-100 shadow-md p-2">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{title}</a>
      </div>

      <img
        className="w-12 rounded-full"
        src="https://avatars.githubusercontent.com/u/32063077?v=4"
      />
    </div>
  );
};

export default Header;
