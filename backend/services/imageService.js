const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const GENERATED_DIR = path.join(__dirname, '..', 'generated');

const ensureDirectoryExists = async () => {
  try {
    if (!fs.existsSync(GENERATED_DIR)) {
      await fs.promises.mkdir(GENERATED_DIR, { recursive: true });
    }
  } catch (err) {
    console.error(err.message);
    throw new Error('Failed to create generated folder');
  }
};

const saveImage = async (image) => {
  try {
    await ensureDirectoryExists();

    const filename = `${Date.now()}-${uuidv4()}.png`;
    const filePath = path.join(GENERATED_DIR, filename);

    if (typeof image === 'string' && image.startsWith('http')) {
      const response = await axios.get(image, { responseType: 'arraybuffer' });
      await fs.promises.writeFile(filePath, response.data);
    } else if (typeof image === 'string' && image.startsWith('data:image')) {
      const base64Data = image.split(',')[1];
      await fs.promises.writeFile(filePath, Buffer.from(base64Data, 'base64'));
    } else if (typeof image === 'string') {
      await fs.promises.writeFile(filePath, Buffer.from(image, 'base64'));
    } else {
      throw new Error('Invalid image data provided');
    }

    return filePath;
  } catch (err) {
    console.error(err.message);
    throw new Error('Failed to save generated image');
  }
};

module.exports = {
  saveImage,
};