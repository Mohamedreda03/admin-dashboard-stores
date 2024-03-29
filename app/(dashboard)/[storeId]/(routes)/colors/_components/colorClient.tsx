"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ColorColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import ApiList from "@/components/ui/api-list";
import Heading from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const ColorClient = ({ data }: { data: ColorColumn[] }) => {
  const params = useParams();
  const router = useRouter();

  useEffect(
    () => {
      // Your useEffect logic here
    },
    [
      /* dependencies */
    ]
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${data.length})`}
          description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTable columns={columns} data={data} searchKey="name" />
      <Heading title={`API`} description="API calls for Colors" />
      <div className="mt-4 flex flex-col gap-4">
        <ApiList entityName="colors" entityIdName="colorId" />
      </div>
    </>
  );
};

export default ColorClient;
