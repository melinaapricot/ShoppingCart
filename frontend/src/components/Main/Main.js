import React, {useEffect, useState} from "react"
import "./Main.css"
import ProductCard from "../ProductCard/ProductCard"

function Main() {
    const [products, setProducts] = useState([]);
    useEffect(fetchProductsFromBackend, []);


    return (
        <div className="main">
            <section className="main-top">
                <h1>Welcome</h1>
            </section>
            <section className="product-section">
                {products.map(p => <ProductCard key={p.id} product={p}/>)}
            </section>
        </div>
    );


    /// EVENTS
    function fetchProductsFromBackend() {
        fetch("http://localhost:8081/api/products/", {mode: "cors"})
            .then(resp => resp.json())
            .then(pr => setProducts(pr))
            .catch(e => window.alert("Oopsie, I could not connect to server"));
    }
}


export default Main
