import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export const verifyUser = async (req, res, next) => {
  const { Authorization, authorization } = req.headers;
  if (Authorization || authorization) {
    try {
      const { email } = await jwt.verify(Authorization || authorization, 'CHATAPP');
      if (!email) return res.status(403).send({ message: 'Authorization Failed, Login Again' });
      const validUser = await UserModel.findOne({ email });
      req.validUser = validUser;
      next();
    } catch (error) {
      console.log(error);
      res.status(403).send({ message: 'Authorization Failed, Login Again' });
    }
  } else res.status(403).send({ message: 'Authorization Failed, Login Again' });
};
