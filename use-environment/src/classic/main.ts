import { effect as T } from "@matechs/effect";
import { fib, Fibonacci } from "./fibonacci";
import { pipe } from "fp-ts/lib/pipeable";
import { log, Logger } from "./logger";
import { Calculator } from "./calculator";
import { getStructShow, Show } from "fp-ts/lib/Show";
import { sequenceS } from "fp-ts/lib/Apply";

const showBigInt: Show<bigint> = {
  show: x => x.toString(10)
};

interface Result {
  fib_5: bigint;
  fib_10: bigint;
}

const showResult = getStructShow<Result>({
  fib_10: showBigInt,
  fib_5: showBigInt
});

const program = pipe(
  sequenceS(T.effect)({
    fib_5: fib(BigInt(5)),
    fib_10: fib(BigInt(10))
  }),
  T.map((x): Result => x)
);

export const main: T.Effect<
  Logger & Calculator & Fibonacci,
  string,
  void
> = pipe(program, T.map(showResult.show), T.chain(log));
