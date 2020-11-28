import React from "react"
import "./InsideCartPage.css"
import Header from "../../reuseables/Header/Header";
import Footer from "../../reuseables/Footer/Footer";
import CartEntry from "./CartEntry/CartEntry";
import Price from "../../reuseables/Price/Price";

function InsideCartPage(props) {
    return (
        <>
            <Header order={props.order}/>
            <main className="inside-cart-page__main">
                <section className="inside-cart-page__entries">
                    <span className="inside-cart-page__span inside-cart-page__product-span">Product</span>
                    <span className="inside-cart-page__span">Quantity</span>
                    <span className="inside-cart-page__span">Price</span>
                    <span className="inside-cart-page__span">Actions</span>

                    {props.order.entries.map(entry => <CartEntry key={entry.productId} entry={entry} order={props.order} onOrderDataChanged={props.onOrderDataChanged}/>)}
                </section>
                <section className="inside-cart-page__results">
                    <div><Price cents={props.order.totalPrice} /></div>
                </section>
            </main>
            <Footer/>
        </>
    )
}


export default InsideCartPage
