import { effect as T, freeEnv as F } from "@matechs/effect";

/**
 * Definition of a calculator module
 */

export const CalculatorURI = "@uris/Calculator";

const Calculator_ = F.define({
  [CalculatorURI]: {
    add: F.fn<(x: bigint, y: bigint) => T.UIO<bigint>>()
  }
});

export interface Calculator extends F.TypeOf<typeof Calculator_> {}

export const Calculator = F.opaque<Calculator>()(Calculator_);

/**
 * Access helpers
 */
export const { add } = F.access(Calculator)[CalculatorURI];

/**
 * Implementation
 */

export const provideCalculator = F.implement(Calculator)({
  [CalculatorURI]: {
    add: (x, y) => T.sync(() => x + y)
  }
});
