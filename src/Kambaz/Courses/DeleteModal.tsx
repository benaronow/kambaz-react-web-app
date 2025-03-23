import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteAssigment } from "./Assignments/reducer";

interface DeleteModalProps {
  assignmentId: string;
  setDeleteModalOpen: (open: boolean) => void;
}

export const DeleteModal = ({
  assignmentId,
  setDeleteModalOpen,
}: DeleteModalProps) => {
  const dispatch = useDispatch();

  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        background: "white",
        height: "250px",
        width: "250px",
        justifyContent: "space-evenly",
        alignItems: "center",
        border: "solid 5px black",
        borderRadius: "20px",
        padding: "0px 10px",
        textAlign: "center",
      }}
    >
      <span>{`Are you sure you want to delete assigment ${assignmentId}?`}</span>
      <div
        style={{
          display: "flex",
          width: "80%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          className="bg-danger border-0"
          onClick={() => {
            dispatch(deleteAssigment(assignmentId));
            setDeleteModalOpen(false);
          }}
        >
          Delete
        </Button>
        <Button
          className="bg-secondary border-0"
          onClick={() => setDeleteModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};
