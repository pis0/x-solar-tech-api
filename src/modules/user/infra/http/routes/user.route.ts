import express, { Router } from 'express';
import UserController from '../controllers/user.controller';

const UserRoute = Router();

const userController = new UserController();

UserRoute.use('/:id', userController.validateUserId);
UserRoute.use(express.json());

UserRoute.post('/', userController.create);

export default UserRoute;
