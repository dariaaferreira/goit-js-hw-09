// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_red.css");

import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

let timerId = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    //   console.log(selectedDates[0]);
        if(selectedDates[0].getTime() < Date.now()) {
            Notiflix.Notify.warning('Please choose a date in the future');
        } else {
            startBtn.disabled = false;
            startBtn.addEventListener('click', () => {
                timerId = setInterval(() => {
                // console.log(convertMs(selectedDates[0].getTime() - Date.now()));
                const { days, hours, minutes, seconds } = convertMs(selectedDates[0].getTime() - Date.now());
                refs.days.textContent = days;
                refs.hours.textContent = hours;
                refs.minutes.textContent = minutes;
                refs.seconds.textContent = seconds;

                startBtn.disabled = true;
    
                if(days == 0 && hours == 0 && minutes == 0 && seconds == 0) {
                  clearInterval(timerId);
                }
                }, 1000);
            })
        }
    }
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
};