import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Form, FormControl, FormField } from "../ui/form";
import { OTPSchema, Pin } from "@/types/auth";

const OtpModal = ({
  handleEmailVerification,
}: {
  handleEmailVerification: (args: string) => void;
}) => {
  const form = useForm<Pin>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: Pin) => {
    handleEmailVerification(data.pin);
  };

  return (
    <div className="w-full fixed h-screen bg-black/20 flex items-center justify-center">
      <div className="w-[32rem] p-4 rounded-lg bg-white shadow-2xl">
        <div className="w-full flex flex-col space-y-5 items-center py-4">
          <div className="">
            <h2 className="text-center text-2xl font-semibold">
              Enter OTP code
            </h2>
            <p className="text-sm">
              We've send you code at{" "}
              <span className="font-semibold">irshadkhan98031@gmail.com</span>
            </p>
          </div>

          <div className="w-full flex items-center justify-center">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field, fieldState }) => (
                    <FormControl>
                      <div>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                        {fieldState.error?.message && (
                          <span className="mt-1 text-red-500 text-sm">
                            {fieldState.error.message}
                          </span>
                        )}
                      </div>
                    </FormControl>
                  )}
                />

                <button
                  type="submit"
                  className="w-full bg-[#FA7275] text-white font-semibold text-xl py-1.5 rounded-xl cursor-pointer mt-4"
                >
                  Submit
                </button>
              </form>
            </Form>
          </div>

          <div className="text-sm">
            Din't get a code?{" "}
            <span className="text-[#FA7275] cursor-pointer">
              Click to resend
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
