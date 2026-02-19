const { add, subtract } = require('../src/math');

describe('Math Functions', () => {
  test('add function should return correct sum', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('add with negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  test('add with zero', () => {
    expect(add(5, 0)).toBe(5);
  });

  test('subtract function should return correct difference', () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
