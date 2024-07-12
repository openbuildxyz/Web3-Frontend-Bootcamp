import {useSetTodoItems} from "./TodoListProvider.tsx";

export function AddToDo() {
    const setItems = useSetTodoItems()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const target = event.target as typeof event.target & {
            elements: {
                title: { value: string }
            },
            reset: () => void
        }

        const title = target.elements.title.value

        console.log('add', title)
        setItems(prev => [...prev, {id: crypto.randomUUID(), title, completed: false}])
        target.reset()
    }


    return (
        <form onSubmit={handleSubmit}>
            <fieldset role="group">
                <input name="title" type="text" placeholder="What needs to be done?"/>
                <input type="submit" value="Add"/>
            </fieldset>
        </form>
    )
}