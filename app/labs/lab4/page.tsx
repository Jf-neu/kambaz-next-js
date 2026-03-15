"use client"
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
import HelloRedux from "./redux/hello";
import CounterRedux from "./redux/counter-redux";
import TodoList from "./redux/todos/todos-list";


export default function lab4() {
    function sayHello() {
        alert("Hello");
    }

    return (
        <Provider store={store}>

            <div id="wd-lab1">
                <h2>Lab 4</h2>
                <h3>React States</h3>
                <Link href="./redux">Redux Examples</Link>


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
                    <UrlEncoding />
                </div>

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