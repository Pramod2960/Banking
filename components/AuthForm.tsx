"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustromInput from "./CustromInput";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/users.actions";

const formSchema = (type: string) =>
  z.object({
    //sign-up
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    address: type === "sign-in" ? z.string().optional() : z.string().max(50),
    city: type === "sign-in" ? z.string().optional() : z.string().max(10),
    state: type === "sign-in" ? z.string().optional() : z.string().min(3),
    postalCode: type === "sign-in" ? z.string().optional() : z.string().max(6),
    dob: type === "sign-in" ? z.string().optional() : z.string().min(3),

    //both
    email: z.string().email(),
    password: z.string().min(8),
  });

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //1. define the form
  const authFormSchema = formSchema(type);

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.

  const onSubmit = async (data: z.infer<typeof authFormSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const newUser = await signUp(data);
         setUser(newUser);
      }

     /* if (type === "sign-in") {
       const response = await signIn({
          email: data.email,
          password: data.password,
        });

        if (response) {
          router.push("/");
        }  
      }*/
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizone
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/*PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustromInput
                      form={form}
                      label="First Name"
                      name="firstName"
                      placeholder="Enter your first name"
                    />
                    <CustromInput
                      form={form}
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <CustromInput
                    form={form}
                    label="Address"
                    name="address"
                    placeholder="Enter your Specific Address"
                  />
                  <CustromInput
                    form={form}
                    label="City"
                    name="city"
                    placeholder="Enter your City"
                  />

                  <div className="flex gap-4">
                    <CustromInput
                      form={form}
                      label="State"
                      name="state"
                      placeholder="Enter your State e.g RAJ"
                    />
                    <CustromInput
                      form={form}
                      label="Postal Code"
                      name="postalCode"
                      placeholder="Enter your Postal Code e.g 125006"
                    />
                  </div>
                  <CustromInput
                    form={form}
                    label="Date of Brith"
                    name="dob"
                    placeholder="e.g. YYYY-MM-DD"
                  />
                </>
              )}

              <CustromInput
                form={form}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />

              <CustromInput
                form={form}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign-in"
                  ) : (
                    "Sign-up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
