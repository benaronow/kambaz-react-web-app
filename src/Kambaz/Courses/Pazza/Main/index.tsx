import { Navigate, Route, Routes } from "react-router";
import { QuestionAnswerPage } from "./QuestionAnswerPage";
import { ManageClassPage } from "./ManageClassPage";

export const Main = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="Home" />} />
      <Route path="Home" element={<QuestionAnswerPage />} />
      <Route path="ManageClass" element={<ManageClassPage />} />
    </Routes>
  );
};
