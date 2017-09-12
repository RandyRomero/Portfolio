'use strict';

/* to get my age on page updated */

var age = document.querySelector('#age');
var today = new Date();
var myAge = new Date(today - new Date(1990, 11, 29));
age.textContent = 'Age: ' + (myAge.getFullYear() - 1970);
//# sourceMappingURL=aboutme.js.map