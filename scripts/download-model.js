import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// URL of a free, realistic human body model (replace with actual URL)
const MODEL_URL = 'https://sketchfab.com/3d-models/sculpting-a-human-body-a24baf3514834527972bffdad882258e/download';

// Ensure the public/models directory exists
const modelDir = path.join(process.cwd(), 'public', 'models');
if (!fs.existsSync(modelDir)) {
  fs.mkdirSync(modelDir, { recursive: true });
}

// Download the model
const file = fs.createWriteStream(path.join(modelDir, 'human_body.glb'));
https.get(MODEL_URL, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Model downloaded successfully');
  });
}).on('error', (err) => {
  fs.unlink(path.join(modelDir, 'human_body.glb'), (unlinkErr) => {
    if (unlinkErr) console.error('Error deleting file:', unlinkErr);
  });
  console.error('Error downloading model:', err);
}); 