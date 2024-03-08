import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prismadb";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Delete, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import SettingsForm from "./_components/SettingsForm";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <div className="p-6">
      <SettingsForm initialData={store} />
    </div>
  );
};

export default SettingsPage;
