import { Button, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export const TodoItem = ({ todo }: { todo: { id: string; title: string } }) => {
  const dispatch = useDispatch();

  return (
    <ListGroup.Item key={todo.id}>
      {todo.title}
      <Button
        className="bg-primary border-0 mx-2"
        onClick={() => dispatch(setTodo(todo))}
        id="wd-set-todo-click"
      >
        Edit
      </Button>
      <Button
        className="bg-danger border-0"
        onClick={() => dispatch(deleteTodo(todo.id))}
        id="wd-delete-todo-click"
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
};
