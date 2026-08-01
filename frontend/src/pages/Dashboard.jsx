import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PosterForm from "../components/PosterForm.jsx";
import PosterPreview from "../components/PosterPreview.jsx";
import { generatePoster } from "../services/api.js";
import "../styles/Dashboard.css";

// Dashboard is the main workspace for a logged-in user.
// It shows a greeting, statistics, recent posters, quick actions,
// the poster creation form, and recent activity.
function Dashboard() {
  // Tracks whether the "Create Poster" form panel is open
  const [showForm, setShowForm] = useState(false);

  // Holds the most recently "generated" poster so PosterPreview can show it
  const [generatedPoster, setGeneratedPoster] = useState(null);

  const navigate = useNavigate();

  // Sample statistics data (would come from your backend in a real app)
  const stats = [
    { label: "Posters Created", value: 24, icon: "🖼️" },
    { label: "Downloads", value: 58, icon: "⬇️" },
    { label: "Shared Links", value: 12, icon: "🔗" },
    { label: "Credits Left", value: 40, icon: "⚡" },
  ];

  // Sample recent posters data
  const recentPosters = [
    { id: 1, title: "Summer Music Fest", category: "Music", date: "2 days ago" },
    { id: 2, title: "Grand Opening Sale", category: "Sale & Promotion", date: "4 days ago" },
    { id: 3, title: "Tech Conference 2026", category: "Business", date: "1 week ago" },
    { id: 4, title: "College Fest Poster", category: "Event", date: "2 weeks ago" },
  ];

  // Sample recent activity feed
  const recentActivity = [
    { id: 1, text: "You generated 'Summer Music Fest'", time: "2 hours ago" },
    { id: 2, text: "You downloaded 'Grand Opening Sale'", time: "1 day ago" },
    { id: 3, text: "You shared 'Tech Conference 2026'", time: "3 days ago" },
    { id: 4, text: "You updated your profile picture", time: "5 days ago" },
  ];

  // Called by PosterForm when the user clicks "Generate Poster"
  const handleGenerate = async (posterData) => {
    try {
      const result = await generatePoster(posterData);
      setGeneratedPoster(result);
    } catch (error) {
      console.error(error);
      alert("Failed to generate poster");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* ================= GREETING ================= */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-greeting">Welcome back, Samruddhi 👋</h1>
            <p className="dashboard-subtext">Here's what's happening with your posters today.</p>
          </div>
          <button
            className="btn-primary create-poster-btn"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Close Form" : "+ Create Poster"}
          </button>
        </div>

        {/* ================= STATISTICS CARDS ================= */}
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <div>
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= POSTER CREATION PANEL ================= */}
        {showForm && (
          <div className="poster-panel">
            <PosterForm onGenerate={handleGenerate} />
            <PosterPreview poster={generatedPoster} />
          </div>
        )}

        {/* ================= QUICK ACTIONS ================= */}
        <div className="dashboard-section">
          <h2 className="dashboard-section-title">Quick Actions</h2>
          <div className="quick-actions-grid">
            <button className="quick-action-card" onClick={() => setShowForm(true)}>
              <span>🎨</span>
              <p>New Poster</p>
            </button>
          </div>
        </div>

        {/* ================= RECENT POSTERS + ACTIVITY ================= */}
        <div className="dashboard-two-col">
          {/* Recent Posters */}
          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Recent Posters</h2>
            <div className="recent-posters-grid">
              {recentPosters.map((poster) => (
                <div className="recent-poster-card" key={poster.id}>
                  <div className="recent-poster-thumb">🖼️</div>
                  <h4>{poster.title}</h4>
                  <p className="recent-poster-meta">
                    {poster.category} • {poster.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section">
            <h2 className="dashboard-section-title">Recent Activity</h2>
            <ul className="activity-list">
              {recentActivity.map((activity) => (
                <li className="activity-item" key={activity.id}>
                  <span className="activity-dot"></span>
                  <div>
                    <p>{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;