const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

empty = "Todo cannot be empty";
inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") {
    return;
  } else if (inputAdd.value === "") {
    alert("Todo cannot be empty");
  }
  //your code here
  else addTodo(inputAdd.value, false);
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.appendChild(div);
  div.onmouseover;

  doneBtn.onclick = () => {
    if (span.style.textDecoration !== "line-through") {
      span.style.textDecoration = "line-through";
      const data = JSON.parse(localStorage.getItem("todo-container"));
      for (const i in data) {
        data.completed = true;
        saveTodo();
      }
    } else span.style.textDecoration = "";
    const data = JSON.parse(localStorage.getItem("todo-container"));
    for (const i in data) {
      data.completed = false;
      saveTodo();
    }
    deleteBtn.onclick = () => {
      div.remove();
      const data = JSON.parse(localStorage.getItem("todo-container"));
      for (const i in data) {
        if (data[i].title === title) {
          data.splice(i, 1);
        }
      }
      saveTodo();
    };
    //your code here
    //append todo to HTML...
    //define buttons event...
  };

  function saveTodo() {
    const data = [];
    for (const todoDiv of todoCtn.children) {
      //your code here
      const todoObj = {};
      todoObj.title = todoDiv[0].innerText;
      todoObj.completed =
        todoDiv.children[0].style.textDecoration === "line-through";
      data.push(todoObj);
    }
    const dataStr = JSON.stringify(data);
    localStorage.setItem("todo-container", dataStr);
    //your code here
  }
}

function loadTodo() {
  //your code here
  state = false;
  const dataStr = localStorage.getItem("todo-container");
  const data = JSON.parse(dataStr);
  for (const i of data) {
    addTodo(i.title, i.completed);
  }
}

loadTodo();
