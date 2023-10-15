import React from "react";

import DataTable, { createTheme } from "react-data-table-component";

const customStyles = {
  rows: {
    style: {
      minHeight: "72px",
      background: "#eaeaea", // override the row height
    },
  },
  headCells: {
    style: {
      color:"#fff",
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const columns = [
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "User",
    selector: (row) => row.user,
    sortable: true,
  },
  {
    name: "Item",
    selector: (row) => row.item,
    sortable: true,
  },
  // {
  //   name: "Price",
  //   selector: (row) => row.price,
  //   sortable: true,
  // },
];

createTheme(
  "solarized",
  {
    text: {
      primary: "#000",
      secondary: "#2aa198",
    },
    background: {
      default: "rgb(18 19 65)",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#fff",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const data = [
  {
    id: 1,
    date: "15 Aug 2023",
    user: "John Doe",
    item: "Table",
    price: "1500",
  },
  {
    id: 2,
    date: "18 Jan 2023",
    user: "Angela Yu",
    item: "Sofa",
    price: "5500",
  },
  {
    id: 3,
    date: "15 Aug 2023",
    user: "John Doe",
    item: "Table",
    price: "1500",
  },
  {
    id: 4,
    date: "18 Jan 2023",
    user: "Angela Yu",
    item: "Sofa",
    price: "5500",
  },
  {
    id: 5,
    date: "15 Aug 2023",
    user: "John Doe",
    item: "Table",
    price: "1500",
  },
  {
    id: 6,
    date: "18 Jan 2023",
    user: "Angela Yu",
    item: "Sofa",
    price: "5500",
  },
  {
    id: 7,
    date: "15 Aug 2023",
    user: "John Doe",
    item: "Table",
    price: "1500",
  },
  {
    id: 8,
    date: "18 Jan 2023",
    user: "Angela Yu",
    item: "Sofa",
    price: "5500",
  },  

];

const Table = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      theme="solarized"
      customStyles={customStyles}
    />
  );
};

export default Table;
