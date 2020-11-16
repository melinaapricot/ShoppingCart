import React  from "react"
import "./ProductCard.css"

function ProductCard(props) {
  return(
    <div className="product-card">
        <img className="product-image" src="#"/>
        <div className="product-info">
            <h3 className="product-name">{props.product.name}</h3>
            <p className="price">{(props.product.price / 100).toFixed(2)} €</p>
        </div>
        <button className="card-button">Add to cart</button>
    </div>
  )
}

export default ProductCard
