// Initialize Dexie and define a DB schema
const db = new Dexie("MyDatabase");
db.version(1).stores({
  items: '++id, title, desc, completed'
});

// Function to add a new ToDo item
async function addItem() {
  const titleInput = document.getElementById('title');
  const descInput = document.getElementById('desc');

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (!title || !desc) {
    alert("Please fill out both Title and Description.");
    return;
  }

  await db.items.add({ 
    title: title,
    desc: desc,
    completed: false
  });

  titleInput.value = '';
  descInput.value = '';

  showOutput("Item added.");

  displayItems(); // refresh the list
}

// Function to display all ToDo items
async function displayItems() {
  const todoList = document.getElementById('todoList');
  todoList.innerHTML = '';

  const allItems = await db.items.toArray();

  allItems.forEach(item => {
    if (!item.title || !item.desc) {
      return; // skip bad old entries
    }
    const li = document.createElement('li');
    li.textContent = `${item.title}: ${item.desc} [Completed: ${item.completed}]`;
    todoList.appendChild(li);
  });
}

// Function to show a message
function showOutput(message) {
  console.log(message);
}

// Event listener for the Add button
document.getElementById('addBtn').addEventListener('click', addItem);

// Load all items initially
displayItems();
