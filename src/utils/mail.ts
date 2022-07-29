import nodemailer, { TransportOptions } from 'nodemailer';
const { google } = require('googleapis');
import {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
} from '../config';
import fs from 'fs';
import Handlebars from 'handlebars';
import { IToken } from '../interfaces/token.interface';
import path from 'path';
const oAuth2 = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
);

oAuth2.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export const sendmail = async (email: string, data: string) => {
  try {
    const accessToken = await oAuth2.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: GOOGLE_CLIENT_EMAIL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mailOptions = {
      from: 'noreply@stringcode.com',
      to: email,
      subject: 'Please Verify Your Account ',
      text: 'Please Verify Your Account ',
      html: data,
    };
    const result = await transport.sendMail(mailOptions);
    console.log(result.accepted);
    
    return result;
  } catch (e) {
    return e;
  }
};

export const getMailForVerify = (token: IToken, email): string => {
  const link = `https://brilliant-beijinho-78dad5.netlify.app/verify/key?=${token.key}`;
  const source = fs.readFileSync(path.join(__dirname, '/templates/verifyEmail.hbs'), 'utf8');
  const template = Handlebars.compile(source)
  return template({link,email})
};
