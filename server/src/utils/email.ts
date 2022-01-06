import nodemailer from 'nodemailer';

type MailOptions = {
    email: string;
    subject: string;
    message: string;
}

const sendEmail = async (options: MailOptions) => {
    // 1. Create a transporter
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST as string,
        port: parseInt(process.env.EMAIL_PORT as string),
        auth: {
            user: process.env.EMAIL_USERNAME as string,
            pass: process.env.EMAIL_PASSWORD as string
        }
    });

    // 2. Define the email options
    const mailOptions = {
        from: 'Gatlin Notify <noreply@gatlin.notify>',
        to: options.email,
        subject: options.subject,
        text: options.message
    };

    // 3. Send the email with nodemailer
    await transporter.sendMail(mailOptions);
}

export default sendEmail;