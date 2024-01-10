"use server";

import * as z from "zod";

import { ForgotPasswordFormSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const ForgotPassword = async (
  data: z.infer<typeof ForgotPasswordFormSchema>
) => {
  const validatedData = ForgotPasswordFormSchema.safeParse(data);
  if (!validatedData.success) {
    return { error: "Invalid data" };
  }

  const { email } = validatedData.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return {
      error: "User does not exist, please register first",
    };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return {
    success: "Please check your email for a password reset link",
  };
};
