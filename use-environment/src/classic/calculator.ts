import { effect as T } from "@matechs/effect";

/**
 * Definition of a calculator module
 */

export const CalculatorURI = "@uris/Calculator";

export interface Calculator {
  [CalculatorURI]: {
    add: (x: bigint, y: bigint) => T.UIO<bigint>;
  };
}

/**
 * Access helpers
 */
export const add = (
  x: bigint,
  y: bigint
): T.Effect<Calculator, never, bigint> =>
  T.accessM(({ [CalculatorURI]: { add } }: Calculator) => add(x, y));

/**
 * Implementation
 */

export const provideCalculator = T.provideS<Calculator>({
  [CalculatorURI]: {
    add: (x, y) => T.sync(() => x + y)
  }
});
