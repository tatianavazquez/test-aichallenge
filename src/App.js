import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const pageSize = 3;

  // Fetch from dummy API 🎣
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ padding: 20 }}>Loading API data… 😘</p>;

  // Filter
  const filtered = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(query.toLowerCase())
    )
  );

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (!sortField) return 0;
    const A = a[sortField];
    const B = b[sortField];
    if (A < B) return sortDir === "asc" ? -1 : 1;
    if (A > B) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize);
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const goToPage = (n) => setPage(n);

  return (
    <div style={{ padding: 24, fontFamily: "Arial", maxWidth: 600 }}>
      <h1>User List (API)</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search…"
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
              {[
                ["id", "ID"],
                ["name", "Name"],
                ["email", "Email"],
                ["username", "Username"],
              ].map(([field, label]) => (
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
                  {label}
                  {sortField === field ? (sortDir === "asc" ? " 🔼" : " 🔽") : ""}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginated.map((user) => (
              <tr key={user.id} style={row}>
                <td style={td}>{user.id}</td>
                <td style={td}>{user.name}</td>
                <td style={td}>{user.email}</td>
                <td style={td}>{user.username}</td>
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
