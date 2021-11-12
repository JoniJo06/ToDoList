/**@format */
'use strict';
const items = JSON.parse(localStorage.getItem('items')) || [];
const toDoInput = document.querySelector('#todo-list-text-input-form');
const toDoInputText = document.querySelector('#todo-list-text-input');
const toDoInputLabel = document.querySelector('#todo-list-label-input');
const addToDoBtn = document.querySelector('#add-todo-btn');
const addToDoBtnSubmit = document.querySelector('#add-todo-btn-submit');
const itemsList = document.querySelector('#todo-list');
let showToDoInput = false;
class ToDoList {
	constructor() {}
	showToDoBtn() {
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
	}
	addToDo() {
		if (document.querySelector('#todo-list-text-input').value.length === 0) {
			toDoInputLabel.innerHTML = 'Bitte etwas eintragen ...';
			toDoInputLabel.style.color = 'red';
		} else {
			const text = toDoInputText.value;
			const item = {
				text,
				done: false,
			};

			items.push(item);
			this.setTodos();
			localStorage.setItem('items', JSON.stringify(items));

			toDoInputText.value = '';
			toDoInput.style.display = 'none';
			showToDoInput = false;
			this.showToDoBtn(); //damit das eingabe feld vernünftig geupdated wird

			this.setupToDoList();
		}
	}
	markAsDone() {
		let checkbox = document.querySelectorAll('.todo-checkbox');
		for (let i = 0; i < checkbox.length; i++) {
			checkbox[i].addEventListener('click', () => {
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
			});
		}
	}

	deleteToDo() {
		const current_tasks = document.querySelectorAll('.delete');
		for (let i = 0; i < current_tasks.length; i++) {
			current_tasks[i].addEventListener('click', () => {
				current_tasks[i].parentNode.remove();
				items.splice(i, 1);
				localStorage.setItem('items', JSON.stringify(items));
			});
		}
	}

	editToDo() {
		const taskName = document.querySelectorAll('.task-name');
		const editTask = document.querySelectorAll('.edit');
		const editField = document.querySelectorAll('.edit-field');
		const current_tasks = document.querySelectorAll('.delete');

		for (let i = 0; i < editTask.length; i++) {
			editTask[i].addEventListener('click', () => {
				let item = taskName[i];
				let edit = item.classList.contains('edit');

				if (edit) {
					taskName[i].innerHTML = editField[i].value;
					items[i].text = editField[i].value;
					localStorage.setItem('items', JSON.stringify(items));
					editField[i].style.display = 'none';
					item.style.display = 'block';
					item.classList.remove('edit');
					current_tasks[i].classList.remove('d-none');
				} else {
					item.classList.add('edit');
					current_tasks[i].classList.add('d-none');
					item.style.display = 'none';
					editField[i].style.display = 'block';
					editField[i].value = taskName[i].textContent;
				}
			});
		}
	}

	setTodos() {
		const populateList = (plates = [], plateList) => {
			plateList.innerHTML = plates
				.map((plate, i) => {
					return `
				<div class="mdl-list__item todo-list-item">
				<span class="mdl-list__item-primary-content">
				<i class="far ${plate.done ? 'fa-check-square' : 'fa-square'} todo-checkbox"></i>
				<label id="item${i}" class="task-name">${plate.text}</label>
				<input type="text" class="edit-field"></input>
				</span>
				<div class="mdl-list__item-secondary-action edit"><i class="far fa-edit"></i></div>
				<div class="mdl-list__item-secondary-action color-red delete"><i class="fas fa-trash-alt"></i></div>
				</div>
				`;
				})
				.join('');
		};
		populateList(items, itemsList);
	}

	setupToDoList() {
		this.setTodos();
		this.markAsDone();
		this.deleteToDo();
		this.editToDo();
		this.showToDoBtn();
	}
}

const myTodoList = new ToDoList();

window.onload = () => {
	myTodoList.setupToDoList();
};

document.querySelector('#add-todo-btn-submit').addEventListener('click', myTodoList.addToDo.bind(myTodoList));
