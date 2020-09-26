import { useTable } from 'react-table';
import React from 'react';
import { useSelector, useDispatch } from "react-redux";
 
 function ShipTable() {

  
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
    },
    {
      Header: 'Owner',
      accessor: 'owner',
    },
  ]);
  
  const shipData = useSelector(function(state) {
    console.log(state);
    return state.ships;
  });

  const data=React.useMemo(()=>shipData,[]);

   
  const dispatch = useDispatch();
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
 
   return (
     <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
   )
 }

 export default React.memo(ShipTable);