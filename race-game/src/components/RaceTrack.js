import React from 'react';
import './RaceTrack.css';

const RaceTrack = ({ cars, finishLine }) => {
  return (
    <div className="track-container">
      {cars.map((car, index) => (
        <div key={index} className="track" style={{ left: `${car.position}px` }}>
          <img
            src={car.image}
            alt={`Coche ${index + 1}`}
            className="car"
          />
        </div>
      ))}
      <div className="finish-line" style={{ left: `${finishLine}px` }}>
        Meta
      </div>
    </div>
  );
};

export default RaceTrack;
