import { db } from "@/lib/db";

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordRestToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    return passwordRestToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordRestToken = await db.passwordResetToken.findFirst({
      where: { email },
    });

    return passwordRestToken;
  } catch {
    return null;
  }
};
