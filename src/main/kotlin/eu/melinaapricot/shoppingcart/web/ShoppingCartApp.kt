package eu.melinaapricot.shoppingcart.web

import eu.melinaapricot.shoppingcart.db.DummyProductsRepository
import eu.melinaapricot.shoppingcart.db.ProductsRepository
import eu.melinaapricot.shoppingcart.db.SessionCache
import eu.melinaapricot.shoppingcart.web.endpoints.setupProductRoutes
import eu.melinaapricot.shoppingcart.web.endpoints.setupShoppingCartRoutes
import io.ktor.application.Application
import io.ktor.application.ApplicationCallPipeline
import io.ktor.application.install
import io.ktor.features.CORS
import io.ktor.features.ContentNegotiation
import io.ktor.http.CookieEncoding
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.jackson.jackson
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import java.util.*


fun main(args: Array<String>) {
    /// SERVICES SETUP
    val sessionCache = SessionCache()
    val productsRepo: ProductsRepository = DummyProductsRepository()


    val server = embeddedServer(Netty, commandLineEnvironment(args))
    server.start(wait = false)

    installFeatures(server.application)
    installRoutes(server.application, sessionCache, productsRepo)
}


private fun installFeatures(app: Application) {
    app.install(ContentNegotiation) {
        jackson() {}
    }

    app.install(CORS) {
        method(HttpMethod.Options)
        method(HttpMethod.Get)
        method(HttpMethod.Post)
        method(HttpMethod.Put)
        method(HttpMethod.Delete)
        method(HttpMethod.Patch)
        header(HttpHeaders.AccessControlAllowHeaders)
        header(HttpHeaders.ContentType)
        header(HttpHeaders.AccessControlAllowOrigin)
        allowCredentials = true
        anyHost()
    }

    setupSessions(app)
}

private fun installRoutes(app: Application, sessionCache: SessionCache, productsRepo: ProductsRepository) {
    setupProductRoutes(app, productsRepo)
    setupShoppingCartRoutes(app, sessionCache, productsRepo)
}


/// SESSSIONS
private fun setupSessions(app: Application) {
    app.intercept(ApplicationCallPipeline.Call) {
        if (this.context.request.cookies["SESSION"] == null) {
            this.context.response.cookies.append(
                    "SESSION",
                    UUID.randomUUID().toString(),
                    CookieEncoding.RAW,
                    10000000L,
                    null,
                    null,
                    "/",
                    false,
                    true,
                    emptyMap()
            )
        }
    }
}
