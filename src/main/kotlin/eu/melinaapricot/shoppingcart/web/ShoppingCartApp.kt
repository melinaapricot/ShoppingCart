package eu.melinaapricot.shoppingcart.web

import eu.melinaapricot.shoppingcart.db.DummyProductsRepository
import eu.melinaapricot.shoppingcart.db.ProductsRepository
import eu.melinaapricot.shoppingcart.db.SessionCache
import eu.melinaapricot.shoppingcart.web.config.CorsConfig
import eu.melinaapricot.shoppingcart.web.config.ErrorHandlingConfig
import eu.melinaapricot.shoppingcart.web.config.JsonConfig
import eu.melinaapricot.shoppingcart.web.config.SessionConfig
import eu.melinaapricot.shoppingcart.web.endpoints.setupProductRoutes
import eu.melinaapricot.shoppingcart.web.endpoints.setupShoppingCartRoutes
import io.ktor.server.engine.*
import io.ktor.server.netty.*


fun main(args: Array<String>) {
    // Setup application services
    val sessionCache = SessionCache()
    val productsRepo: ProductsRepository = DummyProductsRepository()

    // Start the server
    val server = embeddedServer(Netty, commandLineEnvironment(args))
    server.start(wait = false)
    val app = server.application

    // Setup server features
    JsonConfig().setup(app)
    CorsConfig().setup(app)
    ErrorHandlingConfig().setup(app)
    SessionConfig().setup(app)

    // Setup server endpoints
    setupProductRoutes(app, productsRepo)
    setupShoppingCartRoutes(app, sessionCache, productsRepo)
}
