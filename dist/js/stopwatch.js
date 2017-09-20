'use strict';

var clock_on_page = document.querySelector('h1');
var start = document.querySelector('#start');
var pause = document.querySelector('#pause');
var reset = document.querySelector('#reset');
var zero = new Date().setHours(0, 0, 0, 0);
var time_delta = 0;
var start_time = void 0; /* Time when stopwatch will be turned on */
var saved_time = new Date(zero); /* Buffer to save actual time when stopwatch is paused */
var start_watch = void 0; /* Function with seInterval inside to update stopwatch */
var actual_time = new Date();
var watch_on = false; /* to prevent stating another instance of setInterval */
var colors_button = document.querySelector('#colors'); /* button to change colors of page */
var body = document.querySelector('body');
var buttons = document.querySelectorAll('button'); /* All buttons on page */
var one_color = void 0; /* New color for page background and button background */
var opposite_color = void 0; /* Opposite color for everything else: text, borders of buttons */

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
    /* Counter of stopwatch */
    time_delta = new Date() - start_time + saved_time.getTime(); // How much time passed since stopwatch has started
    actual_time = new Date(time_delta); // Timestamp to Date object
    print_time();
}

function start_stopwatch() {
    start_time = new Date(); /* Start count from now */
    if (!watch_on) {
        /* Start stopwatch only if it was switched off */
        start_watch = setInterval(update_time, 100);
        watch_on = true;
    }
}

function pause_stopwatch() {
    clearInterval(start_watch);
    watch_on = false;
    /* Save actual time in order to when user resumes stopwatch, start it from zero and add last actual time
    before print*/
    saved_time = actual_time;
}

function reset_stopwatch() {
    clearInterval(start_watch);
    watch_on = false;
    actual_time = new Date(zero); /* Reset stopwatch time */
    saved_time = new Date(zero); /* Reset time buffer */
    print_time();
}

function random_hex_number() {
    /* Get random decimal number and covert it to hexadecimal */
    return '#' + Math.floor(Math.random() * 16777215 + 1).toString(16);
}

function invert_buttons_colors(btn) {
    /* Invert buttons in active state (only when mouse pointer is pressed down on specific button. */
    /* It's like css rule for button:active. */
    buttons[btn].style.borderColor = one_color;
    buttons[btn].style.color = one_color;
    buttons[btn].style.backgroundColor = opposite_color;
}

function get_colors_back(btn) {
    /* Return colors back when button is not active anymore. */
    buttons[btn].style.borderColor = opposite_color;
    buttons[btn].style.color = opposite_color;
    buttons[btn].style.backgroundColor = one_color;
}

function change_color() {
    /* Change colors of whole page */
    /* Get two random colors */
    one_color = random_hex_number();
    opposite_color = random_hex_number();
    /* Apply them to background of body and to stopwatch numbers */
    body.style.backgroundColor = one_color;
    clock_on_page.style.color = opposite_color;
    /* Apply color to buttons */
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.borderColor = opposite_color;
        buttons[i].style.color = opposite_color;
        buttons[i].style.backgroundColor = one_color;
    }

    for (var _i = 0; _i < buttons.length; _i++) {
        /* Invert colors of buttons when button is pressed */
        buttons[_i].addEventListener('mousedown', invert_buttons_colors.bind(null, _i));
        /* Get colors back when button is not pressed anymore */
        buttons[_i].addEventListener('mouseup', get_colors_back.bind(null, _i));
        /* Get colors back even if mouse leave the button otherwise it will stay with inversed colors */
        buttons[_i].addEventListener('mouseleave', get_colors_back.bind(null, _i));
    }
}

start.addEventListener('click', start_stopwatch);
pause.addEventListener('click', pause_stopwatch);
reset.addEventListener('click', reset_stopwatch);
colors_button.addEventListener('click', change_color);
//# sourceMappingURL=stopwatch.js.map