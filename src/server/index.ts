import { Server } from './server';

const server = new Server;
const app = server.app;

app.get('/', (req, res) => {
   res.send('Hello world!');
});

app.listen(3000, () => {
   console.log('We are live on ');
});
