// src/components/ToDoHero.tsx

import type { ToDoHeroProps } from "../TodoList";

function ToDoHero(props: ToDoHeroProps) {
    const { todos_completed, total_todos } = props;
    return (
        <section className="todohero_section">
            <div>
                <p className="text_large">Task Done</p>
                <p className="text_small">Keep it up</p>
            </div>
            <div>
                {todos_completed}/{total_todos}
            </div>
        </section>
    );
}



export default ToDoHero;