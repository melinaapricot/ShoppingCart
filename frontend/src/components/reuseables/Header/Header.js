import React from "react"
import "./Header.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function Header(props) {
    return (
        <header className="header">
            <a href="#default" className="header__logo">CompanyLogo</a>
            <div className="header__nav">
                <a className="header__nav-item" href="#Home">Home</a>
                <a className="header__nav-item" href="#Contact">Contact</a>
                <a className="header__nav-item" href="About">About</a>
            </div>
            <div className="header__right">
                <div className="header__cart-wrapper">
                    <FontAwesomeIcon icon="shopping-cart" className="header__cart-icon"/>
                    <div className="header__bubble">{props.order.itemCount}</div>
                </div>
                <div className="header__price">{(props.order.totalPrice / 100).toFixed(2)}€</div>
            </div>
        </header>
    )
}


export default Header;
