import React, { Fragment } from 'react';
import './fit-page.scss';
import cleat from './cleat.jpg';
import roadFit from './road-fit.jpg';
import triFit from './tri-fit.jpg';

export default function FitPage() {
  const fitText =
    'Precision Fit is a comprehensive analysis of the interface between cyclist and bicycle. Using our motion capture fitting system we aim to optimize the interface between two and make you a more comfortable and more efficient Cyclist. Popper fit on your bicycle will be confidence inspiring and enhance your overall cycling experience. Fits are performed weekly by appointment.';

  const fitPackages = [
    {
      title: 'Cleat & Saddle Adjustment',
      price: 50,
      description:
        'Buying new shoes or a new saddle? Cleats worn out? This fit addresses the lower body including saddle and cleat positions to make sure the feet, legs, and hips are aligned and tracking properly.',
      includes: [],
      subText: 'Recommended for spin class participants',
      image: cleat
    },
    {
      title: 'Road Fit',
      price: 150,
      description:
        'Through an interview and physical evaluation, a Road Fit will determine a rider’s ideal:',
      includes: [
        'Shoe sizing & cleat placement',
        'Saddle selection',
        'Saddle height',
        'Saddle fore/aft position',
        'Stem length & position',
        'Handlebar width & position'
      ],
      subText: 'Please allow approximately 1.5 hours',
      image: roadFit
    },
    {
      title: 'Triathlon Fit',
      price: 200,
      description:
        "Covers all elements included in Road Fit, plus a custom analysis of proper aerobar set up. The Tri Fit determines a rider's ideal:",
      includes: [
        'Physical evaluation',
        'Shoe sizing & cleat placement',
        'Saddle selection',
        'Saddle height',
        'Saddle fore/aft position',
        'Stem length & position',
        'Aerobar pad height/reach'
      ],
      subText: 'Please allow approximately 2 hours',
      image: triFit
    }
  ];
  return (
    <Fragment>
      <div className="hero fit-banner">
        <div className="container">
          <div className="hero-body has-text-secondary fit-text">
            <div className="column is-4 is-invisible-touch">{fitText}</div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="tile is-vertical is-parent is-hidden-desktop">
          <div className="tile is-child box">{fitText}</div>
        </div>

        <div className="hero">
          <div className="hero-body">
            <h1 className="brand-font title">Fit Pricing</h1>
          </div>
        </div>

        {fitPackages.map(pack => (
          <section key={pack.title} className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="tile is-child box">
                <div className="columns">
                  <div className="column is-6">
                    <span className="title has-text-primary">
                      {pack.title}{' '}
                    </span>
                    <span className="title is-size-4 has-text-grey">
                      - ${pack.price}
                    </span>
                    <p className="is-size-5">{pack.description}</p>
                    <ul>
                      {pack.includes.map(item => (
                        <li key={item}>
                          <i className="fas fa-cog" /> {item}
                        </li>
                      ))}
                    </ul>
                    <p>{pack.subText}</p>
                  </div>
                  <div className="column is-6">
                    <figure className="image">
                      <img alt="bike-fit" src={pack.image} />
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </Fragment>
  );
}
