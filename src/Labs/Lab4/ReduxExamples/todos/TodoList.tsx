/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroup } from "react-bootstrap";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { useSelector } from "react-redux";

export const TodoList = () => {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div>
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo: any) => (
          <TodoItem todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
};
