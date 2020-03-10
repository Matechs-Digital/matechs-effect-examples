import * as assert from "assert";
import { effect as T } from "@matechs/effect";
import { pipe } from "fp-ts/lib/pipeable";
import { isDone } from "@matechs/effect/lib/exit";
import { raise } from "@matechs/effect/lib/original/exit";

export const assertTrue = (x: unknown) =>
  T.trySync(() => assert.deepEqual(x, true));

export const assertEqual = (y: unknown) => (x: unknown) =>
  T.trySync(() => assert.deepEqual(x, y));

export const assertDecodingError = (message: string) => <E, A>(_: T.IO<E, A>) =>
  pipe(
    _,
    T.result,
    T.chain(x =>
      T.trySync(() =>
        assert.deepEqual(x, raise({
          _tag: "DecodingError",
          message
        }))
      )
    )
  );

export const assertDone = <E, A>(_: T.IO<E, A>) =>
  pipe(
    _,
    T.result,
    T.chain(x => T.trySync(() => assert.deepEqual(isDone(x), true)))
  );

export const unit = (name: string) => <E, A>(_: T.IO<E, A>) =>
  it(name, () => T.runToPromise(_));
