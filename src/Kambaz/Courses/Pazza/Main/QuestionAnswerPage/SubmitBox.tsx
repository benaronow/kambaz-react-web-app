/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dropdown } from "react-bootstrap";
import { makeStyles } from "tss-react/mui";
import { useSelector } from "react-redux";

const useStyles = makeStyles()({
  submitButton: {
    padding: "4px 9px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    background: "#3b74a1",
    border: "none",
    fontSize: "14px",
    marginRight: "6px",
  },
  as: {
    fontSize: "14px",
    color: "#484b4d",
  },
  dropdown: {
    padding: "4px 9px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "solid 1px #cccccb",
    fontSize: "14px",
    marginLeft: "6px",
    minWidth: "160px",
  },
  dropdownName: {
    display: "flex",
    width: "100%",
  },
  dropdownItem: {
    padding: "4px 9px",
    fontSize: "14px",
  },
  cancelButton: {
    padding: "4px 9px",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#212529",
    background: "#f7f9fb",
    border: "solid 1px #ced5da",
    fontSize: "14px",
    marginLeft: "6px",
  },
});

interface SubmitBoxProps {
  anonId: string;
  changeAnonId: (set: boolean) => void;
  onSubmit: () => void;
  cancel: () => void;
}

export const SubmitBox = ({
  anonId,
  changeAnonId,
  onSubmit,
  cancel,
}: SubmitBoxProps) => {
  const { classes } = useStyles();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <>
      <button className={classes.submitButton} onClick={onSubmit}>
        Submit
      </button>
      <span className={classes.as}>as</span>
      <Dropdown>
        <Dropdown.Toggle variant="light" className={classes.dropdown}>
          <div className={classes.dropdownName}>
            {anonId
              ? "Anonymous"
              : `${currentUser.firstName} ${currentUser.lastName}`}
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            className={classes.dropdownItem}
            onClick={() => changeAnonId(false)}
          >{`${currentUser.firstName} ${currentUser.lastName}`}</Dropdown.Item>
          <Dropdown.Item
            className={classes.dropdownItem}
            onClick={() => changeAnonId(true)}
          >
            Anonymous
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <button className={classes.cancelButton} onClick={cancel}>
        Cancel
      </button>
    </>
  );
};
