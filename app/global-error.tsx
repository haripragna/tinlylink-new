"use client";

export default function GlobalError({ error }: { error: Error }) {
  return (
    <html>
      <body>
        <h1 style={{ padding: 20 }}>SERVER ERROR</h1>
        <pre style={{ whiteSpace: "pre-wrap", padding: 20 }}>
{error.message}
        </pre>
      </body>
    </html>
  );
}

