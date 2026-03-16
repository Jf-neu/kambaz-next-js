"use client";
import { CounterProvider } from "./counter/context";
import CounterContext from "./counter";
import { TodosProvider } from "./todos/todo-context";
import ReactContextTodoList from "./todos/react-context-todo-list";

export default function ReactContextExamples() {
  return (
    <div>
      <h1>React Context Examples</h1>

      <CounterProvider>
        <CounterContext />
      </CounterProvider>

      <TodosProvider>
        <ReactContextTodoList />
      </TodosProvider>
    </div>
  );
}
