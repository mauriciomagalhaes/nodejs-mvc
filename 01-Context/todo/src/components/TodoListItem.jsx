import React from "react";

const TodoListItem = ({ todo }) => {
    return(
        <div>
            {todo.id} - {todo.name}
        </div>
    )
}

export default TodoListItem;