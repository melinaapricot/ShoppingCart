package eu.melinaapricot.shoppingcart.model

import java.util.*

class CartEntry(
        val productId: UUID,
        var times: Int,
        val price: Int,
        val productName: String
)
