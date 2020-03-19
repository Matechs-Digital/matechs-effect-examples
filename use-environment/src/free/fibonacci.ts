import { effect as T, freeEnv as F } from "@matechs/effect";
import { Calculator, add } from "./calculator";
import { Do } from "fp-ts-contrib/lib/Do";

/**
 * Definition of a calculator module
 */

export const FibonacciURI = "@uris/Fibonacci";

const Fibonacci_ = F.define({
  [FibonacciURI]: {
    fib: F.fn<(x: bigint) => T.UIO<bigint>>()
  }
});

export interface Fibonacci extends F.TypeOf<typeof Fibonacci_> {}

export const Fibonacci = F.opaque<Fibonacci>()(Fibonacci_);

/**
 * Access helpers
 */
export const { fib } = F.access(Fibonacci)[FibonacciURI];

/**
 * Implementation
 */

const fib_ = (x: bigint): T.Effect<Calculator, never, bigint> =>
  x < BigInt(2)
    ? T.pure(BigInt(1))
    : Do(T.effect)
        .bind("n_1", fib_(x - BigInt(1)))
        .bind("n_2", fib_(x - BigInt(2)))
        .bindL("n", ({ n_1, n_2 }) => add(n_1, n_2))
        .return(s => s.n);

export const provideFibonacci = F.implement(Fibonacci)({
  [FibonacciURI]: {
    fib: fib_
  }
});
