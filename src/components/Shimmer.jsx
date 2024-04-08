import React from 'react';
import './Shimmer.css';

const Shimmer = () => {
  return (
    <div className="restaurant-list flex justify-between flex-wrap my-8 mx-[100px]" data-testid="shimmer">
      {Array(10)
        .fill('')
        .map((_, index) => (
          <div key={index} className="shimmer-card w-[400px] mx-3 my-8 h-[300px] p-8"></div>
        ))}
    </div>
  );
};

export default Shimmer;
