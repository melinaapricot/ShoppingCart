import React  from "react"
import "./ProductCard.css"

function ProductCard() {
  return(
    <div className="product-card">
        <img className="product-image" src="#"/>
        <div className="product-info">
            <h3 className="product-name">Dummy Title</h3>
            <p className="price">30 DummyDollars</p>
        </div>
    </div>
  )
}

export default ProductCard
