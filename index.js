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

    return {
        month,
        day,
    };
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
    const wrapper = parent.parentElement;
    const wrapperId = wrapper.id;
    if (wrapperId === "todo-list") {
        eraceTodo(parent);
        successLocalstorageTodo(parentId);
    }
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
    todoWrapper.classList.add("todo");
    todoWrapper.id = todoObj.id;
    const text = document.createElement("span");
    text.id = "todo-text";
    text.innerHTML = todoObj.todo;
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("todo__btn");
    deleteBtn.innerHTML = "❌";
    deleteBtn.addEventListener("click", handleDelete);
    const successBtn = document.createElement("button");
    successBtn.classList.add("todo__btn");
    successBtn.addEventListener("click", handleSuccess);
    const createTimeBtn = document.createElement("button");
    createTimeBtn.innerHTML = `${todoObj.createMonth}/${todoObj.createDay}`;
    createTimeBtn.classList.add("before-todo__btn");
    successBtn.innerHTML = "✅";
    todoWrapper.append(text);
    todoWrapper.append(deleteBtn);
    todoWrapper.append(successBtn);
    todoWrapper.append(createTimeBtn);
    console.log(todoObj);
    if (todoObj.successMonth && todoObj.successDay) {
        const successTimeBtn = document.createElement("button");
        successTimeBtn.classList.add("success-todo__btn");
        successTimeBtn.innerHTML = `${todoObj.successMonth}/${todoObj.successDay}`;
        todoWrapper.append(successTimeBtn);
    }
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
        const { month, day } = getDate();
        if (todoObj.id === id) {
            todoObj = {
                ...todoObj,
                isSuccess: true,
                successMonth: month,
                successDay: day,
            };
            paintTodo(todoObj);
        }
        return todoObj;
    });
    todosArr = filtered;
    localStorage.setItem("todos", JSON.stringify(todosArr));
};

const handleSubmit = (e) => {
    e.preventDefault();
    const { month, day } = getDate();
    const todoObj = {
        id: Date.now().toString(),
        todo: input.value,
        isSuccess: false,
        createMonth: month,
        createDay: day,
        successMonth: null,
        successDay: null,
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
