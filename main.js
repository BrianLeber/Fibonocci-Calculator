// Fibonocci array builder and scrum estimator
// ###########################################

// Set Variables ____________________________________________

let fibonocci = [0, 1]; // Set the first two numbers in the fibonocci sequence (all others can be deduced from there)
let i = 2; // set i to the value of the next fibonocci number to index: position 2
// let x = 1; // Set a number to round to the fibonocci sequence

var fibResult = document.querySelector("#fibResult");
var fibCalc = document.querySelector("#fibCalculate");
var fibInput = document.querySelector("#fibInput");

// Set listeners
fibCalc.addEventListener("click", function() {
  x = fibInput.value;
  // Run function
  appendFib(i, x);
  calculateFibIndex();
  for (i = 1; i < fibonocci.length; i++) {
    console.log("index " + i + ": " + fibonocci[i] + " | " + fibonocci[i] / i);
  }
});

// declare functions _______________________________________

// Add numerical punctuation to numbers
function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

// declare function: add calculations to the fibonocci (the sum of the two previous results) array until it is larger than X, starting with position 2 (the first we can formulaically calculate)
function appendFib(i, x) {
  while (fibonocci[fibonocci.length - 1] < x) {
    fibonocci[i] = fibonocci[i - 2] + fibonocci[i - 1];
    i++;
  }
  console.log();
}

// declare function: round number to nearest fibonocci index
function calculateFibIndex() {
  console.log(x);
  i = 2;
  while (fibonocci[i - 1] < x) {
    fibonocci[i] = fibonocci[i - 2] + fibonocci[i - 1];
    i++;
  }

  let roundDown = fibonocci[i - 2];
  let roundUp = fibonocci[i - 1];

  if (x - roundDown < roundUp - x) {
    let y =
      thousands_separators(roundDown) +
      ", " +
      thousands_separators(x - roundDown) +
      " less than " +
      thousands_separators(x);
    fibResult.innerHTML = y;
  } else {
    let y =
      thousands_separators(roundUp) +
      ", " +
      thousands_separators(roundUp - x) +
      " more than " +
      thousands_separators(x);
    fibResult.innerHTML = y;
  }
}
