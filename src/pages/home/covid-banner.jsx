import React, { useState } from 'react';
import { Modal } from '../../components/modal';

export function CovidBanner() {
  const bannerText = "We're making some changes because of COVID-19";
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="has-background-warning">
      <div className="hero">
        <div className="hero-body">
          <div className="columns">
            <h2 className="subtitle column">{bannerText}</h2>
            <div className="column has-text-right">
              <button
                className="button is-dark"
                onClick={() => setIsModalOpen(true)}>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          title="COVID-19 Update"
          isActive={isModalOpen}
          onClose={() => setIsModalOpen(false)}>
          <p>
            Things are changing quickly with the COVID-19 situation. Out of an
            abundance of caution we are going to move to a reduced schedule, and
            we are going to limit people from entering the shop.
          </p>
          <p>
            Feel free to call ahead or email to arrange for service drops off
            and pick ups as well as sales. We are going to do our best to abide
            by the NYS guidelines and CDC cleaning methods as we try to keep you
            rolling during this unpredictable time.{' '}
          </p>
          <p>
            <strong>
              Our hours going forward will be Monday, Wednesday, Friday 11-5
              Saturday 11-4 closed Tuesday Thursday Sunday. Or by appointment.
            </strong>{' '}
          </p>
          <p>
            Thank you for your understanding the safety of our staff and our
            community is our highest priority that being said as the weather
            gets nicer there is no better way to get some fresh air while
            distancing yourself from others than on a bike.
          </p>
        </Modal>
      )}
    </div>
  );
}
