let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let filterType = "all";

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function setFilter(type) {
  filterType = type;
  renderTasks();
}

function renderTasks() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  const filtered = taskList.filter(task => {
    if (filterType === "completed") return task.done;
    if (filterType === "pending") return !task.done;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");

    const taskDiv = document.createElement("div");
    taskDiv.className = "task-info";
    taskDiv.innerHTML = `<strong>${task.text}</strong><small>${task.time}</small>`;

    li.onclick = () => {
      task.done = !task.done;
      saveTasks();
      renderTasks();
    };

    const del = document.createElement("button");
    del.textContent = "❌";
    del.onclick = (e) => {
      e.stopPropagation();
      taskList.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(taskDiv);
    li.appendChild(del);
    ul.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text !== "") {
    const now = new Date().toLocaleString();
    taskList.push({ text, time: now, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

document.getElementById("taskInput").addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();
