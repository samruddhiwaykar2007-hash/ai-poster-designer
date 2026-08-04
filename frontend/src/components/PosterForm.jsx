import React, { useState, useMemo } from "react";

// Builds the final prompt actually sent to the AI, combining every
// field the user filled in - not just the description. Previously
// only "description" was sent, so category/size/theme were silently
// ignored by the AI even though the user picked them.
function buildFinalPrompt({ title, description, category, size, colorTheme }) {
  const parts = [];

  if (title.trim()) parts.push(title.trim());
  if (description.trim()) parts.push(description.trim());
  if (category) parts.push(`${category} category`);
  if (colorTheme) parts.push(`${colorTheme} color theme`);
  if (size) parts.push(`${size} layout`);

  return parts.join(", ");
}

// Simple rule-based expansion for short descriptions - same style
// as the homepage Prompt Enhancer, applied here to the real form.
function enhanceDescription(text) {
  const trimmed = text.trim();
  if (!trimmed) return trimmed;

  return `${trimmed}, featuring bold modern typography, professional composition, high-quality visuals and eye-catching design`;
}

function PosterForm({ onGenerate }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Business",
    size: "A4 (Portrait)",
    colorTheme: "Purple & Blue",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnhance = () => {
    setFormData((prev) => ({
      ...prev,
      description: enhanceDescription(prev.description),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onGenerate) {
      // Pass the combined prompt as the description field, so
      // api.js (which only reads posterData.description) actually
      // sends everything the user picked, not just the text box.
      onGenerate({
        ...formData,
        description: finalPrompt,
      });
    }
  };

  const finalPrompt = useMemo(() => buildFinalPrompt(formData), [formData]);

  return (
    <form className="poster-form" onSubmit={handleSubmit}>
      <h3 className="form-heading">Create a New Poster</h3>

      <div className="form-group">
        <label htmlFor="title">Poster Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="e.g. Summer Music Festival"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <div className="form-label-row">
          <label htmlFor="description">Poster Description</label>
          <button
            type="button"
            className="enhance-btn"
            onClick={handleEnhance}
            disabled={!formData.description.trim()}
          >
            ✨ Enhance with AI
          </button>
        </div>
        <textarea
          id="description"
          name="description"
          rows="3"
          placeholder="Describe what your poster should look like..."
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option>Business</option>
            <option>Event</option>
            <option>Music</option>
            <option>Education</option>
            <option>Sale & Promotion</option>
            <option>Movie</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="size">Poster Size</label>
          <select id="size" name="size" value={formData.size} onChange={handleChange}>
            <option>A4 (Portrait)</option>
            <option>A3 (Portrait)</option>
            <option>Square (1:1)</option>
            <option>Story (9:16)</option>
            <option>Landscape (16:9)</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="colorTheme">Colour Theme</label>
        <select id="colorTheme" name="colorTheme" value={formData.colorTheme} onChange={handleChange}>
          <option>Purple & Blue</option>
          <option>Warm Sunset</option>
          <option>Minimal Black & White</option>
          <option>Vibrant Neon</option>
          <option>Pastel Soft</option>
        </select>
      </div>

      {/* Live preview of exactly what gets sent to the AI */}
      {finalPrompt && (
        <div className="prompt-preview">
          <span className="prompt-preview-label">Final AI Prompt</span>
          <p className="prompt-preview-text">{finalPrompt}</p>
        </div>
      )}

      <button type="submit" className="btn-primary generate-btn">
        ✨ Generate Poster
      </button>
    </form>
  );
}

export default PosterForm;