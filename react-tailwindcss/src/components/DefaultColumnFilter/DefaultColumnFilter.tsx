import React from 'react';
import { FilterProps } from 'react-table';
import { Ships } from '../../types/redux';

export function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}: FilterProps<Ships>): JSX.Element {
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
}
