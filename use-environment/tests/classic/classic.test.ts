import { effect as T } from "@matechs/effect";
import { done } from "@matechs/effect/lib/original/exit";
import * as assert from "assert";
import { pipe } from "fp-ts/lib/pipeable";
import { provideCalculator } from "../../src/classic/calculator";
import {
  fib,
  Fibonacci,
  FibonacciURI,
  provideFibonacci
} from "../../src/classic/fibonacci";
import { Logger, LoggerURI } from "../../src/classic/logger";
import { main } from "../../src/classic/main";

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

  it("should calculate fib of 5 correctly", async () => {
    const fib_5 = await pipe(
      fib(BigInt(5)),
      provideFibonacci,
      provideCalculator,
      T.runToPromiseExit
    );

    assert.deepEqual(fib_5, done(BigInt(8)));
  });
});
