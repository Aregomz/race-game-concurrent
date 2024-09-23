// workers/obstacleWorker.js
let obstacles = [];
const finishLine = window.innerWidth - 500;
const obstacleFrequency = 2000; // Frecuencia en milisegundos para generar obstáculos

const generateObstacle = () => {
  const position = Math.floor(Math.random() * (finishLine - 100)); // Posición aleatoria
  obstacles.push(position);
  postMessage(obstacles);
};

setInterval(generateObstacle, obstacleFrequency);
