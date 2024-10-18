import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid Email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required "),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
