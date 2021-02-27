import express from 'express';
import CORS from 'cors';
import Helmet from 'helmet';
import Compression from 'compression';
import Routes from './Routes';

const App = express();

App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(Helmet());
App.use(Compression());
App.use(CORS());
App.use('/', Routes);

export default App;
