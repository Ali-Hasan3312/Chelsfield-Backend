import nodeMailer from "nodemailer";

interface EmailOptions {
  email: string;
  subject: string;
  message: string;
  attachments?: Array<{ filename: string; path: string }>; 
}

const sendEmail = async (options: EmailOptions): Promise<void> => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: Number(process.env.SMPT_PORT),
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
    attachments: options.attachments || [],
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
