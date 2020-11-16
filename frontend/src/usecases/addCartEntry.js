import OrderData from "../model/OrderData";

export default function addCartEntry(orderData, newCartEntry) {
    const newEntries = orderData.entries.slice(); // TODO do black magic to add newCartEntry here as well

    const indexOfExistingEntry = newEntries.findIndex(e => e.productId === newCartEntry.productId);
    if (indexOfExistingEntry >= 0) newEntries[indexOfExistingEntry] = newCartEntry;
    else newEntries.push(newCartEntry);

    return new OrderData(newEntries);
}