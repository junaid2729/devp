import jsPDF from 'jspdf';
import './invoice.css';

const Invoice = ({ bookingData }) => {
  const generateInvoice = () => {
    const { username, email, pickupLocation, pickupPhone, dropLocation, dropPhone, goodsType, weight, date, time, price } = bookingData;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Invoice', 20, 20);
    doc.setFontSize(12);
    doc.text(`Username: ${username}`, 20, 40);
    doc.text(`Email: ${email}`, 20, 50);
    doc.text(`Pickup Location: ${pickupLocation}`, 20, 60);
    doc.text(`Pickup Phone: ${pickupPhone}`, 20, 70);
    doc.text(`Drop Location: ${dropLocation}`, 20, 80);
    doc.text(`Drop Phone: ${dropPhone}`, 20, 90);
    doc.text(`Goods Type: ${goodsType}`, 20, 100);
    doc.text(`Weight: ${weight}`, 20, 110);
    doc.text(`Date: ${date}`, 20, 120);
    doc.text(`Time: ${time}`, 20, 130);
    doc.text(`Price: ₹${price}`, 20, 140);

    doc.save('invoice.pdf');
  };

  return (
    <button className="invoice-button" onClick={generateInvoice}>
      Download Invoice
    </button>
  );
};

export default Invoice;
