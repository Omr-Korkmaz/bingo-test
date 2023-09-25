// import React from 'react';
import './Numbers.css';

interface NumbersProps {
  numbers: number[];
  drawnNumbers: number[];
}

const Numbers: React.FC<NumbersProps> = ({ numbers, drawnNumbers }) => {
  return (
    <div className="drawn-numbers-container">
      <h2>Drawn Numbers</h2>
      <div className="drawn-numbers__list">
        {numbers.map((number, index) => (
          <div
            key={index}
            className={`drawn-number ${
              drawnNumbers.includes(number) ? 'matched' : ''
            }`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Numbers;
