import { useState } from "react";
import { useSignUp } from "@clerk/tanstack-start";
import { useNavigate } from "@tanstack/react-router";

import { AuthSchema, AuthSchemaType } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import SignUpBtn from "@/components/auth/SignUp";
import OtpModal from "@/components/auth/OtpModal";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Github, Google } from "@/utils/icons";

const AuthPage = () => {
  const [isVerifying, setVerifying] = useState(false);

  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useNavigate({ from: "/" });

  const formSchema = AuthSchema;
  const form = useForm<AuthSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: AuthSchemaType) => {
    if (!isLoaded && !signUp) return null;

    try {
      toast.promise(
        async () => {
          await signUp.create({
            emailAddress: data.email,
          });
          await signUp.prepareEmailAddressVerification();
          setVerifying(true);
        },
        {
          loading: "Sending OTP...",
          success: <b>OTP has been send</b>,
          error: <b>Failed to send OTp</b>,
        }
      );
    } catch (error) {
      console.log("Error:", JSON.stringify(error, null, 2));
    }
  };

  const handleEmailVerification = async (code: string) => {
    if (!isLoaded && !signUp) return null;

    try {
      toast.promise(
        async () => {
          const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code,
          });

          if (signUpAttempt.status === "complete") {
            await setActive({ session: signUpAttempt.createdSessionId });
          } else {
            console.log(signUpAttempt);
          }
        },
        {
          loading: "Verifying the provided code...",
          success: () => {
            router({ to: "/" });
            return "";
          },
          error: <b>The given code in incorrect!</b>,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isVerifying && (
        <OtpModal handleEmailVerification={handleEmailVerification} />
      )}
      <div className="w-full flex flex-row h-[100vh]">
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

        <div className="w-full flex items-center justify-center max-md:p-10 max-md:bg-[#FA7275]">
          <div className="flex flex-col space-y-4 max-w-lg w-full  bg-white p-5 px-10 rounded-2xl">
            <div className="flex flex-col w-full space-y-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="w-full flex flex-col space-y-8">
                    <>
                      <h2 className="md:text-4xl text-2xl font-semibold">
                        Create Account
                      </h2>

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

                    <button className="w-full bg-[#FA7275] text-white font-semibold text-xl py-2.5 rounded-xl cursor-pointer">
                      Create Account
                    </button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="text-3xl font-bold text-center font-[italic]">
              Or,
            </div>
            <div className="flex flex-col md:flex-row md:items-center  justify-center max-md:space-y-4 space-x-16">
              <SignUpBtn
                provider="oauth_google"
                providerName="Google"
                icon={Google}
              />

              <SignUpBtn
                provider="oauth_github"
                providerName="Github"
                icon={Github}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
