const OrderStepsPrototype = {
  getLowerCaseNameByNumber(stepNumber) {
    return Object
      .entries(this)
      .find(([, value]) => value === stepNumber)[0]
      .toLowerCase();
  },
};

export default Object.create(
  OrderStepsPrototype,
  {
    ADDRESS: { value: 0, enumerable: true },
    AGB: { value: 1, enumerable: true },
    PAYMENT: { value: 2, enumerable: true },
    SUMMARY: { value: 3, enumerable: true },
    CONFIRMATION: { value: 4, enumerable: true },
  }
);
