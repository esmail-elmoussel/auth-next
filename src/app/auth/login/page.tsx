import { LoginForm } from "@/components/login/login-form.component";

export default function Login() {
  return (
    <main>
      <div className="bg-grey-lighter min-h-screen flex flex-col">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Login</h1>

            <LoginForm />
          </div>

          <div className="text-grey-dark mt-6">
            Do not have an account?{" "}
            <a
              className="no-underline border-b border-blue text-blue"
              href="/auth/register"
            >
              Register
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
