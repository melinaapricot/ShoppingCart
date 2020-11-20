import React from "react"
import "./InsideCartPage.css"
import Header from "../../reuseables/Header/Header";
import Footer from "../../reuseables/Footer/Footer";
import CartEntry from "./CartEntry/CartEntry";
import Price from "../../reuseables/Price/Price";

function InsideCartPage(props) {
    return (
        <div className="inside-cart-page">
            <Header order={props.order}/>
            <main className="inside-cart-page__main">
                <section className="inside-cart-page__entries">
                    <span className="inside-cart-page__span">Product</span>
                    <span className="inside-cart-page__span">Quantity</span>
                    <span className="inside-cart-page__span">Price</span>
                    {props.order.entries.map(entry => <CartEntry key={entry.productId} entry={entry} order={props.order} onOrderDataChanged={props.onOrderDataChanged}/>)}
                </section>
                <section className="inside-cart-page__results">
                    <div><Price cents={props.order.totalPrice} /></div>
                </section>
            </main>
            <Footer/>
        </div>
    )
}


export default InsideCartPage
