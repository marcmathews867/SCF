// Initialize Dexie DB
const db = new Dexie("MyDatabase");
db.version(1).stores({
  items: "++id,title,desc,completed"
});

let currentFilter = 'all'; // default filter

// Add new task
async function addItem() {
  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("desc").value.trim();

  if (!title || !desc) {
    alert("Please enter both title and description.");
    return;
  }

  await db.items.add({
    title,
    desc,
    completed: false
  });

  // Clear form
  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";

  displayItems();
}

// Display items based on filter
async function displayItems() {
  const container = document.getElementById("todoList");
  container.innerHTML = "";

  let items = await db.items.toArray();

  // Apply filter
  if (currentFilter === 'active') {
    items = items.filter(item => !item.completed);
  } else if (currentFilter === 'completed') {
    items = items.filter(item => item.completed);
  }

  items.forEach(item => {
    // Create todo item wrapper
    const div = document.createElement("div");
    div.className = `todo-item d-flex justify-content-between align-items-center ${item.completed ? 'completed' : ''}`;

    // Left side: checkbox + text
    const leftDiv = document.createElement("div");
    leftDiv.className = "d-flex align-items-center";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.completed;
    checkbox.className = "form-check-input me-2";
    checkbox.addEventListener("change", () => toggleCompleted(item.id, checkbox.checked));

    const text = document.createElement("span");
    text.textContent = `${item.title}: ${item.desc}`;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(text);

    // Right side: delete button
    const deleteBtn = document.createElement("a");
    deleteBtn.href = "javascript:void(0);";
    deleteBtn.className = "float-right remove-todo-item text-danger";
    deleteBtn.innerHTML = "&times;";
    deleteBtn.addEventListener("click", () => deleteItem(item.id));

    div.appendChild(leftDiv);
    div.appendChild(deleteBtn);
    container.appendChild(div);
  });
}

// Toggle completion status
async function toggleCompleted(id, completed) {
  await db.items.update(id, { completed });
  displayItems();
}

// Delete task
async function deleteItem(id) {
  await db.items.delete(id);
  displayItems();
}

// Handle filter navigation
document.querySelectorAll(".todo-nav .nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    // Remove 'active' class from all links
    document.querySelectorAll(".todo-nav .nav-link").forEach(l => l.classList.remove("active"));
    // Add 'active' to the clicked one
    link.classList.add("active");
    // Set filter and refresh list
    currentFilter = link.dataset.filter;
    displayItems();
  });
});

// Add button listener
document.getElementById("addBtn").addEventListener("click", addItem);

// On page load
displayItems();
