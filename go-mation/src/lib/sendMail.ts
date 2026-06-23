import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendMail = async (to: string, subject: string, text: string) => {
  await transporter.sendMail({
    from: `GoMation <${process.env.EMAIL}>`,
    to,
    subject,
    html: text,
  });
};