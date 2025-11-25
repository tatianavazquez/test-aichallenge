import { useState } from "react";

function App() {
  const initialData = [
    { id: 1, name: "Alice", role: "Developer", points: 92 },
    { id: 2, name: "Bob", role: "Designer", points: 81 },
    { id: 3, name: "Charlie", role: "QA", points: 76 },
    { id: 4, name: "Diana", role: "Manager", points: 88 },
  ];

  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Team Points</h1>

      {/* Search box */}
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: 8,
          border: "1px solid #ccc",
          borderRadius: 4,
          marginBottom: 14,
          width: "100%",
          maxWidth: 300,
        }}
      />

      <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 600 }}>
        <thead>
          <tr>
            {["id", "name", "role", "points"].map((field) => (
              <th
                key={field}
                style={th}
                onClick={() => handleSort(field)}
              >
                {field.toUpperCase()}
                {sortField === field ? (sortDir === "asc" ? " 🔼" : " 🔽") : ""}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sorted.map((person) => (
            <tr key={person.id}>
              <td style={td}>{person.id}</td>
              <td style={td}>{person.name}</td>
              <td style={td}>{person.role}</td>
              <td style={td}>{person.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  borderBottom: "2px solid #000",
  textAlign: "left",
  padding: "8px 4px",
  cursor: "pointer",
  userSelect: "none"
};

const td = {
  borderBottom: "1px solid #ccc",
  padding: "8px 4px",
};

export default App;
