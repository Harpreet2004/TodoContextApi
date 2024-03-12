import { useContext, createContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            todoName: "First todo",
            id: 1,
            completed: false
        }
    ],
    addTodos: (todo) => {},
    deleteTodo: (id) => {},
    updateTodo: (id, todo) => {},
    toggleComplete: (id) => {}
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
}