import nodemailer from 'nodemailer';

const user = process.env.GMAIL_EMAIL;
const pass = process.env.GMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // secure:true for port 465, secure:false for port 587
  tls: { rejectUnauthorized: false },
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user,
    pass
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, name, otp) {
  const info = await transporter.sendMail({
    from: 'no-reply@chatapp.com', // sender address
    to, // list of receivers
    subject: 'Reset Password OTP',
    text: `Hi ${name}, your one time passowrd for reset password is ${otp}`, // plain text body
    html: `<p>Hi ${name},</p><br><p>your one time passowrd for reset password is ${otp}</p>` // html body
  });
  console.log('Message sent: %s', info);
}

export default sendMail;
