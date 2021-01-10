import CartEntry from "./CartEntry";

export default class OrderData {
    readonly entries: CartEntry[];
    readonly totalPrice: number;
    readonly itemCount: number;

    constructor(cartEntries: CartEntry[]) {
        this.entries = cartEntries;
        this.totalPrice = 0
        this.itemCount = 0;

        for(const entry of cartEntries) {
            this.totalPrice += entry.price * entry.times;
            this.itemCount += entry.times;
        }
    }
}