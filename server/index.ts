import { config } from './config/index';
import { Server } from './src/server';

const server = new Server;
const app = server.app;

const port = process.env.PORT || config.get('port');

console.log('NODE_ENV: ' + config.get('NODE_ENV'));
console.log('MONGODB: ' + config.get('mongoose:uri'));

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(port, () => {
   console.log('We are live on ');
});
