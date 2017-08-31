const tellMe = document.querySelector('main button');
const submitButton = document.querySelector('#submit');
const selectDay = document.querySelector('#day');
const selectMonth = document.querySelector('#month');
const selectYear = document.querySelector('#year');
const form = document.querySelector('form');
const output = document.querySelector('#output');
let userDate = [null, null, null]; // [date, month, year]

function evaluateDays() {
    let now = new Date();
    now.setFullYear(userDate[2], userDate[1], userDate[0]);
    now.setHours(0,0,0,0);
    let birthday = new Date(now);
    let days = Math.floor((new Date() - birthday) / (24 * 60 * 60 * 1000));
    if (days < 0) {
        output.textContent = 'You have not born yet.';
    } else {
        output.textContent = 'You were born ' + days + ' days ago.';
    }
}

tellMe.addEventListener('click', () => {
   // make visible form to choose birthday
    tellMe.style.display = 'none';
    form.style.display = 'block';
    submitButton.style.display = 'block';
});

selectDay.addEventListener('change', () => {
    // store day that user chose in from as soon as he chose it
    userDate[0] = selectDay.value;
});

selectMonth.addEventListener('change', () => {
   // ditto for month
    userDate[1] = selectMonth.value - 1;
});

selectYear.addEventListener('change', () => {
    // ditto for years
    userDate[2] = selectYear.value;
});

submitButton.addEventListener('click', () => {
    // check if parts of birthday are defined and starts calculator
    let validDate = userDate.every(element => {
        return !isNaN(parseFloat(element)) && isFinite(element);
    });

    if (!validDate) {
        output.textContent = 'Choose day, month and year of your birthday first.';
        return -1
    }
    evaluateDays();
});
