import { useQuery } from "react-query";
import { transactions } from "@/services/lib/transaction";
import { DataTable } from "@/components/ui/data-table";
import { transactionsColumns } from "./components/tansactions.datatable/columns";

function TransactionList() {
  const { data, isLoading } = useQuery("transactions", transactions);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={transactionsColumns}
        data={data?.data.transactions ?? []}
      />
    </div>
  );
}

export default TransactionList;
