import { pipe } from "fp-ts/lib/pipeable";
import { client } from "../src";
import { unit, assertDecodingError, assertDone } from "./common";
import getUserResponse from "./fixtures/getUser.json";

describe("ApiClient", () => {
  unit("should decode response")(
    pipe(getUserResponse, client.model.getUser.decodeT, assertDone)
  );

  unit("should fail decoding response")(
    pipe(
      { ...getUserResponse, login: 1 },
      client.model.getUser.decodeT,
      assertDecodingError("invalid: login")
    )
  );
});
