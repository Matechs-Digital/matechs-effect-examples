import { effect as T, exit as EX } from "@matechs/effect";
import { raise } from "@matechs/effect/lib/original/exit";
import { pipe } from "fp-ts/lib/pipeable";
import { client } from "../src";
import { unit, assertTrue, assertEqual } from "./common";
import getUserResponse from "./fixtures/getUser.json";

describe("ApiClient", () => {
  unit("should decode response")(
    pipe(
      getUserResponse,
      client.model.getUser.decodeT,
      T.result,
      T.map(EX.isDone),
      T.chain(assertTrue)
    )
  );

  unit("should fail decoding response")(
    pipe(
      { ...getUserResponse, login: 1 },
      client.model.getUser.decodeT,
      T.result,
      T.chain(assertEqual(raise(["invalid login"])))
    )
  );
});
