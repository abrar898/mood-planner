import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";

export default function AISuggestions() {
  const location = useLocation();
  const passedNote = location.state?.note || ""; // 📝 Mood note from MoodLog
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (passedNote) {
      analyzeNote(passedNote);
    } else {
      setOutput("⚠️ No mood note provided.");
      setLoading(false);
    }
  }, [passedNote]);

  const analyzeNote = async (note) => {
    try {
      const res = await api.post("analyze/", { note });
      setOutput(res.data.ai_output);
    } catch (err) {
      setOutput("❌ Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  // ✂️ Parse output
  const summary = output.split("📺")[0]?.replace("🤖 **AI Summary**:", "").trim();
  const videoBlock = output.split("📺 **Top 10 YouTube Tutorials**:")[1]?.split("🎧")[0]?.trim();
  const playlistBlock = output.includes("🎧") ? output.split("🎧 **Playlist**:")[1]?.split("📚")[0]?.trim() : "";
  const docBlock = output.includes("📚") ? output.split("📚")[1]?.trim() : "";

  return (
    <div className="max-w-5xl mx-auto mt-5 px-4 py-8 space-y-10">
      <h1 className="text-2xl mt-10  font-extrabold text-center text-indigo-700">💡 Smart AI Suggestions</h1>

      {loading ? (
        <p className="text-center text-gray-600">Analyzing your mood note...</p>
      ) : (
        <>
          {/* 🧠 Summary */}
          {summary && (
            <div className="bg-white shadow-lg rounded border-l-8 border-indigo-600 p-6 mt-0">
              <h2 className="text-xl font-bold text-indigo-700 mb-2">🧠 AI Summary</h2>
              <p className="text-gray-800 whitespace-pre-line">{summary}</p>
            </div>
          )}

          {/* 📺 YouTube Videos */}
          {videoBlock && (
            <div className="bg-white shadow-lg rounded border-l-8 border-blue-600 p-6">
              <h2 className="text-xl font-bold text-blue-700 mb-4">📺 YouTube Tutorials</h2>
              <ul className="space-y-2 list-disc pl-5">
                {videoBlock.split("\n").map((line, idx) => {
                  const match = line.match(/\[(.*?)\]\((.*?)\)/); // [title](url)
                  return match ? (
                    <li key={idx}>
                      <a href={match[2]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        🔗 {match[1]}
                      </a>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}

          {/* 🎧 Playlists */}
          {playlistBlock && (
            <div className="bg-white shadow-lg rounded border-l-8 border-pink-600 p-6">
              <h2 className="text-xl font-bold text-pink-700 mb-2">🎧 YouTube Playlist</h2>
              <ul className="space-y-2 list-disc pl-5">
                {playlistBlock.split("\n").map((line, idx) => {
                  const match = line.match(/\[(.*?)\]\((.*?)\)/);
                  return match ? (
                    <li key={idx}>
                      <a href={match[2]} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                        🎶 {match[1]}
                      </a>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          )}

          {/* 📚 Docs */}
          {docBlock && (
            <div className="bg-white shadow-lg rounded border-l-8 border-purple-600 p-6">
              <h2 className="text-xl font-bold text-purple-700 mb-2">📚 Documentation</h2>
              <div className="text-purple-800" dangerouslySetInnerHTML={{ __html: docBlock }} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
