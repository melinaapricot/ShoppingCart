package eu.melinaapricot.shoppingcart.db

import eu.melinaapricot.shoppingcart.model.ProductData
import eu.melinaapricot.shoppingcart.model.error.ShopException
import java.util.*
import java.util.concurrent.ConcurrentHashMap

interface ProductsRepository {
    fun findById(id: UUID): ProductData?
    fun requireById(id: UUID): ProductData

    fun findAll(): Collection<ProductData>
}

class DummyProductsRepository : ProductsRepository {
    private val data = ConcurrentHashMap<UUID, ProductData>()

    init {
        val data = listOf(
                ProductData(UUID.randomUUID(), "Kroketes", 500),
                ProductData(UUID.randomUUID(), "Seeb", 300),
                ProductData(UUID.randomUUID(), "NEAKI!", 90),
                ProductData(UUID.randomUUID(), "Krasaki!", 700),
                ProductData(UUID.randomUUID(), "Cockatiel Harness", 7000),
                ProductData(UUID.randomUUID(), "Makaoniaaaa", 150)
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

}
