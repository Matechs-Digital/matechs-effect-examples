import { effect as T } from "@matechs/effect";
import { pipe } from "fp-ts/lib/pipeable";
import { main } from "./main";
import { provideFibonacci } from "./fibonacci";
import { provideCalculator } from "./calculator";
import { isDone } from "@matechs/effect/lib/exit";
import { inspect } from "util";
import { provideLogger } from "./logger";

pipe(
  main, // T.Effect<Logger & Fibonacci, string, void>
  provideFibonacci, // T.Effect<Logger & Calculator, string, void>
  provideCalculator, // T.Effect<Logger, string, void>
  provideLogger, // T.Effect<unknown, string, void>
  T.runToPromiseExit
).then(x => {
  if (!isDone(x)) {
    console.error(inspect(x, true, 10));
  }
});
