'use strict';

const list = document.querySelector('.shopping__list');
const form = document.querySelector('.shopping__form');
const formSelect = document.querySelector('.form__select');
const formInput = document.querySelector('.form__input');
const clear = document.querySelector('.shopping__clear');

form.addEventListener('submit', onAdd);

list.addEventListener('click', onCheckOrDelete);

clear.addEventListener('click', onClear);

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
  const id = Date.now();

  const listItem = document.createElement('li');
  listItem.classList.add('shopping__item');
  listItem.setAttribute('data-id', id);
  listItem.innerHTML = `
    <div class="item__category">${selectValue}</div>
    <div class="item__name" data-id="${id}">${inputValue}</div>
    <div class="item__btns">
      <button class="item__btn item__check" data-id="${id}">
        <i class="fa-regular fa-circle-check item__check" data-id="${id}"></i>
      </button>
      <button class="item__btn item__delete" data-id="${id}">
        <i class="fa-regular fa-trash-can item__delete" data-id="${id}"></i>
      </button>
    </div>
    `;

  return listItem;
}

function onCheckOrDelete(e) {
  const target = e.target;
  const classList = target.classList;

  if (classList.contains('item__check')) {
    onCheck(target);
  } else if (classList.contains('item__delete')) {
    onDelete(target);
  } else {
    return;
  }
}

function onCheck(target) {
  const id = target.dataset.id;
  const checked = document.querySelector(`.item__name[data-id="${id}"]`);
  checked.classList.add('item__name--checked');
}

function onDelete(target) {
  const id = target.dataset.id;
  const deleted = document.querySelector(`li[data-id="${id}"]`);
  deleted.remove();
}

function onClear() {
  list.innerHTML = '';
}
