import { config } from './config/index';
import { Server } from './src/server';

const server = new Server;
const app = server.app;

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(config.get('port'), () => {
   console.log('We are live on ');
});
