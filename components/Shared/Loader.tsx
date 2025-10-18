import React from "react";

interface LoaderProps {
  message?: string;
}

export default function Loader({ message = "Loading..." }: LoaderProps) {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen p-4"
      data-testid="loader-container"
    >
      <div
        className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"
        data-testid="loader-spinner"
      ></div>
      <p className="mt-2 text-sm text-gray-600" data-testid="loader-message">
        {message}
      </p>
    </div>
  );
}
