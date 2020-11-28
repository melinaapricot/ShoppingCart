package eu.melinaapricot.shoppingcart.usercases

import eu.melinaapricot.shoppingcart.db.ProductsRepository
import eu.melinaapricot.shoppingcart.model.CartEntry
import eu.melinaapricot.shoppingcart.model.CartUpdateData
import eu.melinaapricot.shoppingcart.model.ProductData
import eu.melinaapricot.shoppingcart.model.ShopOrder
import eu.melinaapricot.shoppingcart.model.error.ShopException

class UpdateOrderUseCase(private val order: ShopOrder, private val change: CartUpdateData, private val productsRepo: ProductsRepository) {
    fun run(): CartEntry {
        val product = this.productsRepo.requireById(this.change.productId)
        val entryToUpdate = this.getOrCreateCartEntry(product)
        entryToUpdate.times = this.calculateNewAmount(entryToUpdate.times)

        if (entryToUpdate.times < 0) {
            order.entries.remove(entryToUpdate)
        }

        return entryToUpdate
    }

    private fun calculateNewAmount(currentAmount: Int): Int {
        if (this.change.setTimes != null) return this.change.setTimes
        else if (this.change.addTimes != null) return currentAmount + this.change.addTimes

        throw ShopException("setTimes or addTimes must be present, but both were null")
    }

    private fun getOrCreateCartEntry(product: ProductData): CartEntry {
        val existingEntry = this.order.getEntry(this.change.productId)
        if (existingEntry != null) return existingEntry

        val newEntry = CartEntry(product.id, 0, product.price, product.name)
        this.order.entries.add(newEntry)
        return newEntry
    }
}


