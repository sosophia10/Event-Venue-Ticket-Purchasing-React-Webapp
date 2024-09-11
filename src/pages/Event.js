import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function EventPage() {
  const { eventName, eventDate } = useParams(); // get URL parameters
  const [event, setEvent] = useState(null); // store the event object
  const [loading, setLoading] = useState(true); // handle loading state
  const [error, setError] = useState(null); // handle any fetch errors

  useEffect(() => {
    // Fetch the events data from the JSON file
    fetch('/events-mock-data.json') // Change the path accordingly
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch event data.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Check the fetched data structure
      const formattedEventName = decodeURIComponent(eventName).replace(/-/g, ' ');

      const foundEvent = data.events.find(
        (e) => e.eventName.toLowerCase() === formattedEventName.toLowerCase()
      );


        if (foundEvent) {
          // Find the event detail that matches the eventDate
          const foundEventDetail = foundEvent.eventDetails.find(
            (detail) => detail.date === eventDate
          );

          // If we found both the event and the event detail, update the state
          if (foundEventDetail) {
            setEvent({
              ...foundEvent,
              date: foundEventDetail.date,
              time: foundEventDetail.time,
              ticketPrices: foundEventDetail.ticketPrices,
              description: foundEvent.description,
            });
            console.log('Description:', foundEvent.description); // Log the description
          } else {
            setError('Event details not found for the specified date.');
          }
        } else {
          setError('Event not found.');
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching event data.');
        setLoading(false);
      });
  }, [eventName, eventDate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="event-page">
      <h1>{event.eventName.replace(/-/g, ' ')} on {event.date}</h1>
      <p>Description: {event.description}</p>
      <p>Time: {event.time}</p>
      <h3>Ticket Prices:</h3>
      <ul>
        <li>Box: ${event.ticketPrices.box}</li>
        <li>Orchestra: ${event.ticketPrices.orchestra}</li>
        <li>Main Floor: ${event.ticketPrices.mainFloor}</li>
        <li>Balcony: ${event.ticketPrices.balcony}</li>
      </ul>
      <button onClick={() => alert('Redirecting to ticket purchase page...')}>
        Buy Tickets
      </button>
    </div>
  );
}

export default EventPage;
