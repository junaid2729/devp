// import React, { useState } from 'react';
// import './truckManagement.css'; // Create a CSS file for styling

// const initialTrucks = [
//   { id: 1, name: 'Truck 1', status: 'Available' },
//   { id: 2, name: 'Truck 2', status: 'In Transit' },
//   { id: 3, name: 'Truck 3', status: 'Available' },
//   { id: 4, name: 'Truck 4', status: 'Maintenance' },
//   { id: 5, name: 'Truck 5', status: 'Available' },
//   { id: 6, name: 'Truck 6', status: 'In Transit' },
//   { id: 7, name: 'Truck 7', status: 'Available' },
//   { id: 8, name: 'Truck 8', status: 'Maintenance' },
//   { id: 9, name: 'Truck 9', status: 'Available' },
//   { id: 10, name: 'Truck 10', status: 'In Transit' },
// ];

// const TruckManagement = () => {
//   const [trucks, setTrucks] = useState(initialTrucks);

//   const handleStatusChange = (id, newStatus) => {
//     const updatedTrucks = trucks.map((truck) =>
//       truck.id === id ? { ...truck, status: newStatus } : truck
//     );
//     setTrucks(updatedTrucks);
//   };

//   return (
//     <div className="truck-management">
//       <h2>Truck Management</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Truck Name</th>
//             <th>Status</th>
//             <th>Change Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trucks.map((truck) => (
//             <tr key={truck.id}>
//               <td>{truck.id}</td>
//               <td>{truck.name}</td>
//               <td>{truck.status}</td>
//               <td>
//                 <select
//                   value={truck.status}
//                   onChange={(e) => handleStatusChange(truck.id, e.target.value)}
//                 >
//                   <option value="Available">Available</option>
//                   <option value="In Transit">In Transit</option>
//                   <option value="Maintenance">Maintenance</option>
//                 </select>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TruckManagement;
