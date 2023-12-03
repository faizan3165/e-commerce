"use client";

import React, {
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IContextType {
  categoryFilters: string[];
  setCategoryFilters: React.Dispatch<SetStateAction<string>[]>;

  sort: string;
  setSort: React.Dispatch<SetStateAction<string>>;
}

export const initialFilterData = {
  categoryFilters: [],
  setCategoryFilters: () => [],

  sort: "",
  setSort: () => "",
};

const FilterContext = createContext<IContextType>(initialFilterData);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [sort, setSort] = useState("-createdAt");

  return (
    <FilterContext.Provider
      value={{
        categoryFilters,
        setCategoryFilters,
        sort,
        setSort,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
