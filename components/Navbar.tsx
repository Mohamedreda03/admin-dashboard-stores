import { UserButton, auth } from "@clerk/nextjs";
import MainNav from "./MainNav";
import StoreSwitcher from "./StoreSwitcher";
import { redirect } from "next/navigation";

import prisma from "@/lib/prismadb";

export default async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prisma.store.findMany({
    where: {
      userId,
    },
  });

  if (!stores) {
    redirect("/");
  }

  return (
    <div className="border-b">
      <div className="flex items-center h-16 px-4">
        <StoreSwitcher stores={stores} />
        <MainNav className="ml-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
