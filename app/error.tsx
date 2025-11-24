"use client";

export default function GlobalError({ error }: any) {
  return (
    <html>
      <body style={{ padding: 40 }}>
        <h1>Server Error</h1>
        <pre>{error?.message}</pre>
      </body>
    </html>
  );
}
