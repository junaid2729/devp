// frontend/src/components/Home.js
import React from 'react';
import './home.css'; // Import the CSS file for styling
import assets from './assets/truck.jpg'; // Correctly import the truck image

// Array of truck data with correct image reference
const trucks = [
  { id: 1, name: 'Truck no 1', img: assets },
  { id: 2, name: 'Truck no 2', img: assets },
  { id: 3, name: 'Truck no 3', img: assets },
  { id: 4, name: 'Truck no 4', img: assets },
  { id: 5, name: 'Truck no 5', img: assets },
  { id: 6, name: 'Truck no 6', img: assets },
  { id: 7, name: 'Truck no 7', img: assets },
  { id: 8, name: 'Truck no 8', img: assets },
];

const Home = () => {
  return (
    <div className="home">
      {/* <h1>Welcome to Our Website</h1>
      <p>Please register or login to continue.</p> */}

      {/* Truck Section */}
      <section className="section">
        <div className="section2">
          <div className="container">
            {trucks.map((truck) => (
              <div key={truck.id} className="items">
                <div className={`img img${truck.id}`}>
                  <a href="#" target="_parent">
                    <img src={truck.img} alt={truck.name} />
                  </a>
                </div>
                <div className="info">
                  <button>{truck.name}</button>
                </div>
                <div className="parainfo"></div>
              </div>
            ))}
            <div className="book">
              <a href="#">
                <button>BOOK NOW</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
