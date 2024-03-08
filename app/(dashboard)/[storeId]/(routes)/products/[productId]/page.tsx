import prisma from "@/lib/prismadb";
import ProductForm from "./_components/ProductForm";

export default async function ProductPage({
  params,
}: {
  params: { productId: string; storeId: string };
}) {
  const product: any = await prisma.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });
  const categories: any = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const colors: any = await prisma.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });
  const sizes: any = await prisma.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          colors={colors}
          sizes={sizes}
        />
      </div>
    </div>
  );
}
