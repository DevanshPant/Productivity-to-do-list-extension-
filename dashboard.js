let currentIndex = 0;

// Tab Carousel Navigation
const items = document.querySelectorAll(".carousel-item");
const updateCarousel = () => {
  items.forEach((item, index) => {
    item.classList.toggle("active", index === currentIndex);
  });
};

document.getElementById("left-arrow").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
});

document.getElementById("right-arrow").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
});

// Draggable Widget
const widget = document.getElementById("extension-widget");
const header = document.getElementById("widget-header");
let offsetX = 0, offsetY = 0, isDragging = false;

header.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - widget.offsetLeft;
  offsetY = e.clientY - widget.offsetTop;
  header.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    widget.style.left = `${e.clientX - offsetX}px`;
    widget.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  header.style.cursor = "grab";
});

// To-Do List
document.getElementById("add-task-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const newTask = document.getElementById("new-task").value;
  if (newTask) {
    const taskList = document.getElementById("todo-list");
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="task-${taskList.children.length + 1}">
      <label for="task-${taskList.children.length + 1}">${newTask}</label>
      <button class="dropdown-arrow" aria-label="Expand Task">▼</button>
    `;
    taskList.appendChild(li);
    document.getElementById("new-task").value = "";
  }
});

// Calendar
const calendarContainer = document.getElementById('calendar-container');
for (let i = 1; i <= 31; i++) {
  const day = document.createElement('div');
  day.className = 'calendar-day';
  day.textContent = i;
  calendarContainer.appendChild(day);
}

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;
const display = document.getElementById("stopwatch-display");

document.getElementById("start-stopwatch").addEventListener("click", () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      display.textContent = new Date(stopwatchTime * 1000).toISOString().substr(11, 8);
    }, 1000);
  }
});

document.getElementById("stop-stopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.getElementById("reset-stopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchTime = 0;
  display.textContent = "00:00:00";
});

// Initial Carousel Update
updateCarousel();
