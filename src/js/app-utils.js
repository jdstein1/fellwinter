/* UTILITY FUNCTIONS */

/* @license */

    function intToFloat(num, decPlaces) { return num.toFixed(decPlaces); }

// querySelector, jQuery style
// var $ = function (selector) {
//   return document.querySelector(selector);
// };

/* timer */

    var timerBox = document.getElementById('timer'), 
      timerBtnReset = document.getElementById('timerReset'),
      timerBtnControl = document.getElementById('timerControl'), 
      timerElapsed = 0,
      timerRunFlag = false, 
      timerInterval;

    /* AUTOMATICALLY SCROLL CAROUSEL */
    function timerStart () {
      // console.log('START autoScroll');
      // set up an interval
      // intervalID = window.setInterval(doScroll, 2000);
      timerInterval = setInterval(timerRun, 10);
    }

    function timerRun () {
      // console.log('START timerRun');
      timerBox.innerHTML = intToFloat(++timerElapsed/100,2);
      timerRunFlag = true;
    }

    function timerReset() {
      // console.log('START timerReset');
      clearInterval(timerInterval);
      timerElapsed = 0;
      timerBox.innerHTML = '0.00';
      timerRunFlag = false;
      timerStart();
    }

    function timerControl() {
      // console.log('START timerControl');
      if (timerRunFlag === true) {
        // console.log('timerRunFlag true: ', timerRunFlag);
        clearInterval(timerInterval);
        timerRunFlag = false;
      } else {
        // console.log('timerRunFlag false: ', timerRunFlag);
        timerStart();
      }
    }

    timerStart();

    timerBtnReset.onclick = timerReset;
    timerBtnReset.style.display = 'none';
    timerBtnControl.onclick = timerControl;
    timerBtnControl.style.display = 'none';
