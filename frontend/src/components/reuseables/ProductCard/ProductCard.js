import React from "react"
import "./ProductCard.css"
import addCartEntry from "../../../usecases/addCartEntry";

function ProductCard(props) {
    return (
        <div className="product-card">
            <img className="product-image" src="#" alt="Actually we have no product picture this is just a test."/>
            <div className="product-info">
                <h3 className="product-name">{props.product.name}</h3>
                <p className="price">{(props.product.price / 100).toFixed(2)} €</p>
            </div>
            <button className="card-button" onClick={addToCart}>
                Add to cart
            </button>
        </div>
    )

    function addToCart() {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productId: props.product.id, addTimes: 1}),
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

export default ProductCard