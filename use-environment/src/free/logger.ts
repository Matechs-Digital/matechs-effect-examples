import { effect as T, freeEnv as F } from "@matechs/effect";

/**
 * Definition of a Logger module
 */

export const LoggerURI = "@uris-free/Logger";

const Logger_ = F.define({
  [LoggerURI]: {
    log: F.fn<(message: string) => T.UIO<void>>()
  }
});

export interface Logger extends F.TypeOf<typeof Logger_> {}

export const Logger = F.opaque<Logger>()(Logger_);

/**
 * Access helpers
 */
export const { log } = F.access(Logger)[LoggerURI];

/**
 * Implementation
 */

export const provideLogger = F.implement(Logger)({
  [LoggerURI]: {
    log: message =>
      T.sync(() => {
        console.log(message);
      })
  }
});
