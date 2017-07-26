import * as nconf from 'nconf';
import * as path from 'path';

const ENV = String(process.env.NODE_ENV).trim();
const FILE_PATH = (ENV === 'dev') ? path.join(__dirname, 'config.json') : 'config.json';

export const config = nconf.argv()
   .env()
   .file({ file: FILE_PATH });
