const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
};

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const crew = await Crew.findOne({ email });
    if (!crew) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    crew.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    crew.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await crew.save();

    // Send reset email
    const resetURL = `http://localhost:3000/reset-password?token=${resetToken}`;
    await sendEmail(email, "Password Reset Request", `Reset your password here: ${resetURL}`);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error.message });
  }
};
