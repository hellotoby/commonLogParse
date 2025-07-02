import { type Args } from "@std/cli/parse-args";

import { type ExtendedCommonLogEntry, type RequestEntry } from "../lib/CommonLogEntryTypes.ts";
import { makeExtendedCommonLogEntry } from "../lib/CommonLogEntry.ts";
import { makeString } from "../util/helpers.ts";
import { readFile } from "../util/io.ts";

export function commonLogParser(options: Args): void {
  const data = parseFile(makeString(options._[0]));
  const ipAddressCache = countAggregate(data, "ipAddress");
  const urlCache = countAggregateUrlsFromRequestEntry(data);
  const results = {};

  if (typeof options["active-ips"] !== "undefined") {
    let numIpResults = parseInt(options["active-ips"]);
    if (isNaN(numIpResults)) {
      numIpResults = 3;
    }
    const activeIpResults = {
      activeIpAddresses: [...ipAddressCache.entries()].map((value) => value)
        .slice(
          0,
          numIpResults,
        ),
    };
    Object.assign(results, { ...activeIpResults });
  }
  if (typeof options["top-urls"] !== "undefined") {
    let numUrlResults = parseInt(options["top-urls"]);
    if (isNaN(numUrlResults)) {
      numUrlResults = 3;
    }
    const topUrlsResults = {
      topUrls: [...urlCache.entries()].map((value) => value).slice(
        0,
        numUrlResults,
      ),
    };
    Object.assign(results, { ...topUrlsResults });
  }
  if (options["unique-ips"] !== false) {
    const uniqueIps = {
      uniqueIpAddresses: countAggregate(data, "ipAddress").size,
    };
    Object.assign(results, { ...uniqueIps });
  }

  console.dir(results);
}

/**
 * Parses a single log line and returns it as an `ExtendedCommonLogEntry` object.
 *
 * @param line - The log line to parse.
 * @returns The parsed log entry as an `ExtendedCommonLogEntry`.
 */
export function readLine(line: string): ExtendedCommonLogEntry | null {
  if (!line) {
    return null;
  }
  return makeExtendedCommonLogEntry(line);
}

/**
 * Parses a log file and returns an array of ExtendedCommonLogEntry objects.
 *
 * @param input - The path to the log file to be parsed.
 * @returns An array of ExtendedCommonLogEntry objects representing each line in the log file.
 */
export function parseFile(input: string): ExtendedCommonLogEntry[] {
  const lines = readFile(input).split("\n"); // Assume this is newline
  return lines.map((line) => readLine(line)).filter((entry) => entry !== null);
}

/**
 * Counts the occurrences of each unique value for a specified key in an array of `ExtendedCommonLogEntry` objects.
 *
 * @param arr - The array of `ExtendedCommonLogEntry` objects to aggregate.
 * @param key - The key of `ExtendedCommonLogEntry` whose values will be counted.
 * @returns A `Map` where each key is a unique value from the specified property, and each value is the count of its occurrences.
 */
export function countAggregate(
  arr: ExtendedCommonLogEntry[],
  key: keyof ExtendedCommonLogEntry,
) {
  const count = new Map<
    ExtendedCommonLogEntry[keyof ExtendedCommonLogEntry],
    number
  >();
  arr.forEach((logEntry) => {
    const value = logEntry[key];
    count.set(value, (count.get(value) || 0) + 1);
  });
  const sortedMap = new Map([...count.entries()].sort((a, b) => b[1] - a[1]));
  return sortedMap;
}

export function countAggregateUrlsFromRequestEntry(
  arr: ExtendedCommonLogEntry[],
) {
  const count = new Map<string, number>();
  arr.forEach((logEntry) => {
    const value = getUrlFromRequestString(logEntry["request"]);
    if (value && typeof value !== "undefined") {
      count.set(value, (count.get(value) || 0) + 1);
    }
  });
  const sortedMap = new Map([...count.entries()].sort((a, b) => b[1] - a[1]));
  return sortedMap;
}

export function getUrlFromRequestString(
  req: RequestEntry | undefined,
): string | undefined {
  if (typeof req !== "undefined") {
    const parts = req.trim().split(" ").map((value) => makeString(value));
    if (parts.length === 3) {
      // Get the URL
      if (
        parts[1].startsWith("http") ||
        parts[1].startsWith("https") ||
        parts[1].startsWith("/")
      ) {
        return parts[1];
      }
    }
  }
  return;
}