import nodemailer, { TransportOptions } from "nodemailer";
const { google } = require("googleapis");
import {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
} from "../config";
import { logger } from "./logger";
import { link } from "fs";
import { IToken } from "../interfaces/token.interface";
const oAuth2 = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);

oAuth2.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

export const sendmail = async (email: string, data: string) => {
  try{
    const accessToken = await oAuth2.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: GOOGLE_CLIENT_EMAIL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    } );
    const mailOptions = {
      from: "noreply@stringcode.com",
      to: email,
      subject: "Please Verify Your Account ",
      text: "Please Verify Your Account ",
      html:data
    };
 const result = await transport.sendMail(mailOptions);
 logger.info(result)
 return result;
  }catch(e){
return e;
  }
};

export const getMail = (token: IToken):string => {
  const link = `localhost:3000/verify/key?=${token.key}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            display: block;
        }
        p{
            color: rgb(10, 10, 10);
            font-size: medium;
            font-weight: 700;
        }
        .block{
            display: block;
            padding: 30px;
            width: 400px;
            margin: auto;
            margin-top: 30px;
            background-color: whitesmoke;
        
    box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
        }
        .container{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        a{
            text-decoration: none;
            background-color: rgb(60, 60, 240);
            width: 80px;
            height: 40px;
            border-radius: 5%;
            color: white;
            /* text-align: center; */
            display: grid;
            place-items: center;
        }
    </style>
</head>
<body>
    <div class="block">
        <div class="container">
             <p>Please verify your email</p>
            <a href="${link}"> Verify</a>
        </div>
    </div>
</body>
</html>`;
};
