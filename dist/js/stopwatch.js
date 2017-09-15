'use strict';

var clock_on_page = document.querySelector('h1');
var start = document.querySelector('#start');
var pause = document.querySelector('#pause');
var reset = document.querySelector('#reset');
var zero = new Date().setHours(0, 0, 0, 0);
var time = zero;
var start_watch = void 0;
var actual_time = new Date();
var watch_on = false; /* to prevent stating another instance of setInterval */
var colors_button = document.querySelector('#colors');
var body = document.querySelector('body');
var buttons = document.querySelectorAll('button');

function time_formatter(number) {
    /* add leading zero if necessary */
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function print_time() {
    /* update time on page */
    clock_on_page.textContent = time_formatter(actual_time.getHours()) + ':' + time_formatter(actual_time.getMinutes()) + ':' + time_formatter(actual_time.getSeconds());
}

function update_time() {
    /* counter of stopwatch */
    time += 10;
    actual_time = new Date(time);
    print_time();
}

function start_stopwatch() {
    /* start stopwatch only if it is switched off */
    if (!watch_on) {
        start_watch = setInterval(update_time, 10);
        watch_on = true;
    }
}

function pause_stopwatch() {
    clearInterval(start_watch);
    watch_on = false;
}

function reset_stopwatch() {
    clearInterval(start_watch);
    watch_on = false;
    time = zero;
    actual_time = new Date(time);
    print_time();
}

function random_hex_number() {
    /* get random decimal number and covert it to hexadecimal */
    return '#' + Math.floor(Math.random() * 16777215 + 1).toString(16);
}

function change_color() {
    var one_color = random_hex_number();
    var opposite_color = random_hex_number();
    body.style.backgroundColor = one_color;
    clock_on_page.style.color = opposite_color;
    document.styleSheets[1].insertRule('button:active { background-color: ' + opposite_color + '}');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.borderColor = opposite_color;
        buttons[i].style.color = opposite_color;
    }
}

start.addEventListener('click', start_stopwatch);
pause.addEventListener('click', pause_stopwatch);
reset.addEventListener('click', reset_stopwatch);
colors_button.addEventListener('click', change_color);
//# sourceMappingURL=stopwatch.js.map