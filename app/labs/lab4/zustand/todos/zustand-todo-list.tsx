  "use client";
import { useState } from "react";
import { useTodoStore } from "./use-todo-store";

export default function ZustandTodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodoStore(
    (state) => state
  );

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAdd = () => {
    if (!title.trim()) return;
    addTodo(title);
    setTitle("");
  };

  const handleUpdate = () => {
    if (editingId === null || !title.trim()) return;
    updateTodo(editingId, title);
    setEditingId(null);
    setTitle("");
  };

  const handleEdit = (id: number, title: string) => {
    setEditingId(id);
    setTitle(title);
  };

  return (
    <div id="wd-zustand-todo-list">
      <h2>Todo List</h2>

      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="btn btn-warning" onClick={handleUpdate}>
          Update
        </button>

        <button className="btn btn-success" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {todo.title}

            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(todo.id, todo.title)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}