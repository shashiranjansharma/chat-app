import { Router } from 'express';
import { register, login } from './controller.js';
import { verifyUser } from './middleware.js';
const routes = Router();

routes.post('/register', register);
routes.post('/login', login);

routes.get('/user', verifyUser, (r, s) => {
  s.status(200).send({ message: 'Hi' });
});

export default routes;
