const add = document.querySelector("button");
const task = document.querySelector("ul");
const formText = document.querySelector(".addingTask");

window.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  saved.forEach((item) => {
    myFunc(task, item.text, item.checked);
  });
});

add.addEventListener("click", (event) => {
  event.preventDefault();

  const value = formText.value.trim();
  if (!value) {
    alert("You didn't add any task ");
    return;
  }

  myFunc(task, value, false);
  formText.value = "";
});

function myFunc(parent, value, isChecked) {
  const newTask = document.createElement("li");
  newTask.style.margin = "5px";
  newTask.style.display = "flex";
  newTask.style.alignItems = "center";
  newTask.style.justifyContent = "flex-start";
  newTask.style.width = "100%";

  const circle = document.createElement("img");
  circle.style.width = "20px";
  circle.style.marginRight = "10px";
  circle.src = "./images/dry-clean.png";

  if (isChecked) {
    circle.classList.add("checked");
    newTask.style.textDecoration = "line-through";
  }

  circle.addEventListener("click", () => {
    circle.classList.toggle("checked");
    newTask.style.textDecoration = circle.classList.contains("checked")
      ? "line-through"
      : "none";
    saveData();
  });

  const textNode = document.createElement("span");
  textNode.innerText = value;
  textNode.style.flex = "1";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "./images/remove.png";
  deleteIcon.style.width = "20px";
  deleteIcon.style.marginLeft = "10px";

  deleteIcon.addEventListener("mouseover", () => {
    deleteIcon.src = "./images/remove2.png";
  });

  deleteIcon.addEventListener("mouseout", () => {
    deleteIcon.src = "./images/remove.png";
  });

  deleteIcon.addEventListener("click", () => {
    newTask.remove();
    saveData();
  });

  newTask.append(circle);
  newTask.append(textNode);
  newTask.append(deleteIcon);
  parent.append(newTask);

  saveData();
}

function saveData() {
  const data = [];
  document.querySelectorAll("li").forEach((li) => {
    data.push({
      text: li.querySelector("span").innerText,
      checked: li.querySelector("img").classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(data));
}
