import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

// Correct type for dynamic route params in Next.js 15
interface PageProps {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: PageProps) {
  const { code } = params;

  if (!code) {
    return <h1>Invalid link</h1>;
  }

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return <h1>Short link not found</h1>;
  }

  // Increase click count
  await prisma.link.update({
    where: { code },
    data: {
      clicks: { increment: 1 },
      lastClicked: new Date(),
    },
  });

  redirect(link.url);
}



