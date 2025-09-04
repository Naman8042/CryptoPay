import WalletConnector from "../_components/Walletconnector";
import { LoginForm } from "@/app/_components/login-form";

const page = () => {
  return (
    <div className="px-4 ">
      <WalletConnector />

      <div className="grid lg:grid-cols-2  h-[80vh]">
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
        <div className="bg-muted relative hidden lg:block ">
          <img
            src="/placeholder.svg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
