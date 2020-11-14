import React from "react"
import "./Header.css"

function Header() {
  return(
    <div className="header">
      <a href="#default" className="logo">CompanyLogo</a>
      <div className="header-right">
         <a className="nav-item" href="#Home">Home</a>
         <a className="nav-item" href="#Contact">Contact</a>
         <a className="nav-item" href="About">About</a>
      </div>
    </div>
  )
}


export default Header
