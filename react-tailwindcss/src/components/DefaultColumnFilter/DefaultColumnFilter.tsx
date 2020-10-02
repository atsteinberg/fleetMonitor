import React from 'react';

interface DefaultColumnFilterProps {
  filterValue: string;
  preFilteredRows: string[];
  setFilter: (filter: string | undefined) => void;
}

export const DefaultColumnFilter: React.FC<DefaultColumnFilterProps> = (
  column: DefaultColumnFilterProps,
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
