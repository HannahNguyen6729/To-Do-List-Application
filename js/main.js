import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

let todoList = new ToDoList();
let completeList = new ToDoList();

const getEle = (id) => {
  let element = document.getElementById(id);
  return element;
};

const addToDo = () => {
  let text = getEle("newTask").value;
  let ulToDo = getEle("todo");
  if (text != "") {
    let newTask = new ToDo(text, "todo");
    todoList.addToDo(newTask);
  }
  document.getElementById("newTask").value = "";
  showToDo(ulToDo);
};
document.getElementById("addItem").addEventListener("click", addToDo);
//c2:
// document.getElementById("addItem").addEventListener("click", ()=>{
//   addToDo();
// });

const showToDo = (ulToDo) => {
  ulToDo.innerHTML = todoList.renderToDo();
};
const showCompletedTodo = (ulCompleted) => {
  ulCompleted.innerHTML = completeList.renderToDo();
};

const deleteToDo = (event) => {
  //console.log(event);
  let index = event.currentTarget.getAttribute("data-index");
  let status = event.currentTarget.getAttribute("status");
  let ulCompletedToDo = getEle("completed");
  let ulToDo = getEle("todo");

  if (status == "todo") {
    todoList.removeToDo(index);
    showToDo(ulToDo);
  } else if ((status = "completed")) {
    completeList.removeToDo(index);
    showCompletedTodo(ulCompletedToDo);
  }
};
window.deleteToDo = deleteToDo;

const completeToDo = (e) => {
  let index = e.currentTarget.getAttribute("data-index");
  let status = e.currentTarget.getAttribute("status");
  let ulToDo = getEle("todo");
  let ulCompletedToDo = getEle("completed");
  if (status == "todo") {
    let completedItem = todoList.tdList.slice(index, index + 1);
    //console.log(completedItem);
    let object = new ToDo(completedItem[0].text, "completed");
    moveToDo(index, object, todoList, completeList);

    showToDo(ulToDo);
    showCompletedTodo(ulCompletedToDo);
  } else if (status == "completed") {
    let undoItem = completeList.tdList.slice(index, index + 1);
    let object = new ToDo(undoItem[0].text, "todo");
    moveToDo(index, object, completeList, todoList);

    showToDo(ulToDo);
    showCompletedTodo(ulCompletedToDo);
  }
};
window.completeToDo = completeToDo;

const moveToDo = (index, object, depart, arrival) => {
  //remove todo
  depart.removeToDo(index);
  //add todo to arrival
  arrival.addToDo(object);
};

//SORT
const sortASC = (event) => {
  let ulToDo = getEle("todo");
  todoList.sortToDo(false);
  showToDo(ulToDo);
};
window.sortASC = sortASC;
const sortDES = (event) => {
  let ulToDo = getEle("todo");
  todoList.sortToDo(true);
  showToDo(ulToDo);
};
window.sortDES = sortDES;
