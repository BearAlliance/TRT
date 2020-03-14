import React, { Fragment } from 'react';
import './fit-page.scss';

export default function FitPage() {
  const fitText =
    'Precision Fit is a comprehensive analysis of the interface between cyclist and bicycle. Using our motion capture fitting system we aim to optimize the interface between two and make you a more comfortable and more efficient Cyclist. Popper fit on your bicycle will be confidence inspiring and enhance your overall cycling experience. Fits are performed weekly by appointment.';
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
        <section className="tile is-vertical is-parent  is-invisible-desktop">
          <div className="tile is-child box">{fitText}</div>
        </section>
        <div className="hero">
          <div className="hero-body">
            <h1 className="brand-font title">Fit Pricing</h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
