import React from "react"
import "./ProductCard.scss"
import addCartEntry from "../../../usecases/addCartEntry";
import Price from "../Price/Price";
import {addToOrder} from "../../../http/ProductsRequests";
import ProductData from "../../../model/ProductData";
import OrderData from "../../../model/OrderData";

interface Props{
    product: ProductData;
    onShowMore(id: string) : void;
    order: OrderData;
    onOrderDataChanged(data: OrderData) : void;
}

function ProductCard(props: Props) {
    return (
        <div className="product-card">
            <img className="product-card__image" src={props.product.mainImage} alt="Actually we have no real product picture this is just a test."/>
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
        addToOrder(props.product.id, 1, null)
            .then(entry => {
                const newOrder = addCartEntry(props.order, entry);
                props.onOrderDataChanged(newOrder);
            });
    }
}

export default ProductCard