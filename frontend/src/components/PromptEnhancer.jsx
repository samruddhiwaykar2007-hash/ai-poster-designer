import React, { useState, useEffect } from "react";
import "../styles/PromptEnhancer.css";

// PromptEnhancer asks two guided questions - "what do you want?" and
// "which theme?" - plus a mood picker that lets users click an emoji
// to instantly add a matching descriptive word to the theme field,
// instead of typing it out.
const INSPIRE_IDEAS = [
  { subject: "AI Startup Conference", theme: "futuristic and tech" },
  { subject: "Luxury Fashion Sale", theme: "elegant and minimal" },
  { subject: "Cyberpunk Gaming Tournament", theme: "neon and dark" },
  { subject: "Food Festival", theme: "warm and vibrant" },
  { subject: "Music Concert", theme: "bold and energetic" },
  { subject: "College Hackathon", theme: "modern and playful" },
  { subject: "Business Summit", theme: "corporate and clean" },
];

// Each mood maps an emoji to a descriptive word that gets appended
// to whatever the user has already typed in the theme field.
const MOODS = [
  { emoji: "🔥", label: "Bold", word: "bold" },
  { emoji: "✨", label: "Elegant", word: "elegant" },
  { emoji: "🌙", label: "Dark", word: "dark and moody" },
  { emoji: "🌈", label: "Vibrant", word: "vibrant and colourful" },
  { emoji: "🌿", label: "Calm", word: "soft and calming" },
  { emoji: "⚡", label: "Energetic", word: "energetic" },
  { emoji: "🕰️", label: "Vintage", word: "vintage and retro" },
  { emoji: "🚀", label: "Futuristic", word: "futuristic" },
];

function enhancePrompt(subject, theme) {
  if (!subject.trim()) return { text: "", improvement: 0 };

  const themePart = theme.trim() ? `with a ${theme.toLowerCase()} theme` : "";

  const enhanced = `Create a vibrant ${subject.toLowerCase()} poster ${themePart}, featuring energetic visuals, modern typography, colourful lighting, cinematic atmosphere and Instagram portrait layout.`;

  const wordCount = (subject + " " + theme).trim().split(/\s+/).length;
  const improvement = Math.min(85, 40 + Math.max(0, 10 - wordCount) * 4);

  return { text: enhanced.replace(/\s+/g, " ").trim(), improvement };
}

function PromptEnhancer({ onPromptChange }) {
  const [subject, setSubject] = useState("");
  const [theme, setTheme] = useState("");
  const [activeMoods, setActiveMoods] = useState([]);

  const enhanced = enhancePrompt(subject, theme);

  useEffect(() => {
    const combined = [subject, theme].filter(Boolean).join(" - ");
    onPromptChange(combined);
  }, [subject, theme, onPromptChange]);

  const handleInspireMe = () => {
    const idea = INSPIRE_IDEAS[Math.floor(Math.random() * INSPIRE_IDEAS.length)];
    setSubject(idea.subject);
    setTheme(idea.theme);
    setActiveMoods([]);
  };

  // Toggling a mood adds/removes its word from the theme field,
  // rather than replacing whatever's already typed.
  const toggleMood = (mood) => {
    setActiveMoods((prev) => {
      const isActive = prev.includes(mood.label);
      const nextMoods = isActive
        ? prev.filter((m) => m !== mood.label)
        : [...prev, mood.label];

      const words = MOODS.filter((m) => nextMoods.includes(m.label)).map((m) => m.word);
      setTheme(words.join(", "));

      return nextMoods;
    });
  };

  return (
    <div className="prompt-enhancer surface-card accent-pink">
      <div className="pe-header">
        <span className="pe-icon">🪄</span>
        <h3>Prompt Enhancer</h3>
      </div>

      <div className="pe-question">
        <label>1. What actually do you want?</label>
        <input
          type="text"
          className="pe-input"
          placeholder="e.g. College Fest"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>

      <div className="pe-question">
        <label>2. Which theme do you wished?</label>
        <input
          type="text"
          className="pe-input"
          placeholder="e.g. Neon and vibrant"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        />
      </div>

      {/* Mood picker - click an emoji to add its mood word to the theme */}
      <div className="pe-mood-picker">
        <span className="pe-mood-label">Or pick a mood:</span>
        <div className="pe-mood-grid">
          {MOODS.map((mood) => (
            <button
              type="button"
              key={mood.label}
              className={`pe-mood-btn ${activeMoods.includes(mood.label) ? "active" : ""}`}
              onClick={() => toggleMood(mood)}
            >
              <span className="pe-mood-emoji">{mood.emoji}</span>
              {mood.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pe-actions">
        <button className="pe-inspire-btn" onClick={handleInspireMe}>
          🎲 Inspire Me
        </button>
      </div>

      {enhanced.text && (
        <div className="pe-result">
          <div className="pe-result-header">
            <span>Enhanced Prompt</span>
            <span className="pe-improvement">Prompt Improved +{enhanced.improvement}%</span>
          </div>
          <p className="pe-result-text">{enhanced.text}</p>
        </div>
      )}
    </div>
  );
}

export default PromptEnhancer;