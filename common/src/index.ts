import z from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export type SignupInput = z.infer<typeof signupInput>;

export const signinInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type SigninInput = z.infer<typeof signinInput>;

export const updateInput = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type UpdateInput = z.infer<typeof updateInput>;

export const blogInput = z.object({
  title: z.string().max(55),
  content: z.string(),
});

export type BlogInput = z.infer<typeof blogInput>;
