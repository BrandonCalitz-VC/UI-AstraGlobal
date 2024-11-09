import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { approve, decline } from "@/services/lib/transaction";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";

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
      if (status === "approved") {
        return <span className="text-green-500">Approved</span>;
      }
      if (status === "declined") {
        return <span className="text-red-500">Declined</span>;
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
    accessorKey: "value_1",
    header: "Code",
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
  {
    accessorKey: "actions",
    header: "",
    cell: ({ row }) => {
      if (row.original.status !== "pending") return;
      const queryClient = useQueryClient();

      const approveMutation = useMutation(approve, {
        onSuccess: () => {
          // Optimistically update the transaction status
          queryClient.invalidateQueries("transactions");

          toast({
            title: "Transaction Approved",
            description: "The transaction has been successfully approved.",
          });
        },
        onError: () => {
          toast({
            title: "Approve Transaction Failed!",
            description: "There was a problem with your request.",
            variant: "destructive",
          });
        },
      });

      const declineMutation = useMutation(decline, {
        onSuccess: () => {
          // Optimistically update the transaction status
          queryClient.invalidateQueries("transactions");

          toast({
            title: "Transaction Declined",
            description: "The transaction has been successfully declined.",
          });
        },
        onError: () => {
          toast({
            title: "Decline Transaction Failed!",
            description: "There was a problem with your request.",
            variant: "destructive",
          });
        },
      });

      return (
        <>
          <Button
            variant="default"
            onClick={() => approveMutation.mutate(row.original.id)}
            className="mr-2"
            disabled={approveMutation.isLoading}
          >
            {approveMutation.isLoading ? "Approving..." : "Approve"}
          </Button>
          <Button
            variant="destructive"
            onClick={() => declineMutation.mutate(row.original.id)}
            disabled={declineMutation.isLoading}
          >
            {declineMutation.isLoading ? "Declining..." : "Decline"}
          </Button>
        </>
      );
    },
  },
];
