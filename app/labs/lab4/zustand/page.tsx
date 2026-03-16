import ZustandCounter from "./counter";
import ZustandTodoList from "./todos/zustand-todo-list";
export default function ZustandExamples() {
  return (
    <div>
      <h2>Zustand Examples</h2>
      <ZustandCounter />

      <ZustandTodoList />
    </div>
  );
}
