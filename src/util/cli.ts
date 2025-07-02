import { parseArgs } from "@std/cli";
import { USAGE, VERSION } from "../cmd/constants.ts";

export function usage(): void {
  console.log(USAGE);
  done();
}

export function version(): void {
  console.log(VERSION);
  done();
}

export function flags() {
  const args = parseArgs(Deno.args, {
    boolean: ["version", "help", "unique-ips"],
    string: ["active-ips", "top-urls"],
    alias: {
      h: "help",
    },
    default: {
      "help": false,
      "version": false,
      "unique-ips": false,
    },
  });
  return args;
}

export function done() {
  Deno.exit(0);
}

export function panic(): void {
  Deno.exit(1);
}
