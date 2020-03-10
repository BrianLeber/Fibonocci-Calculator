// Fibonocci array builder and scrum estimator
// ###########################################

// Set Variables ____________________________________________

var fibonocci = [0, 1]; // Set the first two numbers in the fibonocci sequence (all others can be deduced from there)
var i = fibonocci.length; // set i to the value of the next fibonocci number to index: position 2

var fibResult = document.querySelector("#fibResult");
var fibCalc = document.querySelector("#fibCalculate");
var fibInput = document.querySelector("#fibInput");
var cookie = document.cookie;
var cookieButton = document.querySelector("#cookieButton");

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

function clearCookies(names) {
  var i = 0,
    namesLength = names.length;
  for (i; i < namesLength; i += 1) {
    document.cookie =
      names[i] + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
  }
}
// clearCookies(["cookieName1", "cookieName2"]);

// Cookie Compliancy BEGIN
function GetCookie(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) return "here";
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break;
  }
  return null;
}
function testFirstCookie() {
  var visit = GetCookie("cookieCompliancyAccepted");
  if (visit == null) {
    document.querySelector("#myCookieConsent").classList.add("show"); // Show warning
  } else {
    // Already accepted
  }
}

document.addEventListener("DOMContentLoaded", function() {
  testFirstCookie();
  cookieButton.addEventListener("click", function() {
    console.log("Understood");
    var expire = new Date();
    expire = new Date(expire.getTime() + 7776000000);
    document.cookie =
      "cookieCompliancyAccepted=here; expires=" + expire + ";path=/";
    document.querySelector("#myCookieConsent").classList.remove("show");
  });
});
// Cookie Compliancy END

// Include external HTML
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}
includeHTML();
// END

// Add thousands separaters to numbers
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
      " | " +
      thousands_separators(x - roundDown) +
      " less than " +
      thousands_separators(x);
    fibResult.innerHTML = y;
  } else {
    let y =
      thousands_separators(roundUp) +
      " | " +
      thousands_separators(roundUp - x) +
      " more than " +
      thousands_separators(x);
    fibResult.innerHTML = y;
  }
}

// Exponent Calc
var exponentCalcButton = document.querySelector("#exponentCalculate");
var exponentBase = document.querySelector("#exponentCalc__toSquare");
var exponentExponent = document.querySelector("#exponent__factorBy");
var exponentResult = document.querySelector("#exponentResult");

exponentCalcButton.addEventListener("click", exponentCalcResult);

function exponentCalcResult() {
  let number = exponentBase.value;
  let factor = exponentExponent.value;
  let result = toTheNth(number, factor);
  exponentResult.innerHTML = result;
  // alert(result);
}

function toTheNth(number, factor) {
  let increase;
  if (factor == 0) {
    increase = 1;
  } else {
    increase = number;
    let n = 1;
    while (n < factor) {
      increase = increase * number;
      n++;
    }
  }
  return increase;
}

// Downtime Calculation
// fuction 1: multiply number of employees by average wage times by number of incidents, then divide by 12 (for 5 minute calculations)
// e.g. incidentCost = (emp * hourlyWage * incidentCount) / 12
//
// function 2: multiply number of employees by average wage times percentage of work still able to complete. Subtract the total number of outages times the number of employees times wecentage of work unable to do.
// e.g. ongoingCost = (emp * hourlyWage) * (hoursDown - (incidentCount * productivityPercentage / 12))
// Return sum of the results of both functions

function getDowntimeCookie() {
  var cookies = document.cookie.split("; ");
  if (GetCookie("downtimeCalcValues") != null) {
    var loop = true;
    var x;
    var i = 0;
    while (loop == true) {
      var crumb = cookies[i].split("=");
      console.log(crumb);
      if (crumb[0] == "downtimeCalcValues") {
        let x = crumb[1].split(",");
        emp.value = x[0];
        hourlyWage.value = x[1];
        productivityPercentage.value = x[2];
        hoursDown.value = x[3];
        incidentCount.value = x[4];
        loop = false;
      }
      i++;
      console.log(x);
    }
  }
}

var emp = document.querySelector("#emp");
var hourlyWage = document.querySelector("#hourlyWage");
var productivityPercentage = document.querySelector("#productivityPercentage");
var hoursDown = document.querySelector("#hoursDown");
var incidentCount = document.querySelector("#incidentCount");
var dtResult = document.getElementById("downtime__dtResult");

function calculateDowntimeCost(e, w, p, h, c) {
  e = emp.value;
  w = hourlyWage.value;
  p = 1 - productivityPercentage.value / 100;
  h = hoursDown.value;
  c = incidentCount.value;

  let hourlyCost = e * w * p;
  let incidentCost = (hourlyCost * c) / 12;
  let totalHourCost = (hourlyCost * h * c * p) / 12;
  let result = incidentCost + totalHourCost;

  // Save Values in Cookies
  var expire = new Date();
  expire = new Date(expire.getTime() + 7776000000);
  document.cookie =
    "downtimeCalcValues=" +
    e +
    "," +
    w +
    "," +
    productivityPercentage.value +
    "," +
    h +
    "," +
    c +
    "; expires=" +
    expire +
    ";path=/";

  return result;
}
function updateDowntimeCost() {
  dtResult.innerHTML = calculateDowntimeCost(
    emp,
    hourlyWage,
    productivityPercentage,
    hoursDown,
    incidentCount
  ).toFixed(2);
}
getDowntimeCookie();
updateDowntimeCost();

function fibMemo(num, memo) {
  memo = memo || {};
  console.log(num, memo);
  if (memo[num]) return memo[num];
  if (num <= 1) return 1;

  return (memo[num] = fibMemo(num - 1, memo) + fibMemo(num - 2, memo));
}
