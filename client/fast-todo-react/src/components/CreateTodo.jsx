import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import "./CreateTodo.css";

function CreateTodo({ refreshTodos, editingTodo, onTodoUpdate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [crackLevel, setCrackLevel] = useState(0);

  // Populate form fields when editing a todo
  useEffect(() => {
    if (editingTodo) {
      setTitle(editingTodo.title);
      setDescription(editingTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editingTodo]);

  const isFormValid = title.trim() !== "" && description.trim() !== "";

  useEffect(() => {
    const totalCharacters = title.trim().length + description.trim().length;

    if (totalCharacters > 6) {
      setCrackLevel(6);
    } else if (totalCharacters > 5) {
      setCrackLevel(5);
    } else if (totalCharacters > 4) {
      setCrackLevel(4);
    } else if (totalCharacters > 3) {
      setCrackLevel(3);
    } else if (totalCharacters > 2) {
      setCrackLevel(2);
    } else if (totalCharacters > 1) {
      setCrackLevel(1);
    } else {
      setCrackLevel(0);
    }
  }, [title, description]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (editingTodo) {
        // Update existing todo
        const updatedTodo = { ...editingTodo, title, description };
        await onTodoUpdate(updatedTodo);
      } else {
        // Create new todo
        await axios.post("https://tadaa-react-fastapi.onrender.com/todos/", {
          title,
          description,
        });
      }

      refreshTodos(); // Refresh todos
      setTitle("");
      setDescription("");
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      console.error("Error creating/updating todo:", error);
      setError("Failed to create/update entry. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-todo-wrapper">
      <form onSubmit={handleSubmit} className="create-todo-form">
        <div className="form-gradient-overlay"></div>
        <div className="form-content">
          <div className="form-row">
            <div className="form-field">
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                placeholder="Enter title"
              />
            </div>
            <div className="form-field">
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                placeholder="Enter description"
                rows="2"
              ></textarea>
            </div>
          </div>
          <div className="form-button-container">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`form-button ${
                editingTodo ? "form-button-editing" : ""
              } ${
                isLoading
                  ? "form-button-disabled"
                  : error
                  ? "form-button-error"
                  : isSuccess
                  ? "form-button-success"
                  : isFormValid
                  ? "form-button-enabled"
                  : `form-button-disabled form-button-crack-level-${crackLevel}`
              }`}
            >
              {isLoading ? (
                <FaSpinner className="spinner-icon" />
              ) : isSuccess ? (
                "Success!"
              ) : error ? (
                "Error!"
              ) : editingTodo ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTodo;
