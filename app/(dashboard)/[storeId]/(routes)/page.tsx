import prisma from "@/lib/prismadb";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return (
    <>
      <div>Sore Name: {store?.name}</div>
    </>
  );
};

export default DashboardPage;
