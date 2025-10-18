"use client";

import { Spinner } from "phosphor-react";

export default function Loading() {
  return (
    <div className="flex items-center gap-3 justify-center p-4 rounded-md bg-yellow-50 text-sm text-yellow-600">
      <span>Loading submissions count waiting your reviews...</span>
      <Spinner size={20} className="animate-spin text-yellow-500" />
    </div>
  );
}
