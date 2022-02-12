import fs from 'fs';
import path from 'path';

/**
 * Ensure a directory exists.
 *
 * @param {string} directory Path to the directory that should exists. If a file
 *                           path is given, its parent directory will be
 *                           "ensured".
 */
const ensureDir = (directory) => {
  const dirPath = path.dirname(directory);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};
export default ensureDir;
