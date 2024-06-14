import { z } from "zod";

export const LoginSchema = z.object({
  password: z.string().trim().min(1, {
    message: "Password is required.",
  }),
  username: z.string().trim().min(1, {
    message: "Username is required.",
  }),
});
