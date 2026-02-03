import nodemailer, { type Transporter } from "nodemailer";

interface MailOptions {
    email: string;
    title: string;
    body: string;
}


// reusable transporter (created once )
const transporter: Transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

// send email utility 
const mailSender = async ({
    email,
    title,
    body,
}: MailOptions): Promise<boolean> => {
    try {
        let info = await transporter.sendMail({
            from: `"StudyNotion" <${process.env.MAIL_USER}>`,
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log(info);
        return true;

    } catch (error) {
        console.log("Mail Sender Error:", error);
        return false;
    }
};
export default mailSender;