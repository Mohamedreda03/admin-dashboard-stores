import prisma from "@/lib/prismadb";
import { ColorColumn } from "./_components/columns";

import { format } from "date-fns";
import ColorClient from "./_components/colorClient";

export default async function ColorPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}
