import React, { useState, useRef } from 'react';
import circle from '../../assets/circle.png';
import cross from '../../assets/cross.png';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== '') return;

    const newBoard = [...board];
    let newXMoves = [...xMoves];
    let newOMoves = [...oMoves];

    if (count % 2 === 0) {
      newBoard[index] = 'x';
      newXMoves.push(index);

      if (newXMoves.length > 3) {
        const removeIndex = newXMoves.shift();
        newBoard[removeIndex] = '';
      }
    } else {
      newBoard[index] = 'o';
      newOMoves.push(index);

      if (newOMoves.length > 3) {
        const removeIndex = newOMoves.shift();
        newBoard[removeIndex] = '';
      }
    }

    setBoard(newBoard);
    setXMoves(newXMoves);
    setOMoves(newOMoves);
    setCount(count + 1);

    checkWin(newBoard);
  };

  const checkWin = (newBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const [a, b, c] of winPatterns) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        won(newBoard[a]);
        return;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    titleRef.current.textContent = `Congratulations: ${winner === 'x' ? 'X' : 'O' } `;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setXMoves([]);
    setOMoves([]);
    setCount(0);
    setLock(false);
    titleRef.current.textContent = "Tic Tac Toe without Draw";
  };

  return (
    <div className="text-center">
      <h1 className="text-white font-bold text-[50px] my-6" ref={titleRef}>Tic Tac Toe without Draw</h1>
      <div className="grid grid-cols-[100px_100px_100px] grid-rows-[100px_100px_100px] justify-center">
        {board.map((value, index) => (
          <div key={index} className="bg-deepSlate h-[100px] w-[100px] border-2 border-darkBlueGray rounded-md flex items-center justify-center" onClick={() => toggle(index)}>
            {value && <img className='w-14' src={value === 'x' ? cross : circle} alt={value} />}
          </div>
        ))}
      </div>
      {
        lock && <button className="w-[100px] h-[50px] border-none outline-none rounded-[50px] cursor-pointer text-neonAqua mt-[50px] bg-deepSlate" onClick={resetGame}>Reset</button>
      }
    </div>
  );
};

export default TicTacToe;
