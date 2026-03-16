"use client";

import store from "../store";
import { Provider } from "react-redux";
import HelloRedux from "../redux/hello";
import CounterRedux from "../redux/counter-redux";
import TodoList from "../redux/todos/todos-list";

export default function ReduxExamples() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
