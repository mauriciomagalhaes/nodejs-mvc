import React, {useContext, useState} from "react";

import { TodoContext } from "../contexts/TodoContext";

const AddList = () => {

    const { saveTodo } = useContext(TodoContext);

    const [todo, setTodo] = useState();

    const handleFormSubmit = e => {
        e.preventDefault();
        console.log(todo);
        saveTodo(todo);
    }

    const handleInputChange = e => {
        setTodo({...todo, name: e.target.value});
    }
    return(
        <form onSubmit={handleFormSubmit}>
            <input type="text" name="name" id="name" placeholder="Nova tarefa" onChange={handleInputChange}/>
            <button>Adicionar</button>
        </form>

    )
}

export default AddList;