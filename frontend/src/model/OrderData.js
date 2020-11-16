export default class OrderData {
    constructor(cartEntries) {
        this.entries = cartEntries;
        this.totalPrice = 0
        this.itemCount = 0;

        for(const entry of cartEntries) {
            this.totalPrice += entry.price * entry.times;
            this.itemCount += entry.times;
        }
    }
}