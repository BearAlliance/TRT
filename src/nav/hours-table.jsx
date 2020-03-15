import React from 'react';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function HoursTable({ hours }) {
  return (
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
  );
}
