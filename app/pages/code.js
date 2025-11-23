import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getServerSideProps({ params, res }) {
  const { code } = params;
  const link = await prisma.Link.findUnique({ where: { code } });

  if (!link) {
    res.statusCode = 404;
    return { notFound: true };
  }

  // Increment clicks and update lastClick
  await prisma.Link.update({
    where: { code },
    data: { clicks: link.clicks + 1, lastClick: new Date() },
  });

  return { redirect: { destination: link.url, permanent: false } };
}

export default function RedirectPage() {
  return <p>Redirecting...</p>;
}
