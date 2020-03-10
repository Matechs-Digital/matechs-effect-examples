import * as assert from "assert";
import { client } from "../src";
import getUserResponse from "./fixtures/getUser.json";
import { pipe } from "fp-ts/lib/pipeable";
import { effect as T, exit as EX } from "@matechs/effect";
import { raise } from "@matechs/effect/lib/original/exit";

const assertTrue = (x: unknown) => assert.deepEqual(x, true);
const assertEqual = (y: unknown) => (x: unknown) => assert.deepEqual(x, y);

describe("ApiClient", () => {
  it("should decode response", () =>
    pipe(
      getUserResponse,
      client.model.getUser.decodeT,
      T.result,
      T.map(EX.isDone),
      T.map(assertTrue),
      T.runToPromise
    ));

  it("should fail decoding response", () =>
    pipe(
      { ...getUserResponse, login: 1 },
      client.model.getUser.decodeT,
      T.result,
      T.map(assertEqual(raise(["invalid login"]))),
      T.runToPromise
    ));
});
