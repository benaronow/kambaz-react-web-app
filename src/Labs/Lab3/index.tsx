/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddingAndRemovingToFromArrays } from "./AddingAndRemovingToFromArrays";
import { ArrayIndexAndLength } from "./ArrayIndexAndLength";
import { ArrowFunctions } from "./ArrowFunctions";
import { BooleanVariables } from "./BooleanVariables";
import { ConditionalOutputIfElse } from "./ConditionalOutputIfElse";
import { ConditionalOutputInline } from "./ConditionalOutputInLine";
import { FilterFunction } from "./FilterFunction";
import { FindFunction } from "./FindFunction";
import { FindIndex } from "./FindIndex";
import { ForLoops } from "./ForLoops";
import { IfElse } from "./IfElse";
import { ImpliedReturn } from "./ImpliedReturn";
import { JsonStringify } from "./JsonStringify";
import { LegacyFunctions } from "./LegacyFunctions";
import { MapFunction } from "./MapFunction";
import { SimpleArrays } from "./SimpleArrays";
import { TemplateLiterals } from "./TemplateLiterals";
import { TernaryOperator } from "./TernaryOperator";
import { VariablesAndConstants } from "./VariablesAndConstants";
import { VariableTypes } from "./VariableTypes";
import { House } from "./House";
import { TodoItem } from "./todos/TodoItem";
import { TodoList } from "./todos/TodoList";
import { Spreading } from "./Spreading";
import { Destructing } from "./Destructuring";
import { FunctionDestructing } from "./FunctionDestructuring";
import { DestructingImports } from "./DestructuringImports";
import { Classes } from "./Classes";
import { Styles } from "./Styles";
import { Add } from "./Add";
import { Square } from "./Square";
import { Highlight } from "./Highlight";
import { PathParameters } from "./PathParameters";
import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";

export const Lab3 = () => {
  console.log("Hello World!");
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroup.Item key={todo.id}>{todo.title}</ListGroup.Item>
        ))}
      </ListGroup>
      <hr />
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <ConditionalOutputIfElse />
      <ConditionalOutputInline />
      <LegacyFunctions />
      <ArrowFunctions />
      <ImpliedReturn />
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
      <TodoItem />
      <TodoList />
      <Spreading />
      <Destructing />
      <FunctionDestructing />
      <DestructingImports />
      <Classes />
      <Styles />
      <hr />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione
        eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo
        excepturi consectetur. Modi omnis minus sequi maiores, provident
        voluptates.
      </Highlight>
      <PathParameters />
    </div>
  );
};
