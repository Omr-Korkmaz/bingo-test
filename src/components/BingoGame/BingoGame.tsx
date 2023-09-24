import React, { useState } from 'react';
import BingoBoard from '../BingoBoard/BingoBoard';
import Numbers from '../Numbers/Numbers';
import { boardsData, numbersToDraw } from '../../data/BingoData';
import './BingoGame.css';

//this is the parant component includes logic and send props to bingoboard and drawnnumber for desing 

const BingoGame: React.FC = () => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [markedNumbers, setMarkedNumbers] = useState<boolean[][][]>(
    boardsData.map((board) => board.map((row) => row.map(() => false)))
  );

  const [currentNumberIndex, setCurrentNumberIndex] = useState<number>(0);



  const drawNextNumber = (): void => {
    if (currentNumberIndex < numbersToDraw.length) {
      const drawnNumber = numbersToDraw[currentNumberIndex];
      setCurrentNumberIndex(currentNumberIndex + 1);

      // Update the list of drawn numbers
      setDrawnNumbers((prevNumbers) => [...prevNumbers, drawnNumber]);

      for (let i = 0; i < boardsData.length; i++) {
    

        for (let row = 0; row < boardsData[i].length; row++) {
          for (let col = 0; col < boardsData[i][row].length; col++) {
            if (boardsData[i][row][col] === drawnNumber) {
              const updatedMarkedNumbers = [...markedNumbers];
              updatedMarkedNumbers[i][row][col] = true;
              setMarkedNumbers(updatedMarkedNumbers);

         
            }
          }
        }
      }
    }
  };

  return (
    <div className="container">
      <h1>Bingo Assignment - Omer Korkmaz</h1>
      <Numbers numbers={numbersToDraw} drawnNumbers={drawnNumbers} />
    
      <div className="button-container">
        <button className="drawnumber-button" onClick={drawNextNumber}>
          Next Number
        </button>
      </div>
      <div className="boards-container">
        {boardsData.map((board, index) => (
          <BingoBoard
            key={index}
            board={board}
            markedNumbers={markedNumbers[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default BingoGame;
