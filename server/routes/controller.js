import UserModel from '../models/user.js';
import OtpModel from '../models/otp.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sendMail from '../service/sendmail.js';

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

export const currentUserDetails = async (req, res) => {
  try {
    const { email } = req.validUser;
    const user = await UserModel.findOne({ email });
    if (user?.email) {
      const { email, name, profile, _id } = user;
      res.status(201).send({ email, name, profile, id: _id });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
};

export async function requestOtp(req, res) {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).send({ message: 'Invalid request, Email is required to send OTP' });
    const user = await UserModel.findOne({ email });
    const tempOtp = await OtpModel.findOne({ email });
    if (tempOtp) {
      await OtpModel.findOneAndDelete({ email: tempOtp.email });
    }
    if (user?.email) {
      const { email, name } = user;
      const otp = Math.floor(100000 + Math.random() * 900000);
      const encriptedOtp = await bcrypt.hash(otp.toString(), 12);
      const payload = new OtpModel({
        otp: encriptedOtp,
        email: email
      });
      await payload.save();
      await sendMail(email, name, otp);
      res.status(200).send({ message: 'OTP has been sent to your registered email.' });
    } else res.status(200).send({ message: 'OTP has been sent to your registered email.' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
}

export async function verifyOtp(req, res) {
  try {
    const { otp, password, email } = req.body;
    if (!email || !otp)
      return res
        .status(400)
        .send({ message: 'Invalid request, Email and OTP are required for verification' });
    const user = await OtpModel.findOne({ email });
    if (user?.createdAt <= 0) return res.status(200).send({ message: 'OTP has been expired.' });
    if (user?.email) {
      const isValid = await bcrypt.compare(otp, user.otp);
      console.log(isValid);
      if (isValid) {
        const pass = await bcrypt.hash(password, 12);
        const x = await UserModel.findOneAndUpdate({ email }, { password: pass });
        if (x)
          return res.status(201).send({ message: `Your password has been updated successfully.` });
      } else res.status(400).send({ message: 'Invalid otp' });
    } else res.status(400).send({ message: 'Invalid email' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: error.message });
  }
}
