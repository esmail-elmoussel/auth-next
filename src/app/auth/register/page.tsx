"use client";

import TextInput from "@/components/shared/text-input.component";
import { useForm } from "react-hook-form";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = (data: RegisterForm) => console.log(data);

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Sign up</h1>

              <TextInput
                inputProps={{
                  type: "text",
                  placeholder: "Full Name",
                  ...register("name", { required: "Name is required!" }),
                }}
                error={errors.name?.message}
              />

              <TextInput
                inputProps={{
                  type: "email",
                  placeholder: "Email",
                  ...register("email", {
                    required: "Email is required!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address!",
                    },
                  }),
                }}
                error={errors.email?.message}
              />

              <TextInput
                inputProps={{
                  type: "password",
                  placeholder: "Password",
                  ...register("password", {
                    required: "Password is required!",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    validate: (value) => {
                      const error = validatePassword(value);

                      return error || true;
                    },
                  }),
                }}
                error={errors.password?.message}
              />

              <TextInput
                inputProps={{
                  type: "password",
                  placeholder: "Confirm Password",
                  ...register("confirmPassword", {
                    required: "Password confirmation is required!",
                    validate: (value) => {
                      return (
                        value === getValues("password") ||
                        "Passwords do not match!"
                      );
                    },
                  }),
                }}
                error={errors.confirmPassword?.message}
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-black text-white hover:bg-slate-800 focus:outline-none mt-3"
              >
                Create Account
              </button>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?{" "}
              <a
                className="no-underline border-b border-blue text-blue"
                href="/auth/login"
              >
                Log in
              </a>
              .
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
