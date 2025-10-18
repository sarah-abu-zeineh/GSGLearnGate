"use client";

import { ArrowsClockwise } from "phosphor-react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center gap-3 justify-center p-4 rounded-md bg-red-50 text-sm text-red-600">
      <span>Oops! Failed to get number of late submissions.</span>
      <button
        onClick={reset}
        className="p-1 rounded-full hover:bg-red-100 transition"
        title="Retry"
      >
        <ArrowsClockwise size={20} className="text-red-500" />
      </button>
    </div>
  );
}
