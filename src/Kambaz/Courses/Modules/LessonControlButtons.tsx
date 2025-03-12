import { IoEllipsisVertical } from "react-icons/io5";
import { GreenCheckmark } from "./GreenCheckmark";
import { BiPlus } from "react-icons/bi";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

interface LessonControlButtonsProps {
  isModule: boolean;
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}

export const LessonControlButtons = ({
  isModule,
  moduleId,
  deleteModule,
  editModule,
}: LessonControlButtonsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className="float-end">
      {isModule && currentUser.role === "FACULTY" && (
        <>
          <FaPencil
            onClick={() => editModule(moduleId)}
            className="text-primary me-3"
          />
          <FaTrash
            className="text-danger me-2 mb-1"
            onClick={() => deleteModule(moduleId)}
          />
        </>
      )}
      <GreenCheckmark />
      {isModule && <BiPlus className="fs-4" />}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
};
