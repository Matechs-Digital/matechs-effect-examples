import { effect as T, freeEnv as F } from "@matechs/effect";
import { done } from "@matechs/effect/lib/original/exit";
import * as assert from "assert";
import { pipe } from "fp-ts/lib/pipeable";
import { provideCalculator } from "../../src/free/calculator";
import {
  fib,
  Fibonacci,
  FibonacciURI,
  provideFibonacci
} from "../../src/free/fibonacci";
import { Logger, LoggerURI } from "../../src/free/logger";
import { main } from "../../src/free/main";

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
