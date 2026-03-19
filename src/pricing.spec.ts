import assert from "node:assert/strict";
import { calculateFinalPrice } from "./pricing.js";

const tests: Array<{ name: string; run: () => void }> = [
  {
    name: "calculates final price with discount and tax",
    run: () => {
      const result = calculateFinalPrice(1000, 10, 18);
      assert.equal(result, 1062);
    },
  },
  {
    name: "returns unchanged price when discount and tax are zero",
    run: () => {
      const result = calculateFinalPrice(500, 0, 0);
      assert.equal(result, 500);
    },
  },
  {
    name: "throws for invalid discount range",
    run: () => {
      assert.throws(() => calculateFinalPrice(500, 120, 5));
    },
  },
];

for (const test of tests) {
  test.run();
  console.log(`PASS: ${test.name}`);
}

console.log(`All ${tests.length} unit tests passed.`);
