import AddingAndRemovingToFromArrays from "./adding-and-removing-from-arrays";
import ArrayIndexAndLength from "./array-index-and-length";
import ArrowFunctions from "./arrow-functions";
import BooleanVariables from "./boolean-variables";
import Classes from "./classes";
import ClientComponentDemo from "./client-component-demo";
import ConditionalOutputIfElse from "./conditional-output-if-else";
import ConditionalOutputInline from "./conditional-output-inline";
import DestructingImports from "./desctructing-imports";
import Destructing from "./destruction";
import FilterFunction from "./filter-function";
import FindFunction from "./find-function";
import FindIndex from "./find-index";
import ForLoops from "./for-loops";
import FunctionDestructing from "./function-destructing";
import House from "./house";
import IfElse from "./if-else";
import ImpliedReturns from "./implied-returns";
import JsonStringify from "./json-stringify";
import LegacyFunctions from "./legacy-functions";
import MapFunction from "./map-function";
import ServerComponentDemo from "./server-component-demo";
import SimpleArrays from "./simple-arrays";
import Spreading from "./spreader";
import Styles from "./styles";
import TemplateLiterals from "./template-literals";
import TenaryOperator from "./tenary-operator";
import VariablesAndConstants
  from "./variable-and-constant";
import VariableTypes from "./variable-types";
import Add from "./add";
import Square from "./square";
import Highlight from "./highlight";
import PathParameters from "./path-parameter";
import TodoList from "./todos/todo-list";



export default function Lab3() {
  console.log('Hello World!');

  return (
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <VariablesAndConstants />

      <VariableTypes />

      <BooleanVariables />

      <IfElse />

      <TenaryOperator />

      <ConditionalOutputIfElse />

      <ConditionalOutputInline />

      <LegacyFunctions />

      <ArrowFunctions />

      <ImpliedReturns />

      <TemplateLiterals />

      <SimpleArrays />

      <ArrayIndexAndLength />

      <AddingAndRemovingToFromArrays />

      <ForLoops />

      <MapFunction />

      <FindFunction />

      <FindIndex />

      <FilterFunction />

      <JsonStringify />

      <House />

      <Spreading />

      <Destructing />

      <FunctionDestructing />

      <DestructingImports />

      <Classes />

      <Styles />

      <ClientComponentDemo />

      <ServerComponentDemo />

      <Add a={3} b={4} />

      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />

      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
      </Highlight>

      <PathParameters />

      <TodoList />


    </div>
  );
}

