const nodemailer = require("nodemailer");

module.exports = async (userEmail, subject, htmlTemplate) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL, // Replace with your actual email alias
        pass: process.env.USER_PASS, // Replace with your actual application-specific password
      },
      authMethod: "LOGIN", // Explicitly specify the authentication method
    });

    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: userEmail,
      subject: subject,
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(info.response);
  } catch (error) {
    console.log(error);
    throw new Error("Nodemailer not wokring");
  }
};
