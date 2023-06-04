import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ReactComponent as Logo } from "./assets/logo.svg";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editing, setEditing] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const handleEditTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          text: inputValue,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setInputValue("");
    setEditing(null);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleEditClick = (id, text) => {
    setInputValue(text);
    setEditing(id);
  };

  const handleCancelEdit = () => {
    setInputValue("");
    setEditing(null);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="app">
      <h1>ToDo App | Waizly</h1>   <Logo />
      <div className="add-todo">
        <input
          type="text"
          placeholder="Enter a task..."
          value={inputValue}
          onChange={handleInputChange}
        />
        {editing ? (
          <>
            <button className="edit-button" onClick={() => handleEditTodo(editing)}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <button className="add-button" onClick={handleAddTodo}>
            Add
          </button>
        )}
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="todo-list">
        <TransitionGroup>
          {filteredTodos.map((todo) => (
            <CSSTransition key={todo.id} timeout={500} classNames="todo-item">
              <div className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span className={todo.completed ? "completed" : ""}>{todo.text}</span>
                <div className="actions">
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(todo.id, todo.text)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <b>By Mochammad Rafi Fauzi</b>
    </div>
  );
};

export default App;
