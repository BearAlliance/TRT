import React from 'react';
import './not-found.scss';

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="hero has-text-centered">
        <div className="hero-body not-found-hero">
          <h1 className="title brand-font has-text-primary">Bummer</h1>
          <h2 className="subtitle has-text-weight-bold has-text-black">
            404 not found
          </h2>
        </div>
      </div>
    </div>
  );
}
