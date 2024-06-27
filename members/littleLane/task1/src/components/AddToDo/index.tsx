import { useCallback, useState } from "react";
import styles from "./index.module.less";

interface AddToDoProps {
  onAddTodo: (name: string) => boolean;
}

export default function AddToDo({ onAddTodo }: AddToDoProps) {
  const [inputValue, setInputValue] = useState<string | undefined>();

  // 输入框变更
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onInputChange = useCallback((e: any) => {
    setInputValue(e.target.value);
  }, []);

  // 点击添加
  const onClickAddBtn = useCallback(() => {
    if (!inputValue) {
      alert("请输入待办事项名称！");
      return;
    }

    // 添加成功，清除输入框
    const isSuccess = onAddTodo(inputValue);
    if (isSuccess) {
      setInputValue("");
    }
  }, [inputValue, onAddTodo]);

  return (
    <div className={styles.add}>
      <input
        value={inputValue}
        className={styles.input}
        onChange={onInputChange}
      />
      <button onClick={onClickAddBtn}>添加</button>
    </div>
  );
}
