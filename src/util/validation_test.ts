import type { HttpStatusCode } from "../lib/CommonLogEntryTypes.ts";
import {
  validateExtendedCommonLogValues,
  validateIdentd,
  validateIpAddress,
  validateReferer,
  validateRequest,
  // validateStatusCode,
  validateResponseSize,
  validateTimestamp,
  validateUserAgent,
  validateUserId,
} from "./validation.ts";
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";

Deno.test("validateIpAddress returns input", () => {
  const input = "127.0.0.1";
  const result = validateIpAddress(input);
  assertEquals(result, input);
});

Deno.test("validateIdentd returns input", () => {
  const input = "user";
  const result = validateIdentd(input);
  assertEquals(result, input);
});

Deno.test("validateUserId returns input", () => {
  const input = "uid";
  const result = validateUserId(input);
  assertEquals(result, input);
});

Deno.test("validateTimestamp returns input", () => {
  const input = "2025-07-01T12:00:00Z";
  const result = validateTimestamp(input);
  assertEquals(result, input);
});

Deno.test("validateRequest returns input as RequestEntry", () => {
  const input = "GET /index.html HTTP/1.1";
  const result = validateRequest(input);
  assertEquals(result, input);
});

// Deno.test("validateStatusCode returns input as HttpStatusCode", () => {
//   const input = "200";
//   const result = validateStatusCode(input);
//   assertEquals(result, input);
// });

Deno.test("validateResponseSize parses string to number", () => {
  const input = "1234";
  const result = validateResponseSize(input);
  assertEquals(result, 1234);
});

Deno.test("validateReferer returns input", () => {
  const input = "https://example.com";
  const result = validateReferer(input);
  assertEquals(result, input);
});

Deno.test("validateUserAgent returns input", () => {
  const input = "Mozilla/5.0";
  const result = validateUserAgent(input);
  assertEquals(result, input);
});

Deno.test("validateExtendedCommonLogValues returns correct object", () => {
  const input = [
    "",
    "127.0.0.1",
    "user",
    "uid",
    "2025-07-01T12:00:00Z",
    "GET /index.html HTTP/1.1",
    200,
    "1234",
    "https://example.com",
    "Mozilla/5.0",
  ] as RegExpMatchArray;
  const result = validateExtendedCommonLogValues(input);
  assertEquals(result.ipAddress, input[1]);
  assertEquals(result.identd, input[2]);
  assertEquals(result.userId, input[3]);
  assertEquals(result.timestamp, input[4]);
  assertEquals(result.request, input[5]);
  assertEquals(result.statusCode, input[6] as unknown as HttpStatusCode);
  assertEquals(result.responseSize, parseInt(input[7]));
  assertEquals(result.referer, input[8]);
  assertEquals(result.userAgent, input[9]);
});
