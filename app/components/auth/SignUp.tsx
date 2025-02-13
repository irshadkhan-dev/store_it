import React, { JSX, SVGProps } from "react";
import { useSignUp } from "@clerk/tanstack-start";
import { OAuthStrategy } from "@clerk/types";
import toast from "react-hot-toast";

const SignUpBtn = ({
  providerName,
  provider,
  icon: Icon,
}: {
  providerName: string;
  provider: OAuthStrategy;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}) => {
  const { signUp } = useSignUp();
  const signUpWith = (strategy: OAuthStrategy) => {
    if (!signUp) return null;
    return toast.promise(
      async () => {
        return signUp.authenticateWithRedirect({
          strategy,
          redirectUrl: "/sign-up/sso-callback",
          redirectUrlComplete: "/dashboard",
        });
      },
      {
        loading: "Redirecting to Auth page....",
        error: "Failed to redirect to auth page, please try again..",
      }
    );
  };
  return (
    <button
      onClick={() => signUpWith(provider)}
      className="bg-[#FA7275] w-full flex items-center justify-center space-x-2 py-2 cursor-pointer rounded-2xl "
    >
      <Icon className="text-3xl" />
      <span className="text-white font-semibold text-2xl">{providerName}</span>
    </button>
  );
};

export default SignUpBtn;
