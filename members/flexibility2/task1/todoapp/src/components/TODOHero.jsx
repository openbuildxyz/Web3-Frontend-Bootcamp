function TODOHero({todos_completed, total_todos}){
    return (
        <section>
            <div>
                <p>
                    Task Done
                </p>
                <p>
                    Keep it up
                </p>
            </div>
            <div>
                {todos_completed}/{total_todos}
            </div>
        </section>
    );
}
export default TODOHero;