import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

configDotenv();

const GMAIL_ACCOUNT = process.env.GMAIL_ACCOUNT;
const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

export const sendCodeToEmail = async (
  email: string,
  name: string,
  confirmCode: string,
  type: string,
) => {
  new Promise(
    async (
      resolve: (value: string) => void,
      reject: (error: object) => void
    ) => {
      if (!email || !confirmCode) {
        return reject(new Error("Invalid email"));
      }

      const emailTransfer = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: GMAIL_ACCOUNT,
          pass: GMAIL_PASSWORD,
        },
      });

      let body = "";

      if (type == "register") {
        body = `Welcome ${name}! \r\n\n\n Your verfification code is ${confirmCode}`;
      } else {
        body = `Your verification code is ${confirmCode}`;
      }

      const emailInfo = {
        from: "info@express-server.com",
        to: email,
        subject: "Get your verification code for application!",
        text: body,
      };

      try {
        await emailTransfer.sendMail(emailInfo);
        return resolve("Success");
      } catch (err) {
        return reject(err);
      }
    }
  );
};
