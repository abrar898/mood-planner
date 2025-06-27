import React from "react";
import { useState } from "react";
import api from "../api";

export default function AISuggestions() {
  const [note, setNote] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const res = await api.post("analyze/", { note });
      setOutput(res.data.ai_output);
    } catch (err) {
      setOutput("❌ Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Suggestion Based on Mood Note</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Type what you're feeling or want to learn..."
          className="w-full border p-3 rounded"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Analyzing..." : "Get AI Suggestions"}
        </button>
      </form>

      {output && (
        <div className="mt-6 border p-4 bg-gray-50 rounded whitespace-pre-wrap">
          {output}
        </div>
      )}
    </div>
  );
}
