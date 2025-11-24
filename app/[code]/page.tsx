import { prisma} from "@/lib/prisma";
import { redirect } from "next/navigation";

type Props = {
  params: {
    code: string;
  };
};

export default async function Page({ params }: Props) {
  const code = params.code;

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

