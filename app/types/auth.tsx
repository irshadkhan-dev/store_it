import { LucideIcon } from "lucide-react";
import z from "zod";

export type User = {
  id: string;
  firstName: string | null;
  email: string;
};

export type UserData = {
  id: string;
  email: string;
  firstName: string;
};

export type SummaryDataType = {
  application: number;
  audio: number;
  video: number;
  image: number;
};

export type SummaryDataItem = {
  title: string;
  size: number;
  icon: LucideIcon;
  url: string;
  iconBgColor: string;
};

export type RecentFileUplodedItem = {
  name: string;
  createdAt: Date;
  icon: LucideIcon;
  iconBgColor: string;
};

export type SORTING_OPTION = "newest" | "oldest";

const AuthTypeSchema = z.enum(["sign-up", "sign-in"]);
export type AuthType = z.infer<typeof AuthTypeSchema>;

const SignUpSchema = z.object({
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
