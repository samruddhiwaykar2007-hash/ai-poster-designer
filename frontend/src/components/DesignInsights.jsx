import React, { useMemo } from "react";
import "../styles/DesignInsights.css";

// DesignInsights analyses the prompt and shows recommended design
// decisions - typography, colour palette, style, aspect ratio, etc.
// All values are derived from simple keyword rules on the prompt text.
function analysePrompt(prompt) {
  const text = prompt.toLowerCase().trim();
  const wordCount = text ? text.split(/\s+/).length : 0;

  let typography = "Modern Sans-Serif";
  if (/vintage|retro|classic/.test(text)) typography = "Vintage Serif";
  else if (/elegant|luxury|premium/.test(text)) typography = "Elegant Display";
  else if (/tech|startup|ai|cyberpunk/.test(text)) typography = "Futuristic Mono";
  else if (/kids|fun|festival/.test(text)) typography = "Playful Rounded";

  let colours = "Blue & Purple Gradient";
  if (/pink|fashion|luxury/.test(text)) colours = "Pink & Magenta Tones";
  else if (/food|festival|warm/.test(text)) colours = "Warm Orange & Red";
  else if (/nature|eco|green/.test(text)) colours = "Green & Earth Tones";
  else if (/night|club|neon/.test(text)) colours = "Neon Cyan & Purple";

  let style = "Minimal Modern";
  if (/cinematic|dramatic|movie/.test(text)) style = "Cinematic";
  else if (/vintage|retro/.test(text)) style = "Retro";
  else if (/corporate|business|professional/.test(text)) style = "Corporate Clean";
  else if (/festival|fun|vibrant/.test(text)) style = "Bold & Vibrant";

  let aspectRatio = "Portrait (4:5)";
  if (/landscape|banner|wide/.test(text)) aspectRatio = "Landscape (16:9)";
  else if (/square|instagram post/.test(text)) aspectRatio = "Square (1:1)";
  else if (/story|reel/.test(text)) aspectRatio = "Story (9:16)";

  const estGenTime = wordCount > 0 ? `${Math.min(18, 6 + Math.round(wordCount / 3))}s` : "—";

  const qualityScore = Math.min(100, wordCount === 0 ? 0 : 35 + wordCount * 5);
  const visualBalance = Math.min(100, wordCount === 0 ? 0 : 45 + wordCount * 3);

  return {
    typography,
    colours,
    style,
    aspectRatio,
    estGenTime,
    qualityScore,
    visualBalance,
  };
}

function DesignInsights({ prompt = "" }) {
  const insights = useMemo(() => analysePrompt(prompt), [prompt]);
  const hasPrompt = prompt.trim().length > 0;

  const rows = [
    { label: "Recommended Typography", value: insights.typography },
    { label: "Recommended Colours", value: insights.colours },
    { label: "Poster Style", value: insights.style },
    { label: "Recommended Aspect Ratio", value: insights.aspectRatio },
    { label: "Estimated Generation Time", value: insights.estGenTime },
  ];

  return (
    <div className="design-insights surface-card accent-green">
      <div className="di-header">
        <span className="di-icon">🧠</span>
        <h3>AI Design Insights</h3>
      </div>

      <div className="di-rows">
        {rows.map((row) => (
          <div className="di-row" key={row.label}>
            <span className="di-row-label">{row.label}</span>
            <span className="di-row-value">{hasPrompt ? row.value : "—"}</span>
          </div>
        ))}
      </div>

      <div className="di-scores">
        <div className="di-score-block">
          <span className="di-score-label">Prompt Quality Score</span>
          <div className="di-score-track">
            <div className="di-score-fill" style={{ width: `${insights.qualityScore}%` }}></div>
          </div>
          <span className="di-score-value">{insights.qualityScore}%</span>
        </div>

        <div className="di-score-block">
          <span className="di-score-label">Visual Balance</span>
          <div className="di-score-track">
            <div
              className="di-score-fill di-score-fill-alt"
              style={{ width: `${insights.visualBalance}%` }}
            ></div>
          </div>
          <span className="di-score-value">{insights.visualBalance}%</span>
        </div>
      </div>
    </div>
  );
}

export default DesignInsights;