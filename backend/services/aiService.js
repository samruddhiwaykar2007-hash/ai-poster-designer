// TEMPORARY FALLBACK VERSION
// Uses a placeholder image service instead of OpenAI DALL-E,
// so the full pipeline (frontend -> backend -> MongoDB -> image display)
// works end-to-end for demo/submission purposes.

const generatePoster = async ({ title, description, theme, category, size }) => {
  try {
    // Create a random seed so each generated poster looks different
    const seed = Math.floor(Math.random() * 1000);

    // Picsum gives free placeholder images, no API key needed
    const width = 1024;
    const height = 1024;
    const imageUrl = `https://picsum.photos/seed/${seed}/${width}/${height}`;

    return { imageUrl };
  } catch (err) {
    console.error(err.message);
    throw new Error('Failed to generate poster image');
  }
};

module.exports = {
  generatePoster,
};