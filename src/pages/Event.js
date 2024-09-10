import React from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';

function Event() {
  const { eventName, eventDate } = useParams();

  return (
    <div className="event-page">
      <h1>Details for {eventName.replace(/-/g, ' ')} on {eventDate}</h1>
      <p>More details about this event will be displayed here.</p>
    </div>
  );
}

export default Event;
