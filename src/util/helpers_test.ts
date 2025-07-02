import { makeString } from "./helpers.ts";
import { assertEquals } from "@std/assert";

Deno.test("makeString should convert a number to a string", () => {
  assertEquals(makeString(123), "123");
});

Deno.test("makeString should convert a boolean true to a string", () => {
  assertEquals(makeString(true), "true");
});

Deno.test("makeString should convert a boolean false to a string", () => {
  assertEquals(makeString(false), "false");
});

Deno.test("makeString should convert null to a string", () => {
  assertEquals(makeString(null), "null");
});

Deno.test("makeString should convert undefined to a string", () => {
  assertEquals(makeString(undefined), "undefined");
});

Deno.test("makeString should convert an object to a string", () => {
  assertEquals(makeString({ a: 1 }), "[object Object]");
});

Deno.test("makeString should convert an array to a string", () => {
  assertEquals(makeString([1, 2, 3]), "1,2,3");
});

Deno.test("makeString should convert a string to itself", () => {
  assertEquals(makeString("hello"), "hello");
});

Deno.test("makeString should convert a symbol to a string", () => {
  assertEquals(makeString(Symbol("sym")), "Symbol(sym)");
});

Deno.test("makeString should convert a function to a string", () => {
  const fn = function test() {};
  assertEquals(makeString(fn), fn.toString());
});
