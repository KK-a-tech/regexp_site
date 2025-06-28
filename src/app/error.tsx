"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-100">
      <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
      <p className="mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        再試行する
      </button>
    </div>
  );
}
