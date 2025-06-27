import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import api from "../api";

export default function MoodCalendar() {
  const [moods, setMoods] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (!token) return;

    api.get("moods/", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setMoods(res.data))
      .catch((err) => console.error("Mood calendar fetch error:", err));
  }, []);

  const getTileColor = ({ date }) => {
    const mood = moods.find((m) => m.date === date.toISOString().split("T")[0]);
    if (!mood) return null;

    switch (mood.mood_score) {
      case 1:
      case 2:
        return "bg-red-300";
      case 3:
        return "bg-yellow-300";
      case 4:
      case 5:
        return "bg-green-300";
      default:
        return null;
    }
  };

  const handleClick = (date) => {
    const mood = moods.find((m) => m.date === date.toISOString().split("T")[0]);
    if (mood) {
      setSelectedNote(mood.mood_note || "No note provided.");
    } else {
      setSelectedNote("No mood logged for this day.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center text-indigo-700 mb-4">📆 Mood Calendar</h1>

      <Calendar
        onClickDay={handleClick}
        tileClassName={({ date }) => getTileColor({ date })}
      />

      {selectedNote && (
        <div className="mt-6 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">📝 Mood Note</h2>
          <p>{selectedNote}</p>
        </div>
      )}
    </div>
  );
}
