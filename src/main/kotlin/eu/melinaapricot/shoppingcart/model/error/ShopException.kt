package eu.melinaapricot.shoppingcart.model.error

import java.lang.RuntimeException

class ShopException : RuntimeException {
    val params = mutableMapOf<String, Any>()

    constructor(message: String) : super(message)
    constructor(message: String, cause: Throwable) : super(message, cause)

    fun set(key: String, value: Any?) : ShopException {
        if (value != null) {
            params[key] = value
        }

        return this
    }
}
