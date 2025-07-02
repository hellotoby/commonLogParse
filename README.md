# commonLogParse

```
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
```

## Introduction

This CLI tool analyzes logs in the
[Extended Common Log Format](https://en.wikipedia.org/wiki/Common_Log_Format)
and provides answers to the following queries:

- The number of unique IP addresses
- The top 3 most visited URLs
- The top 3 most active IP addresses

## Requirements

Binaries for most architectures can be found in the `./bin` directory.

### Development

- Visual Studio Code w/ dev containers
- Docker

## Installation

No installation is required. The binary for your architecture can be run
directly from the `./bin` directory.`

Make sure to make it executable if it is not already:

```bash
chmod +x ./path/to/commonLogParse
```

### Development

- Clone the repository
- Open the repository in Visual Studio Code
- Open the command palette (Ctrl+Shift+P) and select _"Remote-Containers: Reopen
  in Container"_
- This will set up the development environment with all necessary dependencies
- Run `make` to compile the binaries.

## Usage

Run `./bin/commonLogParse -h` to see the available options and usage
instructions.

Example usage:

```bash
./bin/mac/aarch64/commonLogParse --active-ips 5 --unique-ips --top-urls 3 ./test/sample.log
```

## Notes & Considerations

Not all of the considerations are implemented in the current version of the
program.

### Technology choice

This program is written in typescript and compiled with Deno. This choice was
made for the following reasons:

- I know typescript well enough and it is a language I enjoy working with
- Deno makes it easy to work with the commandline and provides a good standard
  library for file handling and parsing when compared to Node.js
- It's also easy to cross-compile the binary for different architectures using
  Deno
- I like trying new technologies. This was my first time using Deno for a
  project.

### Third-party libraries

This program does not use any third-party libraries for parsing the log file.
The Deno std library provides all the necessary functionality for file handling,
parsing, and output formatting.

### Assumptions

For the purpose of this tool, I have made the following assumptions about the
log file, it's format, encoding and output:

1. The log file is in the Extended Common Log Format (based on viewing the
   contents of the example log entry)
2. The character encoding of the log file is UTF-8
3. The log file is not gzipped or compressed in any way
4. The log file can be processed in memory or line by line
5. The program outputs the results in a human-readable format, such as JSON or
   plain text
6. The output of the program is redirected to stdout

NOTE: Currently the program discards the entire line if it is malformed. This
could be changed to attempt to fix a malformed line, or to log the error and
continue processing the rest of the file.

### Other considerations

Below are my notes taken when planning the program. I wasn't anle to address all
of them in the alotted time, but they are worth considering for future
enhancements.

#### Files

- [x] Character encoding is used in the log files

The log files are assumed to be in UTF-8 encoding, which is a common encoding
for text files.

- [x] Format of the log files, is it standardised or custom?

The log files are in the Extended Common Log Format, which is a standard format
for web server logs.

- [ ] File size of the log files
- [x] New lines and other special characters in the log files

The log files use new lines to separate entries, and spaces to separate fields
within each entry. Special characters such as quotes in the user agent string
are handled by the parser.

- [x] Is the file read into memory or processed line by line?

The program reads the file into memory for processing, but it can also be
modified to process the file differently if needed.

- [ ] Can the file be streamed? Or chunked?
- [x] Are the log files gzipped or compressed in any way?

The log files are not gzipped or compressed in any way, as per the assumptions
made for this tool. However, this is not standard and could be a consideration
for future enhancements. Often log files are compressed to save space,
especially in production environments.

#### Parsing entries

Example log entry:

```
177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; U; Linux x86_64; fr-FR) AppleWebKit/534.7 (KHTML, like Gecko) Epiphany/2.30.6 Safari/534.7"
```

- [x] How are entries separated in the log file?

Entries are separated by new lines.

- [x] What is the format of each entry?

Each entry is in the Extended Common Log Format, which includes the following
fields:

- IP address
- Identd (usually `-`)
- User ID (usually `-`)
- Timestamp
- Request line (method, URL, protocol)
- Status code
- Response size
- Referrer
- User agent

Missing fields are represented by `-`. Fields are separated by spaces, and the
timestamp is enclosed in square brackets.

- [ ] Are there any delimiters or special characters used?
- [x] Are there any timestamps or date formats used?

Timestamps are in the format `[10/Jul/2018:22:21:28 +0200]`, which includes the
date, time, and timezone offset.

- [ ] Are there any special characters that need to be escaped?
- [ ] Are there any specific fields that need to be extracted from each entry?
- [x] How do we deal with malformed entries?

The program currently discards malformed entries.

- [ ] IP addresses, do we handle both IPv4 and IPv6?
- [ ] Is timezone a consideration when parsing timestamps?
- [ ] Will we standardise the timestamps into a specific format?

#### Output

- [ ] What formats should we support for output?
- [ ] Can we write to the file system? Where should default output and error
      logs go?
