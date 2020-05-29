import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import ServerController from '@domain/infra/http/controller/server.controller';
import Routes from './routes';
import '@domain/infra/remote';
import '@domain/container';

const app = express();
app.use(Routes);

const serverController = new ServerController();

app.use(serverController.onError);
app.listen(3333, serverController.onLog);
