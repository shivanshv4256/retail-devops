export const calculateFinalPrice = (
  basePrice: number,
  discountPercent: number,
  taxPercent: number,
): number => {
  if (basePrice < 0) {
    throw new Error("Base price cannot be negative");
  }
  if (discountPercent < 0 || discountPercent > 100) {
    throw new Error("Discount percent must be between 0 and 100");
  }
  if (taxPercent < 0) {
    throw new Error("Tax percent cannot be negative");
  }

  const discounted = basePrice * (1 - discountPercent / 100);
  const withTax = discounted * (1 + taxPercent / 100);
  return Number(withTax.toFixed(2));
};
