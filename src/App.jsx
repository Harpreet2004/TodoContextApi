import { useEffect, useState } from 'react'
import {TodoProvider} from "./contexts/todoContext"
import TodoForm from "./components/TodoForm"
import './App.css'
import TodoItem from './components/Todoitem';

function App() {
  //all the todos are stored in here as an array
  const [todos, setTodos] = useState([]);

  //here todo will be added
  //setTodos will get all the todos 
  //we will basically keep the previous array as is and will add the todo
  //which we know is an object so will pass the props like id,todoName
  //and will keep the prevtodo as is using the spread operator
  const addTodos = (todo) => {
    setTodos((prev) => [...prev, {id: Date.now(), ...todo}])
  }

  //updating the todo which matches the id
  //basically, calling the setTodos to get all todos
  //and using map on all todos and the todo which has the same id with the id provided in params
  //then will update the todo and if not we keep the same todo and keep iterating 
  const updateTodo = (id,todo) => {  
    setTodos((prev) => prev.map((todoprev) => todoprev.id === id ? todo : todoprev))
  }

  //deleting the todo by handling the prev todo
  //calling a filter fn on prevtodos 
  //todo which matches the id will be ignored and the rest will be filtered into the new array
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  //this will toggle the value of completed in todos object
  //which lets us know if the todo has been completed or not
  //we basically map all the todos and destructure the prevTodo and get hold of the completed property so that we can toggle it
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id? {...prevTodo,completed: !prevTodo.completed}: prevTodo))
  }

  //display the todos from local storage, make sure that value in getItem's parenthesis
  //should be same for setItem 
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  },[])

  //setting the todos when todos is changed 
  //"todos" same as getItem
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodos,deleteTodo,updateTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
                {/* Todo form goes here */} 
                <TodoForm />
            </div>
            <div className="flex flex-wrap gap-y-3">
                {/*Loop and Add TodoItem here */}
                {todos.map((todo) => (
                  <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo} />
                  </div>
                ))}
            </div>
        </div>
    </div>
    </TodoProvider>
  )
}

export default App
