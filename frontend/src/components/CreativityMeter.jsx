import React, { useState, useMemo } from "react";
import "../styles/CreativityMeter.css";

// CreativityMeter analyses a prompt and shows 5 animated score bars.
// Scores are computed with lightweight heuristics - not a real ML model,
// but they genuinely respond to what's typed rather than being hardcoded.
function scorePrompt(prompt) {
  const text = prompt.toLowerCase().trim();
  const wordCount = text ? text.split(/\s+/).length : 0;

  const hasColour = /colou?r|palette|gradient|blue|purple|pink|red|orange|green|yellow/.test(text);
  const hasStyle = /modern|minimal|vintage|cinematic|bold|elegant|professional|vibrant/.test(text);
  const hasAudience = /students?|kids|professionals?|women|men|families|startup|business/.test(text);
  const hasLighting = /lighting|neon|glow|shadow|bright|dark/.test(text);
  const hasLayout = /portrait|landscape|square|layout|orientation/.test(text);

  const richness = [hasColour, hasStyle, hasAudience, hasLighting, hasLayout].filter(Boolean).length;

  const creativity = Math.min(100, 30 + wordCount * 4 + (hasStyle ? 15 : 0));
  const professionalism = Math.min(100, 25 + (hasAudience ? 25 : 0) + (hasStyle ? 20 : 0) + wordCount * 2);
  const readability = wordCount === 0 ? 0 : Math.min(100, 100 - Math.max(0, wordCount - 20) * 2);
  const colourHarmony = Math.min(100, 20 + (hasColour ? 45 : 0) + (hasLighting ? 20 : 0));
  const marketingScore = Math.min(100, 15 + richness * 16 + wordCount * 2);

  return [
    { label: "Creativity", value: Math.round(creativity), color: "var(--color-purple)" },
    { label: "Professionalism", value: Math.round(professionalism), color: "var(--color-sky)" },
    { label: "Readability", value: Math.round(readability), color: "var(--color-green)" },
    { label: "Colour Harmony", value: Math.round(colourHarmony), color: "var(--color-pink)" },
    { label: "Marketing Score", value: Math.round(marketingScore), color: "var(--color-cyan)" },
  ];
}

function CreativityMeter({ prompt = "" }) {
  const scores = useMemo(() => scorePrompt(prompt), [prompt]);

  return (
    <div className="creativity-meter surface-card accent-cyan">
      <div className="cm-header">
        <span className="cm-icon">📊</span>
        <h3>AI Creativity Meter</h3>
      </div>

      <div className="cm-bars">
        {scores.map((score) => (
          <div className="cm-bar-row" key={score.label}>
            <div className="cm-bar-label">
              <span>{score.label}</span>
              <span className="cm-bar-value">{score.value}%</span>
            </div>
            <div className="cm-bar-track">
              <div
                className="cm-bar-fill"
                style={{ width: `${score.value}%`, background: score.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreativityMeter;