"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    console.log("API Response:", data);

    setShortUrl(data.shortUrl);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl mb-6 font-bold text-blue-600">
        TinyLink URL Shortener
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter long URL..."
          className="px-4 py-2 border border-gray-300 rounded-md w-96"
        />

        <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md">
          Shorten
        </button>
      </form>

      {shortUrl && (
        <p className="mt-6 text-lg text-green-600">
          Short Link:{" "}
          <a href={shortUrl} className="underline text-blue-600">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
