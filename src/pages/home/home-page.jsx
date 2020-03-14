import React from 'react';
import './home-page.scss';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero splash">
        <div className="hero-body">
          <div className="container">
            <h1 className="title splash-text">TRT Bicycles</h1>
            <h2 className="subtitle">Family owned. Rider focused.</h2>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="subtitle">
            We are a family of cyclists. Our entire family lives to ride. From
            the professional to the weekend warrior we have the entire spectrum
            of equipment and accessories covered. Cycling is our passion, let us
            share it with the riders in your family. We want our relationships
            to last as long as our bikes, so you can count on us to take care of
            you and do what’s right. We stand behind our bikes, and the people
            who ride them.
          </h2>
        </div>
      </section>
    </div>
  );
}
