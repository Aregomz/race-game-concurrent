onmessage = (event) => {
    const cars = event.data.cars;
    const scores = {};
  
    cars.forEach(car => {
      // Asigna un puntaje aleatorio (o puedes cambiarlo por una lógica más específica)
      scores[car.name] = Math.floor(Math.random() * 100); 
    });
  
    postMessage(scores);
  };
  