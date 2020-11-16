import React, {useEffect, useState} from "react";
import HomePage from "../pages/HomePage/HomePage.js";
import OrderData from "../../model/OrderData";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

library.add(faShoppingCart)

function App() {
    const [order, setOrder] = useState(() => new OrderData([]));
    useEffect(setupDummyData, []);

    switch (window.location.pathname.toLowerCase()) {
        case "/hello": return <div>Hello</div>;
        case "/":
        case "/home":
        default: return <HomePage order={order} />;
    }

    function setupDummyData() {
        const dummyEntries = [
            {
                "times": 1,
                "productId": "id1",
                "price": 600,
                "productName": "Koketes!"
            },
            {
                "times": 5,
                "productId": "id2",
                "price": 1000,
                "productName": "Synapsid in sweet sour sauce"
            },
            {
                "times": 2,
                "productId": "id3",
                "price": 300,
                "productName": "Green tea jasmine"
            }
        ];

        setTimeout(() => setOrder(new OrderData(dummyEntries)), 1000);
    }
}

export default App;
