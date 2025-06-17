import prisma from "@/lib/prismadb";
import BillboardForm from "./_components/BillboardForm";
import { Billboard } from "@prisma/client";

export default async function BillboardPage({
  params,
}: {
  params: { billboardId: string };
}) {
  let billboard: Billboard | null = null;
  
  // Only fetch billboard if billboardId is not "new"
  if (params.billboardId !== "new") {
    billboard = await prisma.billboard.findUnique({
      where: {
        id: params.billboardId,
      },
    });
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}
