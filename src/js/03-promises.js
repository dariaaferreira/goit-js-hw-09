import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay) 
  });  
}

function formSubmit(e) {
  e.preventDefault();

  const formEl = e.currentTarget.elements;
  const time = Number(formEl.delay.value);
  const step = Number(formEl.step.value);
  const amount = Number(formEl.amount.value);

  let position = 1;
  let delay = time;

  for (let i = 0; i < amount; i+=1) {
    createPromise(2, 1500)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

      position += 1;
      delay += step;
  }
}