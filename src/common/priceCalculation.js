const PriceCalculation = {
  calculateItemTotal(items) {
    return items.reduce(
      (acc, { amount, product }) =>
        Math.round((acc * 100) + ((amount * product.price) * 100)) / 100,
      0
    );
  },

  calculateCouponsTotal(coupons) {
    return coupons.reduce(
      (acc, { amount }) => Math.round((acc * 100) + (amount * 100)) / 100,
      0
    );
  },

  isInShippingCostRange(price) {
    return price > 0 && price < this.minPriceShipping;
  },

  calculateGrandTotal(itemTotal, coupons) {
    let grandTotal = itemTotal;
    const couponsTotal = this.calculateCouponsTotal(coupons);

    if (this.isInShippingCostRange(itemTotal)) {
      grandTotal = itemTotal + this.shippingCost;
    }

    if (grandTotal <= couponsTotal) {
      return 0;
    }

    return Math.round((grandTotal * 100) - (couponsTotal * 100)) / 100;
  },

  getRemainingCouponsAmount(itemTotal, coupons) {
    let total = this.isInShippingCostRange(itemTotal) ? itemTotal + this.shippingCost : itemTotal;

    return coupons.map((coupon) => {
      let amount;
      if (coupon.amount > total) {
        amount = Math.round((coupon.amount * 100) - (total * 100)) / 100;
      } else {
        total = Math.round((total * 100) - (coupon.amount * 100)) / 100;
        amount = 0;
      }

      return Object.assign({}, coupon.toObject(), { amount });
    });
  },
};

module.exports = {
  create(minPriceShipping, shippingCost) {
    const obj = Object.create(PriceCalculation);
    obj.minPriceShipping = minPriceShipping;
    obj.shippingCost = shippingCost;
    return obj;
  },
};

