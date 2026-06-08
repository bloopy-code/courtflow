const courtTimers = new Map();

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startTimer(courtCard) {
    const timerDisplay = courtCard.querySelector(".timer-display");

    courtCard.dataset.startTime = Date.now();

    const timerId = setInterval(function () {
        const elapsedSeconds = Math.floor(
            (Date.now() - Number(courtCard.dataset.startTime)) / 1000
        );

        timerDisplay.textContent = formatTime(elapsedSeconds);
    }, 1000);

    courtTimers.set(courtCard, timerId);
}

function stopTimer(courtCard) {
    const timerId = courtTimers.get(courtCard);

    if (timerId) {
        clearInterval(timerId);
        courtTimers.delete(courtCard);
    }

    const startTime = Number(courtCard.dataset.startTime);

    if (!startTime) {
        return null;
    }

    const durationSeconds = Math.floor((Date.now() - startTime) / 1000);

    courtCard.dataset.startTime = "";

    return durationSeconds;
}