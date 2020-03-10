import { effect as T } from "@matechs/effect";
import { AsOpaque, summon } from "@morphic-ts/batteries/lib/summoner-no-union";
import { AType, EType } from "@morphic-ts/batteries/lib/usage/utils";
import { iotsConfig } from "@morphic-ts/io-ts-interpreters/lib/config";
import * as E from "fp-ts/lib/Either";
import { Endomorphism, flow, identity } from "fp-ts/lib/function";
import { none, Option } from "fp-ts/lib/Option";
import { Mixed, success, Type } from "io-ts";
import { withMessage } from "io-ts-types/lib/withMessage";
import { withValidate } from "io-ts-types/lib/withValidate";
import { failure } from "io-ts/lib/PathReporter";

const emptyStringAsNone = <A, O, I>(codec: Type<Option<A>, O, I>) =>
  withValidate(codec, (i, c) =>
    typeof i === "string" && i === "" ? success(none) : codec.validate(i, c)
  );

const message = (s: string) => (c: Mixed) => withMessage(c, () => s);

const optionalString = (config?: Endomorphism<Mixed>) =>
  summon(F =>
    F.nullable(
      F.string(iotsConfig(config || identity)),
      iotsConfig(flow(emptyStringAsNone, config || identity))
    )
  );

const optionalBool = (config?: Endomorphism<Mixed>) =>
  summon(F =>
    F.nullable(
      F.boolean(iotsConfig(config || identity)),
      iotsConfig(config || identity)
    )
  );

export interface DecodingError {
  _tag: "DecodingError";
  message: string;
}

export const DecodingError = (errors: string[]): DecodingError => ({
  _tag: "DecodingError",
  message: `invalid: ${errors.join(", ")}`
});

const GetUserResponse_ = summon(F =>
  F.interface(
    {
      login: F.string(iotsConfig(message("login"))),
      id: F.number(iotsConfig(message("id"))),
      node_id: F.string(iotsConfig(message("node_id"))),
      avatar_url: optionalString(message("avatar url"))(F),
      gravatar_id: optionalString(message("gravatar id"))(F),
      url: F.string(iotsConfig(message("url"))),
      html_url: F.string(iotsConfig(message("html url"))),
      followers_url: F.string(iotsConfig(message("followers url"))),
      following_url: F.string(iotsConfig(message("following url"))),
      gists_url: F.string(iotsConfig(message("gists url"))),
      starred_url: F.string(iotsConfig(message("starred url"))),
      subscriptions_url: F.string(iotsConfig(message("subscriptions url"))),
      organizations_url: F.string(iotsConfig(message("organizations url"))),
      repos_url: F.string(iotsConfig(message("repos url"))),
      events_url: F.string(iotsConfig(message("event url"))),
      received_events_url: F.string(iotsConfig(message("received events url"))),
      type: F.string(iotsConfig(message("type"))),
      site_admin: F.boolean(iotsConfig(message("site admin"))),
      name: F.string(iotsConfig(message("name"))),
      company: optionalString(message("company"))(F),
      blog: optionalString(message("company"))(F),
      location: optionalString(message("location"))(F),
      email: optionalString(message("email"))(F),
      hireable: optionalBool(message("hireable"))(F),
      bio: optionalString(message("bio"))(F),
      public_repos: F.number(iotsConfig(message("public repos"))),
      public_gists: F.number(iotsConfig(message("public gists"))),
      followers: F.number(iotsConfig(message("followers"))),
      following: F.number(iotsConfig(message("following"))),
      created_at: F.date(iotsConfig(message("created at"))),
      updated_at: F.date(iotsConfig(message("updated at")))
    },
    "GetUserResponse"
  )
);

export interface GetUserResponse extends AType<typeof GetUserResponse_> {}
export interface GetUserResponseRaw extends EType<typeof GetUserResponse_> {}

export const GetUserResponse = AsOpaque<GetUserResponseRaw, GetUserResponse>(
  GetUserResponse_
);

export const decode = flow(
  GetUserResponse.type.decode,
  E.mapLeft(failure),
  E.mapLeft(DecodingError)
);
export const decodeT = T.liftEither(decode);
