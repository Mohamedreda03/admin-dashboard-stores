import prisma from "@/lib/prismadb";
import ColorForm from "./_components/ColorForm";

export default async function ColorPage({
  params,
}: {
  params: { sizeId: string };
}) {
  const color: any = await prisma.color.findFirst({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}
