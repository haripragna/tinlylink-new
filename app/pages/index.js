import { useState, useEffect } from "react";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [links, setLinks] = useState([]);
  const [error, setError] = useState("");

  // Fetch all links
  const fetchLinks = async () => {
    const res = await fetch("/api/links");
    const data = await res.json();
    setLinks(data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, code }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
    } else {
      setUrl("");
      setCode("");
      fetchLinks(); // Refresh list
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create Short Link</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter long URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 flex-1"
          required
        />
        <input
          type="text"
          placeholder="Custom code (optional)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 w-40"
        />
        <button className="bg-blue-500 text-white px-4 py-2">Create</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}

      <h2 className="text-lg font-bold mb-2">All Links</h2>
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            <strong>{link.code}</strong> → {link.url} (Clicks: {link.clicks})
          </li>
        ))}
      </ul>
    </div>
  );
}
