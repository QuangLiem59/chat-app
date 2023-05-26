import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full py-8 bg-cover sm:px-6 lg:px-8 bg-auth-bg">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          height={100}
          width={100}
          className="object-contain w-auto h-20 mx-auto"
          src="/images/chatIcon2.png"
          alt="Logo"
        />
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-center text-gray-300">
          Sign in to your account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
