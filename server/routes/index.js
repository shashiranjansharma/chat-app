import { Router } from 'express';
import { register, login, currentUserDetails, requestOtp, verifyOtp } from './controller.js';
import { verifyUser } from './middleware.js';
const routes = Router();

routes.post('/register', register);
routes.post('/login', login);
routes.post('/request-otp', requestOtp);
routes.post('/reset-password', verifyOtp);
routes.get('/user', verifyUser, currentUserDetails);

export default routes;
