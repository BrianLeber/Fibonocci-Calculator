// Fibonocci array builder and scrum estimator
// ###########################################

// Add numerical punctuation to numbers
function thousands_separators(num) {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
}

// Set the first two numbers in the fibonocci sequence (all others can be deduced from there)
let fibonocci = [0, 1];

// set i to the value of the next fibonocci number to index: position 2
let i = 2;

// Set a number to round to the fibonocci sequence
let x = 100;

// declare function: add calculations to the fibonocci (the sum of the two previous results) array until it is larger than X, starting with position 2 (the first we can formulaically calculate)
function appendFib(i) {
  while (fibonocci[fibonocci.length - 1] < x) {
    fibonocci[i] = fibonocci[i - 2] + fibonocci[i - 1];
    i++;
  }
}

// declare function: round number to nearest fibonocci index
function calculateFibIndex(i) {
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
    document.querySelector("body").innerHTML = y;
  } else {
    let y =
      thousands_separators(roundUp) +
      ", " +
      thousands_separators(roundUp - x) +
      " more than " +
      thousands_separators(x);
    document.querySelector("body").innerHTML = y;
  }
}

// Run function
appendFib(i);

// for (i = 1; i < fibonocci.length; i++) {  console.log("index " + i + ": " + fibonocci[i] + " | " + fibonocci[i] / i);}
