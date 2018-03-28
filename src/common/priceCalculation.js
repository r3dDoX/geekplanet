const PriceCalculation = {
  calculateItemTotal(items) {
    return items.reduce(
      (acc, { amount, product }) => ((acc * 100) + ((amount * product.price) * 100)) / 100,
      0
    );
  },

  calculateCouponsTotal(coupons) {
    return coupons.reduce(
      (acc, { amount }) => ((acc * 100) + (amount * 100)) / 100,
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

    return ((grandTotal * 100) - (couponsTotal * 100)) / 100;
  },

  getRemainingCouponsAmount(itemTotal, coupons) {
    let total = this.isInShippingCostRange(itemTotal) ? itemTotal + this.shippingCost : itemTotal;

    return coupons.map((coupon) => {
      if (coupon.amount > total) {
        coupon.amount = ((coupon.amount * 100) - (total * 100)) / 100;
      } else {
        total = ((total * 100) - (coupon.amount * 100)) / 100;
        coupon.amount = 0;
      }

      return coupon;
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

