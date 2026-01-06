let rows = [];

document.getElementById("file").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result.trim();
    rows = text.split("\n").map(r => r.split(","));
    render();
  };
  reader.readAsText(file);
});

function render() {
  const table = document.getElementById("table");
  const q = document.getElementById("search").value.toLowerCase();
  table.innerHTML = "";

  rows
    .filter((r, i) => i === 0 || r.join(" ").toLowerCase().includes(q))
    .forEach((row, i) => {
      const tr = document.createElement("tr");
      row.forEach(cell => {
        const el = document.createElement(i === 0 ? "th" : "td");
        el.innerText = cell;
        tr.appendChild(el);
      });
      table.appendChild(tr);
    });
}
