import { useState } from "react";

import { calculateWinner } from "./lib";

export default function App() {
  const [turn, setTurn] = useState("X"); // "X" is first turn
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moveCount, setMoveCount] = useState(0);

  const hasGameStarted = squares.some((square) => square !== null);

  const winner = calculateWinner(squares);
  const isTie = !winner && squares.every((square) => square !== null);

  // Determine background class based on game state
  const bgClass = winner
    ? "bg-gradient-to-r from-pink-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600 animate-rainbow"
    : "bg-gray-900";

  const getStatusMessage = () => {
    if (winner) return `Winner: ${winner}! 🎉`;
    if (isTie) return "It's a tie! 🤝";

    return `Next player: ${turn}`;
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return; // Ignore click if square is already filled or game is won.

    const newSquares = [...squares]; // * No mutation of state!
    newSquares[index] = turn;

    setSquares(newSquares);
    setTurn((prev) => (prev === "X" ? "O" : "X"));
    setMoveCount(moveCount + 1);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setTurn("X");
    setMoveCount(0);
  };

  return (
    <main
      className={`w-screen h-screen flex justify-center items-center ${bgClass}`}
    >
      <style>
        {`
          @keyframes rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-rainbow {
            background: linear-gradient(270deg, #ff6ec4, #f9d423, #42e695, #3a8dde, #a259c6, #ff6ec4);
            background-size: 1200% 1200%;
            animation: rainbow 8s ease-in-out infinite;
          }
        `}
      </style>
      <div className="flex flex-col items-center gap-6">
        {/* Status message */}
        <header className="text-3xl font-bold text-white">
          <h1>{getStatusMessage()}</h1>
        </header>

        {/* Moves message */}
        <header className="text-xl font-bold text-white">
          {hasGameStarted
            ? `Moves: ${moveCount} ${moveCount === 1 ? "move" : "moves"}`
            : "No moves yet"}
        </header>

        <div className="relative grid grid-cols-3 w-fit gap-0">
          {/* Horizontal lines */}
          <div className="absolute left-0 right-0 h-1 bg-purple-500 top-[calc(33.333%-0.125rem)]" />
          <div className="absolute left-0 right-0 h-1 bg-purple-500 top-[calc(66.666%-0.125rem)]" />

          {/* Vertical lines */}
          <div className="absolute top-0 bottom-0 w-1 bg-purple-500 left-[calc(33.333%-0.125rem)]" />
          <div className="absolute top-0 bottom-0 w-1 bg-purple-500 left-[calc(66.666%-0.125rem)]" />

          {Array.from({ length: 9 }, (_, i) => (
            <Square key={i} value={squares[i]} onClick={() => handleClick(i)} />
          ))}
        </div>

        {/* Reset button */}
        <button
          onClick={handleReset}
          disabled={!hasGameStarted}
          className={`px-6 py-3 font-bold rounded-lg transition-colors duration-200 ${
            hasGameStarted
              ? "bg-purple-500 hover:bg-purple-600 text-white cursor-pointer"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
          }`}
        >
          {winner || isTie ? "Play Again" : "Restart"}
        </button>
      </div>
    </main>
  );
}

function Square({ value, onClick }) {
  return (
    <button
      className="text-9xl font-bold size-36 text-center text-white hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      {value}
    </button>
  );
}
