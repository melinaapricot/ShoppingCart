import React, {useEffect, useState} from "react"
import "./HomePage.css"
import ProductCard from "../../reuseables/ProductCard/ProductCard"
import Header from "../../reuseables/Header/Header";
import Footer from "../../reuseables/Footer/Footer";

function HomePage(props) {
    const [products, setProducts] = useState([]);
    useEffect(fetchProductsFromBackend, []);

    return (
        <div className="homepage">
            <Header order={props.order}/>
            <main className="homepage__main">
                <section >
                    <h1>Welcome</h1>
                </section>
                <section className="homepage__products">
                    {products.map(p => <ProductCard key={p.id} product={p} order={props.order} onOrderDataChanged={props.onOrderDataChanged} />)}
                </section>
            </main>
            <Footer/>
        </div>
    );


    /// EVENTS
    function fetchProductsFromBackend() {
        fetch("http://localhost:8081/api/products/", {mode: "cors", credentials: 'include'})
            .then(resp => resp.json())
            .then(pr => setProducts(pr))
            .catch(e => window.alert("Oopsie, I could not connect to server"));
    }
}


export default HomePage
