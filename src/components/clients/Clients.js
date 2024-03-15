import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import clientsMockData from "../../mockData/ClientsMockData";
import "../../styles/Table.css";
import SideBar from "../dashboard/SideBar";
function Clients() {
  const [clients, setClients] = useState(clientsMockData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(clients.length / itemsPerPage);

  const deleteClient = (clientId) => {
    setClients(clients.filter((client) => client.id !== clientId));
  };
  // to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "25%" }}>
        <SideBar />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "100px",
        }}
      >
        <h2 style={{ textAlign: "center", marginLeft: "150px" }}>Clients</h2>
        <table style={{ margin: 20, height: "50%" }}>
          <thead className="table-header">
            <tr
              style={{
                backgroundColor: "#4169e1",
              }}
            >
              <th className="table-header">Name</th>
              <th className="table-header">Email</th>
              <th className="table-header">Phone</th>
              <th className="table-header">address</th>
              <th className="table-header">Company</th>
              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentItems.map((client) => (
              <tr key={client.id}>
                <td className="table-body">{client.name}</td>
                <td className="table-body">{client.email}</td>
                <td className="table-body">{client.phone}</td>
                <td className="table-body">{client.address}</td>
                <td className="table-body">{client.company}</td>
                <td className="actions-column">
                  <DeleteIcon onClick={() => deleteClient(client.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            alignItems: "right",
            justifyContent: "end",
            position: "relative",
            top: 10,
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "white",
              border: "1px solid #4169e1",
              padding: 10,
              borderRadius: 12,
              transitionDuration: 0.3,
              backgroundColor: "#4169e1",
            }}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? "active" : ""}
                style={{
                  textDecoration: "none",
                  cursor: "pointer",
                  color: "white",
                  border: "3px solid #4169e1",
                  padding: 14,
                  borderRadius: 12,
                  transitionDuration: 0.3,
                  backgroundColor: "#4169e1",
                }}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              textDecoration: "none",
              cursor: "pointer",
              color: "white",
              border: "1px solid #4169e1",
              padding: 10,
              borderRadius: 12,
              transitionDuration: 0.3,
              backgroundColor: "#4169e1",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
export default Clients;
