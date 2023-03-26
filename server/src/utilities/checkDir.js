import { promises as fs } from 'fs';
import path from 'path';

async function checkDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch (err) {
    fs.mkdir(dirPath);
  }

}

export default checkDir;
