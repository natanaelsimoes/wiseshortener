import express, { Router } from 'express';
import URLController from '../Controller/URLController';

const URLMiddleware : Router = express.Router();
URLMiddleware.get('/:hash', URLController.redirecionar);
URLMiddleware.post('/encurtador', URLController.encurtar);

export default URLMiddleware;
