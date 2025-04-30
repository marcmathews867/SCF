// Initialize Dexie and define a DB schema
const db = new Dexie("MyDatabase");
db.version(1).stores({
  items: '++id, name, desc'
});

// Add an item
async function addItem() {
  await db.items.add({ 
    name: "Hello Dexie",
    desc: " I'm a description. " 
});
  showOutput("Item added.");
}

// Read all items
async function readItems() {
  const allItems = await db.items.toArray();
  showReadOutput(allItems);
}

function showReadOutput(items){
    document.getElementById("output").innerHTML = "ITEMS:";
    items.forEach(item => {
        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.setAttribute("onclick", "deleteItemByID("+item.id+")");
        document.getElementById("output").innerHTML += "<br />"+item.name;
        document.getElementById("output").appendChild(delBtn);
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

async function deleteItemByID(id){
    await db.items.delete(id);
    readItems();
}

// Delete the first item
async function deleteFirstItem() {
  const first = await db.items.orderBy('id').first();
  if (first) {
    await db.items.delete(first.id);
    showOutput(`Item ${first.id} deleted.`);
  } else {
    showOutput("No items to delete.");
  }
}

// Display output in <pre>
function showOutput(msg) {
  document.getElementById("output").textContent = msg;
}
