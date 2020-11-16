import React, {useEffect, useState} from "react"
import "./HomePage.css"
import ProductCard from "../../reuseables/ProductCard/ProductCard"
import Header from "../../reuseables/Header/Header";
import Footer from "../../reuseables/Footer/Footer";

function HomePage(props) {
    const [products, setProducts] = useState([]);
    useEffect(fetchProductsFromBackend, []);

    return (
        <div className="main">
            <Header order={props.order}/>
            <main>
                <section className="main-top">
                    <h1>Welcome</h1>
                </section>
                <section className="product-section">
                    {products.map(p => <ProductCard key={p.id} product={p}/>)}
                </section>
            </main>
            <Footer/>
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


export default HomePage
