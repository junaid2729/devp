import React from 'react';
import './home.css';

// Import images with .jpg extension
import delhiImg from '../components/assets/delhi.jpg';
import gujaratImg from '../components/assets/gujarat.jpg';
import rajasthanImg from '../components/assets/Rajasthan.jpg';
import biharImg from '../components/assets/Bihar.jpg';
import karnatakaImg from '../components/assets/karnataka.jpg';
import kashmirImg from '../components/assets/kashmir.jpg';

const Home = () => {
  const states = [
    { name: 'Delhi', img: delhiImg },
    { name: 'Gujarat', img: gujaratImg },
    { name: 'Rajasthan', img: rajasthanImg },
    { name: 'Bihar', img: biharImg },
    { name: 'Karnataka', img: karnatakaImg },
    { name: 'Kashmir', img: kashmirImg },
  ];

  return (
    <div className="home">
      {/* <header className="header">
        <h1>Welcome to Our Transportation Services</h1>
        <p>Reliable pickup and drop services across six states of India.</p>
      </header> */}

      <section className="services">
        <h2>Our Services</h2>
        <div className="states">
          {states.map((state, index) => (
            <div className="state-card" key={index}>
              <img src={state.img} alt={state.name} />
              <h3>{state.name}</h3>
              <p>We provide fast and safe delivery services in {state.name}.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Why Choose Us?</h2>
        <p>
          We are committed to providing the best transportation services with our fleet of
          trucks operating in Delhi, Gujarat, Rajasthan, Bihar, Karnataka, and Kashmir.
          Contact us today to schedule your delivery!
        </p>
        <button className="cta-button">Get a Quote</button>
      </section>
    </div>
  );
};

export default Home;
