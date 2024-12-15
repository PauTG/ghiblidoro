const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");
const btnDescanso = document.getElementById("descanso");
const btnConcentrarse = document.getElementById("concentrarse");
const totoro1 = document.getElementById("totoro");
const musica = document.getElementById("ghibliSong");

let isRunning = false;
let timerInterval;
let pomodoroCount = 0;
let startTime;
let endTime;

// Lista de GIFs de Totoro
const popurriImagen = [
  "https://media4.giphy.com/media/mEhI4VFNXGk39Npvtx/giphy.gif?cid=ecf05e47mos29e9qyres9u4qb64lamrc4wyp3605xu97tj5k&ep=v1_gifs_related&rid=giphy.gif&ct=s",
  "https://media2.giphy.com/media/VD43RdK9ozWJ6cllgy/giphy.gif?cid=ecf05e47j8td01xnao1zu18sg86wd4dq8yhnpvpqrmnu30bz&ep=v1_stickers_search&rid=giphy.gif&ct=s",
  "https://media2.giphy.com/media/JNslp4tW7mNMg8xLbS/giphy.gif?cid=ecf05e47y0gaktipjldbw1nrn4a75ug72xx08qz7zwcpwlsy&ep=v1_stickers_search&rid=giphy.gif&ct=s",
  "https://media0.giphy.com/media/Xbz1R7CbssOevGuRs8/giphy.gif?cid=ecf05e478xvr3tmntat5f104ydtv13e2tbqm4zj8t3t9o005&ep=v1_gifs_related&rid=giphy.gif&ct=s",
  "https://media4.giphy.com/media/fVPjWS7EOrQ9C36Rkw/giphy.gif?cid=ecf05e47fhxm7r23y3byeu5363jhsjkqmoc3bcixda2k8gjq&ep=v1_stickers_search&rid=giphy.gif&ct=s",
  "https://media4.giphy.com/media/ibkLGxQGlL5S0Hdb4v/200w.webp?cid=ecf05e47jjgpht3pap8sz3qrv9kc9u3ldkcst05m46r8tof7&ep=v1_gifs_related&rid=200w.webp&ct=s",
  "https://media3.giphy.com/media/cPYtfCuDhz3zEOqAMG/giphy.gif?cid=ecf05e47jjgpht3pap8sz3qrv9kc9u3ldkcst05m46r8tof7&ep=v1_gifs_related&rid=giphy.gif&ct=s",
  "https://media4.giphy.com/media/Te1GaLFhcvewcip6Hg/giphy.gif?cid=ecf05e47glyzfytp22v02afu9x3you1w6y7ocykbr4v15fy4&ep=v1_gifs_related&rid=giphy.gif&ct=s",
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjA4emF6b3BxY2x4cWZpa2h4cm44cG1uMnJyOGxvNTZ5NzY3cXlpayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/f94Vnfx1ppH2i8hdF7/giphy.gif",
  "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmFjZjZ2cmdnNjAycHRvbmUyazNwMmNsb3NoZGRtd2JxeWZ5dDNwcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/j243B5nTj6aP4tE9fJ/giphy.gif",
  "https://media1.giphy.com/media/VDBdZayMvziZkpGVzZ/giphy.gif?cid=ecf05e475moyc3nk7qpwr0n2mc5ch9zed72zk4uep4ikgmxk&ep=v1_gifs_related&rid=giphy.gif&ct=s"
];


window.addEventListener("load", function () {
  document.getElementById("spinner").style.display = "none";
  document.getElementById("contenido").style.display = "block";
  updateTimer(1500);
});


function updateTimer(timeLeft) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}


function calculateTimeLeft() {
  const now = new Date();
  return Math.max(0, Math.round((endTime - now) / 1000)); 
}


function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.textContent = "Pause";


    const duration = pomodoroCount % 2 === 0 ? 1500 : 300; 
    startTime = new Date();
    endTime = new Date(startTime.getTime() + duration * 1000);

    timerInterval = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      if (timeLeft > 0) {
        updateTimer(timeLeft);
      } else {
        clearInterval(timerInterval);
        document.getElementById("notification").play();
        isRunning = false;
        startButton.textContent = "Start";
        pomodoroCount++;
        startTimer();
      }
    }, 1000);
  } else {
    clearInterval(timerInterval);
    isRunning = false;
    startButton.textContent = "Resume";
  }
}


function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  startButton.textContent = "Start";
  pomodoroCount = 0;
  updateTimer(1500); 
}


function descansoTime() {
  clearInterval(timerInterval);
  isRunning = false;
  startButton.textContent = "Start";
  pomodoroCount = 1; 
  updateTimer(300); 
  totoro1.src = getRandom();
}


function concentracionTime() {
  clearInterval(timerInterval);
  isRunning = false;
  startButton.textContent = "Start";
  pomodoroCount = 0; 
  updateTimer(1500); 
  totoro1.src = getRandom();
}

function getRandom() {
  const randomIndice = Math.floor(Math.random() * popurriImagen.length);
  return popurriImagen[randomIndice];
}

// Eventos
btnDescanso.addEventListener("click", descansoTime);
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
btnConcentrarse.addEventListener("click", concentracionTime);
musica.addEventListener("ended", function () {
  musica.currentTime = 0; 
  musica.play(); 
});
