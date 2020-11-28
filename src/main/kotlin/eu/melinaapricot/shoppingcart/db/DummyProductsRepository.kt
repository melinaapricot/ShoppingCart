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
                ProductData(UUID.randomUUID(), "Kroketes", 500, "Poly nostimes ke taganes koketes"),
                ProductData(UUID.randomUUID(), "Seeb", 300, "Grains, rice, and many more!"),
                ProductData(UUID.randomUUID(), "NEAKI!", 90, "PIIIIII-iiii!!"),
                ProductData(UUID.randomUUID(), "Krasaki!", 700, "Gia methismenes gatoules kai poulakia"),
                ProductData(UUID.randomUUID(), "Cockatiel Harness", 7000, "Gia na phgainoun voltoules ta mikra papagalakia. Mikres voltoules kai megales voltoules. Prosoxh stous kofteosauous!"),
                ProductData(UUID.randomUUID(), "Makaoniaaaa", 150, "Food = Makaonia")
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
