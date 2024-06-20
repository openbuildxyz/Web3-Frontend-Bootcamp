/*
 * @Author: Jason 373422363@qq.com
 * @Date: 2024-06-04 16:32:00
 * @LastEditors: Jason 373422363@qq.com
 * @LastEditTime: 2024-06-04 20:28:21
 * @FilePath: /Web3-Frontend-Bootcamp/members/github_id/JasonStu/task1/TodoList-vite/src/component/ToDoItem.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

interface ToDoItem {
  title: string;
  checked: boolean;
}

const ListItem = (props: {
  onFinish: () => void;
  onDelete: () => void;
  item: ToDoItem;
  index: number;
}) => {
  return (
    <div
  
      style={{
        margin: "10px 0px",
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
      }}
    >
      <a
        style={{
          marginRight:'10px',
          textDecoration: props.item.checked ? "line-through" : "",
        }}
        onClick={() => {
          props.onFinish();
        }}
      >
        {props.item.title}
      </a>
      <button
        onClick={() => {
          props.onDelete();
        }}
      >
        DELETE
      </button>
    </div>
  );
};

export default ListItem;
