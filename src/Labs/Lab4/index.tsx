import ArrayStateVariable from "./ArrayStateVariable";
import { BooleanStateVariables } from "./BooleanStateVariables";
import { ClickEvent } from "./ClickEvent";
import { Counter } from "./Counter";
import { DateStateVariable } from "./DateStateVariable";
import { EventObject } from "./EventObject";
import { ObjectStateVariable } from "./ObjectStateVariable";
import { ParentStateComponent } from "./ParentStateComponent";
import { PassingDataOnEvent } from "./PassingDataOnEvent";
import { PassingFunctions } from "./PassingFunctions";
import { ReduxExamples } from "./ReduxExamples";
import { TodoList } from "./ReduxExamples/todos/TodoList";
import { StringStateVariables } from "./StringStateVariables";

export const Lab4 = () => {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4" className="p-3">
      <h2>Lab 4</h2>
      <ClickEvent />
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />
      <ReduxExamples />
      <TodoList />
    </div>
  );
};
