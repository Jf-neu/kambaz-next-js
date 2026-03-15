/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import TodoForm from "./todo-form";
import TodoItem from "./todo-item";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} key={todo.id}/> ))}
      </ListGroup>
      <hr /></div>);
}
