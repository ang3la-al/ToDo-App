import React, { useState } from "react";
import Form from "./Form";
import ToDo from "./Todo";  // Importing the ToDo component
// Import the Edit component if it is defined
import Edit from "./Edit";
import { v4 as uuidv4 } from 'uuid';

const ToDoApp = () => {
    const [todoValue, setTodo] = useState([]);

    const createTodo = (todo) => {
        setTodo([...todoValue, { id: uuidv4(), task: todo, isEditing: false }]);
    }

    const deleteTodo = (id) => {
        setTodo(todoValue.filter(todo => todo.id !== id));
    }

    const editTodo = (id) => {
        setTodo(todoValue.map(todo => 
            todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        ));
    }

    const editTask = (task, id) => {
        setTodo(todoValue.map(todo => 
            todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
        ));
    }

    return (
        <div className="container bg-gray-700 mt-20 p-8 rounded-md">
            <Form createTodo={createTodo} />
            {
                todoValue.map((todo) => (
                    todo.isEditing ? (
                        // Ensure Edit component is imported and used correctly
                        <Edit key={todo.id} editTodo={editTask} task={todo} />
                    ) : (
                        <ToDo key={todo.id} task={todo} deleteTodo={deleteTodo} editTodo={editTodo} />
                    )
                ))
            }
        </div>
    );
}

export default ToDoApp;
