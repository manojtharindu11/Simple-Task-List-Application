const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

const addTask = () => {
    if (inputBox.value == '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        li.addEventListener("dblclick", () => editTask(li)); // Add double-click to edit
    }
    inputBox.value = '';
    saveData();
}

const editTask = (li) => {
    let currentText = li.firstChild.textContent;
    let newText = prompt("Edit your task:", currentText);
    if (newText !== null && newText !== '') {
        li.firstChild.textContent = newText;
        saveData();
    }
}

listContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

const saveData = () => {
    localStorage.setItem("data", listContainer.innerHTML);
}

const showTask = () => {
    listContainer.innerHTML = localStorage.getItem("data");
    let listItems = listContainer.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener("dblclick", () => editTask(listItems[i])); // Re-attach edit event listener
    }
}

showTask();
