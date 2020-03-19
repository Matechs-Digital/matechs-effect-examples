import { effect as T, freeEnv as F } from "@matechs/effect";
import { main } from "../../src/free/main";

import * as assert from "assert";
import { pipe } from "fp-ts/lib/pipeable";
import { Logger, LoggerURI } from "../../src/free/logger";
import { Fibonacci, FibonacciURI } from "../../src/free/fibonacci";

describe("Free", () => {
  it("should calculate fib of 5 & fib 10 during main", async () => {
    const inputs: bigint[] = [];

    const mockLogger = F.implement(Logger)({
      [LoggerURI]: {
        log: () => T.unit
      }
    });

    const mockFibonacci = F.implement(Fibonacci)({
      [FibonacciURI]: {
        fib: x =>
          pipe(
            T.sync(() => inputs.push(x)),
            T.map(() => x)
          )
      }
    });

    await pipe(main, mockLogger, mockFibonacci, T.runToPromiseExit);

    assert.deepEqual(inputs, [BigInt(5), BigInt(10)]);
  });
});
