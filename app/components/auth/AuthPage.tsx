import React, { use, useState } from "react";
import { AuthType, getAuthSchema, SignIn, SignUp, User } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUp } from "@clerk/tanstack-start";
import OtpModal from "./OtpModal";
import { Form, FormControl, FormField } from "../ui/form";
import { useNavigate } from "@tanstack/react-router";
import { useUser } from "@clerk/tanstack-start";

const AuthPage = () => {
  const [authType, setAuthType] = useState<AuthType>("sign-up");
  const formSchema = getAuthSchema(authType!);
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isVerifying, setVerifying] = useState(false);
  const [firstName, setFirstName] = useState("");

  const form = useForm<SignUp>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      firstName: "",
    },
  });

  const onSubmit = async (data: SignUp) => {
    if (!isLoaded && !signUp) return null;

    try {
      await signUp.create({
        emailAddress: data.email,
      });

      await signUp.prepareEmailAddressVerification();
      setFirstName(data.firstName);
      setVerifying(true);
    } catch (error) {
      console.log("Error:", JSON.stringify(error, null, 2));
    }
  };

  const handleEmailVerification = async (code: string) => {
    if (!isLoaded && !signUp) return null;
    const { user } = useUser();
    const router = useNavigate({ from: "/" });
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        await user?.update({ firstName: firstName });
        router({ to: "/dashboard" });
      } else {
        console.log(signUpAttempt);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isVerifying && (
        <OtpModal handleEmailVerification={handleEmailVerification} />
      )}
      <div className="w-full flex flex-row h-screen">
        <div className="hidden h-screen md:flex flex-col min-w-80 p-10 space-y-10 lg:p-20 bg-[#FA7275]">
          <div className="flex flex-row items-center">
            <img
              src="/drive2.png"
              alt="brand logo"
              className="w-52 h-20 shrink-0"
            />
          </div>

          <div className="lg:min-w-sm mt-10">
            <h2 className="text-white font-bold text-4xl  mb-4">
              Manage your files the best way
            </h2>
            <p className="text-white lg:text-base">
              Awesome, we've created the perfect place for you to store all your
              documents.
            </p>
          </div>

          <div className="w-80 h-64 mt-10">
            <img src="/illustration.png" alt="" className="w-full h-full" />
          </div>
        </div>

        <div className="w-full flex items-center justify-center max-md:p-10">
          <div className="flex flex-col max-w-lg w-full space-y-10 px-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-full flex flex-col space-y-8">
                  {authType === "sign-up" ? (
                    <>
                      <h2 className="md:text-4xl text-2xl font-semibold">
                        Create Account
                      </h2>
                      <div className="w-full">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field, fieldState }) => (
                            <FormControl>
                              <div>
                                <input
                                  {...field}
                                  className="border-gray-500 border-[2px] py-2 w-full rounded-lg px-4 shadow-xl outline-none"
                                  placeholder="Your first name"
                                />
                                {fieldState.error?.message && (
                                  <span className="mt-2 text-red-500 text-sm font-semibold">
                                    {fieldState.error.message}
                                  </span>
                                )}
                              </div>
                            </FormControl>
                          )}
                        />
                      </div>

                      <div className="w-full">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field, fieldState }) => (
                            <FormControl>
                              <div>
                                <input
                                  {...field}
                                  className="border-gray-500 border-[2px] py-2 w-full rounded-lg px-4 shadow-xl outline-none"
                                  placeholder="Valid email"
                                />
                                {fieldState.error?.message && (
                                  <span className="mt-2 text-red-500 text-sm font-semibold">
                                    {fieldState.error.message}
                                  </span>
                                )}
                              </div>
                            </FormControl>
                          )}
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  <button className="w-full bg-[#FA7275] text-white font-semibold text-xl py-2.5 rounded-xl cursor-pointer">
                    {authType === "sign-up" ? "Create Account" : "Login"}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
