import React from 'react';
import './BingoBoard.css';

interface Props {
  board: number[][];
  markedNumbers: boolean[][];
  isWinner: boolean;
  boardNumber: number; // Add a prop for the board number like id
}

const BingoBoard: React.FC<Props> = ({ board, markedNumbers, isWinner, boardNumber }) => {
  return (
    <div className={`bingo-board ${isWinner ? 'bingo-board--winner' : ''}`}>
      <h2 className="bingo-board__title">Bingo Board {boardNumber}</h2>
      <div className="bingo-board__grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="bingo-board__row">
            {row.map((number, colIndex) => (
              <div
                key={colIndex}
                className={`bingo-board__cell ${
                  markedNumbers[rowIndex][colIndex] ? 'bingo-board__cell--matched' : ''
                }`}
              >
                {number}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoBoard;
