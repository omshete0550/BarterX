import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Proposer.css";
import DataTable, { createTheme } from "react-data-table-component";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import { useLocation } from "react-router-dom";

const customStyles = {
  rows: {
    style: {
      minHeight: "55px",
      background: "rgb(18 19 65)", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
    },
  },
  cells: {
    style: {
      paddingTop:"0px",
      paddingLeft: "5px", // override the cell padding for data cells
      paddingRight: "5px",
    },
  },
};

const columns = [
  {
    name: "Date",
    selector: (row) => row.createdAt,
    sortable: true,
  },
  {
    name: "Proposer",
    selector: (row) => row.proposerName,
    sortable: true,
  },
  {
    name: "Proposed Item",
    selector: (row) => row.itemName,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => (
      <div className="TableBtnContainer">
        <button className="AcceptBtn" >✔</button>
        <button className="DenyBtn" >✘</button>
      </div>
    ),
  },
];

createTheme(
  "solarized",
  {
    text: {
      primary: "#fff",
      secondary: "#2aa198",
    },
    background: {
      default: "#000",
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

const Proposer = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const id = localStorage.getItem("token")
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/api/barterrequests/incoming/${id}`);
        const proposals = response.data;
        // setProductData(proposals)
        // console.log(proposals);
        const requestsWithNames = await Promise.all(
          proposals.map(async (request) => {
            // Fetch requester name
            const proposerData = await axios.get(`http://localhost:8800/api/users/${request.requester}`);
            // Fetch item name
            const itemData = await axios.get(`http://localhost:8800/api/getproductdetails/${request.myItem}`);
  
            // Update the request object with names
            return {
              ...request,
              proposerName: proposerData.data.name,
              itemName: itemData.data.prodname,
            };
          })
        );
        setProductData(requestsWithNames);
        
      } catch (error) {
        console.error('Error fetching product data:', error.message);
      }
    };
  
    fetchProductData();
  }, [productData]);
  console.log(productData);
  // Function to update the status of a barter request
  const updateRequestStatus = async (requestId) => {
    try {
      // Send an HTTP request to update the status to "success"
      await axios.put(`http://localhost:8800/api/products/barter/${requestId}`, {
        status: 'success',
      });
      // After the status is updated, you may want to refresh the data or handle it as needed.
      // You can call fetchProductData() again to refresh the data.
      // fetchProductData();
    } catch (error) {
      console.error('Error updating request status:', error.message);
    }
  };
  
  return (
  
    <>
      <Navbar />

      <div className="proposerContainer">
        <h1>PROPOSERS</h1>
        <DataTable
            columns={columns.map(column => {
            if (column.name === 'Status') {
              return {
                ...column,
                cell: (row) => (
                  <div className="TableBtnContainer">
                    <button className="AcceptBtn" onClick={() => updateRequestStatus(row._id)}>✔</button>
                    <button className="DenyBtn" >✘</button>
                  </div>
                ),
              };
            }
            return column;
          })}
          data={productData}
          theme="solarized"
          customStyles={customStyles}
        />
      </div>

      <Footer />
    </>
  );
};

export default Proposer;
