"use client";

import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen dark:bg-darkmode-900 bg-white flex items-center justify-center">
      <div className="max-w-screen-xl px-4 py-8 mx-auto flex flex-col gap-5">
        <h1>Something went wrong!</h1>
        <button
          className="text-white bg-red-400 border-2 transition border-red-600 hover:bg-red-600 px-4 py-2 rounded-md text-center"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
        <Link
          className="text-white dark:bg-darkmode-800 bg-gray-50 hover:bg-gray-100 transition dark:hover:bg-darkmode-700 px-4 py-2 rounded-md text-center"
          href="/"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
