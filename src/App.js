function App() {
  const data = [
    { id: 1, name: "Alice", role: "Developer", points: 92 },
    { id: 2, name: "Bob", role: "Designer", points: 81 },
    { id: 3, name: "Charlie", role: "QA", points: 76 },
  ];

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Team Points</h1>

      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          maxWidth: 500,
          marginTop: 20,
        }}
      >
        <thead>
          <tr>
            <th style={th}>ID</th>
            <th style={th}>Name</th>
            <th style={th}>Role</th>
            <th style={th}>Points</th>
          </tr>
        </thead>

        <tbody>
          {data.map((person) => (
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
};

const td = {
  borderBottom: "1px solid #ccc",
  padding: "8px 4px",
};

export default App;
