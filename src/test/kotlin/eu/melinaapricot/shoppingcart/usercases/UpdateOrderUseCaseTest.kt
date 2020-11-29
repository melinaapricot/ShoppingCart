package eu.melinaapricot.shoppingcart.usercases

import eu.melinaapricot.shoppingcart.db.ProductsRepository
import eu.melinaapricot.shoppingcart.model.CartEntry
import eu.melinaapricot.shoppingcart.model.CartUpdateData
import eu.melinaapricot.shoppingcart.model.ProductData
import eu.melinaapricot.shoppingcart.model.ShopOrder
import eu.melinaapricot.shoppingcart.model.error.ShopException
import eu.melinaapricot.shoppingcart.testutils.any
import org.assertj.core.api.Assertions.assertThat
import org.assertj.core.api.Assertions.assertThatThrownBy
import org.junit.jupiter.api.Test
import org.mockito.Mockito.*
import java.util.*


class UpdateOrderUseCaseTest {
    /// CONFIG
    companion object {
        private val PRODUCT1 = ProductData(UUID.randomUUID()!!, "product 1", 50, "Description 1", "img1")
        private val PRODUCT2 = ProductData(UUID.randomUUID()!!, "product 2", 70, "Description 2", "img2")
        private val NOT_EXISTING_ID = UUID.randomUUID()!!
    }


    /// TESTS
    @Test
    fun shouldThrowIfProductDoesNotExists() {
        val repo = this.createDummyProductsRepo()
        val order = ShopOrder()
        val change = CartUpdateData(NOT_EXISTING_ID, 1, null)

        assertThatThrownBy { UpdateOrderUseCase(order, change, repo).run() }
                .isExactlyInstanceOf(ShopException::class.java)
                .hasMessage("Product not found")
    }

    @Test
    fun shouldThrowIfChangeDoesNoeSpecifyAmount() {
        val repo = this.createDummyProductsRepo()
        val order = ShopOrder()
        val change = CartUpdateData(PRODUCT1.id, null, null)

        assertThatThrownBy { UpdateOrderUseCase(order, change, repo).run() }
                .isExactlyInstanceOf(ShopException::class.java)
                .hasMessage("setTimes or addTimes must be present, but both were null")
    }

    @Test
    fun shouldInsertEntryOnEmptyOrder() {
        val repo = this.createDummyProductsRepo()
        val order = ShopOrder()
        val change = CartUpdateData(PRODUCT1.id, 3, null)

        val result = UpdateOrderUseCase(order, change, repo).run()

        assertThat(result.productId).isEqualTo(PRODUCT1.id)
        assertThat(result.price).isEqualTo(PRODUCT1.price)
        assertThat(result.times).isEqualTo(3)
        assertThat(result.productName).isEqualTo(PRODUCT1.name)
        assertThat(order.entries).containsExactly(result)
    }

    @Test
    fun shouldSetEntryAmountToTheSpecified() {
        val repo = this.createDummyProductsRepo()
        val order = ShopOrder()
        val change = CartUpdateData(PRODUCT2.id, null, 77)

        order.entries.add(CartEntry(PRODUCT2.id, 3, PRODUCT2.price, PRODUCT2.name, PRODUCT2.mainImage))
        val result = UpdateOrderUseCase(order, change, repo).run()

        assertThat(result.productId).isEqualTo(PRODUCT2.id)
        assertThat(result.price).isEqualTo(PRODUCT2.price)
        assertThat(result.times).isEqualTo(77)
        assertThat(result.productName).isEqualTo(PRODUCT2.name)
        assertThat(order.entries).containsExactly(result)
    }

    @Test
    fun shouldAddTheSpecifiedAddAmount() {
        val repo = this.createDummyProductsRepo()
        val order = ShopOrder()
        val change = CartUpdateData(PRODUCT2.id, 77, null)

        order.entries.add(CartEntry(PRODUCT2.id, 3, PRODUCT2.price, PRODUCT2.name, PRODUCT2.mainImage))
        val result = UpdateOrderUseCase(order, change, repo).run()

        assertThat(result.productId).isEqualTo(PRODUCT2.id)
        assertThat(result.price).isEqualTo(PRODUCT2.price)
        assertThat(result.times).isEqualTo(77 + 3)
        assertThat(result.productName).isEqualTo(PRODUCT2.name)
        assertThat(order.entries).containsExactly(result)
    }

    @Test
    fun shouldRemoveEntryIfAmountIsNegative() {
        val repo = this.createDummyProductsRepo()
        val order = ShopOrder()
        val change = CartUpdateData(PRODUCT2.id, null, -1)

        val entry1 = CartEntry(PRODUCT1.id, 1, PRODUCT1.price, PRODUCT1.name, PRODUCT1.mainImage)
        val entry2 = CartEntry(PRODUCT2.id, 3, PRODUCT2.price, PRODUCT2.name, PRODUCT2.mainImage)
        order.entries.add(entry1)
        order.entries.add(entry2)

        val result = UpdateOrderUseCase(order, change, repo).run()

        assertThat(result.productId).isEqualTo(PRODUCT2.id)
        assertThat(result.price).isEqualTo(PRODUCT2.price)
        assertThat(result.times).isEqualTo(-1)
        assertThat(result.productName).isEqualTo(PRODUCT2.name)
        assertThat(order.entries).containsExactly(entry1)
    }

    @Test
    fun shouldKeepEntryIfAmountIsZero() {
        val repo = this.createDummyProductsRepo()
        val order = ShopOrder()
        val change = CartUpdateData(PRODUCT2.id, -3, null)

        val entry1 = CartEntry(PRODUCT1.id, 1, PRODUCT1.price, PRODUCT1.name, PRODUCT1.mainImage)
        val entry2 = CartEntry(PRODUCT2.id, 3, PRODUCT2.price, PRODUCT2.name, PRODUCT2.mainImage)
        order.entries.add(entry1)
        order.entries.add(entry2)

        val result = UpdateOrderUseCase(order, change, repo).run()

        assertThat(result.productId).isEqualTo(PRODUCT2.id)
        assertThat(result.price).isEqualTo(PRODUCT2.price)
        assertThat(result.times).isEqualTo(0)
        assertThat(result.productName).isEqualTo(PRODUCT2.name)
        assertThat(order.entries).containsExactly(entry1, entry2)
    }


    /// UTILS
    private fun createDummyProductsRepo(): ProductsRepository {
        val result = mock(ProductsRepository::class.java)
        val products = listOf(PRODUCT1, PRODUCT2)

        doThrow(ShopException("Product not found")).`when`(result).requireById(any(UUID::class.java))
        products.forEach { doReturn(it).`when`(result).requireById(it.id) }

        return result
    }
}
