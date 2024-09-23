// raceWorker.js
onmessage = (event) => {
  const { cars, finishLine } = event.data;

  if (!cars || !Array.isArray(cars)) {
    throw new Error("Invalid data: cars must be an array");
  }

  const positions = cars.map(car => car.position);

  const interval = setInterval(() => {
    positions.forEach((position, index) => {
      positions[index] = Math.min(position + Math.random() * 5, finishLine);
    });

    postMessage(positions);

    if (positions.some(pos => pos >= finishLine)) {
      clearInterval(interval);
      const winnerIndex = positions.findIndex(pos => pos >= finishLine);
      postMessage({ winner: cars[winnerIndex].name });
    }
  }, 100);
};
