"use client";

import { useState, type ComponentProps } from "react";

type PasswordInputProps = Omit<ComponentProps<"input">, "type"> & {
  visibilityLabel: string;
};

export function PasswordInput({
  visibilityLabel,
  ...inputProps
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative mt-2">
      <input
        {...inputProps}
        className="min-h-12 w-full rounded-xl border border-line bg-[#fcfcfa] px-4 pr-12 font-normal outline-none transition placeholder:text-[#9aa39b] focus:border-brand focus:ring-2 focus:ring-brand/15"
        type={isVisible ? "text" : "password"}
      />
      <button
        aria-label={`${isVisible ? "Hide" : "Show"} ${visibilityLabel}`}
        aria-pressed={isVisible}
        className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded-lg text-muted transition hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
        onClick={() => setIsVisible((visible) => !visible)}
        title={`${isVisible ? "Hide" : "Show"} ${visibilityLabel}`}
        type="button"
      >
        {isVisible ? (
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="m3 3 18 18" />
            <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
            <path d="M9.9 5.2A10.7 10.7 0 0 1 12 5c5.4 0 9 7 9 7a15.8 15.8 0 0 1-3.1 3.9" />
            <path d="M6.2 6.2C3.9 7.7 2 12 2 12s3.6 7 10 7a10.5 10.5 0 0 0 3.2-.5" />
          </svg>
        ) : (
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            width="20"
          >
            <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}
