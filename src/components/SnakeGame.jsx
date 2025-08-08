import React, { useState, useEffect, useRef } from "react";

const GRID_SIZE = 20;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function randomPosition(snake) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some((seg) => seg.x === position.x && seg.y === position.y));
  return position;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [food, setFood] = useState(randomPosition([{ x: 10, y: 10 }]));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem("snakeHighScore")) || 0
  );
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(200);
  const moveRef = useRef();

  moveRef.current = moveSnake;

  useEffect(() => {
    function handleKeyDown(e) {
      if (gameOver) return;
      if (DIRECTIONS[e.key]) {
        const newDir = DIRECTIONS[e.key];
        if (newDir.x !== -direction.x || newDir.y !== -direction.y) {
          setDirection(newDir);
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      moveRef.current();
    }, speed);
    return () => clearInterval(interval);
  }, [speed, gameOver]);

  function moveSnake() {
    setSnake((prev) => {
      const newHead = {
        x: (prev[0].x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (prev[0].y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prev.some((seg) => seg.x === newHead.x && seg.y === newHead.y)) {
        setGameOver(true);
        return prev;
      }

      let newSnake = [newHead, ...prev];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prevScore) => {
          const newScore = prevScore + 1;
          if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem("snakeHighScore", newScore);
          }
          return newScore;
        });
        setFood(randomPosition(newSnake));
        setSpeed((prevSpeed) => (prevSpeed > 60 ? prevSpeed - 5 : prevSpeed));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }

  function restart() {
    setSnake([{ x: 10, y: 10 }]);
    setDirection(DIRECTIONS.ArrowRight);
    setFood(randomPosition([{ x: 10, y: 10 }]));
    setScore(0);
    setSpeed(200);
    setGameOver(false);
  }

  const handleButtonDirection = (dir) => {
    if (gameOver) return;
    if (dir.x !== -direction.x || dir.y !== -direction.y) {
      setDirection(dir);
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-4 sm:p-6 rounded-lg
      bg-gradient-to-br from-white via-gray-50 to-gray-100
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-700
      shadow-md select-none"
    >
      <div
        className="grid rounded-lg border border-gray-300 dark:border-gray-700 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
          aspectRatio: "1 / 1",
          maxWidth: "100%",
        }}
      >
        {Array(GRID_SIZE * GRID_SIZE)
          .fill(null)
          .map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some((seg) => seg.x === x && seg.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            let baseClasses =
              "border border-gray-300 dark:border-gray-700 transition-colors duration-200";

            if (isFood)
              baseClasses +=
                " bg-red-400 dark:bg-red-600 rounded-full animate-pulse shadow-sm";
            else if (isHead)
              baseClasses += " bg-green-600 dark:bg-green-400 rounded-sm shadow";
            else if (isSnake)
              baseClasses += " bg-green-400 dark:bg-green-600 rounded-sm";

            return <div key={`${x}-${y}`} className={baseClasses} />;
          })}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-gray-700 dark:text-gray-300 font-semibold select-text gap-3 sm:gap-0">
        <div>
          Score: <span className="font-bold">{score}</span>
        </div>
        <div>
          High Score: <span className="font-bold">{highScore}</span>
        </div>
        <button
          onClick={restart}
          aria-label="Restart Game"
          className="px-4 py-1 rounded bg-indigo-600 dark:bg-indigo-500 text-white
            hover:bg-indigo-700 dark:hover:bg-indigo-600 transition w-full sm:w-auto"
          type="button"
        >
          Restart
        </button>
      </div>

      <div className="flex justify-center mt-4 space-x-3 sm:space-x-4 select-none flex-wrap gap-3">
        {[ 
          { label: "↑", dir: DIRECTIONS.ArrowUp },
          { label: "←", dir: DIRECTIONS.ArrowLeft },
          { label: "→", dir: DIRECTIONS.ArrowRight },
          { label: "↓", dir: DIRECTIONS.ArrowDown },
        ].map(({ label, dir }) => (
          <button
            key={label}
            onClick={() => handleButtonDirection(dir)}
            className="p-3 bg-indigo-600 text-white rounded shadow hover:bg-indigo-700 transition
            w-12 h-12 text-xl flex justify-center items-center"
            aria-label={`Move ${label}`}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <p className="mt-4 text-center text-gray-500 dark:text-gray-400 select-none text-sm max-w-md mx-auto px-2">
        Use arrow keys or buttons above to control the snake. Eat the red food to grow.
      </p>

      {gameOver && (
        <div
          className="mt-6 p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-400 font-semibold text-center rounded"
          role="alert"
        >
          Game Over! Click Restart to play again.
        </div>
      )}
    </div>
  );
}
