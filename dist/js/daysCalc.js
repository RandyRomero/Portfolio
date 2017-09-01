'use strict';

var tellMe = document.querySelector('main button');
var heading = document.querySelector('main h1');
var submitButton = document.querySelector('#submit');
var selectDay = document.querySelector('#day');
var selectMonth = document.querySelector('#month');
var selectYear = document.querySelector('#year');
var form = document.querySelector('form');
// const output = document.querySelector('#output');
var userDate = [null, null, null]; // [date, month, year]

function evaluateDays() {
    var now = new Date();
    now.setFullYear(userDate[2], userDate[1], userDate[0]);
    now.setHours(0, 0, 0, 0);
    var birthday = new Date(now);
    var days = Math.floor((new Date() - birthday) / (24 * 60 * 60 * 1000));
    if (days < 0) {
        heading.textContent = 'You have not born yet.';
    } else {
        heading.textContent = 'You were born ' + days + ' days ago.';
    }
}

tellMe.addEventListener('click', function () {
    // make visible form to choose birthday
    tellMe.style.display = 'none';
    form.style.display = 'block';
    submitButton.style.display = 'block';
});

selectDay.addEventListener('change', function () {
    // store day that user chose in from as soon as he chose it
    userDate[0] = selectDay.value;
});

selectMonth.addEventListener('change', function () {
    // ditto for month
    userDate[1] = selectMonth.value - 1;
});

selectYear.addEventListener('change', function () {
    // ditto for years
    userDate[2] = selectYear.value;
});

submitButton.addEventListener('click', function () {
    // check if parts of birthday are defined and starts calculator
    var validDate = userDate.every(function (element) {
        return !isNaN(parseFloat(element)) && isFinite(element);
    });

    if (!validDate) {
        heading.textContent = 'Choose day, month and year of your birthday first.';
        return -1;
    }
    evaluateDays();
});
//# sourceMappingURL=daysCalc.js.map