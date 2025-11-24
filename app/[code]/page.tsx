export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { prisma } from "@/lib/prisma";

export default async function Page({ params }: any) {
  try {
    const code = params.code;

    const link = await prisma.link.findUnique({
      where: { code },
    });

    return (
      <pre style={{ padding: 20, whiteSpace: "pre-wrap" }}>
        SUCCESS:
        {JSON.stringify(link, null, 2)}
      </pre>
    );
  } catch (e: any) {
    return (
      <pre style={{ padding: 20, whiteSpace: "pre-wrap" }}>
        SERVER ERROR:
        {String(e.message || e)}
      </pre>
    );
  }
}



