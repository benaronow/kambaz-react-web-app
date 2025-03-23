import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export const TodoForm = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();

  return (
    <ListGroup.Item className="d-flex">
      <FormControl
        defaultValue={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <Button
        className="bg-warning border-0 mx-2"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        Update
      </Button>
      <Button
        className="bg-success border-0"
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
      >
        Add
      </Button>
    </ListGroup.Item>
  );
};
