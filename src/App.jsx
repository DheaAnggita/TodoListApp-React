import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts/TodoContext'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'


function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all");
  
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo)))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    } else if (filter === "active") {
      return !todo.completed;
    }
    return true; 
  });

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div style={styles.app}>
        <div style={styles.todoContainer}>
          <h1 style={styles.todoHeader}>Todo List App</h1>
          <h2 style={styles.todoText}>Organize Your Day!</h2>
          <div style={styles.todoList}>
            <TodoForm />
          </div>

          {/* button filter */}
          <div className="text-left filter-buttons">
            <button
              className={`inline-flex w-12 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-[#FFFF] 
              text-black hover:bg-[#c6e9a7] mb-3 ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}
            >All
            </button>
            <button
              className={`inline-flex w-16 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-[#FFFF] 
              text-black  hover:bg-[#c6e9a7] mb-3 ml-2 ${filter === 'active' ? 'active' : ''}`} onClick={() => handleFilterChange('active')}
            >Active
            </button>
            <button
              className={`inline-flex w-20 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-[#FFFF] 
              text-black  hover:bg-[#c6e9a7] mb-3 ml-2 ${filter === 'completed' ? 'active' : ''}`} onClick={() => handleFilterChange('completed')}
            >Completed
            </button>
          </div>

          <div className='flex flex-col gap-y-3'>
            {filteredTodos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

const styles = {
  app: {
    backgroundColor: '#172842',
    minHeight: 'screen',
    paddingTop: '2rem',
    borderRadius: '25px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  },
  todoContainer: {
    maxWidth: '2xl',
    margin: '0 auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '5px',
    padding: '1rem 1.5rem',
    color: 'white',
  },
  todoHeader: {
    fontSize: '2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  todoText: {
    fontSize: '1rem',
    textAlign: 'center',
    color: 'yellow',
    marginBottom: '2rem',
    fontStyle:'italic',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '3rem',
    marginBottom: '2rem',
  }

};

export default App