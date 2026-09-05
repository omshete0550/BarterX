const nodemailer = require("nodemailer");

const sendEmail = async ({ to, subject, text }) => {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("SMTP is not configured.");
        }
        console.log(`Email to ${to}: ${subject}\n${text}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, text });
};

module.exports = sendEmail;
