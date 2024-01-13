import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const ConformationLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "Note Share<varification@cappybaralab.me>",
    to: email,
    subject: "Email Verification",
    html: `
    <h1>Email Verification</h1>
    <a href="${ConformationLink}">Click Here</a>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const PasswordResetLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "Note Share<varification@cappybaralab.me>",
    to: email,
    subject: "Password Reset",
    html: `
    <h1>Password Reset</h1>
    <a href="${PasswordResetLink}">Click Here</a>`,
  });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "Note Share<varification@cappybaralab.me>",
    to: email,
    subject: "2FA Code",
    html: `
    <h1>2FA Code</h1>
    <p>${token}</p>
    <p>Code will expire in 5 minutes</p>
    `
})
}

