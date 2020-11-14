package eu.melinaapricot.shoppingcart.web

import eu.melinaapricot.shoppingcart.model.ProductData
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.routing
import java.util.*

private val PRODUCTS = listOf(
        ProductData(UUID.randomUUID(), "Kroketes", 500),
        ProductData(UUID.randomUUID(), "Seeb", 300),
        ProductData(UUID.randomUUID(), "NEAKI!", 90),
        ProductData(UUID.randomUUID(), "Krasaki!", 700),
        ProductData(UUID.randomUUID(), "Cockatiel Harness", 7000),
        ProductData(UUID.randomUUID(), "Makaoniaaaa", 150)
)

fun Application.productsEndpoint() {
    routing {
        get("/api/products") {
            call.respond(PRODUCTS)
        }
    }
}
