"use client";
import ArrayStateVariable from "./array-state-variables";
import BooleanStateVariables from "./boolean-state-variables";
import ClickEvent from "./click-event";
import Counter from "./counter";
import DateStateVariable from "./date-state-variables";
import ObjectStateVariable from "./object-state-variables";
import ParentStateComponent from "./parent-state-component";
import PassingDataOnEvent from "./passing-data-on-event";
import PassingFunctions from "./passing-function";
import StringStateVariables from "./string-state-variables";
import UrlEncoding from "./url-encoding";
import Link from "next/link";
import store from "./store";
import { Provider } from "react-redux";
import { Suspense } from "react";

export default function lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <Provider store={store}>
      <div id="wd-lab1">
        <h2>Lab 4</h2>
        <h3>React States</h3>
        <div>
          <ClickEvent />
        </div>

        <div>
          <PassingDataOnEvent />
        </div>

        <div>
          <PassingFunctions theFunction={sayHello} />
        </div>

        <div>
          <Counter />
        </div>

        <div>
          <BooleanStateVariables />
        </div>

        <div>
          <StringStateVariables />
        </div>

        <div>
          <DateStateVariable />
        </div>

        <div>
          <ObjectStateVariable />
        </div>

        <div>
          <ArrayStateVariable />
        </div>

        <div>
          <ParentStateComponent />
        </div>

        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <UrlEncoding />
          </Suspense>
        </div>

        <Link href="./lab4/redux">Redux Examples</Link>
        <hr />
        <Link href="./lab4/react-context">React Context Examples</Link>
        <hr />
        <Link href="./lab4/zustand">Zustand Examples</Link>
      </div>
    </Provider>
  );
}
