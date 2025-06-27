import { useEffect, useState } from "react";
import axiosInstance from "../api";

export default function MoodHistory() {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axiosInstance.get("moods/");
        setMoods(response.data);
        setLoading(false);
      } catch (err) {
        setError("⚠️ Failed to load mood history.");
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  if (loading) return <p className="text-center mt-6 text-indigo-600 font-medium">Loading mood history...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">🕓 Mood History</h2>
        {moods.length === 0 ? (
          <p className="text-center text-gray-500">No mood entries yet.</p>
        ) : (
          <ul className="space-y-4">
            {moods.map((mood) => (
              <li
                key={mood.id}
                className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <p className="text-lg font-semibold text-indigo-800">📅 {mood.date}</p>
                <p className="text-sm text-gray-700 mt-1">Mood Score: <span className="font-medium">{mood.mood_score}</span></p>
                <p className="text-sm italic text-gray-600 mt-1">
                  Note: {mood.mood_note || "No note provided"}
                </p>
                {mood.suggestion && (
                  <p className="mt-2 text-sm text-blue-600">
                    💡 Suggestion: {mood.suggestion}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
