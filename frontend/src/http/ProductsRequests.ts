import ProductData from "../model/ProductData";
import CartEntry from "../model/CartEntry";


export function addToOrder(productId: string, amountToAdd: number, amountToSet: number) : Promise<CartEntry> {
    const request: RequestInit = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({productId: productId, addTimes: amountToAdd, setTimes: amountToSet}),
        credentials: 'include',
        mode: "cors"
    };

    return fetch("http://localhost:8081/api/shopping-cart/add", request)
        .then(response => response.json());
}

export function fetchOrder() : Promise<CartEntry[]> {
    return fetch("http://localhost:8081/api/shopping-cart", {mode: "cors", credentials: 'include'})
        .then(resp => resp.json());
}

export function fetchProduct(productId: string) : Promise<ProductData> {
    return fetch("http://localhost:8081/api/products/" + productId, {mode: "cors", credentials: 'include'})
        .then(resp => resp.json());
}

export function fetchProducts() : Promise<ProductData[]> {
    return  fetch("http://localhost:8081/api/products/", {mode: "cors", credentials: 'include'})
        .then(resp => resp.json());
}