
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

let timerId = null;

function changeColor () {
    document.body.style.backgroundColor = getRandomHexColor();
};

btnStart.addEventListener('click', () => {
    if (btnStart.disabled = true) {
        btnStop.disabled = false; 
        timerId = setInterval(() => {
            changeColor()
        }, 1000);
    };
});

btnStop.addEventListener("click", () => {
    if (btnStop.disabled = true) {
        btnStart.disabled = false;
        clearInterval(timerId);
    }
});

