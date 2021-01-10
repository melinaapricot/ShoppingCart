import OrderData from "../model/OrderData";
import CartEntry from "../model/CartEntry";

export default function addCartEntry(orderData: OrderData, newCartEntry: CartEntry) : OrderData {
    const newEntries = orderData.entries.slice();
    const indexOfExistingEntry = newEntries.findIndex(e => e.productId === newCartEntry.productId);

    if (newCartEntry.times < 0) {
        if (indexOfExistingEntry >= 0) {
            newEntries.splice(indexOfExistingEntry, 1);
        }
    }   else {
        if (indexOfExistingEntry >= 0) newEntries[indexOfExistingEntry] = newCartEntry;
        else newEntries.push(newCartEntry);
    }

    return new OrderData(newEntries);
}