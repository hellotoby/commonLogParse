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

Deno.test("validateIpAddress returns input", () => {
  const input = "127.0.0.1";
  const result = validateIpAddress(input);
  if (result !== input) throw new Error("Should return input");
});

Deno.test("validateIdentd returns input", () => {
  const input = "user";
  const result = validateIdentd(input);
  if (result !== input) throw new Error("Should return input");
});

Deno.test("validateUserId returns input", () => {
  const input = "uid";
  const result = validateUserId(input);
  if (result !== input) throw new Error("Should return input");
});

Deno.test("validateTimestamp returns input", () => {
  const input = "2025-07-01T12:00:00Z";
  const result = validateTimestamp(input);
  if (result !== input) throw new Error("Should return input");
});

Deno.test("validateRequest returns input as RequestEntry", () => {
  const input = "GET /index.html HTTP/1.1";
  const result = validateRequest(input);
  if (result !== input) throw new Error("Should return input as RequestEntry");
});

// Deno.test("validateStatusCode returns input as HttpStatusCode", () => {
//   const input = "200";
//   const result = validateStatusCode(input);
//   if (result !== input) throw new Error("Should return input as HttpStatusCode");
// });

Deno.test("validateResponseSize parses string to number", () => {
  const input = "1234";
  const result = validateResponseSize(input);
  if (result !== 1234) throw new Error("Should parse string to number");
});

Deno.test("validateReferer returns input", () => {
  const input = "https://example.com";
  const result = validateReferer(input);
  if (result !== input) throw new Error("Should return input");
});

Deno.test("validateUserAgent returns input", () => {
  const input = "Mozilla/5.0";
  const result = validateUserAgent(input);
  if (result !== input) throw new Error("Should return input");
});

Deno.test("validateExtendedCommonLogValues returns correct object", () => {
  const input = [
    "127.0.0.1",
    "user",
    "uid",
    "2025-07-01T12:00:00Z",
    "GET /index.html HTTP/1.1",
    "200",
    "1234",
    "https://example.com",
    "Mozilla/5.0",
  ];
  const result = validateExtendedCommonLogValues(input);
  if (
    result.ipAddress !== input[0] ||
    result.identd !== input[1] ||
    result.userId !== input[2] ||
    result.timestamp !== input[3] ||
    result.request !== input[4] ||
    result.statusCode !== input[5] ||
    result.responseSize !== 1234 ||
    result.referer !== input[7] ||
    result.userAgent !== input[8]
  ) {
    throw new Error("Returned object does not match input");
  }
});
