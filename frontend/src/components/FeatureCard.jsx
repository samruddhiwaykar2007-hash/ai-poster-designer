import React from "react";
import "../styles/FeatureCard.css";

// FeatureCard displays one feature in the Features grid.
// Each card can have its own accent color, a short list of
// bullet points, and a "Learn More" affordance on hover.
//
// Props:
//   icon         - emoji or icon string
//   title        - feature title
//   description  - short description text
//   bullets      - optional array of short strings
//   accent       - one of: "sky" | "cyan" | "purple" | "pink" | "green" | "warning"
function FeatureCard({ icon, title, description, bullets = [], accent = "sky" }) {
  return (
    <div className={`feature-card surface-card accent-${accent}`}>
      <div className="feature-icon">{icon}</div>

      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>

      {bullets.length > 0 && (
        <ul className="feature-bullets">
          {bullets.map((bullet, index) => (
            <li key={index}>
              <span className="bullet-check">✔</span>
              {bullet}
            </li>
          ))}
        </ul>
      )}

      <div className="feature-learn-more">
        Learn More <span className="learn-more-arrow">→</span>
      </div>
    </div>
  );
}

export default FeatureCard;