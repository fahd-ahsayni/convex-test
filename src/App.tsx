import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function App() {
  const tasks = useQuery(api.tasks.list);
  const createTask = useMutation(api.tasks.create);
  const updateTask = useMutation(api.tasks.update);
  const deleteTask = useMutation(api.tasks.remove);

  const [newText, setNewText] = useState("");

  if (!tasks) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>📝 Tasks</h1>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (newText.trim()) {
            await createTask({ text: newText });
            setNewText("");
          }
        }}
      >
        <input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="New task"
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            <input
              type="checkbox"
              checked={t.isCompleted}
              onChange={() =>
                updateTask({ id: t._id, isCompleted: !t.isCompleted })
              }
            />
            <input
              value={t.text}
              onChange={(e) =>
                updateTask({ id: t._id, text: e.target.value })
              }
            />
            <button onClick={() => deleteTask({ id: t._id })}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
