"use client";

type Props = JSX.IntrinsicElements["button"];

export function Button({ ...props }: Props) {
  return (
    <button
      className="w-full text-center py-3 rounded bg-black text-white hover:bg-slate-800 focus:outline-none mt-3"
      {...props}
    />
  );
}
