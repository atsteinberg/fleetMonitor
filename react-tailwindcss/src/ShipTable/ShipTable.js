import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
 

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <input 
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}
// This is a custom filter UI for selecting
// a unique option from a list
function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach(row => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])


  // Render a multi-select box
  return (
    <select
      value={filterValue}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}


 function ShipTable() {

 const data = useSelector(function(state) {
    console.log(state);
    return state.ships;
  });
  

  const columns = React.useMemo(()=> [
    {
      Header: 'Ship Name' ,
      accessor: 'shipName', // accessor is the "key" in the data
    },
    {
      Header: 'MMSI #',
      accessor: 'mmsi',
    },
    {
      Header: 'Type',
      accessor: 'type',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
    {
      Header: 'Owner',
      accessor: 'owner',
      Filter: SelectColumnFilter,
      filter: 'includes',
    },
  ]);
  
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      //fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id]
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true
        })
      },
    }),
    []
  )
  
  

  
  //const dispatch = useDispatch();
 
   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
   } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  )
 


  return (
    <div className="md:px-8 py-8 w-full">
    <div className="shadow overflow-hidden rounded border-b border-gray-200">
     <table className="min-w-full bg-white"
     {...getTableProps()} >
       <thead className="bg-gray-800 text-white">
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm"
                 {...column.getHeaderProps()}
                 
               >
                 {column.render('Header')}
                 <div className="text-black">{column.canFilter ? column.render('Filter') : null}</div>
               </th>
             ))}
           </tr>
         ))}
       </thead>

  
       <tbody className="text-gray-700" 
       {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td className="w-1/3 text-left py-3 px-4"
                     {...cell.getCellProps()}>
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     </div>
  </div>
   )
 }

 export default React.memo(ShipTable);