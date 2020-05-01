import IProduct from "./iproduct";

export interface ICartItem {
    product: IProduct;
    quantity: number;
    price: number;
    totalPrice: number; //price * quantity
}