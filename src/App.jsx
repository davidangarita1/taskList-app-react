import React, { Fragment, useState, useRef, useEffect } from 'react';
import TodoList from './components/TodoList';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, task: 'Learn React', isComplete: true },
  ]);

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(KEY));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.isComplete = !todo.isComplete;
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === '') return;

    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), task, isComplete: false }]
    });

    todoTaskRef.current.value = '';
  };

  const handleClearAllCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.isComplete);
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTodoAdd}>➕</button>
      <button onClick={handleClearAllCompleted}>🗑️</button>
      <div>
        Te quedan {todos.filter((todo) => !todo.isComplete).length} tareas por terminar
      </div>
    </Fragment>
  );
}

export default App;
