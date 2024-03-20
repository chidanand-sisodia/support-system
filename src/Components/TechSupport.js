
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addResponse, resolveTicket } from './App/tickets/ticketSlice';

const TechSupport = () => {
  const [response, setResponse] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [showDetailTicketId, setShowDetailTicketId] = useState(null); // Track which ticket's details to show
  const dispatch = useDispatch();
  

 
  const tickets = useSelector((state) => state.tickets.list);

  const handleResponseChange = (e) => setResponse(e.target.value);

  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachment(file.name);
    }
  };

  const handleResponseSubmit = (e) => {
    e.preventDefault();
    if (selectedTicketId<0   || selectedTicketId==null) {
      alert("Please select the ticket..!")
      return;
    }
    dispatch(addResponse({
      ticketId: selectedTicketId,
      response,
      attachmentName: attachment,
    }));
    // Reset form fields after submission
    alert("Response sent successfully.");
    setResponse('');
    setAttachment(null);
    setSelectedTicketId(null); // Clear selection

  
  };

  // Toggle between showing and hiding ticket details
  const toggleShowDetails = (ticketId, e) => {
    e.stopPropagation(); // Prevent the click from selecting the ticket
    setShowDetailTicketId(showDetailTicketId === ticketId ? null : ticketId);
  };

  // Select ticket and optionally reset response form fields
  const handleSelectTicket = (ticketId) => {
    setSelectedTicketId(ticketId);
    setResponse('');
    setAttachment(null);
    // If selecting a ticket that's already selected, deselect it
    if (selectedTicketId === ticketId) {
      setSelectedTicketId(null);
    }
  };

  const handleResolveTicket = (ticketId, e) => {
    e.stopPropagation(); // Prevent the click from selecting the ticket
    dispatch(resolveTicket(ticketId));
  };

  console.log("**add response",addResponse);
 

  return (
    <div className="max-w-4xl mx-auto mt-10 ">
      <h2 className="text-2xl font-bold text-center mb-4">Tech Support Dashboard</h2>
    
      
      <div className="mt-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        {tickets.map((ticket,index) => (
          <div 
            key={index} 
            className={`p-4 white shadow-xl rounded shadow ${selectedTicketId === index ? "ring-2 ring-blue-500" : ""}`}
            onClick={() => handleSelectTicket(index)}
          >
            <div className={`font-medium text-gray-800 ${showDetailTicketId === index ? "text-xl" : "text-lg"}`}>{ticket.subject}</div>
            {showDetailTicketId === index && (
              <>
                <div className="text-sm text-gray-600">{ticket.date}</div>
                <div><strong>Department:</strong> {ticket.department}</div>
                <div><strong>Category:</strong> {ticket.category}</div>
                <div><strong>Issue:</strong> {ticket.issue}</div>
                <div><strong>Attachment:</strong> {ticket.attachment}</div>
              </>
            )}
            <button 
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs"
              onClick={(e) => toggleShowDetails(index, e)}
            >
              {showDetailTicketId === index ? 'Hide' : 'Show'}
            </button>
            <button 
              className="mt-2 ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
              onClick={(e) => handleResolveTicket(index, e)}
            >
              Resolve
            </button>
          </div>
        ))}
      </div>
          

      { (  
        <form onSubmit={handleResponseSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-4">
          <h3 className="text-lg font-semibold mb-4">Respond to Selected Ticket:</h3>
          <textarea 
            value={response} 
            onChange={handleResponseChange} 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your response..."
            required
          ></textarea>
          <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Attachment (optional):</label>
            <input 
              type="file" 
              onChange={handleAttachmentChange} 
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4 file:rounded file:border-0
              file:text-sm file:font-semibold file:bg-green-50 file:text-green-700
              hover:file:bg-green-100"/>
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Submit Response
          </button>
        </form>
        )}  
    </div>
  );
};

export default TechSupport;

