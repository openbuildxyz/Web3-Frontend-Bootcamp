import { TodoDataSave } from "./interface";
import { ToDoItem } from "./interface";
class LocalSave implements TodoDataSave {
    getLocalSaveKey():string{
        return "todolist"
    }
    save(todo: ToDoItem[]): boolean {
        const key = this.getLocalSaveKey();
        localStorage.setItem(key,JSON.stringify(todo))
        return true;
    }
    list(): ToDoItem[] {
        let arr: ToDoItem[] = [];
        const key = this.getLocalSaveKey();
        const data = localStorage.getItem(key)
        if (data == null || data == "") {
            return arr
        }
        arr = JSON.parse(data)
        return arr
    }
    
}
const LocalSaveHandler = new LocalSave()
export default LocalSaveHandler ;