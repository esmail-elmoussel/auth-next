"use client";

import { Button } from "@/components/shared/button.component";
import { TextInput } from "@/components/shared/text-input.component";
import { useRegisterMutation } from "@/services/auth.service";
import { RegisterFormFields } from "@/types/auth.types";
import { FetchBaseQueryError } from "@/types/global.types";
import { validatePassword } from "@/utils/validation.util";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: validationErrors },
  } = useForm<RegisterFormFields>();

  const [registerMutation, { isLoading }] = useRegisterMutation();

  const onSubmit = async (registerFormFields: RegisterFormFields) => {
    toast.loading("Loading...");

    const res = await registerMutation({
      name: registerFormFields.name,
      email: registerFormFields.email,
      password: registerFormFields.password,
    });

    toast.dismiss();

    if ("error" in res) {
      return toast.error(
        (res.error as FetchBaseQueryError)?.data?.message ||
          "Something went wrong!"
      );
    }

    toast.success("Your registration is complete. You can login now.", {
      duration: 5000,
    });

    router.push("/auth/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextInput
        inputProps={{
          type: "text",
          placeholder: "Full Name",
          ...register("name", { required: "Name is required!" }),
        }}
        error={validationErrors.name?.message}
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

      <TextInput
        inputProps={{
          type: "password",
          placeholder: "Confirm Password",
          ...register("confirmPassword", {
            required: "Password confirmation is required!",
            validate: (value) => {
              return (
                value === getValues("password") || "Passwords do not match!"
              );
            },
          }),
        }}
        error={validationErrors.confirmPassword?.message}
      />

      <Button type="submit" disabled={isLoading}>
        Create Account
      </Button>
    </form>
  );
}
