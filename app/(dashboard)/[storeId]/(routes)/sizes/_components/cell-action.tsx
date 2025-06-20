"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { SizeColumn } from "./columns";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/AlertModal";
import { useState } from "react";
import axios from "axios";

interface CellActionProps {
  data: SizeColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Billboard Id copied to the clipboard.");
  };
  const onEdit = (id: string) => {
    router.push(`/${params.storeId}/sizes/${id}`);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/sizes/${id}`);

      router.refresh();

      toast.success("Size deleted.");
    } catch (error) {
      toast.error("Make sure you removed all products using this size first.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete(data.id)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onEdit(data.id)}>
            <Edit className="h-4 w-4 mr-2 text-gray-500" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2 text-gray-500" />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2 text-gray-500" />
            Copy Id
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
