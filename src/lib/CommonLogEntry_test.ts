import { makeExtendedCommonLogEntry } from "./CommonLogEntry.ts";
import { assert, assertEquals, assertStrictEquals } from "@std/assert";
import type { HttpStatusCode } from "./CommonLogEntryTypes.ts";

Deno.test("parses a valid ECLF entry with referer and userAgent", () => {
  const log =
    `127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326 "http://example.com/start.html" "Mozilla/4.08 [en] (Win98; I ;Nav)"`;
  const result = makeExtendedCommonLogEntry(log);
  assert(result, "Expected result to be non-null");
  assertEquals(result.ipAddress, "127.0.0.1");
  assertEquals(result.identd, "-");
  assertEquals(result.userId, "frank");
  assertEquals(result.timestamp, "10/Oct/2000:13:55:36 -0700");
  assertEquals(result.request, "GET /apache_pb.gif HTTP/1.0");
  assertEquals(result.statusCode, "200" as unknown as HttpStatusCode);
  assertEquals(result.responseSize, 2326);
  assertEquals(result.referer, "http://example.com/start.html");
  assertEquals(result.userAgent, "Mozilla/4.08 [en] (Win98; I ;Nav)");
});

Deno.test.ignore(
  "parses a valid ECLF entry with missing referer and userAgent",
  () => {
    const log =
      `127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326`;
    const result = makeExtendedCommonLogEntry(log);
    assertStrictEquals(result, null, "Expected result to be null");
  },
);

Deno.test.ignore("parses a valid ECLF entry with missing responseSize", () => {
  const log =
    `127.0.0.1 - frank [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 - "http://example.com/start.html" "Mozilla/4.08 [en] (Win98; I ;Nav)"`;
  const result = makeExtendedCommonLogEntry(log);
  assert(result, "Expected result to be non-null");
  assertStrictEquals(result.responseSize, undefined);
  assertEquals(result.referer, "http://example.com/start.html");
  assertEquals(result.userAgent, "Mozilla/4.08 [en] (Win98; I ;Nav)");
});

Deno.test("returns null for a malformed log entry", () => {
  const log = `malformed log entry`;
  const result = makeExtendedCommonLogEntry(log);
  assertStrictEquals(result, null, "Expected result to be null");
});

Deno.test("returns null for an empty string", () => {
  const result = makeExtendedCommonLogEntry("");
  assertStrictEquals(result, null, "Expected result to be null");
});

Deno.test("returns null for a log entry with only one field", () => {
  const log = `127.0.0.1`;
  const result = makeExtendedCommonLogEntry(log);
  assertStrictEquals(result, null, "Expected result to be null");
});

// Additional tests

Deno.test.ignore("parses ECLF entry with empty referer and userAgent", () => {
  const log =
    `192.168.1.1 - - [01/Jan/2021:00:00:00 +0000] "POST /submit HTTP/1.1" 404 0 "" ""`;
  const result = makeExtendedCommonLogEntry(log);
  assert(result, "Expected result to be non-null");
  assertEquals(result.ipAddress, "192.168.1.1");
  assertEquals(result.statusCode, 404);
  assertEquals(result.responseSize, 0);
  assertEquals(result.referer, "");
  assertEquals(result.userAgent, "");
});

Deno.test.ignore("parses ECLF entry with numeric userId", () => {
  const log =
    `10.0.0.2 - 1234 [15/Mar/2022:12:34:56 +0000] "PUT /api/data HTTP/2" 200 512 "https://ref.example" "curl/7.68.0"`;
  const result = makeExtendedCommonLogEntry(log);
  assert(result, "Expected result to be non-null");
  assertEquals(result.userId, "1234");
  assertEquals(result.statusCode, 200);
  assertEquals(result.responseSize, 512);
});

Deno.test("returns null for ECLF entry with missing fields", () => {
  const log =
    `10.0.0.2 - [15/Mar/2022:12:34:56 +0000] "PUT /api/data HTTP/2" 201 512 "https://ref.example" "curl/7.68.0"`;
  const result = makeExtendedCommonLogEntry(log);
  assertStrictEquals(
    result,
    null,
    "Expected result to be null for missing userId",
  );
});

Deno.test("returns null for ECLF entry with invalid status code", () => {
  const log =
    `10.0.0.2 - user [15/Mar/2022:12:34:56 +0000] "PUT /api/data HTTP/2" abc 512 "https://ref.example" "curl/7.68.0"`;
  const result = makeExtendedCommonLogEntry(log);
  assertStrictEquals(
    result,
    null,
    "Expected result to be null for invalid status code",
  );
});

Deno.test.ignore("parses ECLF entry with dash as responseSize", () => {
  const log =
    `10.0.0.2 - user [15/Mar/2022:12:34:56 +0000] "PUT /api/data HTTP/2" 200 - "https://ref.example" "curl/7.68.0"`;
  const result = makeExtendedCommonLogEntry(log);
  assert(result, "Expected result to be non-null");
  assertStrictEquals(
    result.responseSize,
    undefined,
    "Expected responseSize to be undefined",
  );
});
