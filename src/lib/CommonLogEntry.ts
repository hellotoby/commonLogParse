import {
  CommonLogEntry,
  type ExtendedCommonLogEntry,
  type RequestEntry,
} from "./CommonLogEntryTypes.ts";
import { validateExtendedCommonLogValues } from "../util/validation.ts";

/**
 * Type guard to check if a given value is a `CommonLogEntry`.
 *
 * This function verifies that the input is a non-null object and contains
 * at least one of the expected properties of a `CommonLogEntry`:
 * `ipAddress`, `identd`, `userId`, `timestamp`, `request`, `statusCode`, or `responseSize`.
 *
 * @param entry - The value to check.
 * @returns `true` if the value is a `CommonLogEntry`, otherwise `false`.
 */
export function isCommonLogEntry(entry: unknown): entry is CommonLogEntry {
  return (
    typeof entry === "object" &&
    entry !== null &&
    ("ipAddress" in entry || "identd" in entry || "userId" in entry ||
      "timestamp" in entry || "request" in entry || "statusCode" in entry ||
      "responseSize" in entry)
  );
}

/**
 * Type guard to determine if the provided entry is an `ExtendedCommonLogEntry`.
 *
 * An entry is considered an `ExtendedCommonLogEntry` if it satisfies the `isCommonLogEntry`
 * check and contains at least one of the properties: `referer` or `userAgent`.
 *
 * @param entry - The log entry to check.
 * @returns `true` if the entry is an `ExtendedCommonLogEntry`, otherwise `false`.
 */
export function isExtendedCommonLogEntry(
  entry: unknown,
): entry is ExtendedCommonLogEntry {
  return (
    isCommonLogEntry(entry) &&
    ("referer" in entry || "userAgent" in entry)
  );
}

/**
 * Parses a log entry string and attempts to create an `ExtendedCommonLogEntry` object.
 *
 * @param entry - The raw log entry string to be parsed.
 * @returns An `ExtendedCommonLogEntry` object if the entry is well-formed or null if it cannot be parsed
 */
export function makeExtendedCommonLogEntry(
  entry: string,
): ExtendedCommonLogEntry | null {
  // Regular expression for parsing Extended Common Log Format (ECLF) entries.
  const ECLF_PATTERN =
    /^(\S+) (\S+) (\S+) \[([^\]]+)\] "([^"]*)" (\d+) (\S+)(?: "([^"]*)" "([^"]*)")?$/;
  const eclfArr = entry.match(ECLF_PATTERN);
  if (eclfArr !== null) {
    const extendedCommonLogEntry = {
      ...validateExtendedCommonLogValues(eclfArr),
    };
    if (isExtendedCommonLogEntry(extendedCommonLogEntry)) {
      return extendedCommonLogEntry;
    }
  }
  // console.log(`Unable to parse log entry: ${entry}`);
  return null;
}

/**
 * Parses a request entry string by trimming whitespace and splitting it into an array of substrings using spaces as delimiters.
 *
 * @param requestEntry - The request entry string to be parsed.
 * @returns An array of strings obtained by splitting the trimmed request entry by spaces.
 */
export function parseRequestEntry(requestEntry: RequestEntry): string[] {
  // TODO: validate this correctly
  return requestEntry.trim().split(" ");
}

/**
 * Error thrown when a log entry does not conform to the expected Common Log Format.
 *
 * @extends Error
 *
 * @param message - Optional error message describing the invalid log entry.
 * @param timestamp - The ISO timestamp when the error was created. Defaults to the current time.
 */
export class InvalidCommonLogEntryError extends Error {
  public readonly timestamp: string = new Date().toISOString();

  public constructor(
    public override message: string = "",
  ) {
    super(message);
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidCommonLogEntryError);
    }
  }
}
