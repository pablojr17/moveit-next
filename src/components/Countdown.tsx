import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setActive(true);
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    }
  }, [active, time])

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <strong>{minutesLeft}</strong>
          <strong>{minutesRight}</strong>
        </div>
        <span>:</span>
        <div>
          <strong>{secondsLeft}</strong>
          <strong>{secondsRight}</strong>
        </div>
      </div>
      <button type="button" onClick={startCountdown} className={styles.countdownButton}>
        Iniciar um ciclo
    </button>
    </div>
  );
}