import React from 'react';
import './home-page.scss';
import { Link } from 'react-router-dom';
import { CovidBanner } from './covid-banner';
import repairImage from './repair.jpg';
import rentalImage from './rental.jpg';
import fitImage from './fit.jpg';

function HeroSection({ content, title, image, imageName, linkPath }) {
  return (
    <section className="section">
      <div className="tile is-ancestor">
        <div className="tile is-4 is-vertical is-parent">
          <div className="tile is-child box">
            <p className="title">{title}</p>
            <p>{content}</p>
            <p className="column">
              <button className="button">
                <Link to={linkPath}>{`Go to ${title}`}</Link>
              </button>
            </p>
          </div>
        </div>
        <div className="tile is-parent">
          <figure className="image">
            <img loading="lazy" src={image} alt={imageName} />
          </figure>
        </div>
      </div>
    </section>
  );
}

function ServicesLevel() {
  return (
    <section className="tile is-vertical is-parent">
      <div className="tile is-child box">
        <div className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Tune-Ups</p>
              <p className="title">Fast Turnaround</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Custom Fit</p>
              <p className="title">Trek Certified</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Rentals</p>
              <p className="title">Road and Mountain</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const sections = [
    {
      title: 'Repair',
      content:
        'We have a highly trained staff that has the expertise to work on any make or model. Not having your bike is a drag so we offer 24 hour turn around on repairs and a satisfaction guarantee.',
      image: repairImage,
      imageName: 'repair',
      linkPath: '/repair',
    },
    {
      title: 'Rental',
      content: `Come enjoy a ride in the Hudson Valley! Rent one of our ${new Date().getFullYear()} fleet, serviced after every ride, we have a full range of sizes.`,
      image: rentalImage,
      imageName: 'rental',
      linkPath: '/rental',
    },
    {
      title: 'Fit',
      content:
        'Trek Precision Fit Certified, TRT will get you riding right on your equipment. Shiny new time trial, or tried and true hardtail. The fit makes the ride, and we know how to get you to where you need to be.',
      image: fitImage,
      imageName: 'fit',
      linkPath: '/fit',
    },
  ];

  return (
    <div className="home-page">
      <CovidBanner />
      <section className="hero splash">
        <div className="hero-body has-text-centered-mobile">
          <h1 className="title splash-text has-text-primary">TRT Bicycles</h1>
          <h2 className="subtitle">Family owned. Rider focused.</h2>
        </div>
      </section>

      <ServicesLevel />

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

      {sections.map((section) => (
        <HeroSection
          key={section.title}
          title={section.title}
          content={section.content}
          imageName={section.imageName}
          linkPath={section.linkPath}
          image={section.image}
        />
      ))}
    </div>
  );
}
