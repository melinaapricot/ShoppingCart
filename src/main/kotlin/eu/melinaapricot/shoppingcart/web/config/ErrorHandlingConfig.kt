package eu.melinaapricot.shoppingcart.web.config

import eu.melinaapricot.shoppingcart.model.error.ShopException
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.application.log
import io.ktor.features.StatusPages
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond

class ErrorResponse(
        val errorType: String,
        val errorMessage: String,
        val details: Map<String, Any>?
)

class ErrorHandlingConfig {
    fun setup(app: Application) {
        app.install(StatusPages) {
            exception<Throwable> {
                call.application.log.error("Error during request processing", it)

                val response = ErrorResponse(it.javaClass.simpleName, it.message ?: "", null)
                call.respond(HttpStatusCode.InternalServerError, response)
            }

            exception<ShopException> {
                call.application.log.error("Error during request processing: {}", it.message)

                val response = ErrorResponse(it.javaClass.simpleName, it.message ?: "", it.params)
                call.respond(HttpStatusCode.InternalServerError, response)
            }
        }
    }
}
