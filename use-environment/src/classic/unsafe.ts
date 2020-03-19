import { effect as T } from "@matechs/effect";
import { pipe } from "fp-ts/lib/pipeable";
import { main } from "./main";
import { provideFibonacci } from "./fibonacci";
import { provideCalculator } from "./calculator";
import { isDone } from "@matechs/effect/lib/exit";
import { inspect } from "util";
import { provideLogger } from "./logger";

pipe(
  main,
  provideFibonacci,
  provideCalculator,
  provideLogger,
  T.runToPromiseExit
).then(x => {
  if (!isDone(x)) {
    console.error(inspect(x, true, 10));
  }
});
