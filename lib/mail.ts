import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVereficationEmail = async (email: string, token: string) => {
    const ConformationLink = `http://localhost:3000/new-verification?token=${token}`

    await resend.emails.send({
        from: "verification@cappybaralab.me",
        to: email,
        subject: "Email Verification",
        html: `<a href="${ConformationLink}">Click Here</a>`
    })

};
