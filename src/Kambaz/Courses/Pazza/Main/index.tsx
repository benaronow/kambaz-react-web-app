import { Navigate, Route, Routes } from "react-router";
import { QuestionAnswerPage } from "./QuestionAnswerPage";
import { PostPage } from "./PostPage";
import { ManageFoldersPage } from "./ManageFoldersPage";

export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="Home" />} />
        <Route path="Home" element={<QuestionAnswerPage />} />
        <Route path="Home/Post" element={<PostPage />} />
        <Route path="ManageClass/ManageFolders" element={<ManageFoldersPage />} />
      </Routes>
    </>
  );
};
