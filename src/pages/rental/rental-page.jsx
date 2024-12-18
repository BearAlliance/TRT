import React from 'react';
import './rental-page.scss';

export default function RentalPage() {
  const rentals = [
    {
      type: 'Road',
      hourPrice: '25',
      dayPrice: '50',
    },
    {
      type: 'E-bike',
      hourPrice: '25',
      dayPrice: '75',
    },
  ];
  return (
    <div>
      <div className="rental-banner" />
      <div className="container">
        <div className="hero">
          <div className="hero-body">
            <h1 className="title brand-font">Bicycle Rental</h1>
            <h2 className="subtitle">
              Come enjoy a ride in the Hudson Valley! Rent one of our{' '}
              {new Date().getFullYear()} fleet, serviced after every ride, we
              have a full range of sizes.
            </h2>
          </div>
        </div>

        <section className="tile is-vertical is-parent">
          <div className="tile is-child box">
            <table className="table is-hoverable is-striped is-fullwidth">
              <thead>
                <tr>
                  <th>Bike Type</th>
                  <th>Per Hour</th>
                  <th>Per Day</th>
                </tr>
              </thead>
              <tbody>
                {rentals.map((rental, index) => (
                  <tr key={index}>
                    <td key={index}>{rental.type}</td>
                    <td key={index}>${rental.hourPrice}</td>
                    <td key={index}>${rental.dayPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
