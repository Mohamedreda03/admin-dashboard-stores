import prismadb from "@/lib/prismadb";

const getTotalRevenue = async (storeId: string) => {
  const paidOrders = await prismadb.order.findMany({
    where: {
      storeId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const totalRevenue = paidOrders.reduce((acc, order) => {
    const revenueForOrder = order.orderItems.reduce(
      (acc, item) => acc + Number(item.product.price),
      0
    );
    return acc + revenueForOrder;
  }, 0);

  return totalRevenue;
};

export default getTotalRevenue;
