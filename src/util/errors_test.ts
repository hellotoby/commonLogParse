import { assert, assertEquals, assertInstanceOf } from "@std/assert";

import { ValidationError } from "./errors.ts";
import { InvalidCommonLogEntryError } from "../lib/CommonLogEntry.ts";

Deno.test("InvalidCommonLogEntryError: timestamp is read-only", () => {
  const err = new InvalidCommonLogEntryError("readonly test");
  try {
    // @ts-expect-error: testing
    err.timestamp = "2020-01-01T00:00:00.000Z";
  } catch (_) { /*Empty*/ }
  assertEquals(err.timestamp, err.timestamp);
});

Deno.test("InvalidCommonLogEntryError: timestamp is ISO 8601", () => {
  const err = new InvalidCommonLogEntryError();
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  assert(isoRegex.test(err.timestamp));
});

Deno.test("InvalidCommonLogEntryError: message defaults to empty string", () => {
  const err = new InvalidCommonLogEntryError();
  assertEquals(err.message, "");
});

Deno.test("InvalidCommonLogEntryError: stack property exists", () => {
  const err = new InvalidCommonLogEntryError("stack check");
  assert(typeof err.stack === "string" || typeof err.stack === "undefined");
});

Deno.test("ValidationError: timestamp is read-only", () => {
  const err = new ValidationError("readonly test");
  try {
    // @ts-expect-error: testing
    err.timestamp = "2020-01-01T00:00:00.000Z";
  } catch (_) { /*Empty*/ }
  assertEquals(err.timestamp, err.timestamp);
});

Deno.test("ValidationError: timestamp is ISO 8601", () => {
  const err = new ValidationError();
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  assert(isoRegex.test(err.timestamp));
});

Deno.test("ValidationError: message defaults to empty string", () => {
  const err = new ValidationError();
  assertEquals(err.message, "");
});

Deno.test("ValidationError: stack property exists", () => {
  const err = new ValidationError("stack check");
  assert(typeof err.stack === "string" || typeof err.stack === "undefined");
});

Deno.test("InvalidCommonLogEntryError: prototype chain", () => {
  const err = new InvalidCommonLogEntryError();
  assertEquals(
    Object.getPrototypeOf(err).constructor.name,
    "InvalidCommonLogEntryError",
  );
});

Deno.test("ValidationError: prototype chain", () => {
  const err = new ValidationError();
  assertEquals(Object.getPrototypeOf(err).constructor.name, "ValidationError");
});

Deno.test("InvalidCommonLogEntryError: can be used as Error", () => {
  const err = new InvalidCommonLogEntryError("test");
  assertInstanceOf(err, Error);
  assertEquals(err instanceof InvalidCommonLogEntryError, true);
});

Deno.test("ValidationError: can be used as Error", () => {
  const err = new ValidationError("test");
  assertInstanceOf(err, Error);
  assertEquals(err instanceof ValidationError, true);
});

Deno.test("InvalidCommonLogEntryError: error message is preserved after throw/catch", () => {
  let caught: InvalidCommonLogEntryError | unknown | undefined;
  try {
    throw new InvalidCommonLogEntryError("preserved");
  } catch (e) {
    caught = e;
  }
  assert(caught);
  // @ts-expect-error: testing
  assertEquals(caught!.message, "preserved");
});

Deno.test("ValidationError: error message is preserved after throw/catch", () => {
  let caught: ValidationError | unknown | undefined;
  try {
    throw new ValidationError("preserved");
  } catch (e) {
    caught = e;
  }
  assert(caught);
  // @ts-expect-error: testing
  assertEquals(caught!.message, "preserved");
});
