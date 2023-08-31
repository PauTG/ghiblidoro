const timerDisplay1 = document.getElementById('timer1');
const startButton1 = document.getElementById('start1');
const resetButton1 = document.getElementById('reset1');

let timeLeft1 = 600; // 10 minutes in seconds
let isRunning1 = false;
let timerInterval1;

function updateTimer1() {
    const minutes = Math.floor(timeLeft1 / 60);
    const seconds = timeLeft1 % 60;
    timerDisplay1.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer1() {
    if (!isRunning1) {
        isRunning1 = true;
        startButton1.textContent = 'Pause';
        timerInterval1 = setInterval(() => {
            if (timeLeft1 < 1){
                document.getElementById("notification").play();
            }
            if (timeLeft1 > 0) {
                timeLeft1--;
                updateTimer1();
            } else {
                clearInterval(timerInterval1);
                isRunning1 = false;
                startButton1.textContent = 'Start1';
            }
        }, 1000);
    } else {
        clearInterval(timerInterval1);
        isRunning1 = false;
        startButton1.textContent = 'Resume';
    }
}

function resetTimer1() {
    clearInterval(timerInterval1);
    isRunning1 = false;
    startButton1.textContent = 'Start1';
    timeLeft1 = 600; // 10 minutes in seconds
    pomodoroCount = 0;
    updateTimer1();
}

startButton1.addEventListener('click', startTimer1);
resetButton1.addEventListener('click', resetTimer1);

updateTimer1();
