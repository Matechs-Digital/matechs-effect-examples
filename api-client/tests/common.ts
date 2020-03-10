import * as assert from "assert";
import { effect as T } from "@matechs/effect";

export const assertTrue = (x: unknown) =>
  T.trySync(() => assert.deepEqual(x, true));

export const assertEqual = (y: unknown) => (x: unknown) =>
  T.trySync(() => assert.deepEqual(x, y));

export const unit = (name: string) => <E, A>(_: T.IO<E, A>) =>
  it(name, () => T.runToPromise(_));
