import React from 'react';
import './BingoBoard.css';

interface Props {
  board: number[][];
  markedNumbers: boolean[][];
  isWinner: boolean;
}

const BingoBoard: React.FC<Props> = ({ board, markedNumbers, isWinner }) => {
  return (
    <div className={`bingo-board ${isWinner ? 'winner' : ''}`}>
      <h2>Bingo Board</h2>
      <div className="board-grid">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((number, colIndex) => (
              <div
                key={colIndex}
                className={`board-cell ${
                  markedNumbers[rowIndex][colIndex] ? 'matched' : ''
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
