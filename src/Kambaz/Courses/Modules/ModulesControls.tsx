import { FaPlus } from "react-icons/fa6";
import { GreenCheckmark } from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { RxCrossCircled } from "react-icons/rx";
import { ModuleEditor } from "./ModuleEditor";
import { useState } from "react";
import { useSelector } from "react-redux";

export const ModulesControls = ({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div
      id="wd-modules-controls"
      className="d-flex flex-row-reverse text-nowrap"
    >
      {currentUser.role === "FACULTY" && (
        <>
          <Button
            variant="danger"
            size="lg"
            className="me-1"
            id="wd-add-module-btn"
            onClick={handleShow}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Module
          </Button>
          <Dropdown className="me-2">
            <Dropdown.Toggle
              variant="secondary"
              size="lg"
              id="wd-publish-all-btn"
            >
              <GreenCheckmark /> Publish All
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item id="wd-publish-all">
                <GreenCheckmark /> Publish All
              </Dropdown.Item>
              <Dropdown.Item id="wd-publish-all-modules-and-items">
                <GreenCheckmark /> Publish all modules and items
              </Dropdown.Item>
              <Dropdown.Item id="wd-publish-modules-only">
                <GreenCheckmark /> Publish modules only
              </Dropdown.Item>
              <Dropdown.Item id="wd-unpublish-all-modules-and-items">
                <RxCrossCircled className="fs-4" /> Unpublish all modules and
                items
              </Dropdown.Item>
              <Dropdown.Item id="wd-unpublish-modules-only">
                <RxCrossCircled className="fs-4" /> Unpublish modules only
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      )}
      <Button
        variant="secondary"
        size="lg"
        className="me-1"
        id="wd-view-progress"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        View Progress
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="me-1"
        id="wd-collapse-all"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Collapse All
      </Button>
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
};
