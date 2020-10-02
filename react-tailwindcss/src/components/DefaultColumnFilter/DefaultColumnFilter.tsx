import React from 'react';

type Column = {
  filterValue: string;
  preFilteredRows: string[];
  setFilter: (filter: string | undefined) => void;
};

interface DefaultColumnFilterProps {
  column: Column;
}

export const DefaultColumnFilter: React.FC<DefaultColumnFilterProps> = (
  column: Column,
) => {
  const { filterValue, preFilteredRows, setFilter } = column;

  const count = preFilteredRows.length;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
};
