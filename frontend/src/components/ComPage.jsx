import React, { useState } from 'react';
import './ComPage.css'; // Import the CSS for styling

const ComPage = () => {
  // State to manage the visibility of more details for each box
  const [showMore, setShowMore] = useState([false, false, false, false, false, false]);

  // Function to toggle the visibility of more details
  const toggleMoreView = (index) => {
    const updatedShowMore = [...showMore];
    updatedShowMore[index] = !updatedShowMore[index];
    setShowMore(updatedShowMore);
  };

  // Sample data for the boxes
  const boxes = [
    { title: 'Box 1', info: 'This is box 1 information.', moreDetails: 'More details about box 1.' },
    { title: 'Box 2', info: 'This is box 2 information.', moreDetails: 'More details about box 2.' },
    { title: 'Box 3', info: 'This is box 3 information.', moreDetails: 'More details about box 3.' },
    { title: 'Box 4', info: 'This is box 4 information.', moreDetails: 'More details about box 4.' },
    { title: 'Box 5', info: 'This is box 5 information.', moreDetails: 'More details about box 5.' },
    { title: 'Box 6', info: 'This is box 6 information.', moreDetails: 'More details about box 6.' },
  ];

  return (
    <div className="com-page">
      {boxes.map((box, index) => (
        <div className="box" key={index}>
          <h3>{box.title}</h3>
          <p>{box.info}</p>
          {showMore[index] && <p className="more-details">{box.moreDetails}</p>}
          <button onClick={() => toggleMoreView(index)} className="more-view-btn">
            {showMore[index] ? 'Show Less' : 'More View'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ComPage;
