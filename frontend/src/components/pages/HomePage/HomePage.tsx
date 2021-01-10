import React, {ReactComponentElement, ReactElement, useEffect, useState} from "react"
import "./HomePage.scss"
import ProductCard from "../../reuseables/ProductCard/ProductCard"
import Header from "../../reuseables/Header/Header";
import Footer from "../../reuseables/Footer/Footer";
import ProductInfo from "../../reuseables/ProductInfo/ProductInfo";
import {fetchProducts} from "../../../http/ProductsRequests";
import OrderData from "../../../model/OrderData";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props{
    order: OrderData;
    onShowPopup(content: ReactElement) : void;
    onOrderDataChanged(data: OrderData) : void;
}

function HomePage(props: Props) {
    const [products, setProducts] = useState([]);
    useEffect(fetchProductsFromBackend, []);

    return (
        <>
            <Header order={props.order}/>
            <main className="homepage__main">
                <section className="homepage__upper">
                    <div className="homepage__upper-welcome">
                        <h1 className="homepage__upper-message">Welcome to this sample shop. <br/>Try adding products to your shopping cart and see what happens!</h1>
                        <a href="homepage__products"><button className="homepage__upper-button">SHOP</button></a>
                    </div>
                </section>
                <section className="homepage__middle">
                    <div className="homepage__search-bar">
                        <input type="text" placeholder="Search"></input>
                        <button type="submit"><FontAwesomeIcon icon="search" className="homepage__search-icon"/></button>
                    </div>
                   <div className="homepage__products">
                        {products.map(p => <ProductCard
                            key={p.id}
                            product={p}
                            order={props.order}
                            onShowMore={productId =>
                                props.onShowPopup(<ProductInfo
                                    productId={productId}
                                    orderData={props.order}
                                    onOrderDataChanged={props.onOrderDataChanged}
                                    />
                                )
                            }
                            onOrderDataChanged={props.onOrderDataChanged} />)
                        }
                    </div>
                </section>
            </main>
            <Footer/>
        </>
    );


    /// EVENTS
    function fetchProductsFromBackend() {
        fetchProducts()
            .then(pr => setProducts(pr))
            .catch(() => window.alert("Oopsie, I could not connect to server"));
    }
}


export default HomePage
