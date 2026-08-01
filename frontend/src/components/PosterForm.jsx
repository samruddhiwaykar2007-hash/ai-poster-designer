import React, { useState } from "react";

// PosterForm collects all the details needed to generate an AI poster:
// title, description, category, size, and color theme.
// The "onGenerate" prop is a callback passed from the parent (Dashboard)
// so the parent can react when the user clicks "Generate".
function PosterForm({ onGenerate }) {
  // Local state for each form field
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Business",
    size: "A4 (Portrait)",
    colorTheme: "Purple & Blue",
  });

  // Generic change handler - updates the matching field in formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // In a real app, this is where you'd call your backend/AI API.
    // For now, we simply pass the form data up to the parent component.
    if (onGenerate) {
      onGenerate(formData);
    }
  };

  return (
    <form className="poster-form" onSubmit={handleSubmit}>
      <h3 className="form-heading">Create a New Poster</h3>

      {/* Poster Title */}
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

      {/* Poster Description */}
      <div className="form-group">
        <label htmlFor="description">Poster Description</label>
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

      {/* Category + Size side by side */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
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
          <select
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option>A4 (Portrait)</option>
            <option>A3 (Portrait)</option>
            <option>Square (1:1)</option>
            <option>Story (9:16)</option>
            <option>Landscape (16:9)</option>
          </select>
        </div>
      </div>

      {/* Color Theme */}
      <div className="form-group">
        <label htmlFor="colorTheme">Colour Theme</label>
        <select
          id="colorTheme"
          name="colorTheme"
          value={formData.colorTheme}
          onChange={handleChange}
        >
          <option>Purple & Blue</option>
          <option>Warm Sunset</option>
          <option>Minimal Black & White</option>
          <option>Vibrant Neon</option>
          <option>Pastel Soft</option>
        </select>
      </div>

      {/* Generate Button */}
      <button type="submit" className="btn-primary generate-btn">
        ✨ Generate Poster
      </button>
    </form>
  );
}

export default PosterForm;
