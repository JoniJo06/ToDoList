/**@format */

// const btn = document.getElementById('click');
// const redirect = (e) => {
// 	document.location = 'https://www.google.com';
// };
// btn.addEventListener('click', redirect);
const toDoInput = document.querySelector('#todo-list-text-input-form');
const toDoInputText = document.querySelector('#todo-list-text-input');
const addToDoBtn = document.querySelector('#add-todo-btn');
const addToDoBtnSubmit = document.querySelector('#add-todo-btn-submit');
const itemsList = document.querySelector('#todo-list');

const items = JSON.parse(localStorage.getItem('items')) || [];

window.onload = () => {
	populateList(items, itemsList);
	addItem();
};

document.querySelector('#add-todo-btn-submit').onclick = addItem;
function addItem() {
	if (document.querySelector('#todo-list-text-input').value.length === 0) {
	} else {
		// document.getElementById('todo-list').innerHTML += `
		// <div class="mdl-list__item todo-list-item">
		// <span class="mdl-list__item-primary-content">
		// <i class="far fa-square todo-checkbox"></i>
		// <label class="task-name">${toDoInputText.value}</label>
		// <input type="text" class="edit-field"></input>
		// </span>
		// <div class="mdl-list__item-secondary-action edit"><i class="far fa-edit"></i></div>
		// <div class="mdl-list__item-secondary-action color-red delete"><i class="fas fa-trash-alt"></i></div>
		// </div>
		// `;
		const text = toDoInputText.value;
		const item = {
			text,
			done: false,
		};

		items.push(item);
		populateList(items, itemsList);
		localStorage.setItem('items', JSON.stringify(items));

		toDoInputText.value = '';
		toDoInput.style.display = 'none';
		showToDoInput = false;
	}

	const current_tasks = document.querySelectorAll('.delete');

	for (let i = 0; i < current_tasks.length; i++) {
		current_tasks[i].onclick = () => {
			current_tasks[i].parentNode.remove();
			items.splice(i, 1);
			localStorage.setItem('items', JSON.stringify(items));
		};
	}

	const checkbox = document.querySelectorAll('.todo-checkbox');

	for (let i = 0; i < checkbox.length; i++) {
		checkbox[i].onclick = () => {
			let item = checkbox[i];
			let checked = item.classList.contains('fa-check-square');
			if (checked === true) {
				item.classList.remove('fa-check-square');
				item.classList.add('fa-square');
				items[i].done = false;
				localStorage.setItem('items', JSON.stringify(items));
			} else {
				item.classList.remove('fa-square');
				item.classList.add('fa-check-square');
				items[i].done = true;
				localStorage.setItem('items', JSON.stringify(items));
			}
		};
	}

	const taskName = document.querySelectorAll('.task-name');
	const editTask = document.querySelectorAll('.edit');
	const editField = document.querySelectorAll('.edit-field');

	for (let i = 0; i < editTask.length; i++) {
		editTask[i].onclick = () => {
			let item = taskName[i];
			let edit = item.classList.contains('edit');

			if (edit) {
				taskName[i].innerHTML = editField[i].value;
				items[i].text = editField[i].value;
				localStorage.setItem('items', JSON.stringify(items));
				editField[i].style.display = 'none';
				item.style.display = 'block';
				item.classList.remove('edit');
			} else {
				item.classList.add('edit');
				item.style.display = 'none';
				editField[i].style.display = 'block';
				editField[i].value = taskName[i].textContent;
			}
		};
	}
}
function populateList(plates = [], platesList) {
	platesList.innerHTML = plates
		.map((plate, i) => {
			return `
	<div class="mdl-list__item todo-list-item">
	<span class="mdl-list__item-primary-content">
	<i class="far ${plate.done ? 'fa-check-square' : 'fa-square'} fa-square todo-checkbox"></i>
	<label id="item${i}" class="task-name">${plate.text}</label>
	<input type="text" class="edit-field"></input>
	</span>
	<div class="mdl-list__item-secondary-action edit"><i class="far fa-edit"></i></div>
	<div class="mdl-list__item-secondary-action color-red delete"><i class="fas fa-trash-alt"></i></div>
	</div>
	  `;
		})
		.join('');
}

let showToDoInput = false;

addToDoBtn.addEventListener('click', () => {
	if (showToDoInput) {
		toDoInput.style.display = 'none';
		toDoInputText.value = '';
		showToDoInput = false;
	} else {
		toDoInput.style.display = 'inline';
		showToDoInput = true;
	}
});
