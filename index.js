const dateDiv = document.getElementById("date");
const form = document.querySelector("form");
const input = document.querySelector("input");
const btn = document.querySelector("button");
const list = document.querySelector("#todo-list");
const successList = document.querySelector("#todo__success-list");

const getDate = () => {
    const newDate = new Date();

    const year = newDate.getUTCFullYear();
    const month = newDate.getUTCMonth() + 1;
    const day = newDate.getUTCDate();

    dateDiv.innerHTML = `😀 ${year}년 ${month}월 ${day}일 😀`;
};

getDate();

let todosArr = JSON.parse(localStorage.getItem("todos")) || [];

const handleDelete = (e) => {
    const parent = e.target.parentElement;
    const parentId = parent.id;
    eraceTodo(parent);
    deleteLocalstorageTodo(parentId);
};

const handleSuccess = (e) => {
    const parent = e.target.parentElement;
    const parentId = parent.id;
    eraceTodo(parent);
    successLocalstorageTodo(parentId);
};

const eraceTodo = (target) => {
    const wrapper = target.parentElement;
    const wrapperId = wrapper.id;
    if (wrapperId === "todo-list") {
        list.removeChild(target);
    } else {
        successList.removeChild(target);
    }
};

const paintTodo = (todoObj) => {
    const todoWrapper = document.createElement("div");
    todoWrapper.id = todoObj.id;
    const text = document.createElement("span");
    text.innerHTML = todoObj.todo;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "❌삭제";
    deleteBtn.addEventListener("click", handleDelete);
    const successBtn = document.createElement("button");
    successBtn.addEventListener("click", handleSuccess);
    successBtn.innerHTML = "✅완성";
    todoWrapper.append(text);
    todoWrapper.append(deleteBtn);
    todoWrapper.append(successBtn);
    if (todoObj.isSuccess) {
        successList.appendChild(todoWrapper);
    }
    if (!todoObj.isSuccess) {
        list.appendChild(todoWrapper);
    }
};

const saveLocalstorageTodo = (todoObj) => {
    todosArr.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todosArr));
};
const deleteLocalstorageTodo = (id) => {
    const filtered = todosArr.filter((todoObj) => {
        return todoObj.id !== id;
    });
    todosArr = filtered;
    localStorage.setItem("todos", JSON.stringify(todosArr));
};
const successLocalstorageTodo = (id) => {
    const filtered = todosArr.map((todoObj) => {
        if (todoObj.id === id) {
            todoObj = { ...todoObj, isSuccess: true };
            paintTodo(todoObj);
        }
        return todoObj;
    });
    todosArr = filtered;
    localStorage.setItem("todos", JSON.stringify(todosArr));
};

const handleSubmit = (e) => {
    e.preventDefault();
    const todoObj = {
        id: Date.now().toString(),
        todo: input.value,
        isSuccess: false,
    };
    paintTodo(todoObj);
    saveLocalstorageTodo(todoObj);
    input.value = "";
};

const toDoInit = () => {
    form.addEventListener("submit", handleSubmit);
    todosArr.forEach((todoObj) => {
        paintTodo(todoObj);
    });
};

toDoInit();
