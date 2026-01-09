const form = document.getElementById("todoForm");
const list = document.getElementById("todoList");
const filter = document.getElementById("filterStatus");
const deleteAll = document.getElementById("deleteAll");

let todos = [];

// FORM SUBMIT
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("description").value.trim();
  const status = document.getElementById("status").value;

  // VALIDATION
  if (!date || !title || !desc || !status) {
    alert("All fields are required!");
    return;
  }

  todos.push({ date, title, desc, status });
  form.reset();
  renderTodos();
});

// FILTER
filter.addEventListener("change", renderTodos);

// DELETE ALL
deleteAll.addEventListener("click", function () {
  if (confirm("Delete all to-do items?")) {
    todos = [];
    renderTodos();
  }
});

// RENDER LIST
function renderTodos() {
  list.innerHTML = "";
  const selectedFilter = filter.value;
  let no = 1;

  todos.forEach((todo, index) => {
    if (selectedFilter !== "all" && todo.status !== selectedFilter) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${no++}</td>
      <td>${todo.title}</td>
      <td>${todo.desc}</td>
      <td>
        <span class="status ${todo.status}">
          ${todo.status}
        </span>
      </td>
      <td>
        <span class="delete" onclick="deleteTodo(${index})">Delete</span>
      </td>
    `;
    list.appendChild(tr);
  });
}


// DELETE SINGLE
function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}
