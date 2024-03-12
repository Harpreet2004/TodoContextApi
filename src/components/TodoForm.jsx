import React, { useState } from 'react'
import { useTodo } from '../contexts/todoContext';

function TodoForm() {
    
    const [todo,setTodo] = useState("");
    //get the addTodos fn from useTodo
    const {addTodos} = useTodo();

    //fn for adding a single todo when btn is clicked
    const add = (e) => {
       e.preventDefault();
       
       if(!todo) return
       
        //this is what we are passing as it expects an object
        // addTodos({id:Date.now(),todo:todo,completed : false});
        
        //we can also write this as this :-
        //1. id is removed bcoz it is already there in app.jsx
        //2. todo:todo is reduced to single todo bcoz when your key value is same you can write this also
        addTodos({todo, completed : false})
        setTodo("")
      
    }


    return (
        <form  onSubmit={add} className="flex">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>
    );
}

export default TodoForm;


