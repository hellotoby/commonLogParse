import { commonLogParser } from "./cmd/commonLogParser.ts";
import { done, flags, panic, usage, version } from "./util/cli.ts";

function main() {
  const options = flags();
  if (options.help && options._.length === 0) {
    usage();
  }
  if (options.version && options._.length === 0) {
    version();
  }
  try {
    if (options._.length > 0) {
      commonLogParser(options);
    }
  } catch (err) {
    console.error(`Program terminated with error: ${err}`);
    panic();
  } finally {
    done();
  }
}

main();
