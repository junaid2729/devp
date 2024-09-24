import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './invoice.css';

const Invoice = ({ bookingData }) => {
  const generateInvoice = () => {
    const {
      username,
      email,
      pickupLocation,
      pickupPhone,
      dropLocation,
      dropPhone,
      goodsType,
      weight,
      date,
      time,
      price,
    } = bookingData;

    const doc = new jsPDF();

    // Set document properties and header
    doc.setFontSize(18);
    doc.setTextColor(30, 144, 255); // Blue color for header text
    doc.text('Invoice', 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(0); // Reset text color to black
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 20);

    // Add a line below the header
    doc.setLineWidth(0.5);
    doc.line(14, 25, 196, 25);

    // Create table data
    const tableData = [
      ['Username', username],
      ['Email', email],
      ['Pickup Location', pickupLocation],
      ['Pickup Phone', pickupPhone],
      ['Drop Location', dropLocation],
      ['Drop Phone', dropPhone],
      ['Goods Type', goodsType],
      ['Weight', weight],
      ['Date', date],
      ['Time', time],
      ['Price', `₹${price}`],
    ];

    // Add the table to the PDF
    doc.autoTable({
      startY: 30, // Starting y position
      head: [['Description', 'Details']],
      body: tableData,
      styles: {
        fillColor: [230, 242, 255], // Light blue background for table cells
        textColor: 0, // Black text color
      },
      headStyles: {
        fillColor: [30, 144, 255], // Blue background for header row
        textColor: 255, // White text color for header
      },
      theme: 'grid', // Table theme
      tableLineColor: [30, 144, 255], // Blue table border color
      tableLineWidth: 0.5, // Table border width
      columnStyles: {
        0: { cellWidth: 60 }, // Set width of the first column
        1: { cellWidth: 100 }, // Set width of the second column
      },
    });

    // Save the PDF
    doc.save('invoice.pdf');
  };

  return (
    <button className="invoice-button" onClick={generateInvoice}>
      Download Invoice
    </button>
  );
};

export default Invoice;
