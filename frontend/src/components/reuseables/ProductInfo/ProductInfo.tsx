import React, {useEffect, useState} from "react";
import "./ProductInfo.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {addToOrder, fetchProduct} from "../../../http/ProductsRequests";
import addCartEntry from "../../../usecases/addCartEntry";
import ProductData from "../../../model/ProductData";
import OrderData from "../../../model/OrderData";


interface Props{
    productId: string;
    orderData: OrderData;
    onOrderDataChanged(data: OrderData) : void;
}

export default function ProductInfo(props: Props) {
    const [productData, setProductData] = useState(null as ProductData);
    useEffect(fetchProductData, [props.productId]);

    if (productData == null) {
        return <div className="product-info--loading">
            <FontAwesomeIcon icon="spinner" spin className="product-info__spinner"/>
        </div>;
    }

    return (
        <div className="product-info">
            <figure className="product-info__left">
                <img src={productData.mainImage}
                     alt="Actually we have no product picture this is just a test."
                     className="product-info__img"/>
                <figcaption>Image description</figcaption>
            </figure>
            <div className="product-info__right">
                <h2 className="product-info__name">{productData.name}</h2>
                <div className="product-info__price">
                    {(productData.price / 100).toFixed(2)}
                    <p className="product-info__price-desc">VAT included (where applicable)</p>
                </div>

                <div>Are productData here? {"Yes, data arrived"}</div>
                Hello from product info. You selected {props.productId}
                <p className="product-info__desc">Description</p>
                <div>{productData.description}</div>
                <button className="product-info__addtocart-btn" onClick={addToCart}>Add to Cart</button>
            </div>
        </div>
    );

    function fetchProductData() {
        fetchProduct(props.productId)
            .then(realData => setProductData(realData))
            .catch(err => console.error(err));
    }

    function addToCart() {
        addToOrder(props.productId, 1, null)
            .then(entry => {
                const newOrder = addCartEntry(props.orderData, entry)
                props.onOrderDataChanged(newOrder)
            });
    }
}

