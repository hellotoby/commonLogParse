import type {
  ExtendedCommonLogEntry,
  HttpStatusCode,
  RequestEntry,
} from "../lib/CommonLogEntryTypes.ts";

// Stub
export function validateIpAddress(data: string): string {
  return data;
}

// Stub
export function validateIdentd(data: string): string {
  return data;
}

// Stub
export function validateUserId(data: string): string {
  return data;
}

// Stub
export function validateTimestamp(data: string): string {
  return data;
}

// Stub
export function validateRequest(data: string): RequestEntry {
  return data as RequestEntry; // Should add a guard
}

// Stub
export function validateStatusCode(data: string): HttpStatusCode {
  return data as unknown as HttpStatusCode; // Should add a guard
}

// Stub
export function validateResponseSize(data: string): number {
  return parseInt(data);
}

// Stub
export function validateReferer(data: string): string {
  return data;
}

// Stub
export function validateUserAgent(data: string): string {
  return data;
}

// Stub
export function validateExtendedCommonLogValues(
  data: RegExpMatchArray,
): ExtendedCommonLogEntry {
  const source = data[0],
    ipAddress = validateIpAddress(data[1]),
    identd = validateIdentd(data[2]),
    userId = validateUserId(data[3]),
    timestamp = validateTimestamp(data[4]),
    request = validateRequest(data[5]),
    statusCode = validateStatusCode(data[6]),
    responseSize = validateResponseSize(data[7]),
    referer = validateReferer(data[8]),
    userAgent = validateUserAgent(data[9]);

  return {
    source,
    ipAddress,
    identd,
    userId,
    timestamp,
    request,
    statusCode,
    responseSize,
    referer,
    userAgent,
  };
}
