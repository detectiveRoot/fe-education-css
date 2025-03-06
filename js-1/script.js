let buttonsContainer = document.querySelector('.buttons-container');
let buttons = document.querySelectorAll('.sort-button');
let select = document.querySelector('.sort-select');

function activateButton(button) {
  buttons.forEach(btn => btn.classList.remove('sort-button_active'));
  button.classList.add('sort-button_active');
}

function syncSelect(sortType) {
  select.value = sortType;
}

function syncButtons() {
  buttons.forEach(btn => {
    if (btn.dataset.sort === select.value) {
      activateButton(btn);
    }
  });
}

buttonsContainer.addEventListener('click', function(event) {
  let button = event.target;

  if (!button.classList.contains('sort-button') || 
    button.classList.contains('sort-button_active')) return;

  let sortType = button.dataset.sort;

  activateButton(button);
  syncSelect(sortType);
});

select.addEventListener('change', syncButtons);