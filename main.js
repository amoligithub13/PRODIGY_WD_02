let startTime;
let interval;
let isRunning = false;

function startStop() {
  if (isRunning) {
    clearInterval(interval);
    document.getElementById("startStop").innerText = "Start";
  } else {
    startTime = startTime ? startTime : new Date().getTime();
    interval = setInterval(updateTime, 10);
    document.getElementById("startStop").innerText = "Pause";
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(interval);
  document.getElementById("display").innerText = "00:00:00";
  document.getElementById("startStop").innerText = "Start";
  document.getElementById("laps").innerHTML = "";
  isRunning = false;
  startTime = null;
}

function lap() {
  if (isRunning) {
    const lapTime = calculateElapsedTime();
    const lapList = document.getElementById("laps");
    const lapItem = document.createElement("li");
    lapItem.innerText = formatTime(lapTime);
    lapList.insertBefore(lapItem, lapList.firstChild);
  }
}

function updateTime() {
  const elapsedTime = calculateElapsedTime();
  document.getElementById("display").innerText = formatTime(elapsedTime);
}

function calculateElapsedTime() {
  return new Date().getTime() - startTime;
}

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  const minutes = Math.floor((milliseconds % 3600000) / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  const millisecondsDisplay = Math.floor((milliseconds % 1000) / 10);
  return (
    `${hours.toString().padStart(2, "0")}:` +
    `${minutes.toString().padStart(2, "0")}:` +
    `${seconds.toString().padStart(2, "0")}.${millisecondsDisplay.toString().padStart(2, "0")}`
  );
}
