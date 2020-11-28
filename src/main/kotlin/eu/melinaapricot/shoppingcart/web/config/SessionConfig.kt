package eu.melinaapricot.shoppingcart.web.config

import io.ktor.application.Application
import io.ktor.application.ApplicationCallPipeline
import io.ktor.http.CookieEncoding
import java.util.*

class SessionConfig {
    fun setup(app: Application) {
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
}
