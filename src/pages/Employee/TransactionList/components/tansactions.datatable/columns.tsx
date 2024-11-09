import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Transaction = {
  id: string;
  amount: number;
  currency: string;
  account_to: string;
  provider: string;
  value_1: string;
  value_2: string;
  status: string;
  created_at: Date;
};

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "account_to",
    header: "Account To",
  },
  {
    accessorKey: "provider",
    header: "Provider",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const status = getValue() as string;
      if (status === "success") {
        return <span className="text-green-500">Success</span>;
      }
      if (status === "failed") {
        return <span className="text-red-500">Failed</span>;
      }
      return <span className="text-yellow-500">Pending</span>;
    },
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date;
      return <span>{new Date(date).toLocaleDateString()}</span>;
    },
  },
];
