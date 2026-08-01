import React from "react";

// PosterPreview displays the generated poster (or a placeholder if
// nothing has been generated yet), along with Download and Share buttons.
function PosterPreview({ poster }) {
  // Simple placeholder handlers - in a real app these would trigger
  // an actual file download or open a share dialog / copy a link.
  const handleDownload = () => {
    alert("Download started! (Connect this to your backend to enable real downloads.)");
  };

  const handleShare = () => {
    alert("Share link copied! (Connect this to your backend to enable real sharing.)");
  };

  return (
    <div className="poster-preview">
      <h3 className="form-heading">Live Preview</h3>

      <div className="preview-card">
        {poster ? (
          <div className="preview-content">
            {/* Placeholder image box representing the generated poster */}
            <div className="preview-placeholder-image">
              <span>🖼️</span>
              <p>{poster.title}</p>
            </div>
            <div className="preview-meta">
              <p><strong>Category:</strong> {poster.category}</p>
              <p><strong>Size:</strong> {poster.size}</p>
              <p><strong>Theme:</strong> {poster.colorTheme}</p>
            </div>
          </div>
        ) : (
          <div className="preview-empty">
            <span>🎨</span>
            <p>Your generated poster will appear here.</p>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="preview-actions">
        <button className="btn-primary" onClick={handleDownload} disabled={!poster}>
          ⬇ Download
        </button>
        <button className="btn-outline" onClick={handleShare} disabled={!poster}>
          🔗 Share
        </button>
      </div>
    </div>
  );
}

export default PosterPreview;
