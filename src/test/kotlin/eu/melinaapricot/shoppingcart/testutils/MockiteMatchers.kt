package eu.melinaapricot.shoppingcart.testutils

import org.mockito.Mockito

fun <T> any(type: Class<T>): T = Mockito.any<T>(type)
