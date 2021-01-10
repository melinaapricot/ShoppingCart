import React, {ReactElement, useEffect, useState} from "react";
import HomePage from "../pages/HomePage/HomePage";
import OrderData from "../../model/OrderData";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faShoppingCart, faSpinner, faSearch} from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import InsideCartPage from "../pages/InsideCartPage/InsideCartPage";
import {fetchOrder} from "../../http/ProductsRequests";


library.add(faShoppingCart)
library.add(faSpinner)
library.add(faSearch)

function App() {
    const [order, setOrder] = useState(() => new OrderData([]));
    const [popup, setPopup] = useState(null as ReactElement);
    useEffect(fetchOrderData, []);

    return <>
        {renderPage()}
        {renderPopup()}
    </>;

    function renderPage() : ReactElement {
        switch (window.location.pathname.toLowerCase()) {
            case "/hello": return <div>Hello everybody</div>;
            case "/cart": return <InsideCartPage order={order} onOrderDataChanged={newOrder => setOrder(newOrder)}/>;
            case "/":
            case "/home":
            default: return <HomePage order={order} onOrderDataChanged={newOrder => setOrder(newOrder)} onShowPopup={setPopup}/>;
        }
    }

    function renderPopup() : ReactElement {
        if (!popup) return null;

        return <div className="app__overlay" onClick={() => setPopup(null)}>
            <div className="app__popup" onClick={e => e.stopPropagation()}>
                {popup}
            </div>
        </div>;
    }

    function fetchOrderData() {
        fetchOrder()
            .then(entries => setOrder(new OrderData(entries)))
            .catch(() => console.error("Could not fetch order data"));
    }
}
export default App;
