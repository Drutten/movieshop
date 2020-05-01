import { INewOrderRow } from "./ineworderrow";

export interface INewOrder {
    companyId: number;
    created: string;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    orderRows: INewOrderRow[];
}