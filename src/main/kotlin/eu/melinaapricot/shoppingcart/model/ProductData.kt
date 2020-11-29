package eu.melinaapricot.shoppingcart.model

import java.util.*

class ProductData(
        val id: UUID,
        val name: String,
        val price: Int,
        val description: String,
        val mainImage: String
)
