import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();

    if (!url) {
      return Response.json({ error: "URL required" }, { status: 400 });
    }

    const code = Math.random().toString(36).substring(2, 8);

    const link = await prisma.link.create({
      data: { url, code },
    });

    return Response.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${link.code}`,
    });
  } catch (error) {
    console.error("API ERROR:", error);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}




