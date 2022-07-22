'use strict';

const list = document.querySelector('.shopping__list');
const form = document.querySelector('.shopping__form');
const formSelect = document.querySelector('.form__select');
const formInput = document.querySelector('.form__input');
const clear = document.querySelector('.shopping__clear');
const categories = document.querySelector('.categories__list');

formSelect.addEventListener('change', () => focusOnInput());
form.addEventListener('submit', onAdd);
list.addEventListener('click', onCheckOrDelete);
clear.addEventListener('click', onClear);
categories.addEventListener('change', onFilter);

function onAdd(e) {
  e.preventDefault();

  const selectValue = formSelect.value;
  if (!selectValue) {
    alert('Please select a category.');
    return;
  }

  const inputValue = formInput.value;
  if (!/\S/.test(inputValue)) {
    focusOnInput();
    return;
  }

  const listItem = createListItem(selectValue, inputValue);
  list.append(listItem);
  listItem.scrollIntoView({ behavior: 'smooth' });

  formInput.value = '';
  focusOnInput();
}

function focusOnInput() {
  formInput.focus();
}

function createListItem(selectValue, inputValue) {
  const id = Date.now();

  const listItem = document.createElement('li');
  listItem.classList.add('shopping__item');
  listItem.setAttribute('data-id', id);
  listItem.setAttribute('data-category', selectValue);
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

function onFilter(e) {
  const listItems = document.querySelectorAll('.shopping__item');
  const target = e.target;
  const category = target.dataset.value;

  if (target.checked) {
    show(listItems, category);
  } else {
    hide(listItems, category);
  }
}

function show(listItems, category) {
  listItems.forEach(item => {
    if (item.dataset.category === category) {
      item.classList.remove('shopping__item--hidden');
    }
  });
}

function hide(listItems, category) {
  listItems.forEach(item => {
    if (item.dataset.category === category) {
      item.classList.add('shopping__item--hidden');
    }
  });
}
