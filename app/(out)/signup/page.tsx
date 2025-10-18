import React from "react";
import Link from "next/link";
import SignupForm from "@/components/Forms/SignupForm/SignupForm";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const page = () => {
  return (
    <div className="flex flex-col justify-between h-dvh lg:flex-row">
      <div className="flex-1 text-center bg-signup">
        <div className="p-14">
          <h1 className="text-4xl text-white">Create your free account</h1>
          <p className="mt-1.5 text-[14px] text-white">
            Explore Gaza Sky Geeks core features for individuals.
          </p>
        </div>
      </div>
      <div className="flex-1">
        <div className=" mr-4 mt-2 flex gap-1 justify-end">
          <span>Already have an account?</span>
          <Link href="/login" className="underline flex items-center gap-1">
            Sign in
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className=" w-[70%] m-auto mt-12">
          <p className="font-bold text-3xl">Sign up to GSG</p>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default page;
