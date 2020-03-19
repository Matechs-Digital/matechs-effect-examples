import { effect as T } from "@matechs/effect";
import { main } from "../../src/classic/main";

import * as assert from "assert";
import { pipe } from "fp-ts/lib/pipeable";
import { provideCalculator } from "../../src/classic/calculator";
import { Logger, LoggerURI } from "../../src/classic/logger";
import { Fibonacci, FibonacciURI } from "../../src/classic/fibonacci";

describe("Classic", () => {
  it("should calculate fib of 5 & fib 10 during main", async () => {
    const inputs: bigint[] = [];

    const mockLogger = T.provideS<Logger>({
      [LoggerURI]: {
        log: () => T.unit
      }
    });

    const mockFibonacci = T.provideS<Fibonacci>({
      [FibonacciURI]: {
        fib: x =>
          pipe(
            T.sync(() => inputs.push(x)),
            T.map(() => x)
          )
      }
    });

    await pipe(
      main,
      mockLogger,
      mockFibonacci,
      provideCalculator,
      T.runToPromiseExit
    );

    assert.deepEqual(inputs, [BigInt(5), BigInt(10)]);
  });
});
