import React, {useEffect, useState} from "react";
import "./ProductInfo.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProductInfo(props) {
    const [productData, setProductData] = useState(null);
    useEffect(fetchProductData, []);

    return (
        <div className="product-info">
            <figure className="product-info__left">
            <img  src="https://images.pexels.com/photos/4908011/pexels-photo-4908011.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                 alt="Actually we have no product picture this is just a test." className="product-info__img"/>
            <figcaption>Image description</figcaption>
            </figure>
            <div className="product-info__right">
                <h1 className="product-info__name">{productData == null? "Name is loading" : productData.name}</h1>
                <p className="product-info__price">
                    {productData == null? "Price is loading"
                    :(productData.price / 100).toFixed(2) }
                <p className="product-info__price-desc">VAT included (where applicable)</p>
                </p>

                <div>Are productData here? {productData == null? "Data Loading" : "Yes, data arrived"}</div>
                Hello from product info. You selected {props.productId}
                <p className="product-info__desc">Description</p>
                <div>{productData == null? "Description is loading": productData.description}</div>
                <button className="product-info__addtocart-btn">Add to Cart
                </button>
            </div>
        </div>
    );


    function fetchProductData() {
        // TODO ask the server to give you the data for product with id props.productId.
        //  temporarily, we will pretend that the server responded with the following data:
        const dummyProductData = {
            id:"93154519-55b5-446b-8d74-601cac227aa8",
            name: "Seeb",
            price:300,
            description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",

            // add whatever info you would like to get.
        };

        // TODO we will pretend that the server sends the data and the response arrives after 2 seconds.
        setTimeout(() => setProductData(dummyProductData), 2000);
    }
}