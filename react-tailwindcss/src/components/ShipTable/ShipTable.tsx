import { useTable, useFilters, useGlobalFilter } from 'react-table';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ShipsState } from '../../types/redux';
import { DefaultColumnFilter } from '../DefaultColumnFilter/DefaultColumnFilter';
import { SelectColumnFilter } from '../SelectColumnFilter/SelectColumnFilter';

type ShipTableProps = {
  setRows: (rows: string[]) => void;
};

const EmptyDiv: React.FC<unknown> = () => <div></div>;

function ShipTable({ setRows }: ShipTableProps) {
  const shipData = useSelector((state: ShipsState) => state.ships);

  const data = React.useMemo(() => shipData, [shipData]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'Ship Name',
        accessor: 'shipName',
      },
      {
        Header: 'MMSI #',
        accessor: 'mmsi',
      },
      {
        Header: 'Ship Type',
        accessor: 'type',
        // Filter: SelectColumnFilter,
        // filter: 'includes',
      },
      {
        Header: 'Owner',
        accessor: 'owner',
        // Filter: SelectColumnFilter,
        // filter: 'includes',
      },
      {
        Header: 'Latitude',
        accessor: 'lat',
        // Filter: <EmptyDiv />,
        // filter: 'includes',
      },
      {
        Header: 'Longitude',
        accessor: 'lng',
        // Filter: <EmptyDiv />,
        // filter: 'includes',
      },
      {
        Header: 'updated',
        accessor: 'updated',
        // Filter: <EmptyDiv />,
        // filter: 'includes',
      },
    ],
    [],
  );

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     Filter: DefaultColumnFilter,
  //   }),
  //   [],
  // );

  // const filterTypes = React.useMemo(
  //   () => ({
  //     text: (rows, id, filterValue) => {
  //       return rows.filter((row) => {
  //         const rowValue = row.values[id];
  //         return rowValue !== undefined
  //           ? String(rowValue)
  //               .toLowerCase()
  //               .startsWith(String(filterValue).toLowerCase())
  //           : true;
  //       });
  //     },
  //   }),
  //   [],
  // );
  const tableInstance = useTable(
    {
      columns,
      data,
      // defaultColumn,
      // filterTypes,
    },
    useFilters,
    useGlobalFilter,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  useEffect(() => {
    setRows(rows);
  }, [rows]);

  return (
    // TODO: add reasonable keys

    // <div className="md: px-20 py-8 w-full">
    //   <div className="shadow overflow-hidden rounded border-b border-gray-200">
    //     <table className="min-w-full bg-white" {...getTableProps()}>
    //       <thead className="bg-gray-800 text-white">
    //         {headerGroups.map((headerGroup) => (
    //           <tr {...headerGroup.getHeaderGroupProps()} key="KEY">
    //             {headerGroup.headers.map((column) => (
    //               <th
    //                 className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
    //                 {...column.getHeaderProps()}
    //                 key="ANOTHERKEY"
    //               >
    //                 {column.render('Header')}
    //                 <div className="text-black">
    //                   {column.canFilter ? column.render('Filter') : null}
    //                 </div>
    //               </th>
    //             ))}
    //           </tr>
    //         ))}
    //       </thead>

    //       <tbody className="text-gray-700" {...getTableBodyProps()}>
    //         {rows.map((row) => {
    //           prepareRow(row);
    //           return (
    //             <tr {...row.getRowProps()} key="YET A THIRD KEY">
    //               {row.cells.map((cell) => {
    //                 return (
    //                   <td
    //                     className="w-1/3 text-left py-3 px-4"
    //                     {...cell.getCellProps()}
    //                     key="AND A FOURTH"
    //                   >
    //                     {cell.render('Cell')}
    //                   </td>
    //                 );
    //               })}
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>

    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key="headers">
            {headerGroup.headers.map((column) => {
              return (
                <th
                  {...column.getHeaderProps()}
                  key={'header-' + column.Header}
                >
                  {column.render('Header')}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={'row' + cell.row.id + '-' + cell.column.Header}
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default React.memo(ShipTable);
