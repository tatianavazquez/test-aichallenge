import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const pageSize = 3;

  // Fetch API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading API data… 😘</p>;

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

  const goToPage = (num) => setPage(num);

  return (
    <div className="container">
      <h1>User List (API)</h1>

      <input
        type="text"
        placeholder="Search…"
        className="search-input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              {[
                ["id", "ID"],
                ["name", "Name"],
                ["email", "Email"],
                ["username", "Username"],
              ].map(([field, label]) => (
                <th
                  key={field}
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
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => goToPage(num)}
            className={`page-btn ${num === page ? "active" : ""}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
