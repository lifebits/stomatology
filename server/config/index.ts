import * as nconf from 'nconf';
import * as path from 'path';

export const config = nconf.argv()
   .env()
   .file({ file: path.join(__dirname, 'config.json') });
