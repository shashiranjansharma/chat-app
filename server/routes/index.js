import { Router } from 'express';
import { register, login, currentUserDetails } from './controller.js';
import { verifyUser } from './middleware.js';
const routes = Router();

routes.post('/register', register);
routes.post('/login', login);

routes.get('/user', verifyUser, currentUserDetails);

export default routes;
