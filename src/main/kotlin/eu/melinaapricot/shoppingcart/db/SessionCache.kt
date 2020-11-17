package eu.melinaapricot.shoppingcart.db

import eu.melinaapricot.shoppingcart.model.ShopSession
import java.util.concurrent.ConcurrentHashMap

class SessionCache {
    private val data = ConcurrentHashMap<String, ShopSession>()

    fun getOrCreate(id: String): ShopSession {
        if (this.data.containsKey(id)) {
            return this.data[id]!!
        }

        val newSession = ShopSession(id)
        this.data[id] = newSession
        return newSession
    }
}
