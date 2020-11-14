import React from "react"
import "./Main.css"
import ProductCard from "./ProductCard"

function Main() {
  return(
    <div className="main">
        <section className="main-top">
            <h1>Welcome</h1>
        </section>
        <section className="product-section">
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
          <ProductCard/>
        </section>
    </div>
  )
}


export default Main
