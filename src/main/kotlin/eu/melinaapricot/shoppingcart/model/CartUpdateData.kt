package eu.melinaapricot.shoppingcart.model

import java.util.*

data class CartUpdateData(
        val productId: UUID,
        val addTimes: Int?,
        val setTimes: Int?
)
