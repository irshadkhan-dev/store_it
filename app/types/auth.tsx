import z from "zod";

export type User = {
  firstName: string;
  email: string;
};

const AuthTypeSchema = z.enum(["sign-up", "sign-in"]);
export type AuthType = z.infer<typeof AuthTypeSchema>;

const SignUpSchema = z.object({
  firstName: z.string().nonempty({ message: "First name should be provided" }),
  email: z.string().email().nonempty({ message: "Email should be provided" }),
});

const SignInSchema = z.object({
  email: z.string().email().nonempty({ message: "Email should be provided" }),
});

export type SignUp = z.infer<typeof SignUpSchema>;
export type SignIn = z.infer<typeof SignInSchema>;

export const getAuthSchema = (authType: AuthType) => {
  if (authType === "sign-up") {
    return SignUpSchema;
  } else {
    return SignInSchema;
  }
};

export const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 chareactors",
  }),
});

export type Pin = z.infer<typeof OTPSchema>;
