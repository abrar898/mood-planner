import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import AIChat from './pages/AIChat';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/TaskAdd';
import TaskList from './pages/TaskList';
import MoodHistory from './pages/MoodHistory';
import MoodLog from './pages/Moodlog';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AISuggestions from './pages/AISuggestions';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIEnhancer from './pages/AIEnhancer';
import MoodCalendar from './pages/MoodCalendar';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="/mood-history" element={<MoodHistory />} />
            <Route path="/mood-log" element={<MoodLog />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-suggestions" element={<AISuggestions />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/ai-enhancer" element={<AIEnhancer />} />
            <Route path="/chatbot" element={<AIChat />} />
            <Route path="/chatbot" element={<AIChat />} />
            <Route path="/calendar" element={<MoodCalendar />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
