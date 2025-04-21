import { Route, Routes } from "react-router";
import { FilteredFolders } from "./FilteredFolders";
import { ManageClassBar } from "./ManageClassBar";

export const Subheader = () => {
  return (
    <div>
      <Routes>
        <Route path="Home/*" element={<FilteredFolders />} />
        <Route path="ManageClass/*" element={<ManageClassBar />} />
      </Routes>
    </div>
  );
};
