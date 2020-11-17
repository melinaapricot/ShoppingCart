package eu.melinaapricot.shoppingcart.web.endpoints

import eu.melinaapricot.shoppingcart.db.ProductsRepository
import eu.melinaapricot.shoppingcart.db.SessionCache
import eu.melinaapricot.shoppingcart.model.CartUpdateData
import eu.melinaapricot.shoppingcart.usercases.UpdateOrderUseCase
import eu.melinaapricot.shoppingcart.web.utils.RequestUtils
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.request.receive
import io.ktor.response.respond
import io.ktor.routing.get
import io.ktor.routing.post
import io.ktor.routing.routing


fun setupShoppingCartRoutes(app: Application, sessionCache: SessionCache, productsRepo: ProductsRepository) {
    app.routing {
        get("/api/shopping-cart") {
            val session = RequestUtils.requireSession(call, sessionCache)
            call.respond(session.order.entries)
        }

        post("/api/shopping-cart/add") {
            val session = RequestUtils.requireSession(call, sessionCache)
            val requestBody = call.receive<CartUpdateData>()

            val updatedEntry = UpdateOrderUseCase(session.order, requestBody, productsRepo).run()
            call.respond(updatedEntry)
        }
    }
}
