class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector); // select the appropriate element
    this._completed = 0; // number of completed todos
    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length; // the total number of todos
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
