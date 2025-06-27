import { useState } from "react";
import api from "../api";

export default function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await fetch("http://localhost:8000/api/chat-stream/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let botMessage = { type: "bot", content: "" };

    setMessages((prev) => [...prev, botMessage]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      botMessage.content += chunk;
      setMessages((prev) =>
        prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: botMessage.content } : m))
      );
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">🤖 AI Support Chat</h1>

      <div className="bg-white rounded shadow p-4 h-[500px] overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${
              msg.type === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left font-mono"
            }`}
          >
            {msg.content}
            {loading && msg.type === "bot" && <span className="animate-pulse">|</span>}
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border border-gray-300 px-4 py-2 rounded shadow-sm"
          placeholder="Ask anything..."
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}
