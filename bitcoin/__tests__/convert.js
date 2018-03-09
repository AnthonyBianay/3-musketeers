'use strict';

const convert = require('..');
const Big = require('big.js');

test('should default to returning a Number', () => {
  expect(typeof convert(2, 'BTC', 'BTC')).toBe('number');
});

test('should return a Number', () => {
  //convert(2, 'BTC', 'BTC', 'Number');
  expect(typeof convert(2, 'BTC', 'BTC')).toBe('number');
});

test('should return a Big number', () => {
  expect(convert(2, 'BTC', 'BTC', 'Big')).toBeInstanceOf(Big);
});

test('should return a String', () => {
  //convert(2100, 'mBTC', 'BTC', 'String');
  expect(typeof convert(2100, 'mBTC', 'BTC', 'String')).toBe('string');
});

test('should convert an integer', () => {
  //convert(123456789012345, 'Satoshi', 'BTC', 'Number');
  expect(typeof convert(123456789012345, 'Satoshi', 'BTC', 'Number')).toBe('number');
});

test('should convert a number', () => {
  //convert(1234567.89012345, 'BTC', 'Satoshi', 'Number');
  expect(typeof convert(1234567.89012345, 'Satoshi', 'BTC', 'Number')).toBe('number');
});

test('should convert a string', () => {
  //convert('2', 'BTC', 'BTC', 'Number');
  expect(typeof convert('2', 'BTC', 'BTC', 'Number')).toBe('number');
});

test('should convert a Big number', () => {
  //convert(new Big(2), 'BTC', 'BTC', 'Number');
  expect(typeof convert(new Big(2), 'BTC', 'BTC', 'Number')).toBe('number');
});

test('should convert a NaN to a Number', () => {
  //convert(NaN, 'BTC', 'BTC', 'Number');
  //convert(NaN, 'BTC', 'mBTC', 'Number');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'Number')).toBe('number');
});

test('should convert a NaN to a String', () => {
  //convert(NaN, 'BTC', 'BTC', 'String');
  //convert(NaN, 'BTC', 'mBTC', 'String');
  expect(typeof convert(NaN, 'BTC', 'mBTC', 'String')).toBe('string');
});

test('should not convert a NaN to a Big', () => {
  expect(() => {
    convert(NaN, 'BTC', 'BTC', 'Big')}).toThrow();
});

test('should handle rounding errors', () => {
  expect(() => {
    convert(4.6, 'Satoshi', 'BTC', 'Number');
    convert(0.000000046, 'BTC', 'Satoshi', 'Number');
  }).toBeDefined();
});

test('should throw when untest is undefined', () => {
  expect(() => {
    convert(new Big(2), 'x', 'BTC', 'Number').toThrow();
    convert(new Big(2), 'BTC', 'x', 'Number').toThrow();
    convert(NaN, 'x', 'BTC', 'Number').toThrow();
    convert(NaN, 'BTC', 'x', 'Number').toThrow();
  }).toThrow();
});

test('should throw when representaion is undefined', () => {
  expect(() => {
    convert(2, 'BTC', 'mBTC', 'x');
    convert(NaN, 'BTC', 'mBTC', 'x');
  }).toThrow();
});

test('should allow untest aliases', () => {
  expect(convert(4.6, 'Satoshi', 'sat')).toEqual(4.6);
  expect(convert(4.6, 'μBTC', 'bit')).toEqual(4.6);
});
