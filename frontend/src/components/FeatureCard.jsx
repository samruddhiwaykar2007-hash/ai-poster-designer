import React from "react";

// FeatureCard is a small reusable card used to display a single feature.
// It accepts "icon", "title" and "description" as props so it can be
// reused for every feature on the Home page without repeating markup.
function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
}

export default FeatureCard;
