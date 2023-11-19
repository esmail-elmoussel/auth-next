"use client";

import { Button } from "@/components/shared/button.component";
import { TextInput } from "@/components/shared/text-input.component";
import { useLoginMutation } from "@/services/auth.service";
import { LoginFormFields, RegisterFormFields } from "@/types/auth.types";
import { FetchBaseQueryError } from "@/types/global.types";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<RegisterFormFields>();

  const [loginMutation, { isLoading }] = useLoginMutation();

  const onSubmit = async (loginFormFields: LoginFormFields) => {
    toast.loading("Loading...");

    const res = await loginMutation({
      email: loginFormFields.email,
      password: loginFormFields.password,
    });

    toast.dismiss();

    if ("error" in res) {
      return toast.error(
        (res.error as FetchBaseQueryError)?.data?.message ||
          "Something went wrong!"
      );
    }

    toast.success("Welcome Back!", { duration: 5000 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
        error={validationErrors.email?.message}
      />

      <TextInput
        inputProps={{
          type: "password",
          placeholder: "Password",
          ...register("password", {
            required: "Password is required!",
          }),
        }}
        error={validationErrors.password?.message}
      />

      <Button type="submit" disabled={isLoading}>
        Login
      </Button>
    </form>
  );
}
