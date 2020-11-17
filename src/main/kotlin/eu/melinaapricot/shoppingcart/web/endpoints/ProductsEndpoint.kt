package eu.melinaapricot.shoppingcart.web.endpoints

import eu.melinaapricot.shoppingcart.db.ProductsRepository
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.routing

fun setupProductRoutes(app: Application, productsRepo: ProductsRepository) {
    app.routing {
        get("/api/products") {
            call.respond(productsRepo.findAll())
        }
    }
}
