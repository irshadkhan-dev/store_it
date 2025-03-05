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

export const AuthSchema = z.object({
  email: z.string().email().nonempty({ message: "Email should be provided" }),
});

export type AuthSchemaType = z.infer<typeof AuthSchema>;

export const OTPSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 chareactors",
  }),
});

export type Pin = z.infer<typeof OTPSchema>;
