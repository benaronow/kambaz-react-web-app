import { IoEllipsisVertical } from "react-icons/io5";
import { GreenCheckmark } from "./GreenCheckmark";
import { BiPlus } from "react-icons/bi";

interface LessonControlButtonsProps {
  withPlus: boolean;
}

export const LessonControlButtons = ({
  withPlus,
}: LessonControlButtonsProps) => {
  return (
    <div className="float-end">
      <GreenCheckmark />
      {withPlus && <BiPlus className="fs-4" />}
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
};
