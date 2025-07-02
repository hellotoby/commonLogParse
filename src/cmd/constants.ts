export const VERSION = "0.0.1";

export const USAGE = `
Usage: commonLogParse [OPTIONS] [FILE]

Extended Common Log Format parser

Options:
  -h, --help              Show these usage instructions.
  --version               Show the version number.
  --unique-ips            Show the number of unique IP addressess in the log file.
  --active-ips [number]   Show [number] of the most active IP addresses.
  --top-urls [number]     Show [number] of the most visited URLs.

Example:
  commonLogParse --active-ips 5 --top-urls 10 --unique-ips ./path/to/file.log
`;
