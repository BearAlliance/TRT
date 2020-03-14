import React from 'react';
import './repair-page.scss';

export default function RepairPage() {
  const repairPackages = [
    {
      title: 'Basic',
      price: '$64',
      services: [
        'Wash Bike',
        'Inspect for safety',
        'Adjust shifting and breaking',
        'Replace worn cables and pads',
        'True wheels, check wheel bearings',
        'Fresh Lube'
      ]
    },
    {
      title: 'Werx',
      price: '$104',
      services: [
        'Wash Bike',
        'Inspect for safety',
        'Adjust shifting and breaking',
        'Replace worn cables and pads',
        'True wheels, check wheel bearings',
        'Remove and degrease drive train',
        'Fresh Lube'
      ]
    },
    {
      title: 'Overhaul',
      price: '$164',
      services: [
        'Wash Bike,',
        'Strip bike to frame',
        'Clean all parts',
        'Re-assemble with fresh grease',
        'Adjust shifting and breaking',
        'Replace worn cables and pads',
        'True Both Wheels, rebuild or replace wheel bearings'
      ]
    }
  ];

  return (
    <div>
      <div className="repair-banner">hi</div>
      <div className="container">
        <div className="hero">
          <h1 className="title">Tune Up Pricing</h1>
          <div className="hero-body">Prices do not include parts</div>
        </div>
        <div className="tile is-ancestor">
          {repairPackages.map(repairPackage => (
            <div key={repairPackage.title} className="tile is-4  is-parent">
              <div className="tile is-child box">
                <p className="title brand-font has-text-centered">
                  {repairPackage.title}
                </p>
                <p className="subtitle has-text-centered">
                  {repairPackage.price}
                </p>
                <ul>
                  {repairPackage.services.map(service => (
                    <li key={service}>
                      <i className="fas fa-cog" /> {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="tile is-ancestor">
          <div className="tile is-vertical is-parent">
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
                    <p className="title">$50/hr</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Wheel True</p>
                    <p className="title">$25</p>
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
        </div>
      </div>
    </div>
  );
}
