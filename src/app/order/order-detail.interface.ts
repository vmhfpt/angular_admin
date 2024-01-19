export interface OrderDetailAttributes  {
    readonly _id : string;
    readonly order_id : string;
    readonly price : number;
    readonly product_id : {
        name : string;
        image : string;
    };
    readonly quantity : number;
}