import { useTable, useFilters, useGlobalFilter } from "react-table";
import React from "react";
import { useSelector } from "react-redux";
import MapComponent from "../MapComponent/MapComponent";
import UpdateButton from "./../UpdateButton/UpdateButton";

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
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
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function ShipTable() {
  const shipData = useSelector(function (state) {
    return state.ships;
  });

  const data = React.useMemo(() => shipData, [shipData]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Ship Name",
        accessor: "shipName",
      },
      {
        Header: "MMSI #",
        accessor: "mmsi",
      },
      {
        Header: "Ship Type",
        accessor: "type",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Owner",
        accessor: "owner",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Latitude",
        accessor: "lat",
        Filter: () => <div></div>,
        filter: "includes",
      },
      {
        Header: "Longitude",
        accessor: "lng",
        Filter: () => <div></div>,
        filter: "includes",
      },
      {
        Header: "updated",
        accessor: "updated",
        Filter: () => <div></div>,
        filter: "includes",
      },
    ],
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter
  );

  const mapCenter = { lat: 52.430514, lng: 4.162088 };

  return (
    <div className="flex flex-col items-center">
      <MapComponent key={"map"} rows={rows} center={mapCenter} />
      <UpdateButton key={"update"} />
      <div className="md: px-20 py-8 w-full">
        <div className="shadow overflow-hidden rounded border-b border-gray-200">
          <table className="min-w-full bg-white" {...getTableProps()}>
            <thead className="bg-gray-800 text-white">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                      <div className="text-black">
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="text-gray-700" {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="w-1/3 text-left py-3 px-4"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ShipTable);
