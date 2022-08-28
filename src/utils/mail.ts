import nodemailer, {TransportOptions} from 'nodemailer';
const {google} = require('googleapis');
import {
  CPANEL_PASS,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
} from '../config';
import fs from 'fs';
import Handlebars from 'handlebars';
import {IToken} from '../interfaces/token.interface';
import path from 'path';
import Mail from 'nodemailer/lib/mailer';

export const sendmail = async (options: Mail.Options) => {
  try {
    const transport = nodemailer.createTransport({
      host: 'mail.diagnosisabc.com',
      port: 587,
      secure: false,
      auth: {
        user: 'admin@diagnosisabc.com',
        pass: CPANEL_PASS
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
    });

    const result = await transport.sendMail(options);
    console.log(result);

    return result;
  } catch (e) {
    throw e;
  }
};

export const getMailForVerify = (token: IToken, email): Mail.Options => {
  const link = `https://brilliant-beijinho-78dad5.netlify.app/auth/verify?key=${token.key}`;
  const source = fs.readFileSync(
    path.join(__dirname, '/templates/verifyEmail.hbs'),
    'utf8',
  );
  const template = Handlebars.compile(source);
  return {
    from: 'DiagnosisABC@diagnosisabc.com',
    to: email,
    subject: 'Change  Your Password ',
    text: 'Please Verify Your Account ',
    html: template({link, email}),
  };
};
export const getMailForAll = (
  email: string,
  subject: string,
  message: string,
): Mail.Options => {
  return {
    from: 'DiagnosisABC@diagnosisabc.com',
    to: email,
    subject,
    text: 'Information For All Users ',
    html: message,
  };
};
export const getMailForBlock = (
  email: string,
  reason: string,
): Mail.Options => {
  return {
    from: 'DiagnosisABC@diagnosisabc.com',
    to: email,
    subject:'Banned',
    text: 'Information For All Users ',
    html: `You have been blocked because of ${reason}`,
  };
};
export const getMailForUnBlock = (
  email: string,
): Mail.Options => {
  return {
    from: 'DiagnosisABC@diagnosisabc.com',
    to: email,
    subject:'Ban Lifted',
    text: 'Information For All Users ',
    html: `You have been unblocked`,
  };
};
export const getMailForPass = (token: IToken, email): Mail.Options => {
  const link = `https://brilliant-beijinho-78dad5.netlify.app/auth/change-password?key=${token.key}`;
  const source = fs.readFileSync(
    path.join(__dirname, '/templates/changePass.hbs'),
    'utf8',
  );
  const template = Handlebars.compile(source);
  return {
    from: 'DiagnosisABC@diagnosisabc.com',
    to: email,
    subject: 'Change your Password',
    text: 'Change your Password',
    html: template({link, email}),
  };
};
export const getAdminMailForPass = (token: IToken, email): Mail.Options => {
  const link = `https://brilliant-beijinho-78dad5.netlify.app/admin/change-password?key=${token.key}`;
  const source = fs.readFileSync(
    path.join(__dirname, '/templates/changePass.hbs'),
    'utf8',
  );
  const template = Handlebars.compile(source);
  return {
    from: 'DiagnosisABC@diagnosisabc.com',
    to: email,
    subject: 'Change your Password',
    text: 'Change your Password ',
    html: template({link, email}),
  };

};
export const getMailForInvite = (token: string, email): Mail.Options => {
  const link = `https://brilliant-beijinho-78dad5.netlify.app/admin/accept-invite?key=${token}`;
  const source = fs.readFileSync(
    path.join(__dirname, '/templates/subInvite.hbs'),
    'utf8',
  );
  const template = Handlebars.compile(source);
  return {
    from: 'DiagnosisABC@diagnosisabc.com',
    to: email,
    subject: 'Change your Password',
    text: 'Change your Password ',
    html: template({link, email}),
  };

};
