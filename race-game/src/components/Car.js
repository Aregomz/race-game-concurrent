import React from 'react';

const Car = ({ name, position }) => {
  return (
    <div className="car" style={{ left: `${position}%` }}>
      {name}
    </div>
  );
};

export default Car;
