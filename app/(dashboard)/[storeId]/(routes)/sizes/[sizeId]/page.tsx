import prisma from "@/lib/prismadb";
import SizeForm from "./_components/SizeForm";
import { Size } from "@prisma/client";

export default async function SizePage({
  params,
}: {
  params: { sizeId: string };
}) {
  let size: Size | null = null;
  
  // Only fetch size if sizeId is not "new"
  if (params.sizeId !== "new") {
    size = await prisma.size.findUnique({
      where: {
        id: params.sizeId,
      },
    });
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}
