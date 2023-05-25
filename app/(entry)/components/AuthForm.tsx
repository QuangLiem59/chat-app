"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { BsGithub, BsGoogle } from "react-icons/bs";
import Input from "../../sharedComponents/Input/Input";
import Button from "../../sharedComponents/Buttons";
import AuthSocialButton from "./AuthSocialButton";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/sharedComponents/modals/LoadingModal";

type Entry = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [entry, setEntry] = useState<Entry>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      console.log(session);
      // router.push("/users");
      location.href = location.origin + "/users";
    }
  }, [session?.status, router]);

  const toggleEntry = useCallback(() => {
    entry === "LOGIN" ? setEntry("REGISTER") : setEntry("LOGIN");
  }, [entry]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (entry === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() => signIn("credentials", data))
        .catch((error) => {
          !error?.response?.data
            ? toast.error("Something went wrong!")
            : toast.error(error.response.data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (entry === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((res) => {
          if (res?.error) toast.error(res.error);
          if (res?.ok && !res?.error) {
            toast.success("Logged in!");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, {
      redirect: false,
    })
      .then((res) => {
        if (res?.error) toast.error(res.error);
        if (res?.ok && !res?.error) toast.success("Logged in!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {entry === "REGISTER" && (
              <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              id="email"
              label="Email"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              id="password"
              label="Password"
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <div>
              <Button
                disabled={isLoading}
                fullWidth
                type="submit"
                onClick={() => {}}
              >
                {entry === "LOGIN" ? "Login" : "Register"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center ">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm ">
                <span className="px-2 text-gray-500 bg-white">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <AuthSocialButton
                Icon={BsGithub}
                onClick={() => socialAction("github")}
              />
              <AuthSocialButton
                Icon={BsGoogle}
                onClick={() => socialAction("google")}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 px-2 mt-6 text-sm text-gray-500">
            <div>
              {entry === "LOGIN" ? "New to Chat?" : "Already have an account?"}
            </div>
            <div className="underline cursor-pointer" onClick={toggleEntry}>
              {entry === "LOGIN" ? "Create an account" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
