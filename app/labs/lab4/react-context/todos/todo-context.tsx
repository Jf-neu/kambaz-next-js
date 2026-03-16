"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Todo {
  id: number;
  title: string;
}

interface TodosContextState {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (id: number, title: string) => void;
  deleteTodo: (id: number) => void;
}

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Learn React" },
    { id: 2, title: "Learn Node" },
  ]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      title,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (id: number, title: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const value: TodosContextState = {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);
  return context;
};