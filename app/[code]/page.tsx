import { prisma } from "@/lib/prisma";

import { redirect } from "next/navigation";

export default async function RedirectPage({ params }: { params: { code: string } }) {

  const link = await prisma.link.findUnique({
    where: { code: params.code },
  });

  if (!link) {
    return <h1>Invalid link</h1>;
  }

  await prisma.link.update({
    where: { code: params.code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  redirect(link.url);
}
