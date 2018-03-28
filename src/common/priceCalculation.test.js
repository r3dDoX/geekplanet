const PriceCalculation = require('./priceCalculation');

describe('calculateItemTotal', () => {
  it('should add all given products multiplied by amount', () => {
    const items = [
      {
        amount: 3,
        product: {
          price: 4.75,
        },
      },
      {
        amount: 1,
        product: {
          price: 1.50,
        },
      },
    ];

    const underTest = PriceCalculation.create();
    const result = underTest.calculateItemTotal(items);

    expect(result).toEqual(15.75);
  });

  it('should return 0 when empty array', () => {
    const items = [];

    const underTest = PriceCalculation.create();
    const result = underTest.calculateItemTotal(items);

    expect(result).toEqual(0);
  });

  it('should handle number rounding issues', () => {
    const items = [
      {
        amount: 1,
        product: {
          price: 4.2,
        },
      },
      {
        amount: 1,
        product: {
          price: 1.1,
        },
      },
    ];

    const underTest = PriceCalculation.create();
    const result = underTest.calculateItemTotal(items);

    expect(result).toEqual(5.3);
  });
});

describe('calculateCouponsTotal', () => {
  it('should add all given coupons', () => {
    const coupons = [
      { amount: 3 },
      { amount: 1 },
    ];

    const underTest = PriceCalculation.create();
    const result = underTest.calculateCouponsTotal(coupons);

    expect(result).toEqual(4);
  });

  it('should handle number rounding issues', () => {
    const coupons = [
      { amount: 15.2 },
      { amount: 11.1 },
    ];

    const underTest = PriceCalculation.create();
    const result = underTest.calculateCouponsTotal(coupons);

    expect(result).toEqual(26.3);
  });
});

describe('calculateGrandTotal', () => {
  it('should return item total when no coupons and shipping', () => {
    const underTest = PriceCalculation.create(50, 9);

    const result = underTest.calculateGrandTotal(50, []);

    expect(result).toEqual(50);
  });

  it('should return item total with shipping when no coupons but shipping', () => {
    const underTest = PriceCalculation.create(50, 9);

    const result = underTest.calculateGrandTotal(40, []);

    expect(result).toEqual(49);
  });

  it('should subtract coupons from item total including shipping', () => {
    const underTest = PriceCalculation.create(50, 9);

    const result = underTest.calculateGrandTotal(40, [{ amount: 10 }, { amount: 2 }]);

    expect(result).toEqual(37);
  });

  it('should subtract coupons from item total without shipping', () => {
    const underTest = PriceCalculation.create(50, 9);

    const result = underTest.calculateGrandTotal(50, [{ amount: 10 }, { amount: 2 }]);

    expect(result).toEqual(38);
  });
});

describe('getRemainingCouponsAmount', () => {
  it('should set coupons amount to 0 when total including shipping is greater than coupons', () => {
    const coupons = [{ _id: '1', amount: 10 }, { _id: '2', amount: 5 }];

    const underTest = PriceCalculation.create(50, 9);
    const result = underTest.getRemainingCouponsAmount(6, coupons);

    expect(result).toEqual([
      { _id: '1', amount: 0 },
      { _id: '2', amount: 0 },
    ]);
  });

  it('should leave remaining amount on coupons exceeding total including shipping', () => {
    const coupons = [{ _id: '1', amount: 30 }, { _id: '2', amount: 20 }];

    const underTest = PriceCalculation.create(50, 9);
    const result = underTest.getRemainingCouponsAmount(30, coupons);

    expect(result).toEqual([
      { _id: '1', amount: 0 },
      { _id: '2', amount: 11 },
    ]);
  });

  it('should work correctly with total exceeding min shipping', () => {
    const coupons = [{ _id: '1', amount: 60 }];

    const underTest = PriceCalculation.create(50, 9);
    const result = underTest.getRemainingCouponsAmount(50, coupons);

    expect(result).toEqual([
      { _id: '1', amount: 10 },
    ]);
  });

  it('should return empty array when no coupons given', () => {
    const coupons = [];

    const underTest = PriceCalculation.create(50, 9);
    const result = underTest.getRemainingCouponsAmount(30, coupons);

    expect(result).toEqual([]);
  });

  it('should handle number rounding issues', () => {
    const coupons = [{ _id: '1', amount: 60.1 }];

    const underTest = PriceCalculation.create(50, 9);
    const result = underTest.getRemainingCouponsAmount(51.4, coupons);

    expect(result).toEqual([
      { _id: '1', amount: 8.7 },
    ]);
  });
});
