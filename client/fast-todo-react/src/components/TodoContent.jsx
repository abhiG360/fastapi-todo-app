import React from "react";
import { FloatingDock } from "./ui/FloatingDock";
import "./TodoContent.css";

function TodoContent({ todos, onTodoUpdate, onDeleteTodo, onEditTodo }) {
  if (!todos.length) {
    return <div>No todos available.</div>;
  }


  const handleCheck = (item) => {
    const updatedItem = { ...item, completed: !item.completed };
    onTodoUpdate(updatedItem);
  };

  const handleDelete = (id) => {
    onDeleteTodo(id);
  };

  const handleEdit = (item) => {
    onEditTodo(item); // Pass the item to be edited
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="todo-content-container">
      <div className="container">
        <div className="row ab-spacing table-head">
          <div className="col">Title</div>
          <div className="col-6">Description</div>
          <div className="col">Status</div>
        </div>
        {todos.map((item) => (
          <div
            key={item.id}
            className={`row ab-spacing table-body ${
              item.completed ? "completed" : ""
            }`}
          >
            <div className="col title">{item.title}</div>
            <div className="col-6 description">{item.description}</div>
            <div className="col status">
              <FloatingDock
                completed={item.completed}
                onCheck={() => handleCheck(item)}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item)} // Handle edit
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoContent;
