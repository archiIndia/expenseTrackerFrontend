import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button.jsx";

function SignUpPage() {
    return (
      <div className={"h-screen flex "}>
        <div className={"hidden md:block md:w-2/3 bg-primary p-5"}>
          <div className={"text-4xl text-primary-foreground"}>Small Book</div>
        </div>
        <div className={"p-5 flex items-center justify-center w-full md:w-1/3"}>
          <div className={"min-w-80 -mt-20"}>
            <div>
              <div className={"text-2xl font-semibold"}>
                Welcome to Small Book
              </div>
              <div className={"text-gray-500"}>
                Please create an account to continue
              </div>
            </div>
            <div>
              <label htmlFor="email" className={"block mt-5 text-gray-500"}>
                Email
              </label>
              <Input type="text" id="email" className={"mt-1"} />
            </div>
            <div>
              <label htmlFor="password" className={"block mt-2 text-gray-500"}>
                Password
              </label>
              <Input type="password" id="password" className={"mt-1"} />
            </div>
            <div>
              <label
                htmlFor="con_password"
                className={"block mt-2 text-gray-500"}
              >
                Confirm Password
              </label>
              <Input type="password" id="con_password" className={"mt-1"} />
            </div>
            <div className={"flex w-full flex-col gap-2"}>
              <Button className={"mt-5"}>Login</Button>
                <Button variant={"outline"}>Sign Up</Button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SignUpPage;
