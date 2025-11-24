export const runtime = "nodejs";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({ params }: any) {
  const code = params.code;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return <h1>Short link not found</h1>;
  }

  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  redirect(link.url);
}



