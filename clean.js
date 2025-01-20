import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function deleteFolderRecursive(folderPath) {
  try {
    const files = await fs.readdir(folderPath);
    for (const file of files) {
      const curPath = path.join(folderPath, file);
      const stats = await fs.lstat(curPath);
      if (stats.isDirectory()) {
        await deleteFolderRecursive(curPath);
      } else {
        await fs.unlink(curPath);
      }
    }
    await fs.rmdir(folderPath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error while deleting ${folderPath}: ${err.message}`);
    }
  }
}

console.log('Cleaning .next directory...');
await deleteFolderRecursive(path.join(__dirname, '.next'));
console.log('Cleaning complete.');

