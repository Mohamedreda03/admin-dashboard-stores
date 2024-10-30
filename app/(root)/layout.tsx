import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const { userId } = auth();

    if (!userId) {
      redirect("/sign-in");
      return null;
    }

    const store = await prisma.store.findFirst({
      where: {
        userId,
      },
    });

    if (store) {
      redirect(`/${store.id}`);
      return null;
    }

    return <>{children}</>;
  } catch (error) {
    console.log(error);
  }
}
