import React, {useEffect, useState} from "react";
import HomePage from "../pages/HomePage/HomePage.js";
import OrderData from "../../model/OrderData";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import InsideCartPage from "../pages/InsideCartPage/InsideCartPage";

library.add(faShoppingCart)

function App() {
    const [order, setOrder] = useState(() => new OrderData([]));
    const [popup, setPopup] = useState(null);
    useEffect(fetchOrderData, []);

    return <>
        {renderPage()}
        {renderPopup()}
    </>;

    function renderPage() {
        switch (window.location.pathname.toLowerCase()) {
            case "/hello": return <div>Hello everybody</div>;
            case "/cart": return <InsideCartPage order={order} onOrderDataChanged={newOrder => setOrder(newOrder)}/>;
            case "/":
            case "/home":
            default: return <HomePage order={order} onOrderDataChanged={newOrder => setOrder(newOrder)} onShowPopup={setPopup}/>;
        }
    }

    function renderPopup() {
        if (!popup) return null;

        return <div className="app__overlay" onClick={() => setPopup(null)}>
            <div className="app__popup" onClick={e => e.stopPropagation()}>
                {popup}
            </div>
        </div>;
    }

    function fetchOrderData() {
        // implement the real thing here, then delete the setupDummyData BS.
        fetch("http://localhost:8081/api/shopping-cart", {mode: "cors", credentials: 'include'})
            .then(resp => resp.json())
            .then(entries => setOrder(new OrderData(entries)))
            .catch(() => console.error("Could not fetch order data"));
    }
}
export default App;
