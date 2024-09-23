import React, { useState, useEffect, useRef } from 'react';
import RaceTrack from './components/RaceTrack';
import CountdownModal from './components/CountdownModal';
import WinnerModal from './components/WinnerModal';
import vini from './images/vini.png';
import mbappe from './images/mbappe.png';
import rodrygo from './images/rodrygo.png';
import './App.css';

const App = () => {
  const [cars, setCars] = useState([
    { position: 0, name: 'Mbappé', image: mbappe },
    { position: 0, name: 'Vinícius', image: vini },
    { position: 0, name: 'Rodrygo', image: rodrygo },
  ]);
  const [winner, setWinner] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [timer, setTimer] = useState(0);
  const [scores, setScores] = useState({ Mbappé: 0, Vinícius: 0, Rodrygo: 0 });
  const finishLine = window.innerWidth - 500;
  const raceWorker = useRef(null);
  const counterWorker = useRef(null);
  const isKeyPressed = useRef(false); // Mantener un flag para verificar si una tecla fue presionada

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsModalOpen(false);
      startRace();
    }
  }, [countdown]);

  const startRace = () => {
    raceWorker.current = new Worker(new URL('./workers/raceWorker.js', import.meta.url));
    counterWorker.current = new Worker(new URL('./workers/counterWorker.js', import.meta.url));

    counterWorker.current.postMessage({ start: true });

    raceWorker.current.onmessage = (event) => {
      if (isKeyPressed.current) return; // Pausar el worker si una tecla fue presionada

      const updatedCars = cars.map((car, index) => ({
        ...car,
        position: event.data[index],
      }));
      setCars(updatedCars);

      if (updatedCars.some((car) => car.position >= finishLine)) {
        const winnerCar = updatedCars.find((car) => car.position >= finishLine);
        setWinner(winnerCar.name);
        setIsWinnerModalOpen(true);
        counterWorker.current.postMessage({ start: false });
        updateScores(winnerCar.name);
        raceWorker.current.terminate();
        isKeyPressed.current = false; // Resetear el flag de tecla presionada
      }
    };

    raceWorker.current.postMessage({ cars, finishLine });

    counterWorker.current.onmessage = (event) => {
      setTimer(event.data);
    };
  };

  const updateScores = (winnerName) => {
    setScores((prevScores) => {
      const newScores = { ...prevScores };
      newScores[winnerName] += 10; // Sumar 10 puntos al ganador
      return newScores;
    });
  };

  const moveCar = (carIndex) => {
    setCars((prevCars) => {
      const updatedCars = [...prevCars];
      updatedCars[carIndex].position = Math.min(updatedCars[carIndex].position + 20, finishLine);
      return updatedCars;
    });
    isKeyPressed.current = true; // Indicar que una tecla fue presionada
  };

  const resetRace = () => {
    setCars([
      { position: 0, name: 'Mbappé', image: mbappe },
      { position: 0, name: 'Vinícius', image: vini },
      { position: 0, name: 'Rodrygo', image: rodrygo },
    ]);
    setWinner(null);
    setCountdown(3);
    setIsModalOpen(true);
    setTimer(0);
    isKeyPressed.current = false; // Resetear el flag cuando se reinicia la carrera
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;

      if (key === 'q') {
        moveCar(0);
      } else if (key === ' ') {
        moveCar(1);
      } else if (key === 'ñ') {
        moveCar(2);
      }

      // Reactivar el raceWorker después de un corto retraso para simular el tiempo de reanudación
      setTimeout(() => {
        isKeyPressed.current = false;
      }, 500); // Se reanuda después de 500 ms
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="app-container">
      <h1 className="title">Ancelottis' race</h1>
      <RaceTrack cars={cars} finishLine={finishLine} />
      <div className="timer">Tiempo: {timer} segundos</div>
      <div className="scores">
        <h2>Puntajes:</h2>
        <ul>
          {Object.entries(scores).map(([name, score]) => (
            <li key={name}>
              {name}: {score}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={resetRace} style={{ marginTop: '20px' }}>
        Reiniciar Carrera
      </button>
      <CountdownModal countdown={countdown} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <WinnerModal winner={winner} isOpen={isWinnerModalOpen} onClose={() => setIsWinnerModalOpen(false)} />
    </div>
  );
};

export default App;
