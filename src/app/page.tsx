"use client";

import { useGetCurrentUserQuery } from "@/services/auth.service";

export default function Home() {
  const { data, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div>
        Please{" "}
        <a
          className="no-underline border-b border-blue text-blue"
          href="/auth/login"
        >
          Login!
        </a>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Welcome to the app!
    </main>
  );
}
