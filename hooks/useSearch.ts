"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const useSearch = (paramKey: string) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramValue = searchParams.get(paramKey) || "";
  const [value, setValue] = useState(paramValue);

  useEffect(() => {
    setValue(paramValue);
  }, [paramValue]);

  const updateSearchParam = (newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set(paramKey, newValue);
    } else {
      params.delete(paramKey);
    }

    router.push(`?${params.toString()}`);
  };

  return { value, setValue, updateSearchParam };
};
