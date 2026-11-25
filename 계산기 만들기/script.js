const display = document.getElementById("display");

let first = null;        
let operator = null;     
let current = "0";       
let waitingNext = false; 


function updateDisplay() {
  display.textContent = current;
}


function inputNumber(num) {
  if (waitingNext) {
    current = num;          
    waitingNext = false;
  } else {
    current = current === "0" ? num : current + num;   
  }
}


function inputDot() {
  if (waitingNext) {
    current = "0.";
    waitingNext = false;
    return;
  }
  if (!current.includes(".")) current += ".";   
}

function calculate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "−") return a - b;
  if (op === "×") return a * b;
  if (op === "÷") return b === 0 ? "오류" : a / b;
}

function tidy(n) {
  return typeof n === "string" ? n : String(parseFloat(n.toPrecision(12)));
}

function inputOperator(op) {
  const value = parseFloat(current);

  if (operator && !waitingNext) {
    current = tidy(calculate(first, value, operator));
    first = parseFloat(current);
  } else {
    first = value;
  }

  operator = op;
  waitingNext = true;
}

function equals() {
  if (operator === null) return;
  current = tidy(calculate(first, parseFloat(current), operator));
  first = null;
  operator = null;
  waitingNext = true;
}

function clearAll() {
  first = null;
  operator = null;
  current = "0";
  waitingNext = false;
}

function toggleSign() {
  if (current === "0" || current === "오류") return;
  current = current.startsWith("-") ? current.slice(1) : "-" + current;
}

function percent() {
  current = tidy(parseFloat(current) / 100);
}

document.querySelector(".keys").addEventListener("click", e => {
  const btn = e.target.closest("button");
  if (!btn) return;


  if (current === "오류") clearAll();

  const { num, op, action } = btn.dataset;
  if (num) inputNumber(num);
  else if (op) inputOperator(op);
  else if (action === "dot") inputDot();
  else if (action === "equals") equals();
  else if (action === "clear") clearAll();
  else if (action === "sign") toggleSign();
  else if (action === "percent") percent();

  document.querySelectorAll(".op").forEach(b =>
    b.classList.toggle("selected", waitingNext && b.dataset.op === operator)
  );

  updateDisplay();
});
