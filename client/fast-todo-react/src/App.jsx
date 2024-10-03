import { useState, useEffect } from "react";
import AppName from "./components/AppName";
import CreateTodo from "./components/CreateTodo";
import TodoContent from "./components/TodoContent";
import axios from "axios";
import "./App.css";
import { BackgroundBeamsWithCollision } from "./components/ui/background-beams-with-collision";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null); // State to store the todo being edited

  axios.defaults.withCredentials = true; // Ensures cookies are sent with all requests
  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://tadaa-react-fastapi.onrender.com/todos/"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Function to refresh todos
  const refreshTodos = () => {
    fetchTodos();
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Handle todo update
  const handleTodoUpdate = async (updatedTodo) => {
    try {
      await axios.put(
        `https://tadaa-react-fastapi.onrender.com/todos/${updatedTodo.id}/`,
        updatedTodo
      );
      setEditingTodo(null); // Reset editing state after update
      refreshTodos(); // Refresh the todos after update
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Handle todo deletion
  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://tadaa-react-fastapi.onrender.com/todos/${id}/`
      );
      refreshTodos(); // Refresh the todos after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="app-alignment">
      <BackgroundBeamsWithCollision />
      <div className="main-container">
        <AppName />
        <CreateTodo
          refreshTodos={refreshTodos}
          editingTodo={editingTodo} // Pass the editing todo
          onTodoUpdate={handleTodoUpdate} // Pass the update handler
        />
        <TodoContent
          todos={todos}
          onTodoUpdate={handleTodoUpdate}
          onDeleteTodo={handleDeleteTodo}
          onEditTodo={setEditingTodo} // Pass the function to set editing todo
        />
      </div>
    </div>
  );
}

export default App;
