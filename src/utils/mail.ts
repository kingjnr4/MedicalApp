import nodemailer from "nodemailer";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
} from "../config";
import { logger } from "./logger";
const oAuth2 = new OAuth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);
oAuth2.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export const sendmail = async (email:string,data: string) => {
  try {
    const accessToken = await oAuth2.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "onyiboixy@gmail.com",
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "noreply@stringcode.com",
      to: email,
      subject: "Please Verify Your Account ",
      text: "Please Verify Your Account ",
    };
    const result = await transport.sendMail(mailOptions);
  } catch (e) {
      logger.error(e);

    return false
  }
};
