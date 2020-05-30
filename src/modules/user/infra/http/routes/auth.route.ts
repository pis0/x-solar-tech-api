import express, { Router } from 'express';
import AuthController from '@modules/user/infra/http/controllers/auth.controller';


const AuthRoute = Router();
AuthRoute.use(express.json());

const authController = new AuthController();

AuthRoute.post('/', authController.create);


export default AuthRoute;
