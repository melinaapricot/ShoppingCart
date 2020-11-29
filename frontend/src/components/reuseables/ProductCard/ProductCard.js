import React from "react"
import "./ProductCard.scss"
import addCartEntry from "../../../usecases/addCartEntry";
import Price from "../Price/Price";

function ProductCard(props) {
    return (
        <div className="product-card">
            <img className="product-card__image" src="https://images.pexels.com/photos/4908011/pexels-photo-4908011.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="Actually we have no product picture this is just a test."/>
            <b className="product-card__name">{props.product.name}</b>
            <Price cents={props.product.price} />
            <button className="product-card__more-info" onClick={() => props.onShowMore && props.onShowMore(props.product.id)}>
            Show more
            </button>
            <button className="product-card__buy-button" onClick={addToCart}>
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