import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "email must be a string",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  name: z
  .string({
    invalid_type_error: "name must be a string",
  })
  .min(1, {
    message: "Name is required",
  })
  .regex(/^[A-Za-z ]*$/, {
    message: "Name must only contain letters",
  }),
});


export const ForgotPasswordFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});