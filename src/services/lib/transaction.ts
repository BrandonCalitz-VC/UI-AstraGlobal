import { z } from "zod";
import axiosClient from "../apiClient";
import { paySchema } from "@/pages/Pay/pay.schema";

export function pay(data: z.infer<typeof paySchema>) {
    return axiosClient.post("/transaction", data);
}

export function transactions() {
    return axiosClient.get("/transaction");
}
