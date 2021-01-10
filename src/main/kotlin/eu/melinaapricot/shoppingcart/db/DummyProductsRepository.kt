package eu.melinaapricot.shoppingcart.db

import eu.melinaapricot.shoppingcart.model.ProductData
import eu.melinaapricot.shoppingcart.model.error.ShopException
import java.util.*
import java.util.concurrent.ConcurrentHashMap

interface ProductsRepository {
    fun findById(id: UUID): ProductData?
    fun requireById(id: UUID): ProductData

    fun findAll(): Collection<ProductData>
    fun findBySearchTerm(searchTerm: String): Collection<ProductData>
}

class DummyProductsRepository : ProductsRepository {
    private val data = ConcurrentHashMap<UUID, ProductData>()

    init {
        val data = listOf(
                ProductData(
                        UUID.randomUUID(),
                        "Straw Hat",
                        2000,
                        "Hand made straw hat to protect you from the summer sun ",
                        "https://images.pexels.com/photos/4602839/pexels-photo-4602839.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Comfy Slippers",
                        2500,
                        "Comfortable summer slippers for long walks at the beach",
                        "https://images.pexels.com/photos/2098848/pexels-photo-2098848.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Airy linen dress",
                        6000,
                        "Made by pure natural linen grown in the EU",
                        "https://images.pexels.com/photos/1447885/pexels-photo-1447885.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Surfboard!",
                        30000,
                        "Long sturdy surfboard. I know literally nothing about surfing...",
                        "https://images.pexels.com/photos/3278939/pexels-photo-3278939.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Glass bottle",
                        700,
                        "Portable and strong but light glass bottle, for multiple use.",
                        "https://images.pexels.com/photos/3651045/pexels-photo-3651045.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Beach bag",
                        1800,
                        "Roomy beach bag to fit everything you need to enjoy the sea",
                        "https://cdn.pixabay.com/photo/2017/02/19/13/47/beach-bag-and-towel-2079846__340.jpg"
                )
        )

        data.forEach { this.data[it.id] = it }
    }

    override fun findById(id: UUID): ProductData? {
        return this.data[id]
    }

    override fun requireById(id: UUID): ProductData {
        return this.findById(id)
                ?: throw ShopException("Product with id $id not found").set("id", id)
    }

    override fun findAll(): Collection<ProductData> {
        return this.data.values
    }

    override fun findBySearchTerm(searchTerm: String): Collection<ProductData> {
        return this.data
                .values
                .filter{ this.matches(it, searchTerm) }
    }


    private fun matches(product: ProductData, searchTerm: String) : Boolean {
        return product.name.contains(searchTerm, ignoreCase = true) ||
                product.description.contains(searchTerm, ignoreCase = true)
    }
}
