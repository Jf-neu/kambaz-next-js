import CounterRedux from "./counter-redux";
import HelloRedux from "./hello";
import TodoList from "./todos/todos-list";

export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>

      <div>
        <HelloRedux />
      </div>

      <div>
        <CounterRedux />
      </div>

      <div>
        <TodoList />
      </div>
    </div>
  );
}
