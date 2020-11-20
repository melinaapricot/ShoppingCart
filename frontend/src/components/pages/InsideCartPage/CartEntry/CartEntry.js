import React from "react"
import "./CartEntry.css"
import Price from "../../../reuseables/Price/Price";
import addCartEntry from "../../../../usecases/addCartEntry";

function CartEntry(props) {
    return <>
        <div className="cart-entry__name cart-entry__part">
            <b>{props.entry.productName}</b>
            <div>Description...</div>
        </div>
        <div className="cart-entry__times cart-entry__part">
            <button onClick={() => addToCart(null, -1)}>x</button>
            <button onClick={() => addToCart(-1, null)} disabled={props.entry.times <=  0}>-</button>
            {props.entry.times}
            <button onClick={() => addToCart(+1, null)}>+</button>
        </div>
        <div className="cart-entry__price cart-entry__part">
            <Price cents={props.entry.price * props.entry.times} hideCurrency={true}/>
        </div>
    </>

    function addToCart(amountToAdd, amountToSet) {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productId: props.entry.productId, addTimes: amountToAdd, setTimes: amountToSet}),
            credentials: 'include',
            mode: "cors"
        };

        fetch("http://localhost:8081/api/shopping-cart/add", request)
            .then(response => response.json())
            .then(entry => {
                // existing order: props.order
                const newOrder = addCartEntry(props.order, entry);
                props.onOrderDataChanged(newOrder);
            });

    }
}
    export default CartEntry