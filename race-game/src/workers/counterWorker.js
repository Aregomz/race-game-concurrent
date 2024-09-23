let count = 0;
let intervalId;

onmessage = (event) => {
  if (event.data.start) {
    count = 0; // Reinicia el contador al iniciar
    intervalId = setInterval(() => {
      count++;
      postMessage(count);
    }, 1000);
  } else {
    clearInterval(intervalId);
  }
};
