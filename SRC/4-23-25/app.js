// Initialize Dexie and define a DB schema
const db = new Dexie("MyDatabase");
db.version(1).stores({
  items: '++id, name'
});

/// Add an item from input
async function addItem() {
  const input = document.getElementById("itemInput");
  const itemName = input.value.trim();

  if (itemName === "") {
    showOutput("Please enter a valid item name.");
    return;
  }

  await db.items.add({ name: itemName });
  readItems();
  showOutput(`Item "${itemName}" added.`);
  input.value = ""; // Clear the input field
}


// Read all items
async function readItems() {
    const allItems = await db.items.toArray();
    const tbody = document.querySelector("#itemsTable tbody");
  
    // Clear existing table rows
    tbody.innerHTML = "";
  
    if (allItems.length === 0) {
      tbody.innerHTML = "<tr><td colspan='2'>No items found.</td></tr>";
      return;
    }
  
    // Create a row for each item
    allItems.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
      `;
      tbody.appendChild(row);
    });
  }
  

// Update the first item
async function updateFirstItem() {
  const first = await db.items.orderBy('id').first();
  if (first) {
    await db.items.update(first.id, { name: "Updated Name" });
    showOutput(`Item ${first.id} updated.`);
  } else {
    showOutput("No items to update.");
  }
}

// Delete the first item
async function deleteFirstItem() {
  const first = await db.items.orderBy('id').first();
  if (first) {
    await db.items.delete(first.id);
    readItems();
    showOutput(`Item ${first.id} deleted.`);
  } else {
    showOutput("No items to delete.");
  }
}

// Display output in <pre>
function showOutput(msg) {
  document.getElementById("output").textContent = msg;
}