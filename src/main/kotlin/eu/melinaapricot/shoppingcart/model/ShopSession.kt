package eu.melinaapricot.shoppingcart.model

data class ShopSession(val id: String) {
    val order = ShopOrder()
}
