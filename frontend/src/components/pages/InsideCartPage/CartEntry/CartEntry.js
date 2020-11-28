import React, {useEffect, useState} from "react"
import "./CartEntry.css"
import Price from "../../../reuseables/Price/Price";
import addCartEntry from "../../../../usecases/addCartEntry";

function CartEntry(props) {
    const [amount, setAmount] = useState(props.entry.times);
    useEffect(() => setAmount(props.entry.times), [props.entry])

    return <>
        <div className="cart-entry__name cart-entry__part">
            <b>{props.entry.productName}</b>
            <div>Description...</div>
        </div>
        <div className="cart-entry__times cart-entry__part">
            <button className="cart-entry__amount-btns" onClick={() => addToCart(-1, null)}
                    disabled={props.entry.times <= 0}>-
            </button>
            <form className="cart-entry__form" onSubmit={e => {
                e.preventDefault();
                updateAmount();
            }}>
                <input className="cart-entry__input" onChange={e => setAmount(e.target.value)} value={amount}
                       onBlur={updateAmount}/>
            </form>
            <button className="cart-entry__amount-btns" onClick={() => addToCart(+1, null)}>+</button>
        </div>
        <Price cents={props.entry.price * props.entry.times} hideCurrency={true}/>
        <button className="cart-entry__delete-btn" onClick={() => addToCart(null, -1)}>x</button>
    </>

    function updateAmount() {
        const asNumber = parseInt(amount);
        if (asNumber === props.entry.times) {
            console.log("Nothing has changed")
        } else if (isNaN(asNumber) || asNumber < 0) {
            setAmount(props.entry.times)
        } else {
            addToCart(null, asNumber)
        }
    }


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