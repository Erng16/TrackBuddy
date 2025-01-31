import React, { createContext, useContext, useReducer } from "react";

// Create Context
export const ShipmentContext = createContext();

// Initial mock data
const mockShipments = [
  {
    trackingNumber: "CSS0000000001",
    status: "Picked Up",
    time: "2024-12-09 14:35",
    sender: "John Smith",
    receiver: "Alice Withers",
    route: [
      { location: "Central Warehouse", province: "Saskatchewan", time: "2024-12-08 18:30", status: "Processed" },
      { location: "Regional Warehouse", province: "Manitoba", time: "2024-12-09 10:00", status: "Picked Up" },
    ],
  },
  {
    trackingNumber: "CSS0000000002",
    status: "Picked Up",
    time: "2024-12-09 12:00",
    sender: "Mike Doe",
    receiver: "Sarah Connor",
    route: [
      { location: "Central Warehouse", province: "British Columbia", time: "2024-12-07 09:00", status: "Processed" },
      { location: "Regional Warehouse", province: "Alberta", time: "2024-12-08 14:30", status: "Picked Up" },
    ],
  },
  {
    trackingNumber: "CSS0000000003",
    status: "Out for Delivery",
    time: "2024-12-09 10:00",
    sender: "Jane Doe",
    receiver: "Bob Martin",
    route: [
      { location: "Central Warehouse", province: "Nova Scotia", time: "2024-12-07 13:00", status: "Processed" },
      { location: "Regional Warehouse", province: "Newfoundland", time: "2024-12-08 15:45", status: "Picked Up" },
      { location: "Delivery Center", province: "Prince Edward Island", time: "2024-12-09 09:00", status: "Out for Delivery" },
    ],
  },
  {
    trackingNumber: "CSS0000000004",
    status: "Waiting for Pickup",
    time: "2024-12-08 09:00",
    sender: "Chris Johnson",
    receiver: "Emma Davis",
    route: [
      { location: "Warehouse", province: "Quebec", time: "2024-12-07 17:00", status: "Processed" },
    ],
  },
  {
    trackingNumber: "CSS0000000005",
    status: "Delayed",
    time: "2024-12-07 18:45",
    sender: "Michael Lee",
    receiver: "Sophia Wilson",
    route: [
      { location: "Central Hub", province: "Ontario", time: "2024-12-06 20:30", status: "Processed" },
      { location: "Sorting Center", province: "Quebec", time: "2024-12-07 16:00", status: "Delayed" },
    ],
  },
  {
    trackingNumber: "CSS0000000006",
    status: "Delivered",
    time: "2024-12-06 13:15",
    sender: "Emily Clark",
    receiver: "Liam Carter",
    route: [
      { location: "Central Warehouse", province: "Manitoba", time: "2024-12-05 08:30", status: "Processed" },
      { location: "Delivery Center", province: "Saskatchewan", time: "2024-12-06 13:00", status: "Delivered" },
    ],
  },
  {
    trackingNumber: "CSS0000000007",
    status: "Cancelled",
    time: "2024-12-05 12:00",
    sender: "Oliver Brown",
    receiver: "Isabella Green",
    route: [
      { location: "Central Warehouse", province: "Alberta", time: "2024-12-04 15:00", status: "Processed" },
      { location: "Regional Warehouse", province: "British Columbia", time: "2024-12-05 11:30", status: "Cancelled" },
    ],
  },
  {
    trackingNumber: "CSS0000000008",
    status: "Out for Delivery",
    time: "2024-12-09 08:30",
    sender: "Lucas Miller",
    receiver: "Ava Adams",
    route: [
      { location: "Delivery Center", province: "Ontario", time: "2024-12-09 08:30", status: "Out for Delivery" },
      { location: "Central Warehouse", province: "Ontario", time: "2024-12-08 14:00", status: "Processed" },
      { location: "Regional Warehouse", province: "Quebec", time: "2024-12-08 20:30", status: "Picked Up" },
    ],
  },
];


// Reducer
const shipmentReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ROUTE":
  console.log("Reducer payload:", action.payload);

  return state.map((shipment) => {
    if (shipment.trackingNumber === action.payload.trackingNumber) {
      console.log("Processing shipment:", shipment.trackingNumber);

      // Step 1: Check for matching entries to update
      const updatedRoute = shipment.route.map((existingEntry) => {
        const matchingNewEntry = action.payload.route.find(
          (newEntry) =>
            newEntry.location === existingEntry.location &&
            newEntry.province === existingEntry.province &&
            newEntry.time === existingEntry.time
        );

        if (matchingNewEntry) {
          console.log("Updating existing entry:", {
            existingEntry,
            updatedStatus: matchingNewEntry.status,
          });
          return { ...existingEntry, status: matchingNewEntry.status };
        }

        return existingEntry;
      });

      // Step 2: Filter out new entries to add
      const newEntries = action.payload.route.filter(
        (newEntry) =>
          !shipment.route.some(
            (existingEntry) =>
              existingEntry.location === newEntry.location &&
              existingEntry.province === newEntry.province &&
              existingEntry.time === newEntry.time
          )
      );

      console.log("New entries to add:", newEntries);

      // Step 3: Concatenate updated route with new entries
      const finalRoute = [...updatedRoute, ...newEntries];
      console.log("Final updated route:", finalRoute);

      // Return the updated shipment object
      return {
        ...shipment,
        route: finalRoute,
        status: action.payload.latestStatus, // Update the latest status
      };
    }

    // Return shipment unchanged if it's not the one being updated
    return shipment;
  });
  

    case "ADD_SHIPMENT": // New action to handle adding shipments
      return [...state, action.payload]; // Append the new shipment to the existing state
    default:
      return state;
  }
};

// Provider Component
export const ShipmentProvider = ({ children }) => {
  const [shipments, dispatch] = useReducer(shipmentReducer, mockShipments);

  return (
    <ShipmentContext.Provider value={{ shipments, dispatch }}>
      {children}
    </ShipmentContext.Provider>
  );
};

// Export the custom hook
export const useShipmentContext = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error("useShipmentContext must be used within a ShipmentProvider");
  }
  return context;
};


