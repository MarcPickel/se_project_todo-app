import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    // Create a date object and adjust for timezone
    const dateObj = new Date(values.date);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

    const id = uuidv4();
    const todoData = { name: values.name, date: dateObj, id: id };

    const todoElement = generateTodo(todoData);
    section.addItem(todoElement);

    todoCounter.updateTotal(true);

    addTodoPopup.close();
    newTodoValidation.resetValidation();
  },
});
addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const section = new Section({
  items: initialTodos, //pass initial todos
  renderer: (item) => {
    const todoElement = generateTodo(item);
    section.addItem(todoElement);
  },
  containerSelector: ".todos__list",
});
section.renderItems();
//Call section instance's renderItems method

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidation = new FormValidator(validationConfig, addTodoForm);
newTodoValidation.enableValidation();
