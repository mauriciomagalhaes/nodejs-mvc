/* Init React */
import React from "react";

/*Context*/
import TodoProvider from "./contexts/TodoContext";

/*Component*/
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

/*App main*/
const App = () => {
    return (
        <TodoProvider>
            <TodoList></TodoList>
            <AddTodo></AddTodo>
        </TodoProvider>
    );
}

export default App;