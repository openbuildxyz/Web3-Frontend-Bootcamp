import { FcTodoList } from "react-icons/fc";

const Header = () => {
  return (
    <div>
      <div className="flex items-center mt-7 gap-2">
        <FcTodoList className="w-8 h-8" />
        <h1 className="text-3xl font-semibold text-blue-400">
          rzexin Todo List
        </h1>
      </div>
    </div>
  );
};

export default Header;
