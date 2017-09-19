let clock_on_page = document.querySelector('h1');
let start = document.querySelector('#start');
let pause = document.querySelector('#pause');
let reset = document.querySelector('#reset');
let zero = new Date().setHours(0, 0, 0, 0);
let time = zero;
let start_watch;
let actual_time = new Date();
let watch_on = false; /* to prevent stating another instance of setInterval */
let colors_button = document.querySelector('#colors');
let body = document.querySelector('body');
let buttons = document.querySelectorAll('button');
let one_color;
let opposite_color;

function time_formatter(number) {
    /* add leading zero if necessary */
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

function print_time() {
    /* update time on page */
    clock_on_page.textContent = (time_formatter(actual_time.getHours()) + ':'
        + time_formatter(actual_time.getMinutes()) + ':' + time_formatter(actual_time.getSeconds()));
}

function update_time() {
    /* counter of stopwatch */
    if (document.hidden) {
        time += 1000; /* if tab is inactive and minimum interval is 1000 */
    }
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
    return '#' + (Math.floor(Math.random() * 16777215 + 1)).toString(16);
}

function invert_colors(btn) {
    /* invert buttons in active state (only when mouse pointer is pressed down on specific button */
    /* it's like css rule for button:active */
    buttons[btn].style.borderColor = one_color;
    buttons[btn].style.color = one_color;
    buttons[btn].style.backgroundColor = opposite_color;
}

function get_colors_back(btn) {
    /* return colors back when button is not active anymore */
    buttons[btn].style.borderColor = opposite_color;
    buttons[btn].style.color = opposite_color;
    buttons[btn].style.backgroundColor = one_color;
}

function change_color() { /* change colors of whole page */
    /* get two random colors */
    one_color = random_hex_number();
    opposite_color = random_hex_number();
    /* apply them to background of body and to stopwatch numbers */
    body.style.backgroundColor = one_color;
    clock_on_page.style.color = opposite_color;
    /* apply color to buttons */
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.borderColor = opposite_color;
        buttons[i].style.color = opposite_color;
        buttons[i].style.backgroundColor = one_color;
    }

    for (let i = 0; i < buttons.length; i++) {
        /* invert colors of buttons when button is pressed */
        buttons[i].addEventListener('mousedown', invert_colors.bind(null, i));
        /* get colors back when button is not pressed anymore */
        buttons[i].addEventListener('mouseup', get_colors_back.bind(null, i));
        /* get colors back even if mouse leave the button otherwise it will stay with inversed colors */
        buttons[i].addEventListener('mouseleave', get_colors_back.bind(null, i));
    }
}

start.addEventListener('click', start_stopwatch);
pause.addEventListener('click', pause_stopwatch);
reset.addEventListener('click', reset_stopwatch);
colors_button.addEventListener('click', change_color);