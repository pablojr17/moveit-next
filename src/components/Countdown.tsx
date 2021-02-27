import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {
  const { startNewChallenge } = useContext(ChallengesContext)

  const [time, setTime] = useState(0.1 * 60)
  const [isActive, setIsActive] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
  const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge()
    }
  }, [isActive, time])

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

      {hasFinished ? (
        <button type="button"
          disabled
          className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
          <>
            {isActive ? (
              <button type="button"
                onClick={resetCountdown}
                className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                Abandonar ciclo
              </button>
            ) : (
                <button type="button"
                  onClick={startCountdown}
                  className={styles.countdownButton}>
                  Iniciar um ciclo
                </button>
              )}
          </>
        )}
    </div>
  );
}