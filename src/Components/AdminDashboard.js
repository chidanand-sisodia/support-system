
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { assignTechSupport, closeTicket, resolveTicket } from './App/tickets/ticketSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  // Assume a list of tech support staff IDs for assignment
  const techSupportStaff = ['tech1', 'tech2'];

  const handleAssignTechSupport = (ticketId, techSupportId) => {
    dispatch(assignTechSupport({ ticketId, techSupportId }));
  };

  const handleResolveTicket = (ticketId) => {
    dispatch(resolveTicket(ticketId));
  };

  const handleCloseTicket = (ticketId) => {
    dispatch(closeTicket(ticketId));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 h-screen">
  <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>
  <div className="flex flex-col">
    {tickets.map((ticket) => (
      <div key={ticket.id} className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg p-4 mb-4 justify-between items-center">
        <p className="font-semibold text-lg mb-4 md:mb-0">{ticket.subject}</p>
        <select
          onChange={(e) => handleAssignTechSupport(ticket.id, e.target.value)}
          defaultValue="Assign Tech Support"
          className="mb-4 md:mb-0 md:mr-4 py-2 px-4 border border-gray-300 rounded-md text-gray-700"
        >
          <option disabled>Assign Tech Support</option>
          {techSupportStaff.map((techId) => (
            <option key={techId} value={techId}>{techId}</option>
          ))}
        </select>
        <button 
          onClick={() => handleResolveTicket(ticket.id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mb-4 md:mb-0"
        >
          Resolve
        </button>
        <button 
          onClick={() => handleCloseTicket(ticket.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default AdminDashboard;
