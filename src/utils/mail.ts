import nodemailer, { TransportOptions } from 'nodemailer';
const { google } = require('googleapis');
import {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL,
  GOOGLE_REFRESH_TOKEN,
} from '../config';
import { logger } from './logger';
import { IToken } from '../interfaces/token.interface';
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

  return `<!DOCTYPE html>
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <title> </title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
      p {
        display: block;
        margin: 13px 0;
      }
    </style>
    <!--[if mso]>
      <noscript>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      </noscript>
    <![endif]-->
    <!--[if lte mso 11]>
      <style type="text/css">
        .mj-outlook-group-fix {
          width: 100% !important;
        }
      </style>
    <![endif]-->

    <!--[if !mso]><!-->
    <link
      href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@200&display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
      @import url(https://fonts.googleapis.com/css2?family=Fira+Sans:wght@200&display=swap);
    </style>
    <!--<![endif]-->

    <style type="text/css">
      @media only screen and (min-width: 480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
    </style>

    <style type="text/css"></style>
    <style type="text/css"></style>
  </head>
  <body style="word-spacing: normal; background-color: #4169e1">
    <div style="background-color: #4169e1">
      <!-- Header -->

      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

      <div style="margin: 0px auto; max-width: 600px">
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 0px;
                  text-align: center;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->

                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Fira Sans;
                              font-size: 15px;
                              font-weight: 900;
                              line-height: 1;
                              text-align: center;
                              color: white;
                            "
                          >
                            ABCD Team
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 20;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                            word-break: break-word;
                          "
                        >
                          <p
                            style="
                              border-top: solid 1px #f8f8f8;
                              font-size: 1px;
                              margin: 0px auto;
                              width: 100%;
                            "
                          ></p>

                          <!--[if mso | IE
                            ]><table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                border-top: solid 1px #f8f8f8;
                                font-size: 1px;
                                margin: 0px auto;
                                width: 600px;
                              "
                              role="presentation"
                              width="600px"
                            >
                              <tr>
                                <td style="height: 0; line-height: 0">
                                  &nbsp;
                                </td>
                              </tr>
                            </table><!
                          [endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#fcfcfc" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

      <div
        style="
          background: #fcfcfc;
          background-color: #fcfcfc;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: #fcfcfc; background-color: #fcfcfc; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  padding-bottom: 0px;
                  text-align: center;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->

                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Fira Sans;
                              font-size: 20px;
                              font-weight: 900;
                              line-height: 1;
                              text-align: center;
                              color: #222222;
                            "
                          >
                            Verify your email address
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 20;
                            padding-right: 0px;
                            padding-bottom: 0px;
                            padding-left: 0px;
                            word-break: break-word;
                          "
                        >
                          <p
                            style="
                              border-top: solid 1px #f8f8f8;
                              font-size: 1px;
                              margin: 0px auto;
                              width: 100%;
                            "
                          ></p>

                          <!--[if mso | IE
                            ]><table
                              align="center"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              style="
                                border-top: solid 1px #f8f8f8;
                                font-size: 1px;
                                margin: 0px auto;
                                width: 600px;
                              "
                              role="presentation"
                              width="600px"
                            >
                              <tr>
                                <td style="height: 0; line-height: 0">
                                  &nbsp;
                                </td>
                              </tr>
                            </table><!
                          [endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--[if mso | IE]></td></tr></table><![endif]-->

      <!-- Article -->

      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="white" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->

      <div
        style="
          background: white;
          background-color: white;
          margin: 0px auto;
          max-width: 600px;
        "
      >
        <table
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background: white; background-color: white; width: 100%"
        >
          <tbody>
            <tr>
              <td
                style="
                  direction: ltr;
                  font-size: 0px;
                  padding: 20px 0;
                  text-align: center;
                "
              >
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->

                <div
                  class="mj-column-per-100 mj-outlook-group-fix"
                  style="
                    font-size: 0px;
                    text-align: left;
                    direction: ltr;
                    display: inline-block;
                    vertical-align: top;
                    width: 100%;
                  "
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    style="vertical-align: top"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 30px;
                            padding-left: 30px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Fira Sans;
                              font-size: 13px;
                              font-weight: 700;
                              line-height: 10px;
                              text-align: center;
                              color: grey;
                            "
                          >
                            You've entered ${email} as the email address
                            for your account
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 30px;
                            padding-left: 30px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Fira Sans;
                              font-size: 13px;
                              font-weight: 700;
                              line-height: 10px;
                              text-align: center;
                              color: grey;
                            "
                          >
                            Please verify this email address by clicking the
                            button below
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          vertical-align="middle"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 20px;
                            padding-bottom: 20px;
                            word-break: break-word;
                          "
                        >
                          <table
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="border-collapse: separate; line-height: 100%"
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  bgcolor="#4169e1"
                                  role="presentation"
                                  style="
                                    border: none;
                                    border-radius: 3px;
                                    cursor: auto;
                                    mso-padding-alt: 10px 25px;
                                    background: #4169e1;
                                  "
                                  valign="middle"
                                >
                                  <a
                                    href="${link}"
                                    style="
                                      display: inline-block;
                                      background: #4169e1;
                                      color: #ffffff;
                                      font-family: Ubuntu, Helvetica, Arial,
                                        sans-serif;
                                      font-size: 13px;
                                      font-weight: normal;
                                      line-height: 120%;
                                      margin: 0;
                                      text-decoration: none;
                                      text-transform: none;
                                      padding: 10px 25px;
                                      mso-padding-alt: 0px;
                                      border-radius: 3px;
                                    "
                                    target="_blank"
                                  >
                                    Verify your email
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 30px;
                            padding-left: 30px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Fira Sans;
                              font-size: 13px;
                              font-weight: 700;
                              line-height: 10px;
                              text-align: center;
                              color: grey;
                            "
                          >
                            or you can copy and paste the link in your browser
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="center"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-right: 30px;
                            padding-left: 30px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Fira Sans;
                              font-size: 13px;
                              font-weight: 700;
                              line-height: 10px;
                              text-align: center;
                              color: blue;
                            "
                          >
                          ${link}
                          </div>
                        </td>
                      </tr>

                      <tr>
                        <td
                          align="left"
                          style="
                            font-size: 0px;
                            padding: 10px 25px;
                            padding-top: 40px;
                            word-break: break-word;
                          "
                        >
                          <div
                            style="
                              font-family: Fira Sans;
                              font-size: 13px;
                              font-weight: 700;
                              line-height: 20px;
                              text-align: left;
                              color: grey;
                            "
                          >
                            Thanks, ABCD Medicals
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!--[if mso | IE]></td></tr></table><![endif]-->

      <!-- <mj-section background-color="#f3f3f3">
      <mj-column>
        <mj-text align="center" font-family="Nexa">Stay in touch!</mj-text>
        <mj-social mode="horizontal" border-radius="100%" icon-size="30px">
          <mj-social-element name="twitter" href="https://twitter.com/jetoken1"></mj-social-element>
          <mj-social-element name="facebook" href="https://www.facebook.com/groups/925689687581055"></mj-social-element>
          <mj-social-element name="instagram" href="https://www.instagram.com/jetoken/?r=nametag&fbclid=IwAR3aLcTcZLs8Mhdw0EZ72--1LYsgHskJYIB9jwzT6ufow4vqwdag3oAyiGM"></mj-social-element>
        </mj-social>
      </mj-column>
    </mj-section> -->
    </div>
  </body>
</html>
`;
};
