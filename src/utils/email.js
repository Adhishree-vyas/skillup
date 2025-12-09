import nodemailer from "nodemailer";

export const sendWelcomeEmail = async (toEmail, userName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // your app password
      },
    });

    const mailOptions = {
      from: `"SkillUp" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Welcome to SkillUp Platform 🎉",
      html: `
        <h2>Hello ${userName},</h2>
        <p>Welcome to <b>SkillUp</b>! Your account has been successfully created.</p>
        <p>Start exploring courses and boost your skills.</p>
        <br/>
        <p>Regards,<br/>SkillUp Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Welcome email sent!");
  } catch (error) {
    console.log("Email Error:", error.message);
  }
};
