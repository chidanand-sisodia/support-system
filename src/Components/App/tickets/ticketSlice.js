/*import { createSlice } from '@reduxjs/toolkit';


export const ticketSlice = createSlice({
  name: 'tickets',
  initialState:[]
  //  {
  //   list: [
  //       { id: 1, subject: "Asking for joining ", resolved: false ,department:'IT',issue:'Late joning',attachment:'pdf will show here' },
  //       { id: 2, subject: "Pending Approval", resolved: false ,department:'Sales',issue:'didnt get approval yet',attachment:'pdf will show here' },

  //   ], // Array to hold tickets
  // }
  ,

 
  reducers: {
    // Assuming you already have actions like addTicket, we add two more
    addResponse: (state, action) => {
      const { ticketId, response, attachmentName } = action.payload;
      const ticket = state.list.find(ticket => ticket.id === ticketId);
      if (ticket) {
        ticket.response = response;
        ticket.responseAttachment = attachmentName; // Store the response file name
      }
    },
    resolveTicket: (state, action) => {
      const ticket = state.list.find(ticket => ticket.id === action.payload);
      if (ticket) {
        ticket.resolved = true;
      }
    },
    closeTicket: (state, action) => {
        const index = state.list.findIndex(ticket => ticket.id === action.payload);
        if (index !== -1) state.list[index].closed = true; // Mark the ticket as closed
      },
      assignTechSupport: (state, action) => {
        const { ticketId, techSupportId } = action.payload;
        const index = state.list.findIndex(ticket => ticket.id === ticketId);
        if (index !== -1) state.list[index].techSupportId = techSupportId; // Assign tech support to the ticket
      },
  },
});

export const { addResponse, resolveTicket, closeTicket, assignTechSupport } = ticketSlice.actions;

export default ticketSlice.reducer;

*/

// src/features/tickets/ticketSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    list: [],
    responses: [],
  },
  reducers: {
    addTicket: (state, action) => {
      state.list.push(action.payload);
    },
    addResponse: (state, action) => {
      const { ticketId, response, attachmentName } = action.payload;

      console.log("Action payload:", action.payload);
      // console.log("Current state before adding response:", state);
      // Directly access the ticket using index
      if (ticketId >= 0 && ticketId < state.list.length) {
     
        state.responses.push(
          action.payload);
        console.log("Updated ticket with new response:", state.responses);
      }
      else{
        console.log("Ticket not found with index:", ticketId);

      }
    },

    resolveTicket: (state, action) => {
      const ticket = state.list.find(ticket => ticket.id === action.payload);
      if (ticket) {
        ticket.resolved = true;
      }
    },
    closeTicket: (state, action) => {
      const ticket = state.list.find(ticket => ticket.id === action.payload);
      if (ticket) {
        ticket.closed = true;
      }
    },
    assignTechSupport: (state, action) => {
      const { ticketId, techSupportId } = action.payload;
      const ticket = state.list.find(ticket => ticket.id === ticketId);
      if (ticket) {
        ticket.techSupportId = techSupportId;
      }
    },
  },
});

export const { addTicket, addResponse, resolveTicket, closeTicket, assignTechSupport } = ticketSlice.actions;

export default ticketSlice.reducer;

