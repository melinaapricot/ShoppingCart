package eu.melinaapricot.shoppingcart.web.utils

import eu.melinaapricot.shoppingcart.db.SessionCache
import eu.melinaapricot.shoppingcart.model.ShopSession
import io.ktor.application.ApplicationCall
import java.lang.RuntimeException

class RequestUtils {
    companion object {
        fun requireSession(call: ApplicationCall, sessionCache: SessionCache): ShopSession {
            val cookie = call.request.cookies["SESSION"] ?: call.response.cookies["SESSION"]?.value ?: throw RuntimeException("Session was required")
            return sessionCache.getOrCreate(cookie)
        }
    }
}
