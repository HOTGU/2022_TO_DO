const dateDiv = document.getElementById("date");
const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const list = document.querySelector(".todo-list");

const getDate = () => {
    const newDate = new Date();

    const year = newDate.getUTCFullYear();
    const month = newDate.getUTCMonth() + 1;
    const day = newDate.getUTCDate();

    dateDiv.innerHTML = `😀 ${year}년 ${month}월 ${day}일 😀`;
};

getDate();

let todosArr = JSON.parse(localStorage.getItem("todos")) || [];

const paintTodo = (todo) => {
    const todoWrapper = document.createElement("div");
    const text = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const successBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌삭제";
    successBtn.innerHTML = "✅완성";
    text.innerHTML = todo;
    todoWrapper.append(text);
    todoWrapper.append(deleteBtn);
    todoWrapper.append(successBtn);
    list.appendChild(todoWrapper);
};

const saveTodo = (todo) => {
    todosArr.push(todo);
    localStorage.setItem("todos", JSON.stringify(todosArr));
};

const handleSubmit = (e) => {
    e.preventDefault();
    const todo = input.value;
    paintTodo(todo);
    saveTodo(todo);
    input.value = "";
};

const toDoInit = () => {
    form.addEventListener("submit", handleSubmit);
    todosArr.forEach((todo) => {
        paintTodo(todo);
    });
};

toDoInit();
