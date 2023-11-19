"use client";

interface Props {
  inputProps: JSX.IntrinsicElements["input"];
  error?: string;
}

export default function TextInput({ inputProps, error }: Props) {
  return (
    <>
      <input
        className="block border border-grey-light w-full p-3 rounded mt-3"
        {...inputProps}
      />

      {error && <span className="text-xs text-red-500">{error}</span>}
    </>
  );
}
