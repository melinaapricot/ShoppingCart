package eu.melinaapricot.shoppingcart.web.config

import io.ktor.application.Application
import io.ktor.application.install
import io.ktor.features.ContentNegotiation
import io.ktor.jackson.jackson

class JsonConfig {
    fun setup(app: Application) {
        app.install(ContentNegotiation) {
            jackson() {}
        }
    }
}
