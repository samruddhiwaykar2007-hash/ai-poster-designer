import React, { useMemo } from "react";
import "../styles/AIPromptAssistant.css";

// AIPromptAssistant shows live suggestions as the user types a poster prompt.
// Suggestions are generated with lightweight keyword matching - no backend
// call needed, so this works instantly and never fails.
//
// prompt / onPromptChange are passed from the parent so this component
// stays in sync with PromptEnhancer, CreativityMeter, and DesignInsights -
// typing here, or hitting "Inspire Me" elsewhere, updates everything together.
const SUGGESTION_RULES = [
  { label: "Add audience", test: (p) => !/students?|kids|professionals?|women|men|families/i.test(p) },
  { label: "Mention date", test: (p) => !/\d{1,2}(st|nd|rd|th)?\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)|\d{1,2}\/\d{1,2}/i.test(p) },
  { label: "Add typography style", test: (p) => !/typograph|font|bold text|serif|sans/i.test(p) },
  { label: "Add lighting", test: (p) => !/lighting|neon|glow|cinematic|shadow/i.test(p) },
  { label: "Add colour palette", test: (p) => !/colou?r|palette|gradient|blue|purple|pink|red|orange/i.test(p) },
  { label: "Mention orientation", test: (p) => !/portrait|landscape|square|orientation/i.test(p) },
];

function AIPromptAssistant({ prompt = "", onPromptChange }) {
  const suggestions = useMemo(() => {
    if (!prompt.trim()) return SUGGESTION_RULES.map((r) => r.label);
    return SUGGESTION_RULES.filter((rule) => rule.test(prompt)).map((r) => r.label);
  }, [prompt]);

  return (
    <div className="prompt-assistant surface-card accent-purple">
      <div className="pa-header">
        <span className="pa-icon">✨</span>
        <h3>AI Prompt Assistant</h3>
      </div>

      <input
        type="text"
        className="pa-input"
        placeholder="e.g. College Fest"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
      />

      <p className="pa-label">
        {suggestions.length > 0 ? "Suggestions to strengthen your prompt:" : "Your prompt looks great!"}
      </p>

      <ul className="pa-suggestions">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="pa-suggestion-item">
            <span className="pa-check">✔</span>
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AIPromptAssistant;