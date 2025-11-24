import {prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return <h1>Invalid link</h1>;
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

