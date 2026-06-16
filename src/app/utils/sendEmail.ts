import nodemailer from "nodemailer";
import config from "../config/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  auth: {
    user: config.smtp_user,
    pass: config.smtp_pass
  },
});

export const sendMail = async(to : string, subject : string , html : string)=>{
    try {
  const info = await transporter.sendMail({
    from: config.smtp_user,
    to,
    subject,
    text: "Reset your password within 10 minutes", 
    html,
  });

} catch (err) {
  console.error("Error while sending mail:", err);
}
}