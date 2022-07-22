'use strict';

const list = document.querySelector('.shopping__list');
const form = document.querySelector('.shopping__form');
const formSelect = document.querySelector('.form__select');
const formInput = document.querySelector('.form__input');

form.addEventListener('submit', onAdd);

function onAdd(e) {
  e.preventDefault();

  const selectValue = formSelect.value;
  if (!selectValue) {
    alert('Please select a category.');
    return;
  }

  const inputValue = formInput.value;
  if (!/\S/.test(inputValue)) {
    return;
  }

  const listItem = createListItem(selectValue, inputValue);
  list.append(listItem);

  formInput.value = '';
  formInput.focus();
}

function createListItem(selectValue, inputValue) {
  const listItem = document.createElement('li');
  listItem.classList.add('shopping__item');
  listItem.innerHTML = `
    <div class="item__category">${selectValue}</div>
    <div class="item__name">${inputValue}</div>
    <div class="item__btns">
      <button class="item__btn item__check">
        <i class="fa-regular fa-circle-check"></i>
      </button>
      <button class="item__btn item__delete">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </div>
    `;

  return listItem;
}
