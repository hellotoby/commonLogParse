/**
 * Reads the contents of a file synchronously and returns it as a UTF-8 string.
 *
 * @param input - The path to the file to be read.
 * @returns The decoded file contents as a string, or void if an error occurs.
 */
export function readFile(input: string): string {
  const decoder = new TextDecoder("utf-8");
  const buffer = Deno.readFileSync(input);
  return decoder.decode(buffer);
}
