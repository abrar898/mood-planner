import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function MoodLog() {
  const [mood, setMood] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [submittedNote, setSubmittedNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("moods/", {
        mood_score: mood,
        mood_note: note,
        date: date,
      });

      setSubmittedNote(note);
      setMessage("✅ Mood logged successfully!");
      setIsError(false);
      setMood("");
      setNote("");
      setDate("");
    } catch (error) {
      console.error("❌ Mood log error:", error.response?.data || error.message);
      setIsError(true);
      setMessage(
        error.response?.data?.detail === "Authentication credentials were not provided."
          ? "❌ Please login first."
          : "⚠️ Mood already logged for this date or another error occurred."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">Log Your Mood</h1>

        {/* Message */}
        {message && (
          <div className={`mb-4 text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`}>
            {message}
            {!isError && submittedNote && (
              <div className="mt-4">
                <Link
                  to="/ai-suggestions"
                  state={{ note: submittedNote }}
                  className="inline-block bg-blue-600 text-white font-semibold px-5 py-2 rounded hover:bg-blue-700 transition duration-200 shadow"
                >
                  👉 Get AI Support for this Mood Note
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">Select your mood</option>
              <option value="1">😢 Very Sad</option>
              <option value="2">😟 Sad</option>
              <option value="3">😐 Neutral</option>
              <option value="4">😊 Happy</option>
              <option value="5">😁 Very Happy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood Note (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows="4"
              placeholder="Why do you feel this way?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Submit Mood
          </button>
        </form>
      </div>
    </div>
  );
}
