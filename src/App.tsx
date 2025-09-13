import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function App() {
  const messages = useQuery(api.message.list) ?? [];
  const sendMessage = useMutation(api.message.send);
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ text, author: "Anonymous" });
    setText("");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow rounded p-4 flex flex-col gap-2">
        <div className="flex-1 overflow-y-auto border p-2 rounded h-64">
          {messages.map((m) => (
            <div key={m._id} className="border-b py-1">
              <span className="font-bold">{m.author}: </span>
              <span>{m.text}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
