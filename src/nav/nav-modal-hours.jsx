import React from 'react';
import classNames from 'classnames';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function NavModalHours({ title, hours, isActive, onClose }) {
  return (
    <div className={classNames('modal', { 'is-active': isActive })}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={onClose} />
        </header>
        <section className="modal-card-body">
          <table className="table is-striped is-hoverable is-fullwidth">
            <tbody>
              {Object.keys(hours).map(day => (
                <tr key={day}>
                  <td>{capitalizeFirstLetter(day)}</td>
                  <td>{hours[day]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <footer className="modal-card-foot">
          <button className="button" aria-label="close" onClick={onClose}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
