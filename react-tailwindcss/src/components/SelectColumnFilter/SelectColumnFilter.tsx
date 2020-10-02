import React from 'react';
import { FilterProps } from 'react-table';
import { Ships } from '../../types/redux';

// type Column = {
//   filterValue: string;
//   preFilteredRows: string[];
//   setFilter: (filter: string | undefined) => void;
// };

// interface DefaultColumnFilterProps {
//   column: Column;
// }

// TODO confirm actual types
// interface ColumnProps {
//   filterValue: string;
//   setFilter: (input: string | undefined) => void;
//   preFilteredRows: Record<string, unknown>[];
//   id: string;
// }

// type ColumnObjectProps = {
//   column: ColumnProps;
// };

export function SelectColumnFilter({
  column: { filterValue, preFilteredRows, setFilter, id },
}: FilterProps<Ships>): JSX.Element {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option as string[]}>
          {option}
        </option>
      ))}
    </select>
  );
}
