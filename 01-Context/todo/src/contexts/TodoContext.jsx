import React, { useState, createContext }from "react";

export const TodoContext = createContext();

const TodoProvider = ({ children }) => {

    const [todos, setTodos] = useState([
        {id:1, name:'Primeiro Registro'}
    ]);

    const saveTodo = todo => {
        const newTodo = {
            id: todos.length +1,
            name: todo.name
        }
        setTodos([...todos, newTodo]);
    }
    
    return (
        <TodoContext.Provider value={{ todos, saveTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export default TodoProvider