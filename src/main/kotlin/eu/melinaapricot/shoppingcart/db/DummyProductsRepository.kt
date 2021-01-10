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
                        "Kroketes",
                        500,
                        "Poly nostimes ke taganes koketes",
                        "https://www.thesprucepets.com/thmb/mdpvmxT3SUn-p1AwSbgyn3FbAYU=/998x998/filters:fill(auto,1)/4150202-2HERO1-8a68ab76a3ae4cec8e68aae0f8ac2c50.jpg"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Seeb",
                        300,
                        "Grains, rice, and many more!",
                        "https://www.greenbiz.com/sites/default/files/images/articles/featured/seedsnopparatpromthasstock.png"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "NEAKI!",
                        90,
                        "PIIIIII-iiii!!",
                        "https://images.pexels.com/photos/4908011/pexels-photo-4908011.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Krasaki!",
                        700,
                        "Gia methismenes gatoules kai poulakia",
                        "https://cdn-image.departures.com/sites/default/files/1579816056/header-2016-robert-mondavi-winerys-cabernet-sauvignon-reserve-REDWINE0120.jpg"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Cockatiel Harness",
                        7000,
                        "Gia na phgainoun voltoules ta mikra papagalakia. Mikres voltoules kai megales voltoules. Prosoxh stous kofteosauous!",
                        "https://cdn10.bigcommerce.com/s-n3rdy5q/products/81/images/853/AviatorCockatiel01__36803.1486879175.1280.1280.jpg?c=2"
                ),
                ProductData(
                        UUID.randomUUID(),
                        "Makaoniaaaa",
                        150,
                        "Food = Makaonia",
                        "https://d1uz88p17r663j.cloudfront.net/resized/b01d809ae03b3751bc39c90498eb9f33_Pinoy-Spaghetti_Main_944_531.jpg"
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
