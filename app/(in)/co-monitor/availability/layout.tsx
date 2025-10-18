"use client";

import { ToastContainer } from "react-toastify";

export default function Layout({
  children,
  create,
  list,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
  list: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <ToastContainer position="top-right" />

      {children}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {create}
        {list}
      </div>
    </div>
  );
}
