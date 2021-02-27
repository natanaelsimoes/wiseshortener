import http from 'http';
import App from './App';

const Server = http.createServer(App);

Server.listen(process.env.PORT || 8081, () => {
  console.log('Server running in %s mode at port %s', 
  process.env.NODE_ENV ?? 'development', 
  process.env.PORT || 8081);
});