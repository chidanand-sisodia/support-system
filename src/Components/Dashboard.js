import React, { useState } from 'react';
import { addResponse, resolveTicket,ticketSlice,addTicket } from './App/tickets/ticketSlice';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const [showTickets, setShowTickets] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [tickets, setTickets] = useState([]);
    const users=useSelector((state)=>state)
    // const testtickets = useSelector((state) => state.tickets.list);
    // ticketSlice.getInitialState().list=tickets
    const dispatch = useDispatch();
    
    // const ticketss = useSelector((state) => state.tickets.list);


    const [ticketForm, setTicketForm] = useState({
        subject: '',
        department: '',
        category: '',
        issue: '',
        attachment: '', // For storing the file name
    });


    console.log('dashboard users:', users);

    const handleFormChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'attachment') {
            const fileName = files.length ? files[0].name : '';
            setTicketForm(prevForm => ({
                ...prevForm,
                [name]: fileName,
            }));
        } else {
            setTicketForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };


    

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTicket = {
            ...ticketForm,
            date: new Date().toLocaleString(),
            subject: ticketForm.subject,
            department: ticketForm.department,
            category: ticketForm.category,
            issue: ticketForm.issue,
            attachment: ticketForm.attachment,
            resolved: false,
            closed: false,
            techSupportId: '', // Initial resolved status is false
        };

        

        if (editMode) {
            const updatedTickets = tickets.map((ticket, idx) => idx === editIndex ? newTicket : ticket);
            setTickets(updatedTickets);
            alert("Ticket updated successfully.");
        } else {
            setTickets([...tickets, newTicket]);
            alert("Ticket created successfully.");
        }
        
        setShowForm(false);
        setEditMode(false);
        setTicketForm({ subject: '', department: '', category: '', issue: '', attachment: '' }); // Reset form

        
        dispatch(addTicket(newTicket));
        
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setTicketForm(tickets[index]);
        setShowForm(true);
        setShowTickets(false);
        setEditMode(true);


    };

    const handleCancel = () => {
        setShowForm(false);
        setEditMode(false);
        setTicketForm({ subject: '', department: '', category: '', issue: '', attachment: '' });
    };

    const handleResolve = (index) => {
        const updatedTickets = [...tickets];
        updatedTickets[index] = { ...updatedTickets[index], resolved: !updatedTickets[index].resolved };
        setTickets(updatedTickets);
    };

    console.log("***dyanamic tickets",tickets);
    console.log("******ticket slice dashboard",ticketSlice.getInitialState().list);


    return (
        <div className="container mx-auto p-4 mt-0 h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>
            <div className="flex justify-center space-x-4 mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setShowForm(true); setShowTickets(false); setEditMode(false); }}>Create Ticket</button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setShowTickets(true); setShowForm(false); }}>View Tickets</button>
            </div>

            {showForm && (
                <div className="flex justify-center">
                    <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
        Subject
      </label>
      <input type="text" id="subject" name="subject" value={ticketForm.subject} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
    </div>
    <div className="w-full px-3 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
        Department
      </label>
      <select id="department" name="department" value={ticketForm.department} onChange={handleFormChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        {/*  available departments */}
        <option value="">Select a department</option>
        <option value="IT">IT</option>
        <option value="HR">HR</option>
        <option value="Finance">Finance</option>
      </select>
    </div>
    <div className="w-full px-3 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
        Category
      </label>
      <select id="category" name="category" value={ticketForm.category} onChange={handleFormChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
        {/*  available categories */}
        <option value="">Select a category</option>
        <option value="Software">Software</option>
        <option value="Hardware">Hardware</option>
        <option value="Network">Network</option>
      </select>
    </div>
    <div className="w-full px-3 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="issue">
        Issue
      </label>
      <textarea id="issue" name="issue" value={ticketForm.issue} onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required></textarea>
    </div>
    <div className="w-full px-3 mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="attachment">
        Attachment (optional)
      </label>
      <input type="file" id="attachment" name="attachment" onChange={handleFormChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
    <div className="w-full px-3">
      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {editMode ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div>
    </div>
  </div>
</form>

                </div>
            )}

            {showTickets && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
                    {tickets.map((ticket, index) => (
                        <div key={index} className="p-4 bg-white shadow-xl rounded shadow">
                            {/* Ticket Information */}
                            <div className="mb-3">
                                <h3 className="text-lg font-semibold">{ticket.subject}</h3>
                                <span className="text-sm text-gray-600">{ticket.date}</span>
                            </div>
                            <p><strong>Department:</strong> {ticket.department}</p>
                            <p><strong>Category:</strong> {ticket.category}</p>
                            <p><strong>Issue:</strong> {ticket.issue}</p>
                            <p><strong>Attachment:</strong> {ticket.attachment}</p>
                            <div className="flex justify-between items-center mt-2">
                                <button onClick={() => handleEdit(index)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs">Edit</button>
                                <button onClick={() => handleResolve(index)} className={`text-white font-bold py-1 px-2 rounded text-xs ${ticket.resolved ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-700'}`}>
                                    {ticket.resolved ? 'Resolved' : 'Resolve'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
