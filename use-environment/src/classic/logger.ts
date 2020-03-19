import { effect as T } from "@matechs/effect";

/**
 * Definition of a Logger module
 */

export const LoggerURI = "@uris/Logger";

export interface Logger {
  [LoggerURI]: {
    log: (message: string) => T.UIO<void>;
  };
}

/**
 * Access helpers
 */
export const log = (message: string): T.Effect<Logger, never, void> =>
  T.accessM(({ [LoggerURI]: { log } }: Logger) => log(message));

/**
 * Implementation
 */

export const provideLogger = T.provideS<Logger>({
  [LoggerURI]: {
    log: message =>
      T.sync(() => {
        console.log(message);
      })
  }
});
