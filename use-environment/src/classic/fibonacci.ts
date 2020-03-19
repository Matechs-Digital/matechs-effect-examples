import { effect as T } from "@matechs/effect";
import { Calculator, add } from "./calculator";
import { Do } from "fp-ts-contrib/lib/Do";

/**
 * Definition of a calculator module
 */

export const FibonacciURI = "@uris/Fibonacci";

export interface Fibonacci {
  [FibonacciURI]: {
    fib: (x: bigint) => T.Effect<Calculator, never, bigint>;
  };
}

/**
 * Access helpers
 */
export const fib = (
  x: bigint
): T.Effect<Calculator & Fibonacci, never, bigint> =>
  T.accessM(({ [FibonacciURI]: { fib } }: Fibonacci) => fib(x));

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

export const provideFibonacci = T.provideS<Fibonacci>({
  [FibonacciURI]: {
    fib: fib_
  }
});
