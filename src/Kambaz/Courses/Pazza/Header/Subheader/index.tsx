import { Route, Routes } from "react-router";
import { FilteredFolders } from "./FilteredFolders";
import { ManageClassBar } from "./ManageClassBar";
// import { makeStyles } from "tss-react/mui";

// const useStyles = makeStyles()({});

export const Subheader = () => {
  // const { classes } = useStyles();

  return (
    <div>
      <Routes>
        <Route path="Home/*" element={<FilteredFolders />} />
        <Route path="Resources" element={<FilteredFolders />} />
        <Route path="Statistics" element={<FilteredFolders />} />
        <Route path="Account" element={<FilteredFolders />} />
        <Route path="ManageClass/*" element={<ManageClassBar />} />
      </Routes>
    </div>
  );
};
