import OrderData from "../model/OrderData";

export default function addCartEntry(orderData, newCartEntry) {
    const newEntries = orderData.entries.slice();
    const indexOfExistingEntry = newEntries.findIndex(e => e.productId === newCartEntry.productId);


    // TODO if newCartEntry.times < 0 remove the existing entry
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