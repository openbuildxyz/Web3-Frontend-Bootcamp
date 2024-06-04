# web3-todo-list
技术栈：React + TypeScript + Vite

# 开发
  cd web3-todo-list
  npm install
  npm run dev

## 一些实现思路
1. 点击todo项后，如果该项被选中（completed），则为todo-content添加一个completed类样式

2. 将handleAdd和handleDelete函数分别传递给AddToDo和ToDoList组件。这样可以让每个组件只关注自己的逻辑,提高了代码的可读性和可维护性。

3. 用户在AddToDo组件中输入新的待办事项并点击"Add"按钮时,handleAdd函数会被调用,从而更新App组件中的items状态。同样,当用户在ToDoList组件中点击"Delete"按钮时,handleDelete函数会被调用,从而从items状态中删除对应的待办事项。

要将AddToDo组件改造为接受父组件传递的函数，以便在添加新待办事项时通知父组件更新状态

4. 要将待办事项列表持久化，您可以使用浏览器的本地存储（localStorage）来实现。在React中，您可以使用useEffect钩子来实现这一点。

5. 已完成的项目也需要被存储，我们将每个待办事项表示为一个对象,包含text和completed两个属性。在保存和恢复数据时,我们同时保存和恢复这个完成状态。
修改了items的类型为TodoItem[]，并更新了handleItemClick函数以支持更新待办事项的完成状态
