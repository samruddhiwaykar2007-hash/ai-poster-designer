// Uses Pollinations.ai's free image generation API - no API key needed.
// The prompt text is sent directly to their model, so the returned
// image genuinely reflects what the user typed.
const generatePoster = async (prompt) => {
  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("A valid prompt is required");
    }

    const encodedPrompt = encodeURIComponent(prompt.trim());
    const seed = Math.floor(Math.random() * 100000);
    const width = 1024;
    const height = 1024;

    // Pollinations serves the generated image directly at this URL -
    // no separate download/upload step needed. We just store the URL.
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

    return { imageUrl };
  } catch (err) {
    console.error(err.message);
    throw new Error("Failed to generate poster image");
  }
};

module.exports = {
  generatePoster,
};