/* to get my age on page updated */

let age = document.querySelector('#age');
let today = new Date();
let myAge = new Date(today - new Date(1990, 11, 29));
age.textContent = 'Age: ' + (myAge.getFullYear() - 1970);