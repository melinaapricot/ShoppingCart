import React from "react"
import "./Header.css"
//Font_Awesome
import {library} from '@fortawesome/fontawesome-svg-core'
import {faCheckSquare, faCoffee} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import OrderData from "../../../model/OrderData";



function Header(props) {
    return (
        <div className="header">
            <a href="#default" className="logo">CompanyLogo</a>
            <div className="nav">
                <a className="nav-item" href="#Home">Home</a>
                <a className="nav-item" href="#Contact">Contact</a>
                <a className="nav-item" href="About">About</a>
            </div>
            <div className="header-right">
                <FontAwesomeIcon icon="shopping-cart" className="cart-icon"/>
                <div className="bubble">{props.order.itemCount}</div>
                <div className="price-div">{(props.order.totalPrice/100).toFixed(2)}€</div>
            </div>
        </div>
    )
}


export default Header
