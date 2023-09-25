import React, { useState } from 'react';
import BingoBoard from '../BingoBoard/BingoBoard';
import Numbers from '../Numbers/Numbers';
import { boardsData, numbersToDraw } from '../../data/BingoData';
import './BingoGame.css';

const BingoGame: React.FC = () => {
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [winningBoards, setWinningBoards] = useState<number[]>([]);
  const [resultText, setResultText] = useState('');
  const [markedNumbers, setMarkedNumbers] = useState<boolean[][][]>(
    boardsData.map((board) => board.map((row) => row.map(() => false)))
  );

  const [currentNumberIndex, setCurrentNumberIndex] = useState<number>(0);
  const [gameFinished, setGameFinished] = useState(false);

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
    if (!gameFinished && currentNumberIndex < numbersToDraw.length) {
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
                setResultText(`Board ${i + 1} wins with a score of ${score}`);
                console.log(score);
                console.log("dasdasd",resultText)
              }
            }
          }
        }
        // Check if all boards have won
        if (winningBoards.length === boardsData.length - 1) {
          setGameFinished(true);
        }
      }
    }
  };
  console.log("game is finished", gameFinished);

  return (
    <div className="bingo">
      <h1 className="bingo__title">Bingo Assignment - Omer Korkmaz</h1>

      <h1 data-testid="score"> this{resultText}</h1>
      <Numbers numbers={numbersToDraw} drawnNumbers={drawnNumbers} />
      {winningBoards.length === boardsData.length ? (
        <h1 className="bingo__winner-text" data-testid="score">
          All boards have won! The last one is {resultText}
        </h1>
      ) : (
        <p className="bingo__info">Still, there are more boards waiting to win</p>
      )}
      <div className="bingo__button-container">
        <button
          className="bingo__drawnumber-button"
          onClick={drawNextNumber}
          disabled={gameFinished} // Disable the button when the game is finished
        >
          Draw Next Number
        </button>
      </div>
      <div className="bingo__boards-container">
        {boardsData.map((board, index) => (
          <BingoBoard
            key={index}
            board={board}
            markedNumbers={markedNumbers[index]}
            isWinner={winningBoards.includes(index)}
            boardNumber={index + 1} // Pass the board ID
          />
        ))}
      </div>
    </div>
  );
};

export default BingoGame;
