import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//Register user controller
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, profile } = req.body;
    const user = await UserModel.findOne({ email });
    if (user?.email) {
      res.status(400).send({ message: 'User already registered with same email.' });
      return;
    }
    if (!password?.trim()) {
      res.status(400).send({ message: 'Password is required' });
    } else {
      const pass = await bcrypt.hash(password, 12);
      const payload = new UserModel({
        name,
        email,
        phone,
        password: pass,
        profile
      });
      const x = await payload.save();
      console.log('User', x);
      if (x) res.status(201).send({ message: `Welcome ${name}, you are registed now.` });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

//Login user controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user?.email) {
      res.status(401).send({ message: 'Email or Password is not valid.' });
      return;
    } else {
      const pass = await bcrypt.compare(password, user.password);
      if (pass) {
        const token = jwt.sign(
          {
            email: user.email,
            id: user._id
          },
          'CHATAPP',
          { expiresIn: 60 * 60 }
        );
        res.status(201).send({ message: `Welcome back ${user.name}`, token });
      } else res.status(401).send({ message: 'Email or Password is not valid.' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};
