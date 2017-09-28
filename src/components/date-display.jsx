import React from 'react';
import '../static/style/date-display.css';

export default function DateDisplay(props) {
  return (
    <div className="text-center date-display">
      <div className="date-display-month text-white bg-cool-blue">
        {props.date.substring(7, 11)}
      </div>
      <div className="date-display-day"><h4>{props.date.substring(4, 7)}</h4></div>
      <div className="date-display-year">{props.date.substring(11, 16)}</div>
    </div>
  );
}
