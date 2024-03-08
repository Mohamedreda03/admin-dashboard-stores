import BillboardClient from "./_components/OrderClient";
import prisma from "@/lib/prismadb";
import { OrderColumn } from "./_components/columns";

import { format } from "date-fns";
import { currencyFormatter } from "@/lib/utils";

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrder: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: currencyFormatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: order.isPaid,
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-x-4 p-8 pt-6">
        <BillboardClient data={formattedOrder} />
      </div>
    </div>
  );
}
