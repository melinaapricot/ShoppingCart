import React from "react"
import "./InsideCartPage.css"
import Header from "../../reuseables/Header/Header";
import Footer from "../../reuseables/Footer/Footer";
import CartEntryView from "./CartEntry/CartEntryView";
import Price from "../../reuseables/Price/Price";
import CartEntry from "../../../model/CartEntry";
import OrderData from "../../../model/OrderData";


interface Props{
    order: OrderData;
    onOrderDataChanged(data: OrderData) : void;

}

function InsideCartPage(props: Props) {
    return (
        <>
            <Header order={props.order}/>
            <main className="inside-cart-page__main">
                <section className="inside-cart-page__entries">
                    <span className="inside-cart-page__span inside-cart-page__product-span">Product</span>
                    <span className="inside-cart-page__span">Quantity</span>
                    <span className="inside-cart-page__span">Price</span>
                    <span className="inside-cart-page__span">Actions</span>

                    {props.order.entries.map(entry => <CartEntryView key={entry.productId} entry={entry} order={props.order} onOrderDataChanged={props.onOrderDataChanged}/>)}
                </section>
                <section className="inside-cart-page__results">
                    <div><Price cents={props.order.totalPrice}/></div>
                </section>
            </main>
            <Footer/>
        </>
    )
}


export default InsideCartPage
