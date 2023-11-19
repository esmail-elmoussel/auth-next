"use client";

import { Button } from "@/components/shared/button.component";
import { TextInput } from "@/components/shared/text-input.component";
import { useLoginMutation } from "@/services/auth.service";
import { LoginFormFields, RegisterFormFields } from "@/types/auth.types";
import { FetchBaseQueryError } from "@/types/global.types";
import { validatePassword } from "@/utils/validation.util";
import { useForm } from "react-hook-form";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors: validationErrors },
  } = useForm<RegisterFormFields>();

  const [loginMutation, { isLoading, error: loginError }] = useLoginMutation();

  const onSubmit = (loginFormFields: LoginFormFields) => {
    loginMutation({
      email: loginFormFields.email,
      password: loginFormFields.password,
    });
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
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            maxLength: {
              value: 30,
              message: "Password is too long!",
            },
            validate: (value) => {
              const error = validatePassword(value);

              return error || true;
            },
          }),
        }}
        error={validationErrors.password?.message}
      />

      {loginError && (
        <span className="text-xs text-red-500">
          {(loginError as FetchBaseQueryError)?.data?.message ||
            "Something went wrong!"}
        </span>
      )}

      <Button type="submit">
        {isLoading ? "Loading..." : "Create Account"}
      </Button>
    </form>
  );
}
