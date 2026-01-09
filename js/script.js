const form = document.getElementById("todoForm");
const list = document.getElementById("todoList");
const filter = document.getElementById("filterStatus");
const deleteAll = document.getElementById("deleteAll");

let todos = [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem("todos");
  if (data) {
    todos = JSON.parse(data);
    renderTodos();
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const title = document.getElementById("title").value.trim();
  const desc = document.getElementById("description").value.trim();
  const status = document.getElementById("status").value;

  if (!date || !title || !desc || !status) {
    alert("Semua field wajib diisi!");
    return;
  }

  todos.push({
    date,
    title,
    desc,
    status
  });

  saveTodos();
  renderTodos();
  form.reset();
});

filter.addEventListener("change", renderTodos);

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

deleteAll.addEventListener("click", function () {
  if (confirm("Yakin ingin menghapus semua data?")) {
    todos = [];
    saveTodos();
    renderTodos();
  }
});

function formatDate(date) {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

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
      <td>${formatDate(todo.date)}</td>
      <td>
        <span class="status ${todo.status}">
          ${todo.status}
        </span>
      </td>
      <td>
        <span class="delete" onclick="deleteTodo(${index})">
          Delete
        </span>
      </td>
    `;

    list.appendChild(tr);
  });
}

loadTodos();
