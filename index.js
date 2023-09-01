const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const btnDescanso = document.getElementById('descanso');
const btnConcentrarse = document.getElementById('concentrarse');


let timeLeft = 1500;
let isRunning = false;
let timerInterval;
let pomodoroCount = 0;

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause';
        timerInterval = setInterval(() => { 
            if (timeLeft < 1){
                document.getElementById("notification").play();
            }
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startButton.textContent = 'Start';
                if (pomodoroCount % 2 === 0) {
                    timeLeft = 1500; 
                } else {
                    timeLeft = 1500; 
                }
                pomodoroCount++;
                updateTimer();
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'Resume';
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'Start';
    timeLeft = 1500;
    pomodoroCount = 0;
    updateTimer();
}

function descansoTime(){
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'Start';
    timeLeft = 600;
    pomodoroCount = 0;
    updateTimer();
}

function concentracionTime(){
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = 'Start';
    timeLeft = 1500;
    pomodoroCount = 0;
    updateTimer();
}

btnDescanso.addEventListener('click', descansoTime);
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
btnConcentrarse.addEventListener('click', concentracionTime);

updateTimer();

