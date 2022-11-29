import { v4 as uuidV4 } from 'uuid';

type Task = {
	id: string;
	title: string;
	completed: boolean;
	createdAt: Date;
};

const listElem = document.querySelector<HTMLUListElement>('#list');
const formElem = document.querySelector<HTMLFormElement>('#new-task-form');
const inputElem = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

formElem?.addEventListener('submit', (event) => {
	event.preventDefault();

	if (inputElem?.value == '' || inputElem?.value == null) return;

	const newTask: Task = {
		id: uuidV4(),
		title: inputElem?.value,
		completed: false,
		createdAt: new Date(),
	};
	tasks.push(newTask);
	addListItem(newTask);
	inputElem.value = '';
});

function addListItem(task: Task) {
	const item = document.createElement('li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	checkbox.addEventListener('change', () => {
		task.completed = checkbox.checked;
		saveTasks();
	});
	checkbox.checked = task.completed;
	checkbox.type = 'checkbox';
	label.append(checkbox, task.title);
	item.append(label);
	listElem?.append(item);
}

function saveTasks() {
	localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
	const taskJSON = localStorage.getItem('TASKS');
	if (taskJSON == null) return [];
	return JSON.parse(taskJSON);
}
