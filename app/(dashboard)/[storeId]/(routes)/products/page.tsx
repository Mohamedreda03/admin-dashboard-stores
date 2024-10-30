import ProductsClient from "./_components/ProductClient";
import prisma from "@/lib/prismadb";
import { ProductColumn } from "./_components/columns";

import { format } from "date-fns";
import { currencyFormatter } from "@/lib/utils";

export default async function ProductsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      color: true,
      size: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProduct: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: currencyFormatter.format(Number(product.price)),
    isArchived: product.isArchived,
    isFeatured: product.isFeatured,
    category: product.category.name,
    color: product.color.name,
    size: product.size.value,
    createdAt: format(product.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <ProductsClient data={formattedProduct} />
      </div>
    </div>
  );
}
