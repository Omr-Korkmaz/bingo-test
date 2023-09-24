import React, { useState } from 'react';
import BingoBoard from '../BingoBoard/BingoBoard';
import Numbers from '../Numbers/Numbers';
import { boardsData, numbersToDraw } from '../../data/BingoData';
import './BingoGame.css';

//this is the parant component includes logic and send props to bingoboard and drawnnumber for desing 

const BingoGame: React.FC = () => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [winningBoards, setWinningBoards] = useState<number[]>([]);
  const [resultText, setResultText] = useState("")

  const [markedNumbers, setMarkedNumbers] = useState<boolean[][][]>(
    boardsData.map((board) => board.map((row) => row.map(() => false)))
  );

  const [currentNumberIndex, setCurrentNumberIndex] = useState<number>(0);

  const checkBingo = (board: boolean[][]): boolean => {
    // Check rows
    for (let row = 0; row < board.length; row++) {
      if (board[row].every((marked) => marked)) {
        return true; // Bingo a row is completed
      }
    }

    // Check columns
    for (let col = 0; col < board[0].length; col++) {
      if (board.every((row) => row[col])) {
        return true; // Bingo a column is completed
      }
    }

    return false; // No bingo
  };

  const calculateBoardScore = (boardIndex: number, drawnNumber: number): number => {
    const winningBoard = boardsData[boardIndex];
    let sum = 0;

    // Calculate the sum of unmarked numbers on the board
    for (let row = 0; row < winningBoard.length; row++) {
      for (let col = 0; col < winningBoard[row].length; col++) {
        if (!markedNumbers[boardIndex][row][col]) {
          sum += winningBoard[row][col];
        }
      }
    }

    // Calculate the score
    const score = sum * drawnNumber;

    return score;
  };

  const drawNextNumber = (): void => {
    if (currentNumberIndex < numbersToDraw.length) {
      const drawnNumber = numbersToDraw[currentNumberIndex];
      setCurrentNumberIndex(currentNumberIndex + 1);

      // Update the list of drawn numbers
      setDrawnNumbers((prevNumbers) => [...prevNumbers, drawnNumber]);

      for (let i = 0; i < boardsData.length; i++) {
        if (winningBoards.includes(i)) {
          continue;
        }

        for (let row = 0; row < boardsData[i].length; row++) {
          for (let col = 0; col < boardsData[i][row].length; col++) {
            if (boardsData[i][row][col] === drawnNumber) {
              const updatedMarkedNumbers = [...markedNumbers];
              updatedMarkedNumbers[i][row][col] = true;
              setMarkedNumbers(updatedMarkedNumbers);

              if (checkBingo(updatedMarkedNumbers[i])) {
                setWinningBoards((prevWinningBoards) => [...prevWinningBoards, i]);

                const score = calculateBoardScore(i, drawnNumber);
                console.log(`Board ${i + 1} wins with a score of ${score}`);
                setResultText(`Board ${i + 1} wins with a score of ${score}`)
              }
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
      {winningBoards.length === boardsData.length ? (
        <p className="winner-text">All boards have won! The last one is {resultText} </p>
      ) : (
        <p>Still there are more boards is waiting to win</p>
      )}
      <div className="button-container">
        <button className="drawnumber-button" onClick={drawNextNumber}>
          Draw Next Number
        </button>
      </div>
      <div className="boards-container">
        {boardsData.map((board, index) => (
          <BingoBoard
            key={index}
            board={board}
            markedNumbers={markedNumbers[index]}
            isWinner={winningBoards.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default BingoGame;
