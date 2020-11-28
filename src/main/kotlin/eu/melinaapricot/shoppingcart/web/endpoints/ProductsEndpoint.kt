package eu.melinaapricot.shoppingcart.web.endpoints

import eu.melinaapricot.shoppingcart.db.ProductsRepository
import eu.melinaapricot.shoppingcart.model.ProductData
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.routing
import java.util.*

private class ShortProductModel(product: ProductData) {
    val id = product.id
    val name = product.name
    val price = product.price
}

private class DetailedProductModel(product: ProductData) {
    val id = product.id
    val name = product.name
    val price = product.price
    val description = product.description
}

fun setupProductRoutes(app: Application, productsRepo: ProductsRepository) {
    app.routing {
        get("/api/products") {
            call.respond(productsRepo.findAll().map{ ShortProductModel(it) })
        }

        get("/api/products/{id}") {
            val id = UUID.fromString(call.parameters["id"])
            val product = productsRepo.requireById(id)
            call.respond(DetailedProductModel(product))
        }
    }
}
