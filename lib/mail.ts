import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVereficationEmail = async (email: string, token: string) => {
  const ConformationLink = `http://localhost:3000/new-verification?token=${token}`;

  await resend.emails.send({
    from: "verification@cappybaralab.me",
    to: email,
    subject: "Email Verification",
    html: `<a href="${ConformationLink}">Click Here</a>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const PasswordResetLink = `http://localhost:3000/new-password?token=${token}`;

  await resend.emails.send({
    from: "verification@cappybaralab.me",
    to: email,
    subject: "Password Reset",
    html: `<a href="${PasswordResetLink}">Click Here</a>`,
  });
};
