let inputGroup = document.querySelector('.input-group');
let inputs = inputGroup.querySelectorAll('.code-number');
let form = document.querySelector('.code-form');

function focusFirstEmpty(event) {
  event.preventDefault();

  for (let input of inputs) {
    if (!input.value) {
      input.focus();
      break;
    }
  }

  let allFilled = [...inputs].every(input => input.value);

  if (allFilled) {
    inputs[inputs.length - 1].focus();
  }
}

function focusToNext(event) {
  let input = event.target;
  let next = input.nextElementSibling;

  if (next && next.tagName !== 'INPUT') {
    next = next.nextElementSibling;
  }

  if (next) {
    next.focus();
  }
}

function focusToPrevious(event) {
  let input = event.target;

  if (event.key === "Backspace" && !input.value) {
    let prev = input.previousElementSibling;
    
    if (prev && prev.tagName !== 'INPUT') {
      prev = prev.previousElementSibling;
    }

    if (prev) {
      prev.value = "";
      prev.focus();
    }
  }
}

function alertValue() {
  let code = [...inputs].map(input => input.value).join("");
  
  alert(`Value is ${code}`);
}

function sendSubmit() {
  let allFilled = [...inputs].every(input => input.value);

  if (allFilled) {
    alertValue();
    form.submit();
  }
}

inputGroup.addEventListener("mousedown", focusFirstEmpty);
inputGroup.addEventListener("input", focusToNext);
inputGroup.addEventListener("input", sendSubmit);
inputGroup.addEventListener("keydown", focusToPrevious);
form.addEventListener("submit", alertValue);