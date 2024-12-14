import React from 'react';
import './repair-page.scss';

function LaborRates() {
  return (
    <div className="tile is-parent">
      <div className="tile is-child box">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Flat fix</p>
              <p className="title">$7 + Tube</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Labor Rate</p>
              <p className="title">$69.99/hr</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Wheel True</p>
              <p className="title">$30</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Guaranteed 24 hr rush</p>
              <p className="title">$25</p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

const repairPackages = [
  {
    title: 'Basic',
    price: '$89.99',
    services: [
      'Wash Bike',
      'Inspect for safety',
      'Adjust shifting and breaking',
      'Replace worn cables and pads',
      'True wheels, check wheel bearings',
      'Fresh Lube',
      'Degrease drivetrain',
    ],
  },
];

export default function RepairPage() {
  return (
    <div>
      <div className="repair-banner" />
      <div className="container">
        <div className="hero">
          <div className="hero-body">
            <h1 className="title brand-font">Repair</h1>
          </div>
        </div>

        <LaborRates />

        <div className="hero">
          <div className="hero-body">
            <h1 className="title">Tune Up</h1>
            <div className="subtitle">Prices do not include parts</div>
          </div>
        </div>

        <div className="tile is-ancestor">
          {repairPackages.map((repairPackage) => (
            <div
              key={repairPackage.title}
              className="tile is-vertical is-parent">
              <div className="tile is-child box">
                <p className="title brand-font has-text-centered">
                  {repairPackage.title}
                </p>
                <p className="subtitle has-text-centered">
                  {repairPackage.price}
                </p>
                <ul>
                  {repairPackage.services.map((service) => (
                    <li key={service}>
                      <i className="fas fa-cog" /> {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
