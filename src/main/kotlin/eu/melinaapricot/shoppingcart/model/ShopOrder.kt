package eu.melinaapricot.shoppingcart.model

import java.util.*

class ShopOrder {
    val entries = mutableListOf<CartEntry>()

    fun getEntry(productId: UUID): CartEntry? {
        return this.entries.find { it.productId == productId }
    }
}
