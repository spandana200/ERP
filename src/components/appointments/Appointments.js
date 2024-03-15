import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import appointmentsMockData from "../../mockData/AppointmentsMockData.js";
import "../../styles/Table.css";
import SideBar from "../dashboard/SideBar.js";
function Appointments() {
  const [appointments, setAppointments] = useState(appointmentsMockData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = appointments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const deleteAppointment = (appointmentId) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== appointmentId)
    );
  };
  // to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Function to update appointment status
  const updateAppointmentStatus = (appointmentId, newStatus) => {
    const updatedAppointment = appointments.map((appointment) => {
      if (appointment.id === appointmentId) {
        return { ...appointment, status: newStatus };
      }
      return appointment;
    });
    setAppointments(updatedAppointment);
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ width: "25%" }}>
        <SideBar />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2 style={{ textAlign: "center", marginLeft: "250px" }}>
          Appointments
        </h2>
        <table style={{ margin: 20, height: "50%" }}>
          <thead className="table-header">
            <tr
              style={{
                backgroundColor: "#4169e1",
              }}
            >
              <th className="table-header">ClientName</th>
              <th className="table-header">appointmentDate</th>
              <th className="table-header">status</th>

              <th className="table-header">Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentItems.map((appointment) => (
              <tr key={appointment.id}>
                <td className="table-body">{appointment.clientName}</td>
                <td className="table-body">{appointment.appointmentDate}</td>
                <td className="table-body">
                  {" "}
                  <select
                    style={{ color: "black" }}
                    value={appointment.status}
                    onChange={(e) =>
                      updateAppointmentStatus(appointment.id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Confirmed</option>

                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="actions-column">
                  <DeleteIcon
                    onClick={() => deleteAppointment(appointment.id)}
                  />
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
export default Appointments;
