export interface CommonLogEntry {
  source: string;
  ipAddress?: IpAddress;
  identd?: Identd;
  userId?: UserId;
  timestamp?: Timestamp;
  request?: RequestEntry;
  statusCode?: StatusCode;
  responseSize?: ResponseSize;
}

export interface ExtendedLogEntry {
  referer?: Referer;
  userAgent?: UserAgent;
}

export type ExtendedCommonLogEntry = CommonLogEntry & ExtendedLogEntry;

export type EmptyField = "-";

export type IpAddress = string | EmptyField;

export type Identd = string | EmptyField;

export type UserId = string | EmptyField;

export type Timestamp = string | EmptyField;

export type AbsoluteUrl = `https://${string}`;

export type RelativeUrl = `/${string}`;

export type UrlUnionType = AbsoluteUrl | RelativeUrl;

export type HttpProtocol = "HTTP/1.1" | "HTTP/2" | "HTTP/3";

export type RequestEntry =
  | `${HttpMethod} ${UrlUnionType} ${HttpProtocol}`
  | EmptyField;

export type HttpMethod =
  | "GET"
  | "PUT"
  | "POST"
  | "PATCH"
  | "DELETE"
  | "OPTIONS";

export type StatusCode = HttpStatusCode | EmptyField;

export type ResponseSize = number | EmptyField;

export enum HttpStatusCode {
  "Ok" = 200,
  "BadRequest" = 400,
  "NotFound" = 404,
  "MovedPermanently" = 301,
  "MovedTemporarily" = 302,
  "InternalServerError" = 500,
}

export type Referer = string | EmptyField;

export type UserAgent = string | EmptyField;
