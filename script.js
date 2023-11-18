const timerContainer = document.querySelector(".bottom-div");
const startTimerBtn = document.querySelector(".setButton");
const statusMsg = document.querySelector(".bottom-div>span");

startTimerBtn.addEventListener('click', () => {
    const hours = parseInt(document.getElementById('hrInput').value) || 0;
    const minutes = parseInt(document.getElementById('minInput').value) || 0;
    const seconds = parseInt(document.getElementById('secInput').value) || 0;

    const totalMilliseconds = (hours * 3600 + minutes * 60 + seconds)*1000;
    if (totalMilliseconds > 0) {
        createTimer(totalMilliseconds);
    }
});

let count = 0;   // tracking active timers

function createTimer(duration) {
    const timerElement = document.createElement('div');
    timerElement.classList.add('active-timer');

    const spanText = document.createElement('span');
    spanText.innerText = 'Time Left :';
    timerElement.appendChild(spanText);

    const timerDisplay = document.createElement('div');
    timerDisplay.classList.add('time');
    timerElement.appendChild(timerDisplay);

    const stopBtn = document.createElement('button');
    stopBtn.classList.add('delete-button');
    stopBtn.innerText = 'Delete';
    stopBtn.addEventListener('click', () => {
        clearInterval(interval);
        timerElement.remove();
        count--;
        if (count == 0) {
            statusMsg.style.display = 'block';
        }
    });
    timerElement.appendChild(stopBtn);

    timerContainer.appendChild(timerElement);
    count++;
    if (count > 0) {
        statusMsg.style.display = 'none';
    }

    let remainingTime = duration;
    updateTimerDisplay();

    const interval = setInterval(() => {
        remainingTime -= 1000;
        if (remainingTime <= 0) {
            clearInterval(interval);
            // css
            spanText.style.visibility = "hidden";
            timerDisplay.textContent = 'Timer is UP !'; // Display "Time Ended" when the timer expires
            stopBtn.innerText = 'Stop';
            stopBtn.style.backgroundColor = "#34344A";
            stopBtn.style.color = "white";
            timerElement.style.backgroundColor = "#F0F757"; // Change background color for completed timer
            timerElement.style.color = "#34344A"; // Change background color for completed timer

            playAudioAlert(); // Play the audio alert when the timer expires
        } else {
            updateTimerDisplay();
        }
    }, 1000);

    function updateTimerDisplay() {
        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        timerDisplay.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
}

// audio part
function playAudioAlert() {
    const audioAlert = document.getElementById('audio-alert');
   
    if (audioAlert && typeof audioAlert.play === 'function') {
    
        audioAlert.pause();
        audioAlert.currentTime = 0;
      
        audioAlert.play();
    }
}