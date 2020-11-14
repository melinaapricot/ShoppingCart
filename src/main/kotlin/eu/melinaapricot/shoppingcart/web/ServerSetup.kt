package eu.melinaapricot.shoppingcart.web

import io.ktor.application.Application
import io.ktor.application.install
import io.ktor.features.ContentNegotiation
import io.ktor.http.ContentType
import io.ktor.jackson.JacksonConverter

fun Application.setup() {
    install(ContentNegotiation) {
        register(ContentType.Application.Json, JacksonConverter())
    }
}
