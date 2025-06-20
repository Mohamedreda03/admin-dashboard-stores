import prisma from "@/lib/prismadb";
import CategoryForm from "./_components/CategoryForm";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) {
  let category = null;

  // Only fetch category if categoryId is not "new"
  if (params.categoryId !== "new") {
    category = await prisma.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });
  }

  const billboards = await prisma.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}
