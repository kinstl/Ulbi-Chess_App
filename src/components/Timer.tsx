import React, { FC, useEffect, useRef, useState } from "react";
import { Player } from "../models/Player";
import { Colors } from "../models/Colors";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300);
  const [whiteTime, setWhiteTime] = useState(300);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    startTimer();
  }, [currentPlayer]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current);
    }
    const callback =
      currentPlayer?.color === Colors.WHITE
        ? decrementWhiteTimer
        : decrementBlackTimer;
    timer.current = setInterval(callback, 1000);
  }

  function decrementBlackTimer() {
    setBlackTime((prev) => prev - 1);
  }

  function decrementWhiteTimer() {
    setWhiteTime((prev) => prev - 1);
  }

  function handleRestart() {
    setWhiteTime(300);
    setBlackTime(300);
    restart();
  }

  return (
    <div className="timer">
      <button className="button" onClick={handleRestart}>
        Restart game
      </button>
      <h2
        className={`timer__count ${
          currentPlayer?.color === "black" ? "black" : ""
        }`}
      >
        Черные: {blackTime}
      </h2>
      <h2
        className={`timer__count ${
          currentPlayer?.color === "white" ? "white" : ""
        }`}
      >
        Белые: {whiteTime}
      </h2>
    </div>
  );
};

export default Timer;
