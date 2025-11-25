import { useState } from "react";

function App() {
  const initialData = [
    { id: 1, name: "Alice", role: "Developer", points: 92 },
    { id: 2, name: "Bob", role: "Designer", points: 81 },
    { id: 3, name: "Charlie", role: "QA", points: 76 },
    { id: 4, name: "Diana", role: "Manager", points: 88 },
    { id: 5, name: "Eve", role: "DevOps", points: 90 },
    { id: 6, name: "Frank", role: "Intern", points: 60 },
    { id: 7, name: "Gina", role: "PM", points: 84 },
    { id: 8, name: "Henry", role: "Tech Lead", points: 95 }
  ];

  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const pageSize = 3;

  const filtered = initialData.filter((item) =>
    Object.values(item).some((v) =>
      String(v).toLowerCase().includes(query.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const A = a[sortField];
    const B = b[sortField];
    if (A < B) return sortDir === "asc" ? -1 : 1;
    if (A > B) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (n) => setPage(n);

  return (
    <div style={{ padding: 24, fontFamily: "Arial", maxWidth: 600 }}>
      <h1 style={{ marginBottom: 12 }}>Team Points</h1>

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
        style={{
          padding: 8,
          border: "1px solid #bbb",
          borderRadius: 6,
          marginBottom: 16,
          width: "100%",
        }}
      />

      <div style={{ maxHeight: 250, overflowY: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          <thead style={{ background: "#e8f0ff" }}>
            <tr>
              {["id", "name", "role", "points"].map((field) => (
                <th
                  key={field}
                  style={th}
                  onClick={() =>
                    setSortField((prev) => {
                      if (prev === field) {
                        setSortDir(sortDir === "asc" ? "desc" : "asc");
                        return field;
                      }
                      setSortDir("asc");
                      return field;
                    })
                  }
                >
                  {field.toUpperCase()}
                  {sortField === field ? (sortDir === "asc" ? " 🔼" : " 🔽") : ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.map((p) => (
              <tr key={p.id} style={row}>
                <td style={td}>{p.id}</td>
                <td style={td}>{p.name}</td>
                <td style={td}>{p.role}</td>
                <td style={td}>{p.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            style={{
              ...btn,
              background: num === page ? "#c9dbff" : "#f0f0f0",
              fontWeight: num === page ? "bold" : "",
              borderColor: num === page ? "#5b82ff" : "#aaa",
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

// STICKY HEADER MAGIC 💅
const th = {
  padding: "10px 6px",
  borderBottom: "2px solid #6a8aff",
  textAlign: "left",
  cursor: "pointer",
  userSelect: "none",

  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "#e8f0ff",
};

const td = {
  padding: "10px 6px",
  borderBottom: "1px solid #ddd",
};

const row = {
  transition: "background 0.2s",
};

const btn = {
  padding: "6px 12px",
  borderRadius: 6,
  border: "1px solid #aaa",
  cursor: "pointer",
};

export default App;
