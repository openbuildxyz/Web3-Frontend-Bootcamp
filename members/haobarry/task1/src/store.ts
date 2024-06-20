import { useLocalStorageState } from 'ahooks'


export type Item = {
  id: string;
  name: string;
  checked: boolean;
}

export const store = (): {
  toDoList?: Item[];
  setToDoList: (value?:any) => void
} => {

  const [toDoList, setToDoList] = useLocalStorageState('to-do-list', {

    defaultValue: [] as Item[],
    listenStorageChange: true,
  })

  return {
    toDoList,
    setToDoList
  }

}
