import { createContext, ReactNode, useState } from "react";
import { FilterType } from "../../pazzaTypes";

interface FiltersContextType {
  filter: FilterType;
  changeFilter: (filter: FilterType) => void;
}

const defaultFiltersContext: FiltersContextType = {
  filter: "",
  changeFilter: () => {},
};

const FiltersContext = createContext(defaultFiltersContext);

interface FiltersProviderProps {
  readonly children: ReactNode;
}

export const FiltersProvider = ({ children }: FiltersProviderProps) => {
  const [filter, setFilter] = useState<FilterType>("");

  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  return (
    <FiltersContext.Provider value={{ filter, changeFilter }}>
      {children}
    </FiltersContext.Provider>
  );
};
