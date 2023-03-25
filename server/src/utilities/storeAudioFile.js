import { promises as fs } from 'fs';
import path from 'path';

async function storeAudioFile(file) {
  const image = path.join(__dirname, '..', '..', 'audioFiles', `${fileName}.mp3`);

  const audioFiles = path.join(__dirname, '..', '..', 'audioFiles');

  //creates a folder for the audio files if it doesnt exist
  try {
    await fs.access(audioFiles);
  } catch (err) {
    fs.mkdir(audioFiles);
  }

}

export default storeAudioFile;
