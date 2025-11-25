import { useState } from "react";

function App() {
  const initialData = [
    { id: 1, name: "Alice", role: "Developer", points: 92 },
    { id: 2, name: "Bob", role: "Designer", points: 81 },
    { id: 3, name: "Charlie", role: "QA", points: 76 },
    { id: 4, name: "Diana", role: "Manager", points: 88 },
    { id: 5, name: "Eve", role: "DevOps", points: 90 },
    { id: 6, name: "Frank", role: "Intern", points: 60 }
  ];

  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  // pagination
  const [page, setPage] = useState(1);
  const pageSize = 3; // items per page

  // Filter
  const filtered = initialData.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(query.toLowerCase())
    )
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];
    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sorted.length / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = sorted.slice(start, start + pageSize);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - 1, 1));

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Team Points</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1); // reset page when searching
        }}
        style={{
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 4,
          marginBottom: 14,
          width: "100%",
          maxWidth: 300,
        }}
      />

      {/* Table */}
      <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 600 }}>
        <thead>
          <tr>
            {["id", "name", "role", "points"].map((field) => (
              <th key={field} style={th} onClick={() => handleSort(field)}>
                {field.toUpperCase()}
                {sortField === field ? (sortDir === "asc" ? " 🔼" : " 🔽") : ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginated.map((person) => (
            <tr key={person.id}>
              <td style={td}>{person.id}</td>
              <td style={td}>{person.name}</td>
              <td style={td}>{person.role}</td>
              <td style={td}>{person.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={prevPage}
          disabled={page === 1}
          style={btn}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={nextPage}
          disabled={page === totalPages}
          style={btn}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const th = {
  borderBottom: "2px solid #000",
  textAlign: "left",
  padding: "8px 4px",
  cursor: "pointer",
  userSelect: "none",
};

const td = {
  borderBottom: "1px solid #ccc",
  padding: "8px 4px",
};

const btn = {
  padding: "6px 12px",
  border: "1px solid #aaa",
  borderRadius: 4,
  cursor: "pointer",
  background: "#f5f5f5"
};

export default App;
