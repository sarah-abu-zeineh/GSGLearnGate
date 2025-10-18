"use client";

import { useRouter } from "next/navigation";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div id="notfound-page-container" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div id="notfound-card" className="bg-white shadow-xl rounded-2xl p-8 max-w-lg text-center border border-gray-200">
        <h1 id="notfound-code" className="text-6xl font-extrabold text-[#FFA41F] mb-4">404</h1>
        <h2 id="notfound-title" className="text-3xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h2>
        <p id="notfound-description" className="text-lg text-gray-700 mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div id="notfound-action-buttons" className="flex flex-col gap-3 w-full">
          <button
            id="go-back-button"
            onClick={() => router.back()}
            className="bg-[#FFA41F] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#ffa51fc6] transition-all cursor-pointer"
          >
            Go Back
          </button>
          <button
            id="return-home-button"
            onClick={() => router.push("/")}
            className="bg-white text-[#FFA41F] px-6 py-3 rounded-lg font-medium hover:bg-gray-50 border border-[#FFA41F] transition-all cursor-pointer"
          >
            Return Home
          </button>
        </div>

        <div  id="notfound-tip-box" className="bg-gray-50 border border-gray-200 p-4 rounded-md mt-6 text-sm text-gray-700 text-left">
          <strong  id="notfound-tip-label" className="text-gray-900">Tip:</strong>{" "}
          <span id="notfound-tip-text" className="break-words">
            Check the URL for typos or use the navigation to find what
            you&apos;re looking for.
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
